import { expect } from "chai";
import { ethers } from "hardhat";

describe("Will Factory Tests", async function () {
  const zero_address = "0x0000000000000000000000000000000000000000";
  const ERROR_MSG0 = "You already have a will contract";
  const ERROR_MSG1 = "You do not have a deployed Will";
  const ERROR_MSG2 = "The minimum time is 1 day";
  const ERROR_MSG3 = "The maximun time is 365 days";

  const [owner, lawyer, addr2, addr3] = await ethers.getSigners();
  let contract: any;

  before(async function () {
    const WillFactory = await ethers.getContractFactory("WillFactory");
    contract = await WillFactory.deploy();
    await contract.deployed();
  });
  beforeEach(async function () {});
  it("Should read from the willOwners mapping", async function () {
    const createWill = await contract.createWillContract(lawyer.address, 60);
    await createWill.wait(); /// wait until the transaction is mined
    expect(await contract.checkWills(owner.address)).to.not.equal(zero_address);
  });
  it("Should revert if you already have a will contract created", async function () {
    await expect(
      contract.createWillContract(lawyer.address, 60)
    ).to.be.revertedWith(ERROR_MSG0);
    console.log(ERROR_MSG0);
  });
  it("Should read an empty address without contract", async function () {
    await expect(contract.checkWills(lawyer.address)).to.be.revertedWith(
      ERROR_MSG1
    );
    console.log(ERROR_MSG1);
  });
  it("Should revert with wrong time set up < 1", async function () {
    await expect(
      contract.connect(addr2).createWillContract(lawyer.address, 0)
    ).to.be.revertedWith(ERROR_MSG2);
    console.log(ERROR_MSG2);
  });
  it("Should revert with wrong time set up > 365", async function () {
    await expect(
      contract.connect(addr3).createWillContract(lawyer.address, 32000000)
    ).to.be.revertedWith(ERROR_MSG3);
    console.log(ERROR_MSG3);
  });
});
