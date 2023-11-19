import { ethers } from "hardhat";

async function main() {
    const contractAddress = "0xD2646C2629F237Ec1a03fc1d6ef7f953410BC788";
    const tokenAddress = "0xdEAddEaDdeadDEadDEADDEAddEADDEAddead1111";
    const [owner] = await ethers.getSigners();

    const ERC20 = await ethers.getContractAt("@openzeppelin/contracts/token/ERC20/IERC20.sol:IERC20", tokenAddress, owner);
    const BuddyGuard = await ethers.getContractAt("buddyGuard", contractAddress, owner);

    const stakeAmount = ethers.utils.parseUnits("0.0001", 18); 
    await ERC20.approve(contractAddress, stakeAmount);

    const tx = await BuddyGuard.createOrder(tokenAddress, stakeAmount);
    const receipt = await tx.wait();

    for (const event of receipt.events) {
        console.log("Event:", event.event, event.args);
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
