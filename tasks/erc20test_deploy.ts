import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { ethers } from "hardhat";
import { ERC20PresetFixedSupply } from "../typechain-types";

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
