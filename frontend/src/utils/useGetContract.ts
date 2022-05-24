import { ethers } from "ethers";
import WillFactory from "../artifacts/contracts/WillFactory.sol/WillFactory.json";

export default function getContract(contractAddress: string): any {
  const provider = new ethers.providers.Web3Provider((window as any).ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(
    contractAddress,
    WillFactory.abi,
    signer
  );
  return contract;
}
