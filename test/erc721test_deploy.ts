import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { ethers } from "hardhat";
import { ERC721PresetMinterPauserAutoId } from "../typechain-types/ERC721PresetMinterPauserAutoId";

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
