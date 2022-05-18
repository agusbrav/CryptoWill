/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides, Signer, utils } from "ethers";
import type { WillFactory, WillFactoryInterface } from "../WillFactory";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_newWIll",
        type: "address",
      },
    ],
    name: "WillCreated",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_address",
        type: "address",
      },
    ],
    name: "checkWills",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address payable",
        name: "_lawyer",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_lockTime",
        type: "uint256",
      },
    ],
    name: "createWillContract",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "willOwners",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50612fe1806100206000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c80630dc6080d14610046578063247bad621461008b578063a353d2c21461009e575b600080fd5b61006f61005436600461034e565b6000602081905290815260409020546001600160a01b031681565b6040516001600160a01b03909116815260200160405180910390f35b61006f61009936600461034e565b6100b1565b61006f6100ac366004610372565b61013e565b6001600160a01b0381811660009081526020819052604081205490911661011f5760405162461bcd60e51b815260206004820152601f60248201527f596f7520646f206e6f7420686176652061206465706c6f7965642057696c6c0060448201526064015b60405180910390fd5b506001600160a01b039081166000908152602081905260409020541690565b336000908152602081905260408120546001600160a01b0316156101a45760405162461bcd60e51b815260206004820181905260248201527f596f7520616c7265616479206861766520612077696c6c20636f6e74726163746044820152606401610116565b816101f15760405162461bcd60e51b815260206004820152601960248201527f546865206d696e696d756d2074696d65206973203120646179000000000000006044820152606401610116565b6301e2850082106102445760405162461bcd60e51b815260206004820152601c60248201527f546865206d6178696d756e2074696d65206973203336352064617973000000006044820152606401610116565b600033848460405161025590610329565b6001600160a01b0393841681529290911660208301526040820152606001604051809103906000f08015801561028f573d6000803e3d6000fd5b50336000908152602081815260409182902080547fffffffffffffffffffffffff0000000000000000000000000000000000000000166001600160a01b03851690811790915591519182529192507feeb70606d0471753bc0f18914e842c40fad1d77501bfb2c7c90df37f7cc1374f910160405180910390a15050336000908152602081905260409020546001600160a01b031692915050565b612c368061039f83390190565b6001600160a01b038116811461034b57600080fd5b50565b60006020828403121561036057600080fd5b813561036b81610336565b9392505050565b6000806040838503121561038557600080fd5b823561039081610336565b94602093909301359350505056fe60806040523480156200001157600080fd5b5060405162002c3638038062002c36833981016040819052620000349162000240565b60018055600880546001600160a01b038086166001600160a01b031992831617909255600980549285169290911691909117905562000077816201518062000281565b600c55600b805460ff191690556200009f60008051602062002c168339815191528462000128565b620000ba60008051602062002bf68339815191528362000128565b620000e460008051602062002bf683398151915260008051602062002c1683398151915262000138565b6200011f7fdd3cf490277a2ed9b8e9d23db09c21bd229077712bc2c8266158d0d92288625a60008051602062002c1683398151915262000138565b505050620002af565b62000134828262000183565b5050565b600082815260208190526040808220600101805490849055905190918391839186917fbd79b86ffe0ab8e8776151514217cd7cacd52c909f66475c3af44e129f0b00ff9190a4505050565b6000828152602081815260408083206001600160a01b038516845290915290205460ff1662000134576000828152602081815260408083206001600160a01b03851684529091529020805460ff19166001179055620001df3390565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b80516001600160a01b03811681146200023b57600080fd5b919050565b6000806000606084860312156200025657600080fd5b620002618462000223565b9250620002716020850162000223565b9150604084015190509250925092565b6000816000190483118215151615620002aa57634e487b7160e01b600052601160045260246000fd5b500290565b61293780620002bf6000396000f3fe6080604052600436106101755760003560e01c80637a9f4bfc116100cb578063a581a1b51161007f578063bf01407411610059578063bf01407414610483578063d547741f14610499578063d5a4f9ed146104b957600080fd5b8063a581a1b5146103df578063a5b836351461044e578063b32b027e1461046357600080fd5b806391d14854116100b057806391d14854146103735780639cc7f724146103b7578063a217fddf146103ca57600080fd5b80637a9f4bfc1461033e5780638d086da41461035e57600080fd5b80631954c0001161012d57806336568abe1161010757806336568abe146102f457806341ab5296146103145780636fa533f01461032957600080fd5b80631954c0001461026c578063248a9ca3146102a45780632f2ff15d146102d457600080fd5b806306483b3e1161015e57806306483b3e146101d3578063071805bf146102125780630cbb91571461025757600080fd5b806301ffc9a71461017a578063062af0b0146101af575b600080fd5b34801561018657600080fd5b5061019a6101953660046122ba565b6104ce565b60405190151581526020015b60405180910390f35b3480156101bb57600080fd5b506101c560055481565b6040519081526020016101a6565b3480156101df57600080fd5b506101f36101ee36600461230c565b610505565b604080516001600160a01b0390931683526020830191909152016101a6565b34801561021e57600080fd5b5061023261022d366004612338565b61054b565b604080516001600160a01b0390941684526020840192909252908201526060016101a6565b61026a6102653660046123bc565b610588565b005b34801561027857600080fd5b5061028c610287366004612338565b6108e4565b6040516001600160a01b0390911681526020016101a6565b3480156102b057600080fd5b506101c56102bf366004612338565b60009081526020819052604090206001015490565b3480156102e057600080fd5b5061026a6102ef36600461245b565b61090e565b34801561030057600080fd5b5061026a61030f36600461245b565b610939565b34801561032057600080fd5b5061026a6109c5565b34801561033557600080fd5b5061026a6109fe565b34801561034a57600080fd5b5061026a61035936600461248b565b610ab3565b34801561036a57600080fd5b5061026a610df5565b34801561037f57600080fd5b5061019a61038e36600461245b565b6000918252602082815260408084206001600160a01b0393909316845291905290205460ff1690565b61026a6103c5366004612541565b6113f6565b3480156103d657600080fd5b506101c5600081565b3480156103eb57600080fd5b50600854600954600b54600c54600d54610415946001600160a01b0390811694169260ff16919085565b604080516001600160a01b039687168152959094166020860152911515928401929092526060830191909152608082015260a0016101a6565b34801561045a57600080fd5b5061026a611726565b34801561046f57600080fd5b5061026a61047e3660046125d0565b6118b4565b34801561048f57600080fd5b506101c560065481565b3480156104a557600080fd5b5061026a6104b436600461245b565b611a05565b3480156104c557600080fd5b5061026a611a2b565b60006001600160e01b03198216637965db0b60e01b14806104ff57506301ffc9a760e01b6001600160e01b03198316145b92915050565b6003602052816000526040600020818154811061052157600080fd5b6000918252602090912060029091020180546001909101546001600160a01b039091169250905082565b6007818154811061055b57600080fd5b60009182526020909120600390910201805460018201546002909201546001600160a01b03909116925083565b600260015414156105e05760405162461bcd60e51b815260206004820152601f60248201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c0060448201526064015b60405180910390fd5b60026001557f6270edb7c868f86fda4adedba75108201087268ea345934db8bad688e1feb91b6106108133611ae9565b6702c68af0bb1400006106234734612603565b10156106715760405162461bcd60e51b815260206004820152601f60248201527f4d696e756d756e2062616c616e6365206d75737420626520302e32204554480060448201526064016105d7565b600a5461067f90603261261b565b825111156106cf5760405162461bcd60e51b815260206004820152601160248201527f4d6178207061796565732061726520353000000000000000000000000000000060448201526064016105d7565b600b5460ff16156107225760405162461bcd60e51b815260206004820152601e60248201527f57696c6c2068617320616c7265616479206265656e206578656375746564000060448201526064016105d7565b815160005b818110156108d25760006001600160a01b031684828151811061074c5761074c612632565b60200260200101516001600160a01b031614156107ab5760405162461bcd60e51b815260206004820152601f60248201527f5468652061646472657373203078302063616e7420626520612070617965650060448201526064016105d7565b60095484516001600160a01b03909116908590839081106107ce576107ce612632565b60200260200101516001600160a01b0316141561082d5760405162461bcd60e51b815260206004820152601c60248201527f546865206578656375746f722063616e7420626520612070617965650000000060448201526064016105d7565b6108707fdd3cf490277a2ed9b8e9d23db09c21bd229077712bc2c8266158d0d92288625a85838151811061086357610863612632565b602002602001015161090e565b600860020184828151811061088757610887612632565b60209081029190910181015182546001810184556000938452919092200180546001600160a01b0319166001600160a01b039092169190911790556108cb81612648565b9050610727565b506108db6109fe565b50506001805550565b600481815481106108f457600080fd5b6000918252602090912001546001600160a01b0316905081565b60008281526020819052604090206001015461092a8133611ae9565b6109348383611b67565b505050565b6001600160a01b03811633146109b75760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201527f20726f6c657320666f722073656c66000000000000000000000000000000000060648201526084016105d7565b6109c18282611c05565b5050565b7f6270edb7c868f86fda4adedba75108201087268ea345934db8bad688e1feb91b6109f08133611ae9565b6008546001600160a01b0316ff5b600854600954600d54600b54600654600554604080516001600160a01b0397881681529690951660208701529385019290925260ff161515606084015247608084015260a083015260c08201527f15b0dfaa25e39d6b135d105f3b8938774f3af959c58c3b659ada7de9fa6ab80d9060e00160405180910390a16040517f6d5a0ba610656b28688a5f9d360558cc8d32af3338dc4a45890a0a48a7d63f1e90610aa990600a90612663565b60405180910390a1565b7f6270edb7c868f86fda4adedba75108201087268ea345934db8bad688e1feb91b610ade8133611ae9565b6702c68af0bb14000047118015610af65750600a5415155b610b425760405162461bcd60e51b815260206004820152601d60248201527f546869732077696c6c20686173206e6f74206265656e2073657420757000000060448201526064016105d7565b600b5460ff1615610b955760405162461bcd60e51b815260206004820152601e60248201527f57696c6c2068617320616c7265616479206265656e206578656375746564000060448201526064016105d7565b610bbf7fdd3cf490277a2ed9b8e9d23db09c21bd229077712bc2c8266158d0d92288625a83611ae9565b8251829060005b81811015610dec576000879050806001600160a01b031663095ea7b330898581518110610bf557610bf5612632565b60200260200101516040518363ffffffff1660e01b8152600401610c2e9291906001600160a01b03929092168252602082015260400190565b600060405180830381600087803b158015610c4857600080fd5b505af1158015610c5c573d6000803e3d6000fd5b50505050306001600160a01b0316816001600160a01b031663081812fc898581518110610c8b57610c8b612632565b60200260200101516040518263ffffffff1660e01b8152600401610cb191815260200190565b602060405180830381865afa158015610cce573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610cf291906126b3565b6001600160a01b03161415610dd95760036000856001600160a01b03166001600160a01b031681526020019081526020016000206040518060400160405280836001600160a01b03168152602001898581518110610d5257610d52612632565b602090810291909101810151909152825460018082018555600094855293829020835160029092020180546001600160a01b0319166001600160a01b039092169190911781559101519101556040517fa4ee2ce7bc241f63713c7df7fd66cb800d7418b6618029c7a28dc163ba90bdbf90610dd09083908a906126d0565b60405180910390a15b5080610de481612648565b915050610bc6565b50505050505050565b7fdd3cf490277a2ed9b8e9d23db09c21bd229077712bc2c8266158d0d92288625a610e208133611ae9565b600b5460ff16610e725760405162461bcd60e51b815260206004820152601e60248201527f57696c6c20686173206e6f74206265656e20657865637574656420796574000060448201526064016105d7565b600d54421015610ec45760405162461bcd60e51b815260206004820152601c60248201527f57696c6c206861736e74206265656e20756e6c6f636b6564207965740000000060448201526064016105d7565b6007546000901561110257600754610eda611c84565b60005b818110156110ff5760078181548110610ef857610ef8612632565b6000918252602090912060039091020154600854600780546001600160a01b03938416936323b872dd931691339186908110610f3657610f36612632565b60009182526020909120600160039092020101546040516001600160e01b031960e086901b1681526001600160a01b03938416600482015292909116602483015260448201526064016020604051808303816000875af1158015610f9e573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610fc29190612727565b925082610ffc60078381548110610fdb57610fdb612632565b60009182526020909120600390910201546001600160a01b03166014611e29565b60405160200161100c9190612779565b604051602081830303815290604052906110395760405162461bcd60e51b81526004016105d791906127e5565b507f8210728e7c071f615b840ee026032693858fbcd5e5359e67e438c890f59e56206007828154811061106e5761106e612632565b906000526020600020906003020160000160009054906101000a90046001600160a01b031633600784815481106110a7576110a7612632565b9060005260206000209060030201600101546040516110e7939291906001600160a01b039384168152919092166020820152604081019190915260600190565b60405180910390a16110f881612648565b9050610edd565b50505b33600090815260036020526040902054156113045761112033611fd9565b33600090815260036020526040812054905b818110156113015733600090815260036020526040902080548290811061115b5761115b612632565b60009182526020808320600290920290910154600854338085526003909352604090932080546001600160a01b03928316946342842e0e949316929190869081106111a8576111a8612632565b60009182526020909120600160029092020101546040516001600160e01b031960e086901b1681526001600160a01b0393841660048201529290911660248301526044820152606401600060405180830381600087803b15801561120b57600080fd5b505af115801561121f573d6000803e3d6000fd5b505033600090815260036020526040902080547fbbde41973f9ce4890f7ad9762c23d8191f261fd643bdf13ed8bbc10549b49fcb93509091508390811061126857611268612632565b60009182526020808320600290920290910154338084526003909252604090922080546001600160a01b0390931692859081106112a7576112a7612632565b9060005260206000209060020201600101546040516112e7939291906001600160a01b039384168152919092166020820152604081019190915260600190565b60405180910390a1806112f981612648565b915050611132565b50505b61130c61217c565b600654604051339190600081818185875af1925050503d806000811461134e576040519150601f19603f3d011682016040523d82523d6000602084013e611353565b606091505b505080915050806113a65760405162461bcd60e51b815260206004820152601460248201527f4661696c656420746f2073656e6420457468657200000000000000000000000060448201526064016105d7565b600654604080519182523360208301527f8bf178dcdd2a6012ec21be7cdac6119597012d18eb92007f216ec7bcee35103c910160405180910390a1600a546109c1576009546001600160a01b0316ff5b7f6270edb7c868f86fda4adedba75108201087268ea345934db8bad688e1feb91b6114218133611ae9565b6702c68af0bb140000471180156114395750600a5415155b6114855760405162461bcd60e51b815260206004820152601d60248201527f546869732077696c6c20686173206e6f74206265656e2073657420757000000060448201526064016105d7565b600b5460ff16156114d85760405162461bcd60e51b815260206004820152601e60248201527f57696c6c2068617320616c7265616479206265656e206578656375746564000060448201526064016105d7565b6007546032101561152b5760405162461bcd60e51b815260206004820152601e60248201527f546865206d6178206e756d626572206f6620746f6b656e73206973203530000060448201526064016105d7565b8151600090815b8181101561171f5784818151811061154c5761154c612632565b6020908102919091010151600854604051636eb1769f60e11b81526001600160a01b03918216600482015230602482015291945084169063dd62ed3e90604401602060405180830381865afa1580156115a9573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906115cd9190612818565b60fd141561170d57604080516060810182526001600160a01b038581168083526000602084015260085484516370a0823160e01b8152921660048301526007938301916370a0823190602401602060405180830381865afa158015611636573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061165a9190612818565b90528154600180820184556000938452602093849020835160039093020180546001600160a01b0319166001600160a01b0390931692909217825592820151928101929092556040015160029091015584517f551e04009f4439b7afe248acbc9e96fe2f28db143f892715163f678dda56bd41908690839081106116e0576116e0612632565b602002602001015160405161170491906001600160a01b0391909116815260200190565b60405180910390a15b8061171781612648565b915050611532565b5050505050565b7f9cf85f95575c3af1e116e3d37fd41e7f36a8a373623f51ffaaa87fdd032fa7676117518133611ae9565b6702c68af0bb140000471180156117695750600a5415155b6117b55760405162461bcd60e51b815260206004820152601d60248201527f546869732077696c6c20686173206e6f74206265656e2073657420757000000060448201526064016105d7565b600b5460ff16156118085760405162461bcd60e51b815260206004820152601e60248201527f57696c6c2068617320616c7265616479206265656e206578656375746564000060448201526064016105d7565b600a546002805460ff191660ff909216919091179055600c5461182b9042612603565b600d55600b805460ff1916600117905561184361228d565b600b54600c54600954600d54600a546040805160ff9096161515865260208601949094526001600160a01b0390921684840152606084015247608084015260a0830152517f34a4fc9c8f1ad8b9dafcdddf9bac9a9f5b5edff854223b5a4162dded356900c39181900360c00190a150565b7f6270edb7c868f86fda4adedba75108201087268ea345934db8bad688e1feb91b6118df8133611ae9565b6009546001600160a01b038381169116141561193d5760405162461bcd60e51b815260206004820152601560248201527f43616e742062652073616d65206578656375746f72000000000000000000000060448201526064016105d7565b600980546001600160a01b038481166001600160a01b0319831617909255166119867f9cf85f95575c3af1e116e3d37fd41e7f36a8a373623f51ffaaa87fdd032fa76782611a05565b6009546119bd907f9cf85f95575c3af1e116e3d37fd41e7f36a8a373623f51ffaaa87fdd032fa767906001600160a01b031661090e565b604080516001600160a01b038084168252851660208201527f2c4dd2eb8fc81159ddfb343de0d4a37c90afac97ae143a4f936363cbbc79d6d3910160405180910390a1505050565b600082815260208190526040902060010154611a218133611ae9565b6109348383611c05565b7f6270edb7c868f86fda4adedba75108201087268ea345934db8bad688e1feb91b611a568133611ae9565b600254600a5460ff90911614611aae5760405162461bcd60e51b815260206004820181905260248201527f4174206c65617374206f6e65207061796565206861732077697468647261776e60448201526064016105d7565b600b805460ff191690556000600d8190556040517ffa356a3061e0a1c21409d30747e7c0aa81123816672c9875f5ea8f3b5841fd909190a150565b6000828152602081815260408083206001600160a01b038516845290915290205460ff166109c157611b25816001600160a01b03166014611e29565b611b30836020611e29565b604051602001611b41929190612831565b60408051601f198184030181529082905262461bcd60e51b82526105d7916004016127e5565b6000828152602081815260408083206001600160a01b038516845290915290205460ff166109c1576000828152602081815260408083206001600160a01b03851684529091529020805460ff19166001179055611bc13390565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b6000828152602081815260408083206001600160a01b038516845290915290205460ff16156109c1576000828152602081815260408083206001600160a01b0385168085529252808320805460ff1916905551339285917ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b9190a45050565b600754600090815b818110156109345760078181548110611ca757611ca7612632565b60009182526020909120600390910201546008546040516370a0823160e01b81526001600160a01b0391821660048201529116906370a0823190602401602060405180830381865afa158015611d01573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611d259190612818565b60078281548110611d3857611d38612632565b90600052602060002090600302016002015414611e195760078181548110611d6257611d62612632565b60009182526020909120600390910201546008546040516370a0823160e01b81526001600160a01b0391821660048201529116906370a0823190602401602060405180830381865afa158015611dbc573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611de09190612818565b600a54909350611df090846128b2565b60078281548110611e0357611e03612632565b9060005260206000209060030201600101819055505b611e2281612648565b9050611c8c565b60606000611e388360026128d4565b611e43906002612603565b67ffffffffffffffff811115611e5b57611e5b612351565b6040519080825280601f01601f191660200182016040528015611e85576020820181803683370190505b509050600360fc1b81600081518110611ea057611ea0612632565b60200101906001600160f81b031916908160001a905350600f60fb1b81600181518110611ecf57611ecf612632565b60200101906001600160f81b031916908160001a9053506000611ef38460026128d4565b611efe906001612603565b90505b6001811115611f83577f303132333435363738396162636465660000000000000000000000000000000085600f1660108110611f3f57611f3f612632565b1a60f81b828281518110611f5557611f55612632565b60200101906001600160f81b031916908160001a90535060049490941c93611f7c816128f3565b9050611f01565b508315611fd25760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e7460448201526064016105d7565b9392505050565b6001600160a01b038116600090815260036020526040812054611ffe9060019061261b565b9050805b6008546001600160a01b03848116600090815260036020526040902080549190921691908390811061203657612036612632565b600091825260208083206002909202909101546001600160a01b0387811684526003909252604090922080549190921691636352211e918590811061207d5761207d612632565b9060005260206000209060020201600101546040518263ffffffff1660e01b81526004016120ad91815260200190565b602060405180830381865afa1580156120ca573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906120ee91906126b3565b6001600160a01b031614612148576001600160a01b038316600090815260036020526040902080548290811061212657612126612632565b60009182526020822060029091020180546001600160a01b0319168155600101555b6001600160a01b03831660009081526003602052604090205461216a57505050565b80612174816128f3565b915050612002565b600a5460005b818160ff1610156109c157600a805433919060ff84169081106121a7576121a7612632565b6000918252602090912001546001600160a01b0316141561227d577f1cb2127ae697cd2b72dda2f87906f22defac805de993785c6492f0a03b9fe41860086002018260ff16815481106121fc576121fc612632565b600091825260209182902001546040516001600160a01b0390911681520160405180910390a161224c7fdd3cf490277a2ed9b8e9d23db09c21bd229077712bc2c8266158d0d92288625a33610939565b600a805460ff831690811061226357612263612632565b600091825260209091200180546001600160a01b03191690555b6122868161290a565b9050612182565b612298600a476128b2565b6005819055600a54906122ab904761261b565b6122b591906128b2565b600655565b6000602082840312156122cc57600080fd5b81356001600160e01b031981168114611fd257600080fd5b6001600160a01b03811681146122f957600080fd5b50565b8035612307816122e4565b919050565b6000806040838503121561231f57600080fd5b823561232a816122e4565b946020939093013593505050565b60006020828403121561234a57600080fd5b5035919050565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff8111828210171561239057612390612351565b604052919050565b600067ffffffffffffffff8211156123b2576123b2612351565b5060051b60200190565b600060208083850312156123cf57600080fd5b823567ffffffffffffffff8111156123e657600080fd5b8301601f810185136123f757600080fd5b803561240a61240582612398565b612367565b81815260059190911b8201830190838101908783111561242957600080fd5b928401925b82841015612450578335612441816122e4565b8252928401929084019061242e565b979650505050505050565b6000806040838503121561246e57600080fd5b823591506020830135612480816122e4565b809150509250929050565b6000806000606084860312156124a057600080fd5b83356124ab816122e4565b925060208481013567ffffffffffffffff8111156124c857600080fd5b8501601f810187136124d957600080fd5b80356124e761240582612398565b81815260059190911b8201830190838101908983111561250657600080fd5b928401925b828410156125245783358252928401929084019061250b565b8096505050505050612538604085016122fc565b90509250925092565b6000602080838503121561255457600080fd5b823567ffffffffffffffff81111561256b57600080fd5b8301601f8101851361257c57600080fd5b803561258a61240582612398565b81815260059190911b820183019083810190878311156125a957600080fd5b928401925b828410156124505783356125c1816122e4565b825292840192908401906125ae565b6000602082840312156125e257600080fd5b8135611fd2816122e4565b634e487b7160e01b600052601160045260246000fd5b60008219821115612616576126166125ed565b500190565b60008282101561262d5761262d6125ed565b500390565b634e487b7160e01b600052603260045260246000fd5b600060001982141561265c5761265c6125ed565b5060010190565b6020808252825482820181905260008481528281209092916040850190845b818110156126a75783546001600160a01b031683526001938401939285019201612682565b50909695505050505050565b6000602082840312156126c557600080fd5b8151611fd2816122e4565b6000604082016001600160a01b03851683526020604081850152818551808452606086019150828701935060005b8181101561271a578451835293830193918301916001016126fe565b5090979650505050505050565b60006020828403121561273957600080fd5b81518015158114611fd257600080fd5b60005b8381101561276457818101518382015260200161274c565b83811115612773576000848401525b50505050565b7f4661696c656420746f2073656e640000000000000000000000000000000000008152600082516127b181600e850160208701612749565b7f746f6b656e000000000000000000000000000000000000000000000000000000600e939091019283015250601301919050565b6020815260008251806020840152612804816040850160208701612749565b601f01601f19169190910160400192915050565b60006020828403121561282a57600080fd5b5051919050565b7f416363657373436f6e74726f6c3a206163636f756e7420000000000000000000815260008351612869816017850160208801612749565b7f206973206d697373696e6720726f6c652000000000000000000000000000000060179184019182015283516128a6816028840160208801612749565b01602801949350505050565b6000826128cf57634e487b7160e01b600052601260045260246000fd5b500490565b60008160001904831182151516156128ee576128ee6125ed565b500290565b600081612902576129026125ed565b506000190190565b600060ff821660ff811415612921576129216125ed565b6001019291505056fea164736f6c634300080a000a9cf85f95575c3af1e116e3d37fd41e7f36a8a373623f51ffaaa87fdd032fa7676270edb7c868f86fda4adedba75108201087268ea345934db8bad688e1feb91ba164736f6c634300080a000a";

type WillFactoryConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: WillFactoryConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class WillFactory__factory extends ContractFactory {
  constructor(...args: WillFactoryConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "WillFactory";
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<WillFactory> {
    return super.deploy(overrides || {}) as Promise<WillFactory>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): WillFactory {
    return super.attach(address) as WillFactory;
  }
  connect(signer: Signer): WillFactory__factory {
    return super.connect(signer) as WillFactory__factory;
  }
  static readonly contractName: "WillFactory";
  public readonly contractName: "WillFactory";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): WillFactoryInterface {
    return new utils.Interface(_abi) as WillFactoryInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): WillFactory {
    return new Contract(address, _abi, signerOrProvider) as WillFactory;
  }
}
