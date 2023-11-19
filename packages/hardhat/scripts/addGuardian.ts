import { ethers } from "hardhat";

async function main() {
    const contractAddress = "0xD2646C2629F237Ec1a03fc1d6ef7f953410BC788";
    const orderId = 0; 
    const guardianAddress = "0x0721b65EEB4CbFebe48684b363D8053924925EA1"; 
    const [owner] = await ethers.getSigners();

    const BuddyGuard = await ethers.getContractFactory("buddyGuard");
    const buddyGuard = BuddyGuard.attach(contractAddress).connect(owner);

    const tx = await buddyGuard.addGuardian(orderId, guardianAddress);
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
