import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";
let account: SignerWithAddress[]; ///From account[5] ahead are payees accounts
let contract: any;
let Will;
let ERROR_MSG: string[];
const provider = ethers.provider;

const ethValue = ethers.utils.parseEther("1.0");
const correspondingTokens = ethers.utils.parseEther("0.3");
const lawyerFee = ethers.utils.parseEther("0.1");

const twentyYearsInSec = 630720000;
const waitDays = 864000;
const waitTime = 74649600000;
let currentTime;
let currentTimeInSec;
let unlockTime;

let addrExt = "0x90f79bf6eb2c4f870365e785982e1f101e93b906"; ///External address without Roles in contract (account[3])
let ownerRole =
  "0x6270edb7c868f86fda4adedba75108201087268ea345934db8bad688e1feb91b";
let lawyerRole =
  "0x26e23ce6b85ff9f368ed1b385a304e4efb5cb11dbc90b57bc31457871b754ae6";
let payeeRole =
  "0xdd3cf490277a2ed9b8e9d23db09c21bd229077712bc2c8266158d0d92288625a";
ERROR_MSG = [
  "Max payees its 100",
  "The lawyer cant be also a payee",
  `AccessControl: account ${addrExt} is missing role ${ownerRole}`,
  `AccessControl: account ${addrExt} is missing role ${lawyerRole}`,
  "This will has not been set up",
  "Already has been executed",
  `AccessControl: account ${addrExt} is missing role ${payeeRole}`,
  "Will hasnt been executed yet",
  "Will hasnt been unlocked yet",
  "Expiracy date hasnt passed yet",
];
describe("Function setWill Tests from Will Contract", function () {
  before(async function () {
    account = await ethers.getSigners();
    Will = await ethers.getContractFactory("Will");
    contract = await Will.deploy(
      account[0].address,
      account[1].address,
      waitDays
    );
    await contract.deployed();
  });
  it("Payee adresses should be different from the lawyer address", async function () {
    await expect(
      contract.setWill([
        account[5].address,
        account[6].address,
        account[7].address,
        account[1].address, ///Lawyer Address
      ])
    ).to.be.revertedWith(ERROR_MSG[1]);
  });
  it("Should update allocations with lawyerfee and the corresponding tokens", async function () {
    currentTimeInSec = Math.ceil((Date.now() + 1000) / 1000);
    await provider.send("evm_setNextBlockTimestamp", [currentTimeInSec]);
    await expect(
      contract.setWill(
        [account[5].address, account[6].address, account[7].address],
        {
          value: ethValue,
        }
      )
    )
      .to.emit(contract, "WillReport")
      .withArgs(
        account[0].address,
        account[1].address,
        0,
        false,
        ethValue,
        correspondingTokens,
        lawyerFee,
        twentyYearsInSec + currentTimeInSec
      );
    console.log(
      "Owner address: ",
      account[0].address,
      "\n",
      "Lawyer address: ",
      account[1].address,
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
      new Date((twentyYearsInSec + currentTimeInSec) * 1000)
    );
  });
  it("Shouldnt be able to setWill With an address thats not the owner", async function () {
    await expect(
      contract
        .connect(account[3])
        .setWill([account[5].address, account[6].address])
    ).to.be.revertedWith(ERROR_MSG[2]);
    console.log(
      "Owner address:",
      account[0].address,
      "Msg.sender address:",
      account[3].address
    );
  });
  it("Shouldnt be able to load more than 100 payees", async function () {
    for (let i = 0; i < 96; i++) {
      await contract.setWill([account[5].address]);
    }
    await expect(
      contract.setWill([
        account[5].address,
        account[6].address,
        account[7].address,
      ])
    ).to.be.revertedWith(ERROR_MSG[0]);
    console.log();
  });
});

