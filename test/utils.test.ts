import { Signer } from "@ethersproject/abstract-signer";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { ethers } from "hardhat";
import { ERC721PresetMinterPauserAutoId } from "../typechain-types";
import { ERC20PresetFixedSupply } from "../typechain-types/";

export const randomSigners = (amount: number): Signer[] => {
  const signers: Signer[] = [];
  for (let i = 0; i < amount; i++) {
    signers.push(ethers.Wallet.createRandom());
  }
  return signers;
};

export const erc20MintToAddress = async (
  owner: SignerWithAddress
): Promise<ERC20PresetFixedSupply[]> => {
  const totalSupply = (10 ** 9).toString();
  const testTokenFactory = await ethers.getContractFactory(
    "ERC20PresetFixedSupply"
  );
  const token1 = (await testTokenFactory.deploy(
    "TestToken1",
    "TT1",
    totalSupply,
    owner.address
  )) as ERC20PresetFixedSupply;
  const token2 = (await testTokenFactory.deploy(
    "TestToken2",
    "TT2",
    totalSupply,
    owner.address
  )) as ERC20PresetFixedSupply;
  await token1.deployed();
  await token2.deployed();
  return [token1, token2];
};

export const nftMintToAddress = async (
  owner: SignerWithAddress
): Promise<ERC721PresetMinterPauserAutoId[]> => {
  const testNFTFactory = await ethers.getContractFactory(
    "ERC721PresetMinterPauserAutoId"
  );
  const NFT1 = (await testNFTFactory
    .connect(owner)
    .deploy("NFT1", "NFT1", " ")) as ERC721PresetMinterPauserAutoId;
  const NFT2 = (await testNFTFactory
    .connect(owner)
    .deploy("NFT2", "NFT2", " ")) as ERC721PresetMinterPauserAutoId;
  await NFT1.deployed();
  await NFT2.deployed();
  for (let i = 0; i < 5; i++) {
    await NFT1.connect(owner).mint(owner.address);
    await NFT2.connect(owner).mint(owner.address);
  }
  return [NFT1, NFT2];
};
