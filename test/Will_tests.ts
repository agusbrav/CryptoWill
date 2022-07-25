import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";
import {
  ERC20PresetFixedSupply,
  ERC721PresetMinterPauserAutoId,
  Will,
} from "../typechain-types/";
import {
  erc20MintToAddress,
  nftMintToAddress,
  randomSigners,
  timeTravel,
} from "./utils.test";

describe("CryptoWill tests", () => {
  let contract: Will;
  let Will;
  let owner: SignerWithAddress;
  let executor: SignerWithAddress;
  let newExecutor: SignerWithAddress;
  let external: SignerWithAddress;
  let payee: SignerWithAddress[];
  let token1: ERC20PresetFixedSupply, token2: ERC20PresetFixedSupply;
  let NFT1: ERC721PresetMinterPauserAutoId,
    NFT2: ERC721PresetMinterPauserAutoId;
  const MAX_INT =
    "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";
  const provider = ethers.provider;
  const ethValue = ethers.utils.parseEther("10.0");
  const ethMin = ethers.utils.parseEther("0.2");
  const executorFee = ethers.utils.parseEther("1");
  const waitDays = 20;
  const waitTime = 20000000;
  const addrExt = "0x90f79bf6eb2c4f870365e785982e1f101e93b906";
  const ownerRole =
    "0x6270edb7c868f86fda4adedba75108201087268ea345934db8bad688e1feb91b";
  const executorRole =
    "0x9cf85f95575c3af1e116e3d37fd41e7f36a8a373623f51ffaaa87fdd032fa767";
  const payeeRole =
    "0xdd3cf490277a2ed9b8e9d23db09c21bd229077712bc2c8266158d0d92288625a";

  ///Create new smart contract instance before each test method
  beforeEach("Deploy new contract instance", async () => {
    [owner, executor, newExecutor, external, ...payee] =
      await ethers.getSigners();
    Will = await ethers.getContractFactory("Will");
    contract = (await Will.deploy(
      owner.address,
      executor.address,
      waitDays
    )) as Will;
    await contract.deployed();
  });

  describe("Function willStatus from Will contract", () => {
    it("Calling willStatus to return status", async () => {
      await contract.setWill(
        [payee[1].address, payee[2].address, payee[3].address],
        {
          value: ethValue,
        }
      );
      const [
        testatorAddress,
        executorAddress,
        unlockTimeTemp,
        isExecuted,
        ethBalance,
      ] = await contract.willStatus();
      expect([
        testatorAddress,
        executorAddress,
        unlockTimeTemp,
        isExecuted,
        ethBalance,
      ]).to.deep.equal([
        owner.address,
        executor.address,
        ethers.BigNumber.from(0),
        false,
        ethers.BigNumber.from(ethValue),
      ]);
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
    it("Should emit WillSetted with payees added by setWill function", async () => {
      await expect(
        contract.setWill(
          [payee[1].address, payee[2].address, payee[3].address],
          {
            value: ethValue,
          }
        )
      )
        .to.emit(contract, "WillSetted")
        .withArgs([payee[1].address, payee[2].address, payee[3].address]);
    });
    it("Shouldnt be able to setWill With an address thats not the owner", async () => {
      await expect(
        contract.connect(external).setWill([payee[1].address, payee[2].address])
      ).to.be.revertedWith(
        `AccessControl: account ${addrExt} is missing role ${ownerRole}`
      );
    });
    it("Trying to add more than 50 payees reverts", async () => {
      ///Add 50 payees to the will.
      let randomAccounts = randomSigners(50);
      let randomAddress: string;
      for (let i = 0; i < 50; ++i) {
        randomAddress = await randomAccounts[i].getAddress();
        await contract.setWill([randomAddress], { value: ethMin });
      }
      await expect(contract.setWill([payee[1].address])).to.be.revertedWith(
        "Max payees are 50"
      );
    });
    it("Shouldnt be able to load a payee twice", async () => {
      await contract.setWill(
        [
          payee[1].address,
          payee[2].address,
          payee[3].address,
          payee[4].address,
          payee[5].address,
        ],
        { value: ethValue }
      );
      ///Try to add a duplicated payee
      await expect(contract.setWill([payee[1].address])).to.be.revertedWith(
        `This payee ${payee[1].address.toLowerCase()} is already in will`
      );
    });
  });

  describe("Function setWillToken", () => {
    beforeEach("Deploy new contract instance", async () => {
      await contract.setWill([payee[1].address, payee[2].address], {
        value: ethValue,
      });
      [token1, token2] = await erc20MintToAddress(owner);
    });
    it("Token1 and Token2 balance of owner should be 1000000000", async () => {
      const balanceTT1 = await token1
        .connect(owner.address)
        .balanceOf(owner.address);
      const balanceTT2 = await token1
        .connect(owner.address)
        .balanceOf(owner.address);
      expect(await token1.totalSupply()).to.equal(balanceTT1);
      expect(await token2.totalSupply()).to.equal(balanceTT2);
    });
    it("Owner should be able to load erc20 tokens to will", async () => {
      await token1.approve(contract.address, MAX_INT);
      await token2.approve(contract.address, MAX_INT);
      expect(
        await contract
          .connect(owner)
          .setWillToken([token1.address, token2.address])
      )
        .to.emit(contract, "ERC20TokensSupplied")
        .withArgs([token1.address, token2.address]);
      let [token, correspondingERC20Tokens, tokenBalance] =
        await contract.willTokens(0);
      expect([token, correspondingERC20Tokens, tokenBalance]).to.deep.equal([
        token1.address,
        ethers.BigNumber.from(0),
        ethers.BigNumber.from(0),
      ]);
    });
    it("Shouldnt be able to load twice the same token", async () => {
      await token1.approve(contract.address, MAX_INT);
      await expect(
        contract.connect(owner).setWillToken([token1.address, token1.address])
      ).to.be.revertedWith(
        `This token ${token1.address.toLowerCase()} is already in will`
      );
    });
    it("Revert if owner doesnt approve the token to load in the will", async () => {
      await token1.approve(contract.address, MAX_INT);
      await expect(
        contract.connect(owner).setWillToken([token1.address, token2.address])
      ).to.be.revertedWith("TokenNotApproved");
    });
  });

  describe("Function setWillNFTs", () => {
    beforeEach(
      "Deploy new contract instance and er721-erc20 tokens",
      async () => {
        await contract.setWill([payee[1].address, payee[2].address], {
          value: ethValue,
        });
        [NFT1, NFT2] = await nftMintToAddress(owner);
      }
    );
    it("Nfts should be owned by owner", async () => {
      expect(await NFT1.balanceOf(owner.address)).to.equal(5);
      expect(await NFT2.balanceOf(owner.address)).to.equal(5);
      expect(await NFT1.ownerOf(0)).to.equal(owner.address);
      expect(await NFT1.ownerOf(4)).to.equal(owner.address);
      expect(await NFT2.ownerOf(0)).to.equal(owner.address);
      expect(await NFT2.ownerOf(4)).to.equal(owner.address);
    });
    it("Owner should be able to load erc20 tokens to will and assign them to payees", async () => {
      await NFT1.approve(contract.address, 0);
      await NFT1.approve(contract.address, 1);
      await NFT2.approve(contract.address, 3);
      await NFT2.approve(contract.address, 4);
      expect(
        await contract
          .connect(owner)
          .setWillNFTs(NFT1.address, [0, 1], payee[1].address)
      )
        .to.emit(contract, "NFTsApproved")
        .withArgs(NFT1.address, [0, 1], payee[1].address);
      expect(
        await contract
          .connect(owner)
          .setWillNFTs(NFT2.address, [3, 4], payee[2].address)
      )
        .to.emit(contract, "NFTsApproved")
        .withArgs(NFT2.address, [3, 4], payee[2].address);
      const willNfts1 = await contract.willNFTs(payee[1].address, 0);
      const willNfts2 = await contract.willNFTs(payee[2].address, 1);
      expect(willNfts1).to.deep.equal([NFT1.address, ethers.BigNumber.from(0)]);
      expect(willNfts2).to.deep.equal([NFT2.address, ethers.BigNumber.from(4)]);
    });
    it("If owner does not approve the nft id the function should revert", async () => {
      await NFT1.approve(contract.address, 0);
      await expect(
        contract
          .connect(owner)
          .setWillNFTs(NFT1.address, [0, 1], payee[1].address)
      ).to.be.revertedWith("TokenNotApproved");
    });
    it("Trying to assign a nft to a non payee adress reverts", async () => {
      await NFT1.approve(contract.address, 0);
      await expect(
        contract.connect(owner).setWillNFTs(NFT1.address, [0], external.address)
      ).to.be.revertedWith(
        `AccessControl: account ${external.address.toLowerCase()} is missing role ${payeeRole}`
      );
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
      const latestBlock = (await ethers.provider.getBlock("latest")).timestamp;
      await provider.send("evm_mine", [latestBlock + 100000]);
      await expect(contract.connect(executor).executeWill())
        .to.emit(contract, "WillExecuted")
        .withArgs(
          true,
          executor.address,
          waitDays * 86400 + latestBlock + 100001,
          ethValue,
          3
        );
    });
    it("Shouldnt be able to executeWill if it was already executed", async () => {
      await contract.setWill(
        [payee[1].address, payee[2].address, payee[3].address],
        {
          value: ethValue,
        }
      );
      await contract.connect(executor).executeWill();
      await expect(contract.connect(executor).executeWill()).to.be.revertedWith(
        "Will has already been executed"
      );
    });
  });

  describe("Function resetWill should emit WillReseted", () => {
    it("Calling resetWill should emit WillReseted event", async () => {
      await expect(contract.connect(owner).resetWill()).to.emit(
        contract,
        "WillReseted"
      );
    });
    it("Calling resetWill after withdrawShares should revert", async () => {
      await contract.setWill(
        [payee[1].address, payee[2].address, payee[3].address],
        {
          value: ethValue,
        }
      );
      await contract.connect(executor).executeWill();
      const latestBlock = (await ethers.provider.getBlock("latest")).timestamp;
      const unlockTime = latestBlock + waitTime;
      await provider.send("evm_mine", [unlockTime]);
      await expect(contract.connect(payee[1]).withdrawShares())
        .to.emit(contract, "PayeeChecked")
        .withArgs(payee[1].address);
      await expect(contract.connect(owner).resetWill()).to.be.revertedWith(
        "At least one payee has withdrawn"
      );
    });
  });

  describe("Function withdrawShares from Will Contract", () => {
    beforeEach("Deploy ERC721 and ERC20 tokens to owner", async () => {
      [NFT1, NFT2] = await nftMintToAddress(owner);
      [token1, token2] = await erc20MintToAddress(owner);
      await token1.connect(owner).approve(contract.address, MAX_INT);
      await token2.connect(owner).approve(contract.address, MAX_INT);
      for (let i = 0; i < 5; ++i) {
        await NFT1.connect(owner).approve(contract.address, i);
        await NFT2.connect(owner).approve(contract.address, i);
      }
      await contract
        .connect(owner)
        .setWill([payee[1].address, payee[2].address], {
          value: ethValue,
        });
    });
    it("Only the payees account should call this function", async () => {
      await expect(
        contract.connect(external).withdrawShares()
      ).to.be.revertedWith(
        `AccessControl: account ${addrExt} is missing role ${payeeRole}`
      );
    });
    it("Shouldnt be able to withdrawShares if it hasnt been executed", async () => {
      await expect(
        contract.connect(payee[1]).withdrawShares()
      ).to.be.revertedWith("Will has not been executed yet");
    });
    it("Shouldnt be able to withdrawShares if the unlock time hasnt reached", async () => {
      await contract.connect(executor).executeWill();
      await expect(
        contract.connect(payee[1]).withdrawShares()
      ).to.be.revertedWith("Will hasnt been unlocked yet");
    });
    it("Trying to withdraw two times as same payee reverts", async () => {
      await contract.connect(executor).executeWill();
      const latestBlock = (await ethers.provider.getBlock("latest")).timestamp;
      const unlockTime = latestBlock + waitTime;
      await provider.send("evm_mine", [unlockTime]);
      contract.connect(payee[1]).withdrawShares();
      await expect(
        contract.connect(payee[1]).withdrawShares()
      ).to.be.revertedWith(
        `AccessControl: account ${payee[1].address.toLowerCase()} is missing role ${payeeRole}`
      );
    });

    describe("Testing withdrawShares with ERC20 Tokens", () => {
      beforeEach("setting erc20 tokens in will and executing it", async () => {
        await contract
          .connect(owner)
          .setWillToken([token1.address, token2.address]);
        await contract.connect(executor).executeWill();
      });
      it("Executing withdraShares after unlockTime and executeWill in a will with ERC20 tokens", async () => {
        const latestBlock = (await ethers.provider.getBlock("latest"))
          .timestamp;
        const unlockTime = latestBlock + waitTime;
        await provider.send("evm_mine", [unlockTime]);
        const tx1 = await contract.connect(payee[1]).withdrawShares();
        expect(tx1)
          .to.emit(contract, "TokenWithdrawn")
          .withArgs(
            token1.address,
            payee[1].address,
            ethers.BigNumber.from(500000000)
          );
        expect(tx1)
          .to.emit(contract, "TokenWithdrawn")
          .withArgs(
            token2.address,
            payee[1].address,
            ethers.BigNumber.from(500000000)
          );
        expect(await token1.balanceOf(payee[1].address)).to.equal(
          ethers.BigNumber.from(500000000)
        );
        expect(await token1.balanceOf(owner.address)).to.equal(
          ethers.BigNumber.from(500000000)
        );
        expect(await token2.balanceOf(payee[1].address)).to.equal(
          ethers.BigNumber.from(500000000)
        );
        expect(await token2.balanceOf(owner.address)).to.equal(
          ethers.BigNumber.from(500000000)
        );
      });
      it("Executing withdraShares from all payees expecting to selfdustruct to executor address", async () => {
        const latestBlock = (await ethers.provider.getBlock("latest"))
          .timestamp;
        const unlockTime = latestBlock + waitTime;
        await provider.send("evm_mine", [unlockTime]);
        const tx1 = await contract.connect(payee[1]).withdrawShares();
        expect(tx1)
          .to.emit(contract, "TokenWithdrawn")
          .withArgs(
            token1.address,
            payee[1].address,
            ethers.BigNumber.from(500000000)
          );
        expect(tx1)
          .to.emit(contract, "TokenWithdrawn")
          .withArgs(
            token2.address,
            payee[1].address,
            ethers.BigNumber.from(500000000)
          );
        expect(tx1)
          .to.emit(contract, "PayeeChecked")
          .withArgs(payee[1].address);
        const executorBalance = await executor.getBalance();
        const tx2 = await contract.connect(payee[2]).withdrawShares();
        expect(tx2)
          .to.emit(contract, "TokenWithdrawn")
          .withArgs(
            token1.address,
            payee[2].address,
            ethers.BigNumber.from(500000000)
          );
        expect(tx2)
          .to.emit(contract, "TokenWithdrawn")
          .withArgs(
            token2.address,
            payee[2].address,
            ethers.BigNumber.from(500000000)
          );
        expect(tx2)
          .to.emit(contract, "PayeeChecked")
          .withArgs(payee[2].address);
        expect(await executor.getBalance()).to.equal(
          executorBalance.add(executorFee)
        );
      });
      it("Trying to withdraw tokens that the testator no longer owns should only delete tokens from will", async () => {
        const latestBlock = (await ethers.provider.getBlock("latest"))
          .timestamp;
        const unlockTime = latestBlock + waitTime;
        await provider.send("evm_mine", [unlockTime]);
        token1
          .connect(owner)
          .transfer(external.address, await token1.balanceOf(owner.address));
        token2
          .connect(owner)
          .transfer(external.address, await token2.balanceOf(owner.address));
        contract.connect(payee[1]).withdrawShares();
        expect(await token1.balanceOf(payee[1].address)).to.equal(
          ethers.BigNumber.from(0)
        );
        expect(await token2.balanceOf(payee[1].address)).to.equal(
          ethers.BigNumber.from(0)
        );
        expect(await token2.balanceOf(external.address)).to.equal(
          ethers.BigNumber.from(1000000000)
        );
        expect(await token2.balanceOf(external.address)).to.equal(
          ethers.BigNumber.from(1000000000)
        );
      });
    });
    describe("Testing withdrawShares with ERC721 Tokens", () => {
      beforeEach("Setting ERC721 tokens to Will", async () => {
        await contract
          .connect(owner)
          .setWillNFTs(NFT1.address, [0, 1, 2, 3, 4], payee[1].address);
        await contract.connect(executor).executeWill();
      });
      it("Trying to withdraw an NFT that the testator transfered after adding it to will should fail", async () => {
        await NFT1.connect(owner).transferFrom(
          owner.address,
          external.address,
          4
        );
        const latestBlock = (await ethers.provider.getBlock("latest"))
          .timestamp;
        const unlockTime = latestBlock + waitTime;
        await provider.send("evm_mine", [unlockTime]);
        const tx1 = await contract.connect(payee[1]).withdrawShares();
        expect(tx1)
          .to.emit(contract, "NFTWithdrawn")
          .withArgs(NFT1.address, payee[1].address, ethers.BigNumber.from(0));
        expect(tx1)
          .to.emit(contract, "NFTWithdrawn")
          .withArgs(NFT1.address, payee[1].address, ethers.BigNumber.from(3));
        expect(await NFT1.ownerOf(0)).to.equal(payee[1].address);
        expect(await NFT1.ownerOf(3)).to.equal(payee[1].address);
        expect(await NFT1.ownerOf(4)).to.equal(external.address);
      });
      it("Withdrawing with NFTs that dont belong to owner should delete them all and continue", async () => {
        await NFT1.connect(owner).transferFrom(
          owner.address,
          external.address,
          0
        );
        await NFT1.connect(owner).transferFrom(
          owner.address,
          external.address,
          3
        );
        await NFT1.connect(owner).transferFrom(
          owner.address,
          external.address,
          4
        );
        const latestBlock = (await ethers.provider.getBlock("latest"))
          .timestamp;
        const unlockTime = latestBlock + waitTime;
        await provider.send("evm_mine", [unlockTime]);
        await contract.connect(payee[1]).withdrawShares();
        expect(await NFT1.ownerOf(0)).to.equal(external.address);
        expect(await NFT1.ownerOf(1)).to.equal(payee[1].address);
        expect(await NFT1.ownerOf(2)).to.equal(payee[1].address);
        expect(await NFT1.ownerOf(3)).to.equal(external.address);
        expect(await NFT1.ownerOf(4)).to.equal(external.address);
      });
    });
    describe("Testing withdrawShares with ERC20 and ERC721 Tokens", () => {
      beforeEach("", async () => {
        await contract
          .connect(owner)
          .setWill([payee[3].address, payee[4].address]);
        await contract
          .connect(owner)
          .setWillNFTs(NFT1.address, [0], payee[1].address);
        await contract
          .connect(owner)
          .setWillNFTs(NFT1.address, [2, 3], payee[2].address);
        await contract
          .connect(owner)
          .setWillNFTs(NFT1.address, [4], payee[3].address);
        await contract
          .connect(owner)
          .setWillNFTs(NFT1.address, [1], payee[4].address);
        await contract
          .connect(owner)
          .setWillNFTs(NFT2.address, [3], payee[1].address);
        await contract
          .connect(owner)
          .setWillNFTs(NFT2.address, [1], payee[2].address);
        await contract
          .connect(owner)
          .setWillNFTs(NFT2.address, [2, 4], payee[3].address);
        await contract
          .connect(owner)
          .setWillNFTs(NFT2.address, [0], payee[4].address);
        await contract
          .connect(owner)
          .setWillToken([token1.address, token2.address]);
        await contract.connect(executor).executeWill();
      });
      it("Testing a Will withdraw function with several payees a different ERC20/ERC721. Also some of the doesnt belong to the owner at the time of withdrawal", async () => {
        const latestBlock = (await ethers.provider.getBlock("latest"))
          .timestamp;
        const unlockTime = latestBlock + waitTime;
        await provider.send("evm_mine", [unlockTime]);
        await NFT1.connect(owner).transferFrom(
          owner.address,
          external.address,
          1
        );
        await NFT1.connect(owner).transferFrom(
          owner.address,
          external.address,
          4
        );
        await NFT2.connect(owner).transferFrom(
          owner.address,
          external.address,
          0
        );
        await NFT2.connect(owner).transferFrom(
          owner.address,
          external.address,
          3
        );
        const externalTransferToken1 = ethers.BigNumber.from(200000000);
        await token1
          .connect(owner)
          .transfer(external.address, externalTransferToken1);
        const correspondingToken1 = ethers.BigNumber.from(10 ** 9)
          .sub(externalTransferToken1)
          .div(4);
        const correspondingToken2 = ethers.BigNumber.from(10 ** 9).div(4);
        const executorBalance = await executor.getBalance();
        await contract.connect(payee[1]).withdrawShares();
        await contract.connect(payee[2]).withdrawShares();
        await contract.connect(payee[3]).withdrawShares();
        await contract.connect(payee[4]).withdrawShares();
        expect(await NFT1.ownerOf(0)).to.equal(payee[1].address);
        expect(await NFT1.ownerOf(1)).to.equal(external.address);
        expect(await NFT1.ownerOf(2)).to.equal(payee[2].address);
        expect(await NFT1.ownerOf(3)).to.equal(payee[2].address);
        expect(await NFT1.ownerOf(4)).to.equal(external.address);
        expect(await NFT2.ownerOf(0)).to.equal(external.address);
        expect(await NFT2.ownerOf(1)).to.equal(payee[2].address);
        expect(await NFT2.ownerOf(2)).to.equal(payee[3].address);
        expect(await NFT2.ownerOf(3)).to.equal(external.address);
        expect(await NFT2.ownerOf(4)).to.equal(payee[3].address);
        expect(await executor.getBalance()).to.equal(
          executorBalance.add(executorFee)
        );
        expect(await token1.balanceOf(payee[1].address)).to.equal(
          correspondingToken1
        );
        expect(await token1.balanceOf(payee[2].address)).to.equal(
          correspondingToken1
        );
        expect(await token1.balanceOf(payee[3].address)).to.equal(
          correspondingToken1
        );
        expect(await token1.balanceOf(payee[4].address)).to.equal(
          correspondingToken1
        );
        expect(await token2.balanceOf(payee[1].address)).to.equal(
          correspondingToken2
        );
        expect(await token2.balanceOf(payee[2].address)).to.equal(
          correspondingToken2
        );
        expect(await token2.balanceOf(payee[3].address)).to.equal(
          correspondingToken2
        );
        expect(await token2.balanceOf(payee[4].address)).to.equal(
          correspondingToken2
        );
      });
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
      await contract
        .connect(owner)
        .setWill([payee[1].address, payee[2].address, payee[3].address], {
          value: ethValue,
        });
      const balanceOwner = await owner.getBalance();
      const tx1 = await contract.connect(owner).revokeWill();
      const receiptTx1 = await tx1.wait();
      const gas = receiptTx1.gasUsed.mul(receiptTx1.effectiveGasPrice);
      expect(await owner.getBalance()).to.equal(
        balanceOwner.sub(gas).add(ethValue)
      );
    });
  });
});