describe("Function executeWill from Will Contract", function () {
  before(async function () {
    account = await ethers.getSigners();
    Will = await ethers.getContractFactory("Will");
    contract = await Will.deploy(
      account[0].address,
      account[1].address,
      waitDays
    );
    await contract.deployed();
  });
  it("Only the lawyer account(account[1]) should call this function", async function () {
    await expect(contract.connect(account[3]).executeWill()).to.be.revertedWith(
      ERROR_MSG[3]
    );
    console.log(
      "Lawyer address:",
      account[1].address,
      "Msg.sender address:",
      account[3].address
    );
  });
  it("Shouldnt be able to executeWill if it hasnt been set up", async function () {
    await expect(contract.connect(account[1]).executeWill()).to.be.revertedWith(
      ERROR_MSG[4]
    );
  });
  it("Should be able to executeWill from lawyer if its set up with payees and balance", async function () {
    await contract.setWill(
      [account[5].address, account[6].address, account[7].address],
      {
        value: ethValue,
      }
    );
    currentTime = Date.now() + 1000;
    await provider.send("evm_setNextBlockTimestamp", [currentTime]);
    await expect(contract.connect(account[1]).executeWill())
      .to.emit(contract, "WillExecuted")
      .withArgs(
        true,
        waitTime,
        account[1].address,
        waitTime + currentTime,
        ethValue,
        3
      );
    console.log(
      "Will is executed: ",
      true,
      "\n",
      "Lawyer address: ",
      account[1].address,
      "\n",
      "Total balance: ",
      ethers.utils.formatEther(ethValue),
      "ETH",
      "\n",
      "Unlock date: ",
      new Date(waitTime + currentTime)
    );
  });
  it("Shouldnt be able to executeWill if it was already executed", async function () {
    await expect(contract.connect(account[1]).executeWill()).to.be.revertedWith(
      ERROR_MSG[5]
    );
  });
});

describe("Function withdrawShares from Will Contract (after executeWill) part 1", function () {
  before(async function () {
    account = await ethers.getSigners();
    Will = await ethers.getContractFactory("Will");
    contract = await Will.deploy(
      account[0].address,
      account[1].address,
      waitDays
    );
    await contract.deployed();
    await contract.setWill(
      [account[5].address, account[6].address, account[7].address],
      {
        value: ethValue,
      }
    );
  });
  it("Only the payees account(from account[5]) should call this function", async function () {
    await expect(
      contract.connect(account[3]).withdrawShares()
    ).to.be.revertedWith(ERROR_MSG[6]);
    console.log(
      "Payee addresses: ",
      account[5].address,
      "\n",
      "Msg.sender address (Owner): ",
      account[1].address
    );
  });
  it("Shouldnt be able to withdrawShares if it hasnt been executed", async function () {
    await expect(
      contract.connect(account[5]).withdrawShares()
    ).to.be.revertedWith(ERROR_MSG[7]);
  });
  it("Shouldnt be able to withdrawShares if the unlock time hasnt reached", async function () {
    await contract.connect(account[1]).executeWill();
    await expect(
      contract.connect(account[5]).withdrawShares()
    ).to.be.revertedWith(ERROR_MSG[8]);
  });
  it("Executing withdraShares after unlockTime and executeWill", async function () {
    currentTime = Date.now() + 1000;
    unlockTime = currentTime + waitTime;
    await provider.send("evm_setNextBlockTimestamp", [unlockTime]);
    await expect(contract.connect(account[5]).withdrawShares())
      .to.emit(contract, "SharesWithdrawn")
      .withArgs(ethValue, lawyerFee, correspondingTokens, account[5].address);
  });
});

describe("Function withdrawShares from Will Contract (after executeWill) Part 2 (1st part selfdestructed after withdrawShares)", function () {
  before(async function () {
    account = await ethers.getSigners();
    Will = await ethers.getContractFactory("Will");
    contract = await Will.deploy(
      account[0].address,
      account[1].address,
      waitDays
    );
    await contract.deployed();
    await contract.setWill(
      [account[5].address, account[6].address, account[7].address],
      {
        value: ethValue,
      }
    );
    await contract.connect(account[1]).executeWill();
  });
  it("Calling reclaimOwnerBalance before expire date", async function () {
    await expect(
      contract.connect(account[0]).reclaimOwnerBalance()
    ).to.be.revertedWith(ERROR_MSG[9]);
  });
  it("Calling resetWill and changing lawyer", async function () {
    await expect(contract.resetWill(account[4].address))
      .to.emit(contract, "ChangedLawyer")
      .withArgs(account[1].address, account[4].address);
    console.log(
      "Old lawyer: ",
      account[1].address,
      "\n",
      "New lawyer: ",
      account[4].address
    );
  });
  it("Calling reclaimOwnerBalance after expire date with new lawyer", async function () {
    let afterExpireTime = Date.now() + twentyYearsInSec;
    await provider.send("evm_increaseTime", [afterExpireTime]);
    let ownerBalanceBefore = ethers.utils.formatEther(
      await provider.getBalance(account[0].address)
    );
    console.log(
      "Balance before: ",
      ethers.utils.formatEther(await provider.getBalance(account[0].address))
    );
    let txReclaim = await contract.reclaimOwnerBalance();
    await txReclaim.wait();
    let ownerBalanceAfter = ethers.utils.formatEther(
      await provider.getBalance(account[0].address)
    );
    console.log(
      "Balance after: ",
      ethers.utils.formatEther(await provider.getBalance(account[0].address))
    );
    expect(ownerBalanceBefore).to.not.equal(ownerBalanceAfter);
  });
});
