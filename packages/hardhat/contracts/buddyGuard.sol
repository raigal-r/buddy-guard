// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

//import "hardhat/console.sol";
import "@ethereum-attestation-service/eas-contracts/contracts/IEAS.sol";

interface IERC20 {
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function transfer(address recipient, uint256 amount) external returns (bool);
}

contract buddyGuard {
    IEAS public eas;
    bytes32 constant schema = 0x7fe79bf55dc0df94d72d713067bb6162828f6c7b66458ea3661b41d4d02fc40f;

    struct Order {
        address creator;
        address[] guardians;
        uint256 stake;
        uint256 creationTime;
        bool isActive;
        IERC20 token;
    }

/*    /// @notice A struct representing the arguments of the attestation request.
    struct AttestationRequestData {
        address recipient; // The recipient of the attestation.
        uint64 expirationTime; // The time when the attestation expires (Unix timestamp).
        bool revocable; // Whether the attestation is revocable.
        bytes32 refUID; // The UID of the related attestation.
        bytes data; // Custom attestation data.
        uint256 value; // An explicit ETH amount to send to the resolver. This is important to prevent accidental user errors.
    }*/

    mapping(uint256 => Order) public orders;
    uint256 public orderCount;

    event OrderCreated(uint256 indexed orderId, address indexed creator, address token, uint256 stake);
    event GuardianAdded(uint256 indexed orderId, address indexed guardian);
    event OrderCancelled(uint256 indexed orderId);
    event OrderExpired(uint256 indexed orderId, address indexed guardian);

    constructor(address _easAddress) {
        eas = IEAS(_easAddress);
    }

    // Create an order
    function createOrder(address _token, uint256 _stake) external {
        require(IERC20(_token).transferFrom(msg.sender, address(this), _stake), "Transfer failed");

        Order storage order = orders[orderCount];
        order.creator = msg.sender;
        order.stake = _stake;
        order.creationTime = block.timestamp;
        order.isActive = true;
        order.token = IERC20(_token);

        emit OrderCreated(orderCount, msg.sender, _token, _stake);
        orderCount++;
    }

    // Add a guardian to a specific order
    function addGuardian(uint256 _orderId, address _guardian) external {
        Order storage order = orders[_orderId];
        require(msg.sender == order.creator, "Only creator can add guardian");
        require(order.isActive, "Order is not active");

        order.guardians.push(_guardian);
        emit GuardianAdded(_orderId, _guardian);
    }

    // Cancel the order
    function cancelOrder(uint256 _orderId) external {
        Order storage order = orders[_orderId];
        
        require(msg.sender == order.creator, "Only creator can cancel order");
        require(block.timestamp <= order.creationTime + 48 hours, "Order duration expired");
        require(order.isActive, "Order is already cancelled");

        order.isActive = false;
        require(order.token.transfer(msg.sender, order.stake), "Refund failed");

        emit OrderCancelled(_orderId);

        for (uint i = 0; i < orders[_orderId].guardians.length; i++) {
            _sendAttestationRequest(orders[_orderId].guardians[i], false);
        }
    }

    // Trig when the order expires
    function trigExpiredOrder(uint256 _orderId) external {
        Order storage order = orders[_orderId];
        require(isGuardian(order, msg.sender), "Only assigned guardian can trig");
        require(block.timestamp > order.creationTime + 48 hours, "Order duration not yet expired");
        require(order.isActive, "Order is already cancelled");

        order.isActive = false;
        // Slash the stake to the buddyGuard treasury
        // Confirm guardian awareness and send attestation kudos through EAS here
        emit OrderExpired(_orderId, msg.sender);

        for (uint i = 0; i < orders[_orderId].guardians.length; i++) {
            _sendAttestationRequest(orders[_orderId].guardians[i], true);
        }
    }

    function _sendAttestationRequest(address guardian, bool emergencyTriggered) private {
        bytes memory data = abi.encode(guardian, emergencyTriggered);
        AttestationRequestData memory requestData = AttestationRequestData({
            recipient: guardian,
            expirationTime: 0, 
            revocable: false,
            refUID: 0x0,
            data: data,
            value: 0 
        });

        AttestationRequest memory request = AttestationRequest({
            schema: schema,
            data: requestData
        });

        try eas.attest(request) {
        } catch {
        }
        
    }

    function getGuardians(uint256 _orderId) external view returns (address[] memory) {
        require(_orderId < orderCount, "Order does not exist");
        return orders[_orderId].guardians;
    }

    // Helper function to check if an address is a guardian of the order
    function isGuardian(Order storage order, address _guardian) private view returns (bool) {
        for (uint i = 0; i < order.guardians.length; i++) {
            if (order.guardians[i] == _guardian) {
                return true;
            }
        }
        return false;
    }
}
