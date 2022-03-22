import { ethers } from "hardhat";

async function main() {
  const BusinessCard = await ethers.getContractFactory("BusinessCard");
  const businessCard = await BusinessCard.deploy();

  await businessCard.deployed();

  console.log("BusinessCard deployed to:", businessCard.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
