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
    const [owner, addr] = await getAddress();
    await instance.support("Kimura", "Tanaka.png", { value: 1000 });
    await instance.support("Kimura2", "Tanaka2.png", { value: 3000 });
    await instance
      .connect(addr)
      .support("Syoko", "Imamura.png", { value: 5000 });

    console.log(
      await instance.queryFilter(
        instance.filters.Support(ethers.BigNumber.from("1"))
      )
    );
  });
});
