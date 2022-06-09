const hre = require("hardhat");

async function main() {

  const Album = await hre.ethers.getContractFactory("Album");
  const album = await Album.deploy("Hello, Hardhat!");

  await album.deployed();

  console.log("Album deployed to:", album.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
