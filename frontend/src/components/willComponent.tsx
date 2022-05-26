import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import "../styles/styles.css";
import getContract from "../utils/useGetContract";

declare global {
  interface Window {
    ethereum?: any;
  }
}

interface WillData {
  testatorAddress: string;
  timeLock: number;
}

function willContract() {
  /*-----------STATES---------------*/
  // const [typedContract, setTypedContract] = useState<ExampleContract>()
  const [contract, setContract] = useState<any>(undefined);
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  /*-----------SIDE EFFECTS---------------*/
  useEffect(() => {
    setContract(getContract(contractAddress));
  }, []);

  async function createWill(willData: WillData) {
    if (!willData.testatorAddress || !willData.timeLock) return;
    try {
      await contract.createWillContract(
        willData.testatorAddress,
        willData.timeLock
      );
      contract.on("WillCreated", (_newWill: any) => {
        console.log("New will deployed to address: ", _newWill);
      });
    } catch (err: any) {
      console.log(err.reason);
    }
  }

  async function checkWills() {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    const willAddress = await contract.checkWills(address);
    console.log(
      "You have a deployed Will contract in this address:",
      willAddress
    );
  }

  async function connectToMetamask() {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    console.log("Account:", await signer.getAddress());
  }

  return (
    <div>
      <header className="flex flex-col items-center justify-center flex-grow text-2xl text-gray-700 dark:text-white">
        <h1 color="blue">Crypto Will</h1>
        <p className="my-8">
          <button
            className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-teal-600 border border-transparent rounded-md shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            onClick={() =>
              createWill({
                testatorAddress: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
                timeLock: 1,
              })
            }
          >
            Create Will Contract!
          </button>
        </p>
        <p>
          <button
            className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-teal-600 border border-transparent rounded-md shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            onClick={() => checkWills()}
          >
            Check your Will
          </button>
        </p>
        <br />
        <p>
          <button className="connectButton" onClick={() => connectToMetamask()}>
            Connect
          </button>
        </p>
      </header>
    </div>
  );
}
export default willContract;
