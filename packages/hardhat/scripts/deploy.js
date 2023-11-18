async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const BuddyGuardFactory = await ethers.getContractFactory("buddyGuard");

  const buddyGuard = await BuddyGuardFactory.deploy();

  console.log("buddyGuard contract deployed to:", buddyGuard.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
      console.error(error);
      process.exit(1);
  });
