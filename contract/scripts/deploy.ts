import { ethers, upgrades } from "hardhat";

async function main() {
  const StudentFaucet = await ethers.getContractFactory("StudentFaucet");
  const instance = await upgrades.deployProxy(StudentFaucet, [
    "AStarStudentFaucet",
    "ASF",
    "Hello",
    ethers.utils.parseEther("0.02"),
  ]);

  await instance.deployed();

  console.log("StudentFaucet deployed to:", instance.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
