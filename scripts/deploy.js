const fs = require('fs');
const path = require('path');


async function main() {
  // This is just a convenience check
  if (network.name === 'hardhat') {
    console.warn(
      "You are trying to deploy a contract to the Hardhat Network, which" +
        "gets automatically created and destroyed every time. Use the Hardhat" +
        " option '--network localhost'"
    );
  };

  const [deployer] = await ethers.getSigners();
  console.log('Deploying contracts with the account:', deployer.address);

  const deployed = {};

  const tokenName = 'Token';
  const token = await ethers.deployContract(tokenName);
  const tokenAddress = await token.getAddress();
  deployed[tokenName] = tokenAddress
  console.log(`${tokenName} address: ${tokenAddress}`);

  // We also save the contract's artifacts and address in the frontend directory
  saveFrontendFiles(deployed);
};

function saveFrontendFiles(deployed) {
  const deploymentsDir = path.join(__dirname, '..', 'deployments');

  if (!fs.existsSync(deploymentsDir)) {
    fs.mkdirSync(deploymentsDir);
  };

  fs.writeFileSync(
    path.join(deploymentsDir, "contract-addresses.json"),
    JSON.stringify(deployed, undefined, 2)
  );

  fs.appendFileSync(
    path.join(deploymentsDir, "contract-addresses.json"),
    '\n'
  );
};


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
