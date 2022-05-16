import { getContractAddress } from "@ethersproject/address";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Will Factory Tests", function () {
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
  it("Should read an empty address without contract", async function () {
    await expect(contract.checkWills(lawyer.address)).to.be.revertedWith(
      "You do not have a deployed Will"
    );
  });
  it("Should revert with wrong time set up < 1", async function () {
    await expect(
      contract.connect(owner2).createWillContract(lawyer.address, 0)
    ).to.be.revertedWith("The minimum time is 1 day");
  });
  it("Should revert with wrong time set up > 365", async function () {
    await expect(
      contract.connect(owner3).createWillContract(lawyer.address, 32000000)
    ).to.be.revertedWith("The maximun time is 365 days");
  });
  it("Calling CheckWills should return the contract new address", async function () {
    createWill = await contract
      .connect(owner)
      .createWillContract(lawyer.address, 60);
    const willAddress = getContractAddress({
      from: contract.address,
      nonce: 1,
    });
    expect(await contract.checkWills(owner.address))
      .to.be.equal(willAddress);
  });
  it("Should revert if you already have a will contract created", async function () {
    await expect(
      contract.connect(owner).createWillContract(lawyer.address, 60)
    ).to.be.revertedWith("You already have a will contract");
  });
});
