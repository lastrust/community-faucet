const { ethers, upgrades } = require("hardhat");
const PROXY_CONTRACT_ID = "0x26DA9C05A9f7bcEFb9e342Bb35FA8aE338F9cCed"; // 最初にデプロイした時のコントラクトID。

async function main() {
  const FaucetV2 = await ethers.getContractFactory("CommunityFaucetV2");
  const upgraded = await upgrades.upgradeProxy(PROXY_CONTRACT_ID, FaucetV2);
  await upgraded.deployed();
  await upgraded.initializeV2();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
