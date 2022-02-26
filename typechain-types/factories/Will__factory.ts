/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Provider, TransactionRequest } from "@ethersproject/providers";
import {
  BigNumberish,
  Contract,
  ContractFactory,
  Overrides,
  Signer,
  utils,
} from "ethers";
import type { Will, WillInterface } from "../Will";

const _abi = [
  {
    inputs: [
      {
        internalType: "address payable",
        name: "_testator",
        type: "address",
      },
      {
        internalType: "address payable",
        name: "_lawyer",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_waitTime",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_payees",
        type: "address",
      },
    ],
    name: "ApprovedPayees",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_oldLawyer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "_newLawyer",
        type: "address",
      },
    ],
    name: "ChangedLawyer",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_newPayee",
        type: "address",
      },
    ],
    name: "NewPayeeAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "previousAdminRole",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "newAdminRole",
        type: "bytes32",
      },
    ],
    name: "RoleAdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleGranted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleRevoked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "_totalAmount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_lawyerFee",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_ethPerPayee",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "_caller",
        type: "address",
      },
    ],
    name: "SharesWithdrawn",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bool",
        name: "_exec",
        type: "bool",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_time",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "_lawyer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_unlockTime",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_totalBalance",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_numberOfPayees",
        type: "uint256",
      },
    ],
    name: "WillExecuted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "_lawyer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_unlockTime",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "_withdrawAvailable",
        type: "bool",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_totalBalance",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_correspondingTokens",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_lawyerFee",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_expireDate",
        type: "uint256",
      },
    ],
    name: "WillReport",
    type: "event",
  },
  {
    inputs: [],
    name: "DEFAULT_ADMIN_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "LAWYER",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "OWNER",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "PAYEE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "correspondingTokens",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "executeWill",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "expireDate",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
    ],
    name: "getRoleAdmin",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "grantRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "hasRole",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "lawyerFee",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "reclaimOwnerBalance",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "renounceRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address payable",
        name: "_newLawyer",
        type: "address",
      },
    ],
    name: "resetWill",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "revokeRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address payable[]",
        name: "_payeesAdd",
        type: "address[]",
      },
    ],
    name: "setWill",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "willManuscript",
    outputs: [
      {
        internalType: "address payable",
        name: "testator",
        type: "address",
      },
      {
        internalType: "address payable",
        name: "lawyer",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "waitTime",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "executed",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "unlockTime",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "willStatus",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdrawShares",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060405162002ca938038062002ca98339818101604052810190620000379190620004af565b6001808190555082600260000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555081600260010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506201518081620000d791906200053a565b6002600301819055506000600260040160006101000a81548160ff021916908315150217905550620001307f6270edb7c868f86fda4adedba75108201087268ea345934db8bad688e1feb91b846200020f60201b60201c565b620001627f26e23ce6b85ff9f368ed1b385a304e4efb5cb11dbc90b57bc31457871b754ae6836200020f60201b60201c565b620001b47f26e23ce6b85ff9f368ed1b385a304e4efb5cb11dbc90b57bc31457871b754ae67f6270edb7c868f86fda4adedba75108201087268ea345934db8bad688e1feb91b6200022560201b60201c565b620002067fdd3cf490277a2ed9b8e9d23db09c21bd229077712bc2c8266158d0d92288625a7f6270edb7c868f86fda4adedba75108201087268ea345934db8bad688e1feb91b6200022560201b60201c565b5050506200059b565b6200022182826200028860201b60201c565b5050565b600062000238836200037960201b60201c565b905081600080858152602001908152602001600020600101819055508181847fbd79b86ffe0ab8e8776151514217cd7cacd52c909f66475c3af44e129f0b00ff60405160405180910390a4505050565b6200029a82826200039860201b60201c565b6200037557600160008084815260200190815260200160002060000160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055506200031a6200040260201b60201c565b73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45b5050565b6000806000838152602001908152602001600020600101549050919050565b600080600084815260200190815260200160002060000160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b600033905090565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006200043c826200040f565b9050919050565b6200044e816200042f565b81146200045a57600080fd5b50565b6000815190506200046e8162000443565b92915050565b6000819050919050565b620004898162000474565b81146200049557600080fd5b50565b600081519050620004a9816200047e565b92915050565b600080600060608486031215620004cb57620004ca6200040a565b5b6000620004db868287016200045d565b9350506020620004ee868287016200045d565b9250506040620005018682870162000498565b9150509250925092565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000620005478262000474565b9150620005548362000474565b9250817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff048311821515161562000590576200058f6200050b565b5b828202905092915050565b6126fe80620005ab6000396000f3fe60806040526004361061011f5760003560e01c806391d14854116100a0578063a647f7f911610064578063a647f7f914610394578063b8a67c3c146103bd578063d547741f146103e8578063e025ede914610411578063ea90db041461043c5761011f565b806391d14854146102bb578063a217fddf146102f8578063a3fbb22f14610323578063a581a1b51461034e578063a5b836351461037d5761011f565b80632f2ff15d116100e75780632f2ff15d1461021057806336568abe146102395780636fa533f0146102625780637e306053146102795780638d086da4146102a45761011f565b806301ffc9a7146101245780630cbb915714610161578063117803e31461017d5780631e61e747146101a8578063248a9ca3146101d3575b600080fd5b34801561013057600080fd5b5061014b60048036038101906101469190611850565b610453565b6040516101589190611898565b60405180910390f35b61017b60048036038101906101769190611a6a565b6104cd565b005b34801561018957600080fd5b506101926107f4565b60405161019f9190611acc565b60405180910390f35b3480156101b457600080fd5b506101bd610818565b6040516101ca9190611acc565b60405180910390f35b3480156101df57600080fd5b506101fa60048036038101906101f59190611b13565b61083c565b6040516102079190611acc565b60405180910390f35b34801561021c57600080fd5b5061023760048036038101906102329190611b7e565b61085b565b005b34801561024557600080fd5b50610260600480360381019061025b9190611b7e565b610884565b005b34801561026e57600080fd5b50610277610907565b005b34801561028557600080fd5b5061028e610aa8565b60405161029b9190611acc565b60405180910390f35b3480156102b057600080fd5b506102b9610acc565b005b3480156102c757600080fd5b506102e260048036038101906102dd9190611b7e565b610d8c565b6040516102ef9190611898565b60405180910390f35b34801561030457600080fd5b5061030d610df6565b60405161031a9190611acc565b60405180910390f35b34801561032f57600080fd5b50610338610dfd565b6040516103459190611bd7565b60405180910390f35b34801561035a57600080fd5b50610363610e03565b604051610374959493929190611c01565b60405180910390f35b34801561038957600080fd5b50610392610e74565b005b3480156103a057600080fd5b506103bb60048036038101906103b69190611c54565b611021565b005b3480156103c957600080fd5b506103d2611089565b6040516103df9190611bd7565b60405180910390f35b3480156103f457600080fd5b5061040f600480360381019061040a9190611b7e565b61108f565b005b34801561041d57600080fd5b506104266110b8565b6040516104339190611bd7565b60405180910390f35b34801561044857600080fd5b506104516110be565b005b60007f7965db0b000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614806104c657506104c582611173565b5b9050919050565b7f6270edb7c868f86fda4adedba75108201087268ea345934db8bad688e1feb91b6104ff816104fa6111dd565b6111e5565b600280018054905060646105139190611cb0565b825110610555576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161054c90611d41565b60405180910390fd5b60005b825181101561073657600260010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168382815181106105b0576105af611d61565b5b602002602001015173ffffffffffffffffffffffffffffffffffffffff16141561060f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161060690611ddc565b60405180910390fd5b6106537fdd3cf490277a2ed9b8e9d23db09c21bd229077712bc2c8266158d0d92288625a84838151811061064657610645611d61565b5b602002602001015161085b565b6002800183828151811061066a57610669611d61565b5b60200260200101519080600181540180825580915050600190039060005260206000200160009091909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055507f1074965ff6d551d72a2dcc2fe4330c826a790eed65c66729a7781afe9d652b7c83828151811061070657610705611d61565b5b602002602001015160405161071b9190611e5b565b60405180910390a1808061072e90611e76565b915050610558565b5061073f611282565b63259806004261074f9190611ebf565b600a819055507f55a82618f296911b3620f4d10814f53bc9f4e5dc96a9094f21a99d850e993d0e600260000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600260010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600260050154600047600954600854600a546040516107e8989796959493929190611f15565b60405180910390a15050565b7f6270edb7c868f86fda4adedba75108201087268ea345934db8bad688e1feb91b81565b7f26e23ce6b85ff9f368ed1b385a304e4efb5cb11dbc90b57bc31457871b754ae681565b6000806000838152602001908152602001600020600101549050919050565b6108648261083c565b610875816108706111dd565b6111e5565b61087f83836112c3565b505050565b61088c6111dd565b73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16146108f9576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108f090612005565b60405180910390fd5b61090382826113a3565b5050565b60004711801561091e575060006002800180549050115b61095d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161095490612071565b60405180910390fd5b7f55a82618f296911b3620f4d10814f53bc9f4e5dc96a9094f21a99d850e993d0e600260000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600260010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600260050154600260040160009054906101000a900460ff1647600954600854600a54604051610a01989796959493929190611f15565b60405180910390a160005b6002800180549050811015610aa5577f1d18168af95e1668f75d2548acc3aa5b9a16853f783d4ac00e4e12b616a152cc600280018281548110610a5257610a51611d61565b5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16604051610a8a9190611e5b565b60405180910390a18080610a9d90611e76565b915050610a0c565b50565b7fdd3cf490277a2ed9b8e9d23db09c21bd229077712bc2c8266158d0d92288625a81565b7fdd3cf490277a2ed9b8e9d23db09c21bd229077712bc2c8266158d0d92288625a610afe81610af96111dd565b6111e5565b60026001541415610b44576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b3b906120dd565b60405180910390fd5b6002600181905550600047118015610b63575060006002800180549050115b610ba2576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b9990612071565b60405180910390fd5b600260040160009054906101000a900460ff16610bf4576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610beb90612149565b60405180910390fd5b600260050154421015610c3c576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c33906121b5565b60405180910390fd5b7fbfbf1d841bf0c1baf72c66b5c30793027a1324428319c895f43624e3f20df4194760085460095433604051610c7594939291906121e4565b60405180910390a160005b6002800180549050811015610d4d57600280018181548110610ca557610ca4611d61565b5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16600954604051610cf59061225a565b60006040518083038185875af1925050503d8060008114610d32576040519150601f19603f3d011682016040523d82523d6000602084013e610d37565b606091505b5050508080610d4590611e76565b915050610c80565b50600260010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b600080600084815260200190815260200160002060000160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b6000801b81565b60095481565b60028060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060030154908060040160009054906101000a900460ff16908060050154905085565b7f26e23ce6b85ff9f368ed1b385a304e4efb5cb11dbc90b57bc31457871b754ae6610ea681610ea16111dd565b6111e5565b600047118015610ebd575060006002800180549050115b610efc576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610ef390612071565b60405180910390fd5b60001515600260040160009054906101000a900460ff16151514610f55576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610f4c906122bb565b60405180910390fd5b60026003015442610f669190611ebf565b6002600501819055506001600260040160006101000a81548160ff021916908315150217905550610f95611282565b7f34a4fc9c8f1ad8b9dafcdddf9bac9a9f5b5edff854223b5a4162dded356900c3600260040160009054906101000a900460ff16600260030154600260010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600260050154476002800180549050604051611016969594939291906122db565b60405180910390a150565b7f6270edb7c868f86fda4adedba75108201087268ea345934db8bad688e1feb91b6110538161104e6111dd565b6111e5565b6000600260040160006101000a81548160ff021916908315150217905550600060026005018190555061108582611484565b5050565b600a5481565b6110988261083c565b6110a9816110a46111dd565b6111e5565b6110b383836113a3565b505050565b60085481565b7f6270edb7c868f86fda4adedba75108201087268ea345934db8bad688e1feb91b6110f0816110eb6111dd565b6111e5565b600a54421015611135576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161112c90612388565b60405180910390fd5b600260000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b60007f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149050919050565b600033905090565b6111ef8282610d8c565b61127e576112148173ffffffffffffffffffffffffffffffffffffffff1660146115a8565b6112228360001c60206115a8565b6040516020016112339291906124ba565b6040516020818303038152906040526040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611275919061252d565b60405180910390fd5b5050565b600060028001805490509050600a4761129b919061257e565b60088190555080600854476112b09190611cb0565b6112ba919061257e565b60098190555050565b6112cd8282610d8c565b61139f57600160008084815260200190815260200160002060000160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055506113446111dd565b73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45b5050565b6113ad8282610d8c565b1561148057600080600084815260200190815260200160002060000160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055506114256111dd565b73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16837ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b60405160405180910390a45b5050565b6000600260010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905081600260010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555061151c7f26e23ce6b85ff9f368ed1b385a304e4efb5cb11dbc90b57bc31457871b754ae68261108f565b61156b7f26e23ce6b85ff9f368ed1b385a304e4efb5cb11dbc90b57bc31457871b754ae6600260010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1661085b565b7f31497e8f7f35cf8f2fd2f66275fa20a7d4ad22dc5eb7ab422e73180c7d0898ed818360405161159c9291906125af565b60405180910390a15050565b6060600060028360026115bb91906125d8565b6115c59190611ebf565b67ffffffffffffffff8111156115de576115dd6118c9565b5b6040519080825280601f01601f1916602001820160405280156116105781602001600182028036833780820191505090505b5090507f30000000000000000000000000000000000000000000000000000000000000008160008151811061164857611647611d61565b5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a9053507f7800000000000000000000000000000000000000000000000000000000000000816001815181106116ac576116ab611d61565b5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a905350600060018460026116ec91906125d8565b6116f69190611ebf565b90505b6001811115611796577f3031323334353637383961626364656600000000000000000000000000000000600f86166010811061173857611737611d61565b5b1a60f81b82828151811061174f5761174e611d61565b5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a905350600485901c94508061178f90612632565b90506116f9565b50600084146117da576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016117d1906126a8565b60405180910390fd5b8091505092915050565b6000604051905090565b600080fd5b600080fd5b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b61182d816117f8565b811461183857600080fd5b50565b60008135905061184a81611824565b92915050565b600060208284031215611866576118656117ee565b5b60006118748482850161183b565b91505092915050565b60008115159050919050565b6118928161187d565b82525050565b60006020820190506118ad6000830184611889565b92915050565b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b611901826118b8565b810181811067ffffffffffffffff821117156119205761191f6118c9565b5b80604052505050565b60006119336117e4565b905061193f82826118f8565b919050565b600067ffffffffffffffff82111561195f5761195e6118c9565b5b602082029050602081019050919050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006119a082611975565b9050919050565b6119b081611995565b81146119bb57600080fd5b50565b6000813590506119cd816119a7565b92915050565b60006119e66119e184611944565b611929565b90508083825260208201905060208402830185811115611a0957611a08611970565b5b835b81811015611a325780611a1e88826119be565b845260208401935050602081019050611a0b565b5050509392505050565b600082601f830112611a5157611a506118b3565b5b8135611a618482602086016119d3565b91505092915050565b600060208284031215611a8057611a7f6117ee565b5b600082013567ffffffffffffffff811115611a9e57611a9d6117f3565b5b611aaa84828501611a3c565b91505092915050565b6000819050919050565b611ac681611ab3565b82525050565b6000602082019050611ae16000830184611abd565b92915050565b611af081611ab3565b8114611afb57600080fd5b50565b600081359050611b0d81611ae7565b92915050565b600060208284031215611b2957611b286117ee565b5b6000611b3784828501611afe565b91505092915050565b6000611b4b82611975565b9050919050565b611b5b81611b40565b8114611b6657600080fd5b50565b600081359050611b7881611b52565b92915050565b60008060408385031215611b9557611b946117ee565b5b6000611ba385828601611afe565b9250506020611bb485828601611b69565b9150509250929050565b6000819050919050565b611bd181611bbe565b82525050565b6000602082019050611bec6000830184611bc8565b92915050565b611bfb81611995565b82525050565b600060a082019050611c166000830188611bf2565b611c236020830187611bf2565b611c306040830186611bc8565b611c3d6060830185611889565b611c4a6080830184611bc8565b9695505050505050565b600060208284031215611c6a57611c696117ee565b5b6000611c78848285016119be565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000611cbb82611bbe565b9150611cc683611bbe565b925082821015611cd957611cd8611c81565b5b828203905092915050565b600082825260208201905092915050565b7f4d61782070617965657320697473203130300000000000000000000000000000600082015250565b6000611d2b601283611ce4565b9150611d3682611cf5565b602082019050919050565b60006020820190508181036000830152611d5a81611d1e565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f546865206c61777965722063616e7420626520616c736f206120706179656500600082015250565b6000611dc6601f83611ce4565b9150611dd182611d90565b602082019050919050565b60006020820190508181036000830152611df581611db9565b9050919050565b6000819050919050565b6000611e21611e1c611e1784611975565b611dfc565b611975565b9050919050565b6000611e3382611e06565b9050919050565b6000611e4582611e28565b9050919050565b611e5581611e3a565b82525050565b6000602082019050611e706000830184611e4c565b92915050565b6000611e8182611bbe565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff821415611eb457611eb3611c81565b5b600182019050919050565b6000611eca82611bbe565b9150611ed583611bbe565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03821115611f0a57611f09611c81565b5b828201905092915050565b600061010082019050611f2b600083018b611e4c565b611f38602083018a611e4c565b611f456040830189611bc8565b611f526060830188611889565b611f5f6080830187611bc8565b611f6c60a0830186611bc8565b611f7960c0830185611bc8565b611f8660e0830184611bc8565b9998505050505050505050565b7f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560008201527f20726f6c657320666f722073656c660000000000000000000000000000000000602082015250565b6000611fef602f83611ce4565b9150611ffa82611f93565b604082019050919050565b6000602082019050818103600083015261201e81611fe2565b9050919050565b7f546869732077696c6c20686173206e6f74206265656e20736574207570000000600082015250565b600061205b601d83611ce4565b915061206682612025565b602082019050919050565b6000602082019050818103600083015261208a8161204e565b9050919050565b7f5265656e7472616e637947756172643a207265656e7472616e742063616c6c00600082015250565b60006120c7601f83611ce4565b91506120d282612091565b602082019050919050565b600060208201905081810360008301526120f6816120ba565b9050919050565b7f57696c6c206861736e74206265656e2065786563757465642079657400000000600082015250565b6000612133601c83611ce4565b915061213e826120fd565b602082019050919050565b6000602082019050818103600083015261216281612126565b9050919050565b7f57696c6c206861736e74206265656e20756e6c6f636b65642079657400000000600082015250565b600061219f601c83611ce4565b91506121aa82612169565b602082019050919050565b600060208201905081810360008301526121ce81612192565b9050919050565b6121de81611b40565b82525050565b60006080820190506121f96000830187611bc8565b6122066020830186611bc8565b6122136040830185611bc8565b61222060608301846121d5565b95945050505050565b600081905092915050565b50565b6000612244600083612229565b915061224f82612234565b600082019050919050565b600061226582612237565b9150819050919050565b7f416c726561647920686173206265656e20657865637574656400000000000000600082015250565b60006122a5601983611ce4565b91506122b08261226f565b602082019050919050565b600060208201905081810360008301526122d481612298565b9050919050565b600060c0820190506122f06000830189611889565b6122fd6020830188611bc8565b61230a6040830187611e4c565b6123176060830186611bc8565b6123246080830185611bc8565b61233160a0830184611bc8565b979650505050505050565b7f45787069726163792064617465206861736e7420706173736564207965740000600082015250565b6000612372601e83611ce4565b915061237d8261233c565b602082019050919050565b600060208201905081810360008301526123a181612365565b9050919050565b600081905092915050565b7f416363657373436f6e74726f6c3a206163636f756e7420000000000000000000600082015250565b60006123e96017836123a8565b91506123f4826123b3565b601782019050919050565b600081519050919050565b60005b8381101561242857808201518184015260208101905061240d565b83811115612437576000848401525b50505050565b6000612448826123ff565b61245281856123a8565b935061246281856020860161240a565b80840191505092915050565b7f206973206d697373696e6720726f6c6520000000000000000000000000000000600082015250565b60006124a46011836123a8565b91506124af8261246e565b601182019050919050565b60006124c5826123dc565b91506124d1828561243d565b91506124dc82612497565b91506124e8828461243d565b91508190509392505050565b60006124ff826123ff565b6125098185611ce4565b935061251981856020860161240a565b612522816118b8565b840191505092915050565b6000602082019050818103600083015261254781846124f4565b905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b600061258982611bbe565b915061259483611bbe565b9250826125a4576125a361254f565b5b828204905092915050565b60006040820190506125c460008301856121d5565b6125d16020830184611e4c565b9392505050565b60006125e382611bbe565b91506125ee83611bbe565b9250817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff048311821515161561262757612626611c81565b5b828202905092915050565b600061263d82611bbe565b9150600082141561265157612650611c81565b5b600182039050919050565b7f537472696e67733a20686578206c656e67746820696e73756666696369656e74600082015250565b6000612692602083611ce4565b915061269d8261265c565b602082019050919050565b600060208201905081810360008301526126c181612685565b905091905056fea2646970667358221220fe9827c6ccece00f3feb004cb9c4ccca0e248ba1db5377e39e9663ad5f93d88764736f6c634300080a0033";

type WillConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: WillConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Will__factory extends ContractFactory {
  constructor(...args: WillConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "Will";
  }

  deploy(
    _testator: string,
    _lawyer: string,
    _waitTime: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<Will> {
    return super.deploy(
      _testator,
      _lawyer,
      _waitTime,
      overrides || {}
    ) as Promise<Will>;
  }
  getDeployTransaction(
    _testator: string,
    _lawyer: string,
    _waitTime: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      _testator,
      _lawyer,
      _waitTime,
      overrides || {}
    );
  }
  attach(address: string): Will {
    return super.attach(address) as Will;
  }
  connect(signer: Signer): Will__factory {
    return super.connect(signer) as Will__factory;
  }
  static readonly contractName: "Will";
  public readonly contractName: "Will";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): WillInterface {
    return new utils.Interface(_abi) as WillInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): Will {
    return new Contract(address, _abi, signerOrProvider) as Will;
  }
}
