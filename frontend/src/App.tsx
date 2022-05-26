import React, { useEffect, useState } from "react";
import NavBar from "./components/controlBar";
import getContract from "./utils/useGetContract";

declare global {
  interface Window {
    ethereum?: any;
  }
}

interface WillData {
  testatorAddress: string;
  timeLock: number;
}

function App() {
  /*-----------STATES---------------*/
  // const [typedContract, setTypedContract] = useState<ExampleContract>()
  const [contract, setContract] = useState<any>(undefined);
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  /*-----------SIDE EFFECTS---------------*/
  useEffect(() => {
    setContract(getContract(contractAddress));
  }, []);

  /*-----------FUNCTIONS---------------*/
  if (window.ethereum) {
    handleEthereum();
  } else {
    window.addEventListener("ethereum#initialized", handleEthereum, {
      once: true,
    });
    // If the event is not dispatched by the end of the timeout,
    // the user probably doesn't have MetaMask installed.
    setTimeout(handleEthereum, 3000); // 3 seconds
  }

  function handleEthereum() {
    const { ethereum } = window;
    if (ethereum && ethereum.isMetaMask) {
      console.log("Ethereum successfully detected!");
      // Access the decentralized web!
    } else {
      console.log("Please install MetaMask!");
    }
  }

  return (
    <div className="flex flex-col w-full h-full bg-white dark:bg-gray-700">
      <div>
        <NavBar />
      </div>
    </div>
  );
}

export default App;
