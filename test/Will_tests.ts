import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { BigNumber } from "ethers";
import { ethers } from "hardhat";

describe("CryptoWill tests", () => {
  let contract: any;
  let Will;
  let owner: SignerWithAddress;
  let executor: SignerWithAddress;
  let newExecutor: SignerWithAddress;
  let external: SignerWithAddress;
  let payee: SignerWithAddress[];
  let Tokens: string[];
  let balanceOwner;
  const provider = ethers.provider;
  const ethValue = ethers.utils.parseEther("10.0");
  const correspondingTokens = ethers.utils.parseEther("3.0");
  const executorFee = ethers.utils.parseEther("1.0");
  const ethMin = ethers.utils.parseEther("0.2");
  const waitDays = 864000;
  const waitTime = 74649600000;
  const addrExt = "0x90f79bf6eb2c4f870365e785982e1f101e93b906";
  const ownerRole =
    "0x6270edb7c868f86fda4adedba75108201087268ea345934db8bad688e1feb91b";
  const executorRole =
    "0x9cf85f95575c3af1e116e3d37fd41e7f36a8a373623f51ffaaa87fdd032fa767";
  const payeeRole =
    "0xdd3cf490277a2ed9b8e9d23db09c21bd229077712bc2c8266158d0d92288625a";
  let currentTime;
  let unlockTime;

  ///Create new smart contract instance before each test method
  beforeEach("Deploy new contract instance", async () => {
    [owner, executor, newExecutor, external, ...payee] =
      await ethers.getSigners();
    Will = await ethers.getContractFactory("Will");
    contract = await Will.deploy(owner.address, executor.address, waitDays);
    await contract.deployed();
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
      await expect(contract.willStatus())
        .to.emit(contract, "WillReport")
        .withArgs(owner.address, executor.address, 0, false, ethValue, 0, 0);
    });
  });

  describe("Function setWill Tests from Will Contract", () => {
    it("Payee adresses should be different from the executor address", async () => {
      ///Trying to add same address as executor (declared in the deployed contract) in the set will function
      ///Should be reverted with require Msg
      await expect(
        contract.setWill(
          [
            payee[1].address,
            payee[2].address,
            payee[3].address,
            executor.address,
          ],
          { value: ethMin }
        )
      ).to.be.revertedWith("The executor cant be a payee");
    });
    it("Should revert if at least 0.2 eth is sent to the contract", async () => {
      await expect(
        contract.setWill([
          payee[1].address,
          payee[2].address,
          payee[3].address,
          executor.address,
        ])
      ).to.be.revertedWith("Minumun balance must be 0.2 ETH");
    });
    it("Should emit willReport with 0 allocations and 0 lawyer fee till execution", async () => {
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
        .withArgs(owner.address, executor.address, 0, false, ethValue, 0, 0);
    });
    it("Shouldnt be able to setWill With an address thats not the owner", async () => {
      ///Test the onlyRole modifier with an external address
      ///Should only work with the owner address
      await expect(
        contract.connect(external).setWill([payee[1].address, payee[2].address])
      ).to.be.revertedWith(
        `AccessControl: account ${addrExt} is missing role ${ownerRole}`
      );
    });
    it("Shouldnt be able to load more than 50 payees", async () => {
      ///Add 50 payees to the will.
      let _ethValue = ethMin;
      for (let i = 0; i < 10; i++) {
        await contract.setWill(
          [
            payee[1].address,
            payee[2].address,
            payee[3].address,
            payee[4].address,
            payee[5].address,
          ],
          { value: _ethValue }
        );
        _ethValue = ethers.BigNumber.from(0);
      }
      ///Try to add one more payee with limit
      await expect(
        contract.setWill([payee[1].address, payee[2].address, payee[3].address])
      ).to.be.revertedWith("Max payees are 50");
    });
  });

  describe("Function setWillToken", () => {
    it("Should revert when calling from other than owner", async () => {
      await expect(contract.connect(external).revokeWill()).to.be.revertedWith(
        `AccessControl: account ${addrExt} is missing role ${ownerRole}`
      );
    });
    it("Should destroy contract when calling from owner", async () => {
      balanceOwner = await owner.getBalance();
      let tx1 = await contract
        .connect(owner)
        .setWill([payee[1].address, payee[2].address, payee[3].address], {
          value: ethValue,
        });
      const receipt1 = await tx1.wait();
      const tx2 = await contract.connect(owner).revokeWill();
      const receipt2 = await tx2.wait();
      const balanceAfterGas = balanceOwner.sub(
        (receipt1.gasUsed.add(receipt2.gasUsed))
      );
      expect(await owner.getBalance()).to.be.equal(balanceAfterGas);
    });
  });
  
  describe("Function executeWill from Will Contract", () => {
    it("Only the executor account should call this function", async () => {
      await expect(contract.connect(external).executeWill()).to.be.revertedWith(
        `AccessControl: account ${addrExt} is missing role ${executorRole}`
      );
    });
    it("Shouldnt be able to executeWill if it hasnt been set up", async () => {
      await expect(contract.connect(executor).executeWill()).to.be.revertedWith(
        "This will has not been set up"
      );
    });
    it("Should be able to executeWill from executor if its set up with payees and balance", async () => {
      await contract.setWill(
        [payee[1].address, payee[2].address, payee[3].address],
        {
          value: ethValue,
        }
      );
      currentTime = Date.now() + 1000;
      await provider.send("evm_setNextBlockTimestamp", [currentTime]);
      await expect(contract.connect(executor).executeWill())
        .to.emit(contract, "WillExecuted")
        .withArgs(
          true,
          waitTime,
          executor.address,
          waitTime + currentTime,
          ethValue,
          3
        );
    });
    it("Shouldnt be able to executeWill if it was already executed", async () => {
      contract.setWill([payee[1].address, payee[2].address, payee[3].address], {
        value: ethValue,
      });
      await contract.connect(executor).executeWill();
      await expect(contract.connect(executor).executeWill()).to.be.revertedWith(
        "Will has already been executed"
      );
    });
  });

  describe("Function resetWill should emit WillReseted", () => {
    it("Calling resetWill and changing executor", async () => {
      currentTime = Date.now() + 3600 * 24 * 2;
      await provider.send("evm_setNextBlockTimestamp", [currentTime]);
      await expect(contract.connect(owner).resetWill())
        .to.emit(contract, "WillReseted");
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
      ).to.be.revertedWith(
        `AccessControl: account ${addrExt} is missing role ${payeeRole}`
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
      ).to.be.revertedWith("Will has not been executed yet");
    });
    it("Shouldnt be able to withdrawShares if the unlock time hasnt reached", async () => {
      await contract.setWill(
        [payee[1].address, payee[2].address, payee[3].address],
        {
          value: ethValue,
        }
      );
      await contract.connect(executor).executeWill();
      await expect(
        contract.connect(payee[1]).withdrawShares()
      ).to.be.revertedWith("Will hasnt been unlocked yet");
    });
    it("Executing withdraShares after unlockTime and executeWill", async () => {
      await contract
        .connect(owner)
        .setWill([payee[1].address, payee[2].address, payee[3].address], {
          value: ethValue,
        });
      await contract.connect(executor).executeWill();
      currentTime = Date.now() + 1000;
      unlockTime = currentTime + waitTime + waitTime;
      await provider.send("evm_setNextBlockTimestamp", [unlockTime]);
      await expect(contract.connect(payee[1]).withdrawShares())
        .to.emit(contract, "SharesWithdrawn")
        .withArgs(correspondingTokens, payee[1].address);
    });
  });

  describe("Function replaceExecutor", () => {
    it("Calling with same executor should revert", async () => {
      await expect(
        contract.connect(owner).replaceExecutor(executor.address)
      ).to.be.revertedWith("Cant be same executor");
    });
    it("Should change executor when calling correctly", async () => {
      await expect(contract.connect(owner).replaceExecutor(newExecutor.address))
        .to.emit(contract, "ChangedExecutor")
        .withArgs(executor.address, newExecutor.address);
    });
  });

  describe("Function revokeWill", () => {
    it("Should revert when calling from other than owner", async () => {
      await expect(contract.connect(external).revokeWill()).to.be.revertedWith(
        `AccessControl: account ${addrExt} is missing role ${ownerRole}`
      );
    });
    it("Should destroy contract when calling from owner", async () => {
      balanceOwner = await owner.getBalance();
      let tx1 = await contract
        .connect(owner)
        .setWill([payee[1].address, payee[2].address, payee[3].address], {
          value: ethValue,
        });
      const receipt1 = await tx1.wait();
      const tx2 = await contract.connect(owner).revokeWill();
      const receipt2 = await tx2.wait();
      const balanceAfterGas = balanceOwner.sub(
        (receipt1.gasUsed.add(receipt2.gasUsed))
      );
      expect(await owner.getBalance()).to.be.equal(balanceAfterGas);
    });
  });
});
