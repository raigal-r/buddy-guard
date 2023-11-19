const hre = require("hardhat");

async function main() {
   
    const easAddress = "0xaEF4103A04090071165F78D45D83A0C0782c2B2a"; 

   
    const BuddyGuard = await hre.ethers.getContractFactory("buddyGuard");

    
    const buddyGuard = await BuddyGuard.deploy(easAddress);

   
    await buddyGuard.deployed();

    console.log(`buddyGuard deployed to: ${buddyGuard.address}`);
}


main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
