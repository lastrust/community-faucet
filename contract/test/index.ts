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
    const [owner, addr, addr2] = await getAddress();
    await instance.support("Kimura", "Tanaka.png", {
      value: ethers.utils.parseEther("2.3"),
    });
    await instance.support("Kimura2", "Tanaka2.png", { value: 3000 });
    await instance
      .connect(addr)
      .support("Syoko", "Imamura.png", { value: 5000 });
    await instance.drop(await addr2.getAddress());

    console.log(
      await instance.queryFilter(
        instance.filters.Support(ethers.BigNumber.from("1"))
      )
    );
    console.log(await instance.numberOfSupporter());
    console.log(await provider.getBalance(await addr2.getAddress()));
    console.log(await instance.totalDrop());
  });
});
