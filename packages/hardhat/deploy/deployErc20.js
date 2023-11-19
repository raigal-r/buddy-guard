async function main() {

    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    const TestERC20 = await ethers.getContractFactory("TestERC20");

    const token = await TestERC20.deploy();

    await token.deployed();

    console.log("TestERC20 deployed to:", token.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
