import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("CryptoWill tests", () => {
  let contract: any;
  let Will;
  let owner: SignerWithAddress;
  let lawyer: SignerWithAddress;
  let newLawyer: SignerWithAddress;
  let external: SignerWithAddress;
  let payee: SignerWithAddress[];
  let ERROR_MSG: string[];
  const provider = ethers.provider;
  const ethValue = ethers.utils.parseEther("10.0");
  const correspondingTokens = ethers.utils.parseEther("3.0");
  const lawyerFee = ethers.utils.parseEther("1.0");
  const twentyYearsInSec = 630720000;
  const waitDays = 864000;
  const waitTime = 74649600000;
  let currentTime;
  let unlockTime;
  const addrExt = "0x90f79bf6eb2c4f870365e785982e1f101e93b906";
  const ownerRole =
    "0x6270edb7c868f86fda4adedba75108201087268ea345934db8bad688e1feb91b";
  const lawyerRole =
    "0x26e23ce6b85ff9f368ed1b385a304e4efb5cb11dbc90b57bc31457871b754ae6";
  const payeeRole =
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
  ///Create new smart contract instance before each test method
  beforeEach("Deploy new contract instance", async () => {
    [owner, lawyer, newLawyer, external, ...payee] = await ethers.getSigners();
    Will = await ethers.getContractFactory("Will");
    contract = await Will.deploy(owner.address, lawyer.address, waitDays);
    await contract.deployed();
    console.log("Will contract deployed to: ", contract.address, " address.");
  });
  describe("Function willStatus from Will contract", () => {
    it("Calling willStatus to check WillReport event", async () => {
      currentTime = Date.now() + 1000;
      await provider.send("evm_setNextBlockTimestamp", [currentTime]);
      await contract.setWill(
        [payee[1].address, payee[2].address, payee[3].address],
        {
          value: ethValue,
        }
      );
      await expect(
        contract.willStatus()
      ).to.emit
      (contract, "WillReport").withArgs
      (
        owner.address,
        lawyer.address,
        0,
        false,
        ethValue,
        correspondingTokens,
        lawyerFee,
        twentyYearsInSec + currentTime
      );
    });
    it.only("Calling willStatus to check ApprovedPayees event", async () => {
      await contract.setWill(
        [payee[1].address, payee[2].address, payee[3].address],
        {
          value: ethValue,
        }
      );
      await expect(
        contract.willStatus()
      ).to.emit
      (contract, "ApprovedPayees").withArgs
      (
        payee[1].address
      );
      await expect(
        contract.willStatus()
      ).to.emit
      (contract, "ApprovedPayees").withArgs
      (
        payee[2].address
      );
      await expect(
        contract.willStatus()
      ).to.emit
      (contract, "ApprovedPayees").withArgs
      (
        payee[3].address
      );
      console.log("New Approved Payee added: ", payee[1].address);
      console.log("New Approved Payee added: ", payee[2].address);
      console.log("New Approved Payee added: ", payee[3].address);
    });
    
});
  describe("Function setWill Tests from Will Contract", () => {
    it("Payee adresses should be different from the lawyer address", async () => {
      ///Trying to add same address as lawyer (declared in the deployed contract) in the set will function
      ///Should be reverted with require Msg
      await expect(
        contract.setWill([
          payee[1].address,
          payee[2].address,
          payee[3].address,
          lawyer.address,
        ])
      ).to.be.revertedWith(ERROR_MSG[1]);
    });
    it("Should update allocations with lawyerfee and the corresponding tokens", async () => {
      ///Set the actual time to next block timestamp to get the expiracy date
      currentTime = Date.now() + 1000;
      await provider.send("evm_setNextBlockTimestamp", [currentTime]);
      await expect(
        contract.setWill(
          [payee[1].address, payee[2].address, payee[3].address],
          {
            value: ethValue,
          }
        )
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
          twentyYearsInSec + currentTime
        );
      ///Logging results for visual check
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
        new Date(twentyYearsInSec * 1000 + currentTime)
      );
    });
    it("Shouldnt be able to setWill With an address thats not the owner", async () => {
      ///Test the onlyRole modifier with an external address
      ///Should only work with the owner address
      await expect(
        contract.connect(external).setWill([payee[1].address, payee[2].address])
      ).to.be.revertedWith(ERROR_MSG[2]);
      console.log(
        "Owner address:",
        owner.address,
        "Msg.sender address:",
        external.address
      );
    });
    it("Shouldnt be able to load more than 100 payees", async () => {
      ///Add 99 payees to the will
      for (let i = 0; i < 33; i++) {
        await contract.setWill([
          payee[1].address,
          payee[2].address,
          payee[3].address,
        ]);
      }
      ///Try to add one more payee with limit
      await expect(
        contract.setWill([payee[1].address, payee[2].address, payee[3].address])
      ).to.be.revertedWith(ERROR_MSG[0]);
      console.log();
    });

    describe("Function executeWill from Will Contract", () => {
      it("Only the lawyer account should call this function", async () => {
        await expect(
          contract.connect(external).executeWill()
        ).to.be.revertedWith(ERROR_MSG[3]);
        console.log(
          "Lawyer address:",
          lawyer.address,
          "Msg.sender address:",
          external.address
        );
      });
      it("Shouldnt be able to executeWill if it hasnt been set up", async () => {
        await expect(contract.connect(lawyer).executeWill()).to.be.revertedWith(
          ERROR_MSG[4]
        );
      });
      it("Should be able to executeWill from lawyer if its set up with payees and balance", async () => {
        await contract.setWill(
          [payee[1].address, payee[2].address, payee[3].address],
          {
            value: ethValue,
          }
        );
        currentTime = Date.now() + 1000;
        await provider.send("evm_setNextBlockTimestamp", [currentTime]);
        await expect(contract.connect(lawyer).executeWill())
          .to.emit(contract, "WillExecuted")
          .withArgs(
            true,
            waitTime,
            lawyer.address,
            waitTime + currentTime,
            ethValue,
            3
          );
        console.log(
          "Will is executed: ",
          true,
          "\n",
          "Lawyer address: ",
          lawyer.address,
          "\n",
          "Total balance: ",
          ethers.utils.formatEther(ethValue),
          "ETH",
          "\n",
          "Unlock date: ",
          new Date(waitTime + currentTime)
        );
      });
      it("Shouldnt be able to executeWill if it was already executed", async () => {
        contract.setWill(
          [payee[1].address, payee[2].address, payee[3].address],
          {
            value: ethValue,
          }
        );
        await contract.connect(lawyer).executeWill();
        await expect(contract.connect(lawyer).executeWill()).to.be.revertedWith(
          ERROR_MSG[5]
        );
      });
    });
    describe("Function withdrawShares from Will Contract", () => {
      it("Only the payees account should call this function", async () => {
        await contract.setWill(
          [payee[1].address, payee[2].address, payee[3].address],
          {
            value: ethValue,
          }
        );
        await expect(
          contract.connect(external).withdrawShares()
        ).to.be.revertedWith(ERROR_MSG[6]);
        console.log(
          "Payee addresses: ",
          payee[1].address,
          "\n",
          "Msg.sender address (Owner): ",
          lawyer.address
        );
      });
      it("Shouldnt be able to withdrawShares if it hasnt been executed", async () => {
        await contract.setWill(
          [payee[1].address, payee[2].address, payee[3].address],
          {
            value: ethValue,
          }
        );
        await expect(
          contract.connect(payee[1]).withdrawShares()
        ).to.be.revertedWith(ERROR_MSG[7]);
      });
      it("Shouldnt be able to withdrawShares if the unlock time hasnt reached", async () => {
        await contract.setWill(
          [payee[1].address, payee[2].address, payee[3].address],
          {
            value: ethValue,
          }
        );
        await contract.connect(lawyer).executeWill();
        await expect(
          contract.connect(payee[1]).withdrawShares()
        ).to.be.revertedWith(ERROR_MSG[8]);
      });
      it("Executing withdraShares after unlockTime and executeWill", async () => {
        await contract.setWill(
          [payee[1].address, payee[2].address, payee[3].address],
          {
            value: ethValue,
          }
        );
        await contract.connect(lawyer).executeWill();
        currentTime = Date.now() + 1000;
        unlockTime = currentTime + waitTime;
        await provider.send("evm_setNextBlockTimestamp", [unlockTime]);
        await expect(contract.connect(payee[1]).withdrawShares())
          .to.emit(contract, "SharesWithdrawn")
          .withArgs(ethValue, lawyerFee, correspondingTokens, payee[1].address);
      });
    });
    describe("Function withdrawShares from Will Contratc", () => {
      it("Calling reclaimOwnerBalance before expire date", async () => {
        await contract.setWill(
          [payee[1].address, payee[2].address, payee[3].address],
          {
            value: ethValue,
          }
        );
        await contract.connect(lawyer).executeWill();
        await expect(
          contract.connect(owner).reclaimOwnerBalance()
        ).to.be.revertedWith(ERROR_MSG[9]);
      });
      it("Calling resetWill and changing lawyer", async () => {
        await expect(contract.resetWill(newLawyer.address))
          .to.emit(contract, "ChangedLawyer")
          .withArgs(lawyer.address, newLawyer.address);
        console.log(
          "Old lawyer: ",
          lawyer.address,
          "\n",
          "New lawyer: ",
          newLawyer.address
        );
      });
      it("Calling reclaimOwnerBalance after expire date with new lawyer", async () => {
        await contract.setWill(
          [payee[1].address, payee[2].address, payee[3].address],
          {
            value: ethValue,
          }
        );
        let afterExpireTime = Date.now() + twentyYearsInSec;
        await provider.send("evm_increaseTime", [afterExpireTime]);
        let ownerBalanceBefore = await provider.getBalance(owner.address);
        console.log(
          "Balance before: ",
          ethers.utils.formatEther(await provider.getBalance(owner.address))
        );
        let txReclaim = await contract.reclaimOwnerBalance();
        await txReclaim.wait();
        let ownerBalanceAfter = await provider.getBalance(owner.address);
        console.log(
          "Balance after: ",
          ethers.utils.formatEther(await provider.getBalance(owner.address))
        );
        expect(ownerBalanceBefore).to.be.closeTo(ownerBalanceAfter, ethValue);
      });
    });
  });
});
