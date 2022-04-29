import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Will Factory Tests", function () {
  const zero_address = "0x0000000000000000000000000000000000000000";
  let ERROR_MSG: string[];
  ERROR_MSG = [
    "You already have a will contract",
    "You do not have a deployed Will",
    "The minimum time is 1 day",
    "The maximun time is 365 days",
  ];
  let owner: SignerWithAddress;
  let lawyer: SignerWithAddress;
  let owner2: SignerWithAddress;
  let owner3: SignerWithAddress;
  let owner4: SignerWithAddress;
  let external: SignerWithAddress;
  let payee: SignerWithAddress[];
  let contract: any;
  let WillFactory;
  let createWill: any;

  before(async function () {
    [owner, lawyer, owner2, owner3, owner4, external, ...payee] =
      await ethers.getSigners();
    WillFactory = await ethers.getContractFactory("WillFactory");
    contract = await WillFactory.deploy();
    await contract.deployed();
  });
  beforeEach(async function () {});
  it("Should read from the willOwners mapping", async function () {
    createWill = await contract.createWillContract(lawyer.address, 60);
    await createWill.wait(); /// wait until the transaction is mined
    expect(await contract.checkWills(owner.address)).to.not.equal(zero_address);
  });
  it("Should revert if you already have a will contract created", async function () {
    await expect(
      contract.createWillContract(lawyer.address, 60)
    ).to.be.revertedWith(ERROR_MSG[0]);
    console.log(ERROR_MSG[0]);
  });
  it("Should read an empty address without contract", async function () {
    await expect(contract.checkWills(lawyer.address)).to.be.revertedWith(
      ERROR_MSG[1]
    );
    console.log(ERROR_MSG[1]);
  });
  it("Should revert with wrong time set up < 1", async function () {
    await expect(
      contract.connect(owner2).createWillContract(lawyer.address, 0)
    ).to.be.revertedWith(ERROR_MSG[2]);
    console.log(ERROR_MSG[2]);
  });
  it("Should revert with wrong time set up > 365", async function () {
    await expect(
      contract.connect(owner3).createWillContract(lawyer.address, 32000000)
    ).to.be.revertedWith(ERROR_MSG[3]);
    console.log(ERROR_MSG[3]);
  });
  it("Calling CheckWills should emit WillCreated event with the contract new address", async function () {
    createWill = await contract.connect(owner4).createWillContract(lawyer.address, 60);
    await createWill.wait(); /// wait until the transaction is mined
    console.log("Will created", createWill.address)
    await expect(contract.checkWills(owner4.address))
      .to.emit(contract, "WillCreated")
  });
});