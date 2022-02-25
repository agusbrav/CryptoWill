import { expect } from "chai";
import { ethers } from "hardhat";

describe("setWill Tests from Will", async function () {
  const [owner, lawyer, addr1, payee1, payee2, payee3] =
    await ethers.getSigners();
  const ERROR_MSG0 = "Max payees its 100";
  const ERROR_MSG1 = "The lawyer cant be also a payee";
  let addr1B = "0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc";
  let lawyerRole =
    "0x6270edb7c868f86fda4adedba75108201087268ea345934db8bad688e1feb91b";
  const ERROR_MSG2 = `AccessControl: account ${addr1B} is missing role ${lawyerRole}`;
  let contract: any;
  const ethValue = ethers.utils.parseEther("1.0");
  before(async function () {
    const Will = await ethers.getContractFactory("Will");
    contract = await Will.deploy(owner.address, lawyer.address, 864000);
    await contract.deployed();
  });
  it("Payee adresses should be different from the lawyer address", async function () {
    await expect(
      contract.setWill([
        payee1.address,
        payee2.address,
        payee3.address,
        lawyer.address,
      ])
    ).to.be.revertedWith(ERROR_MSG1);
  });
  it("Should update allocations with lawyerfee and the corresponding tokens", async function () {
    let correspondingTokens = ethers.utils.parseEther("0.3");
    let lawyerFee = ethers.utils.parseEther("0.1");
    const twentyYears = 630720000;
    await expect(
      contract.setWill([payee1.address, payee2.address, payee3.address], {
        value: ethValue,
      })
    )
      .to.emit(contract, "WillReport")
      .withArgs(
        owner.address,
        lawyer.address,
        0,
        false,
        ethValue,
        correspondingTokens,
        lawyerFee,
        twentyYears
      );
    console.log(
      "Owner address: ",
      owner.address,
      "\n",
      "Lawyer address: ",
      lawyer.address,
      "\n",
      "Total balance: ",
      ethers.utils.formatEther(ethValue),
      "ETH",
      "\n",
      "Corresponding per payee: ",
      ethers.utils.formatEther(correspondingTokens),
      "ETH",
      "\n",
      "Lawyer fee: ",
      ethers.utils.formatEther(lawyerFee),
      "ETH",
      "\n",
      "Expiracy date: ",
      new Date()
    );
  });
  it("Shouldnt be able to setWill With an address thats not the owner", async function () {
    await expect(
      contract.connect(addr1).setWill([payee1.address, payee2.address])
    ).to.be.revertedWith(ERROR_MSG2);
    console.log(
      "Owner address:",
      owner.address,
      "Msg.sender address:",
      addr1.address
    );
  });
  it("Shouldnt be able to load more than 100 payees", async function () {
    for (let i = 0; i < 96; i++) {
      await contract.setWill([payee1.address]);
    }
    await expect(
      contract.setWill([payee1.address, payee2.address, payee3.address])
    ).to.be.revertedWith(ERROR_MSG0);
    console.log();
  });
});
describe("executeWill from Will", async function () {
  const [owner, lawyer, addr1, payee1, payee2, payee3] =
    await ethers.getSigners();
  const ERROR_MSG0 = "Max payees its 100";
  const ERROR_MSG1 = "The lawyer cant be also a payee";
  let addr1B = "0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc";
  let lawyerRole =
    "0x6270edb7c868f86fda4adedba75108201087268ea345934db8bad688e1feb91b";
  const ERROR_MSG2 = `AccessControl: account ${addr1B} is missing role ${lawyerRole}`;
  let contract: any;
  const ethValue = ethers.utils.parseEther("1.0");
  before(async function () {
    const Will = await ethers.getContractFactory("Will");
    contract = await Will.deploy(owner.address, lawyer.address, 864000);
    await contract.deployed();
  });
  it("Payee adresses should be different from the lawyer address", async function () {
    await expect(
      contract.setWill([
        payee1.address,
        payee2.address,
        payee3.address,
        lawyer.address,
      ])
    ).to.be.revertedWith(ERROR_MSG1);
  });
  it("Should update allocations with lawyerfee and the corresponding tokens", async function () {
    let correspondingTokens = ethers.utils.parseEther("0.3");
    let lawyerFee = ethers.utils.parseEther("0.1");
    const twentyYears = 630720000;
    await expect(
      contract.setWill([payee1.address, payee2.address, payee3.address], {
        value: ethValue,
      })
    )
      .to.emit(contract, "WillReport")
      .withArgs(
        owner.address,
        lawyer.address,
        0,
        false,
        ethValue,
        correspondingTokens,
        lawyerFee,
        twentyYears
      );
    console.log(
      "Owner address: ",
      owner.address,
      "\n",
      "Lawyer address: ",
      lawyer.address,
      "\n",
      "Total balance: ",
      ethers.utils.formatEther(ethValue),
      "ETH",
      "\n",
      "Corresponding per payee: ",
      ethers.utils.formatEther(correspondingTokens),
      "ETH",
      "\n",
      "Lawyer fee: ",
      ethers.utils.formatEther(lawyerFee),
      "ETH",
      "\n",
      "Expiracy date: ",
      new Date()
    );
  });
  it("Shouldnt be able to setWill With an address thats not the owner", async function () {
    await expect(
      contract.connect(addr1).setWill([payee1.address, payee2.address])
    ).to.be.revertedWith(ERROR_MSG2);
    console.log(
      "Owner address:",
      owner.address,
      "Msg.sender address:",
      addr1.address
    );
  });
  it("Shouldnt be able to load more than 100 payees", async function () {
    for (let i = 0; i < 96; i++) {
      await contract.setWill([payee1.address]);
    }
    await expect(
      contract.setWill([payee1.address, payee2.address, payee3.address])
    ).to.be.revertedWith(ERROR_MSG0);
    console.log();
  });
});
