import { ethers, upgrades } from "hardhat";
import { CommunityFaucetV2, StudentFaucet } from "typechain";

const getContract = async () => {
  const StudentFaucet = await ethers.getContractFactory("StudentFaucet");
  const instance = await upgrades.deployProxy(StudentFaucet, [
    "AStarStudentFaucet",
    "ASF",
    "Hello",
    ethers.utils.parseEther("0.1"),
    60 * 60 * 24 * 7,
  ]);
  return instance as StudentFaucet;
};
const upgradeContract = async (instance: StudentFaucet) => {
  const V2 = await ethers.getContractFactory("CommunityFaucetV2");
  const upgraded = (await upgrades.upgradeProxy(
    instance,
    V2
  )) as CommunityFaucetV2;
  await upgraded.initializeV2();
  return upgraded;
};
const getAddress = () => ethers.getSigners();

describe("test of StudentFaucet", () => {
  // it("support test", async () => {
  //   const instance = await getContract();
  //   const provider = waffle.provider;
  //   const [, addr, addr2] = await getAddress();
  //   await instance.support("Kimura", "Tanaka.png", {
  //     value: ethers.utils.parseEther("2.3"),
  //   });
  //   await instance.support("Kimura2", "Tanaka2.png", { value: 3000 });
  //   await instance
  //     .connect(addr)
  //     .support("Syoko", "Imamura.png", { value: 5000 });
  //   await instance.drop(await addr2.getAddress());

  //   console.log(await instance.numberOfSupporter());
  //   console.log(await provider.getBalance(await addr2.getAddress()));
  //   console.log(await instance.totalDrop());
  //   // await instance.drop(await addr2.getAddress());
  // });

  it("V2 Test", async () => {
    const instance = await getContract();
    const [, addr, addr2] = await getAddress();
    await instance.support("Kimura", "Tanaka.png", {
      value: ethers.utils.parseEther("10"),
    });

    const upgraded = await upgradeContract(instance);
    await upgraded.addDropper(addr.address);
    console.log(await upgraded.totalDrop());
    await upgraded.connect(addr).dropV2(addr2.address);
    await instance.drop(addr.address);
    console.log(await upgraded.totalDropV2());
  });
});
