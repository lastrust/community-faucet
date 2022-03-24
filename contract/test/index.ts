import { expect } from "chai";
import { ethers, upgrades, waffle } from "hardhat";
import { StudentFaucet } from "typechain";

const getContract = async () => {
  const StudentFaucet = await ethers.getContractFactory("StudentFaucet");
  const instance = await upgrades.deployProxy(StudentFaucet, [
    "AStarStudentFaucet",
    "ASF",
    "Hello",
    ethers.utils.parseEther("0.1"),
  ]);
  return instance as StudentFaucet;
};
const getAddress = () => ethers.getSigners();

describe("test of StudentFaucet", () => {
  it("support test", async () => {
    const instance = await getContract();
    const provider = waffle.provider;
    const [owner] = await getAddress();
    instance.support("Kimura", "Tanaka.png", { value: 1000 });
    expect((await provider.getBalance(instance.address)).toNumber()).to.equal(
      1000
    );
    console.log(await instance.tokenURI(0));
  });
});
