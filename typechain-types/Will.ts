/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { EventFragment, FunctionFragment, Result } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import { OnEvent, TypedEvent, TypedEventFilter, TypedListener } from "./common";

export declare namespace Will {
  export type WillTokenStruct = {
    token: string;
    correspondingTokens: BigNumberish;
    tokenBalance: BigNumberish;
  };

  export type WillTokenStructOutput = [string, BigNumber, BigNumber] & {
    token: string;
    correspondingTokens: BigNumber;
    tokenBalance: BigNumber;
  };
}

export interface WillInterface extends utils.Interface {
  contractName: "Will";
  functions: {
    "DEFAULT_ADMIN_ROLE()": FunctionFragment;
    "checkedPayees(uint256)": FunctionFragment;
    "correspondingEth()": FunctionFragment;
    "executeWill()": FunctionFragment;
    "executorFee()": FunctionFragment;
    "getRoleAdmin(bytes32)": FunctionFragment;
    "grantRole(bytes32,address)": FunctionFragment;
    "hasRole(bytes32,address)": FunctionFragment;
    "renounceRole(bytes32,address)": FunctionFragment;
    "replaceExecutor(address)": FunctionFragment;
    "resetWill()": FunctionFragment;
    "revokeRole(bytes32,address)": FunctionFragment;
    "revokeWill()": FunctionFragment;
    "setWill(address[])": FunctionFragment;
    "setWillNFTs(address,uint256[],address)": FunctionFragment;
    "setWillToken(address[])": FunctionFragment;
    "supportsInterface(bytes4)": FunctionFragment;
    "willManuscript()": FunctionFragment;
    "willNFTs(address,uint256)": FunctionFragment;
    "willStatus()": FunctionFragment;
    "willTokens(uint256)": FunctionFragment;
    "withdrawShares()": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "DEFAULT_ADMIN_ROLE",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "checkedPayees",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "correspondingEth",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "executeWill",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "executorFee",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getRoleAdmin",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "grantRole",
    values: [BytesLike, string]
  ): string;
  encodeFunctionData(
    functionFragment: "hasRole",
    values: [BytesLike, string]
  ): string;
  encodeFunctionData(
    functionFragment: "renounceRole",
    values: [BytesLike, string]
  ): string;
  encodeFunctionData(
    functionFragment: "replaceExecutor",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "resetWill", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "revokeRole",
    values: [BytesLike, string]
  ): string;
  encodeFunctionData(
    functionFragment: "revokeWill",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "setWill", values: [string[]]): string;
  encodeFunctionData(
    functionFragment: "setWillNFTs",
    values: [string, BigNumberish[], string]
  ): string;
  encodeFunctionData(
    functionFragment: "setWillToken",
    values: [string[]]
  ): string;
  encodeFunctionData(
    functionFragment: "supportsInterface",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "willManuscript",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "willNFTs",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "willStatus",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "willTokens",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawShares",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "DEFAULT_ADMIN_ROLE",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "checkedPayees",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "correspondingEth",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "executeWill",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "executorFee",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getRoleAdmin",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "grantRole", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "hasRole", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceRole",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "replaceExecutor",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "resetWill", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "revokeRole", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "revokeWill", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setWill", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setWillNFTs",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setWillToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "supportsInterface",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "willManuscript",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "willNFTs", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "willStatus", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "willTokens", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "withdrawShares",
    data: BytesLike
  ): Result;

  events: {
    "ApprovedPayees(address[])": EventFragment;
    "ChangedExecutor(address,address)": EventFragment;
    "ERC20TokensSupplied(tuple[])": EventFragment;
    "NFTsApproved(address,uint256[])": EventFragment;
    "PayeeChecked(address)": EventFragment;
    "RoleAdminChanged(bytes32,bytes32,bytes32)": EventFragment;
    "RoleGranted(bytes32,address,address)": EventFragment;
    "RoleRevoked(bytes32,address,address)": EventFragment;
    "SharesWithdrawn(uint256,uint256,uint256,address,tuple[])": EventFragment;
    "WillExecuted(bool,uint256,address,uint256,uint256,uint256)": EventFragment;
    "WillReport(address,address,uint256,bool,uint256,uint256,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "ApprovedPayees"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ChangedExecutor"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ERC20TokensSupplied"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "NFTsApproved"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "PayeeChecked"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RoleAdminChanged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RoleGranted"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RoleRevoked"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SharesWithdrawn"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "WillExecuted"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "WillReport"): EventFragment;
}

export type ApprovedPayeesEvent = TypedEvent<[string[]], { _payees: string[] }>;

export type ApprovedPayeesEventFilter = TypedEventFilter<ApprovedPayeesEvent>;

export type ChangedExecutorEvent = TypedEvent<
  [string, string],
  { _oldExecutor: string; _newExecutor: string }
>;

export type ChangedExecutorEventFilter = TypedEventFilter<ChangedExecutorEvent>;

export type ERC20TokensSuppliedEvent = TypedEvent<
  [Will.WillTokenStructOutput[]],
  { _tokens: Will.WillTokenStructOutput[] }
>;

export type ERC20TokensSuppliedEventFilter =
  TypedEventFilter<ERC20TokensSuppliedEvent>;

export type NFTsApprovedEvent = TypedEvent<
  [string, BigNumber[]],
  { _nftContract: string; _tokenId: BigNumber[] }
>;

export type NFTsApprovedEventFilter = TypedEventFilter<NFTsApprovedEvent>;

export type PayeeCheckedEvent = TypedEvent<[string], { _payee: string }>;

export type PayeeCheckedEventFilter = TypedEventFilter<PayeeCheckedEvent>;

export type RoleAdminChangedEvent = TypedEvent<
  [string, string, string],
  { role: string; previousAdminRole: string; newAdminRole: string }
>;

export type RoleAdminChangedEventFilter =
  TypedEventFilter<RoleAdminChangedEvent>;

export type RoleGrantedEvent = TypedEvent<
  [string, string, string],
  { role: string; account: string; sender: string }
>;

export type RoleGrantedEventFilter = TypedEventFilter<RoleGrantedEvent>;

export type RoleRevokedEvent = TypedEvent<
  [string, string, string],
  { role: string; account: string; sender: string }
>;

export type RoleRevokedEventFilter = TypedEventFilter<RoleRevokedEvent>;

export type SharesWithdrawnEvent = TypedEvent<
  [BigNumber, BigNumber, BigNumber, string, Will.WillTokenStructOutput[]],
  {
    _totalAmount: BigNumber;
    _executorFee: BigNumber;
    _ethPerPayee: BigNumber;
    _caller: string;
    _tokens: Will.WillTokenStructOutput[];
  }
>;

export type SharesWithdrawnEventFilter = TypedEventFilter<SharesWithdrawnEvent>;

export type WillExecutedEvent = TypedEvent<
  [boolean, BigNumber, string, BigNumber, BigNumber, BigNumber],
  {
    _exec: boolean;
    _time: BigNumber;
    _executor: string;
    _unlockTime: BigNumber;
    _totalBalance: BigNumber;
    _numberOfPayees: BigNumber;
  }
>;

export type WillExecutedEventFilter = TypedEventFilter<WillExecutedEvent>;

export type WillReportEvent = TypedEvent<
  [string, string, BigNumber, boolean, BigNumber, BigNumber, BigNumber],
  {
    _owner: string;
    _executor: string;
    _unlockTime: BigNumber;
    _withdrawAvailable: boolean;
    _totalBalance: BigNumber;
    _correspondingEth: BigNumber;
    _executorFee: BigNumber;
  }
>;

export type WillReportEventFilter = TypedEventFilter<WillReportEvent>;

export interface Will extends BaseContract {
  contractName: "Will";
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: WillInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<[string]>;

    checkedPayees(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;

    correspondingEth(overrides?: CallOverrides): Promise<[BigNumber]>;

    executeWill(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    executorFee(overrides?: CallOverrides): Promise<[BigNumber]>;

    getRoleAdmin(role: BytesLike, overrides?: CallOverrides): Promise<[string]>;

    grantRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    hasRole(
      role: BytesLike,
      account: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    renounceRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    replaceExecutor(
      _newExecutor: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    resetWill(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    revokeRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    revokeWill(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setWill(
      _payeesAdd: string[],
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setWillNFTs(
      _nftContract: string,
      _tokenId: BigNumberish[],
      _payee: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setWillToken(
      _tokenContract: string[],
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    willManuscript(
      overrides?: CallOverrides
    ): Promise<
      [string, string, boolean, BigNumber, BigNumber] & {
        testator: string;
        executor: string;
        executed: boolean;
        waitTime: BigNumber;
        unlockTime: BigNumber;
      }
    >;

    willNFTs(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string, BigNumber] & { nft: string; id: BigNumber }>;

    willStatus(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    willTokens(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [string, BigNumber, BigNumber] & {
        token: string;
        correspondingTokens: BigNumber;
        tokenBalance: BigNumber;
      }
    >;

    withdrawShares(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<string>;

  checkedPayees(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>;

  correspondingEth(overrides?: CallOverrides): Promise<BigNumber>;

  executeWill(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  executorFee(overrides?: CallOverrides): Promise<BigNumber>;

  getRoleAdmin(role: BytesLike, overrides?: CallOverrides): Promise<string>;

  grantRole(
    role: BytesLike,
    account: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  hasRole(
    role: BytesLike,
    account: string,
    overrides?: CallOverrides
  ): Promise<boolean>;

  renounceRole(
    role: BytesLike,
    account: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  replaceExecutor(
    _newExecutor: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  resetWill(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  revokeRole(
    role: BytesLike,
    account: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  revokeWill(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setWill(
    _payeesAdd: string[],
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setWillNFTs(
    _nftContract: string,
    _tokenId: BigNumberish[],
    _payee: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setWillToken(
    _tokenContract: string[],
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  supportsInterface(
    interfaceId: BytesLike,
    overrides?: CallOverrides
  ): Promise<boolean>;

  willManuscript(
    overrides?: CallOverrides
  ): Promise<
    [string, string, boolean, BigNumber, BigNumber] & {
      testator: string;
      executor: string;
      executed: boolean;
      waitTime: BigNumber;
      unlockTime: BigNumber;
    }
  >;

  willNFTs(
    arg0: string,
    arg1: BigNumberish,
    overrides?: CallOverrides
  ): Promise<[string, BigNumber] & { nft: string; id: BigNumber }>;

  willStatus(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  willTokens(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [string, BigNumber, BigNumber] & {
      token: string;
      correspondingTokens: BigNumber;
      tokenBalance: BigNumber;
    }
  >;

  withdrawShares(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<string>;

    checkedPayees(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    correspondingEth(overrides?: CallOverrides): Promise<BigNumber>;

    executeWill(overrides?: CallOverrides): Promise<void>;

    executorFee(overrides?: CallOverrides): Promise<BigNumber>;

    getRoleAdmin(role: BytesLike, overrides?: CallOverrides): Promise<string>;

    grantRole(
      role: BytesLike,
      account: string,
      overrides?: CallOverrides
    ): Promise<void>;

    hasRole(
      role: BytesLike,
      account: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    renounceRole(
      role: BytesLike,
      account: string,
      overrides?: CallOverrides
    ): Promise<void>;

    replaceExecutor(
      _newExecutor: string,
      overrides?: CallOverrides
    ): Promise<void>;

    resetWill(overrides?: CallOverrides): Promise<void>;

    revokeRole(
      role: BytesLike,
      account: string,
      overrides?: CallOverrides
    ): Promise<void>;

    revokeWill(overrides?: CallOverrides): Promise<void>;

    setWill(_payeesAdd: string[], overrides?: CallOverrides): Promise<void>;

    setWillNFTs(
      _nftContract: string,
      _tokenId: BigNumberish[],
      _payee: string,
      overrides?: CallOverrides
    ): Promise<void>;

    setWillToken(
      _tokenContract: string[],
      overrides?: CallOverrides
    ): Promise<void>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<boolean>;

    willManuscript(
      overrides?: CallOverrides
    ): Promise<
      [string, string, boolean, BigNumber, BigNumber] & {
        testator: string;
        executor: string;
        executed: boolean;
        waitTime: BigNumber;
        unlockTime: BigNumber;
      }
    >;

    willNFTs(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string, BigNumber] & { nft: string; id: BigNumber }>;

    willStatus(overrides?: CallOverrides): Promise<void>;

    willTokens(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [string, BigNumber, BigNumber] & {
        token: string;
        correspondingTokens: BigNumber;
        tokenBalance: BigNumber;
      }
    >;

    withdrawShares(overrides?: CallOverrides): Promise<void>;
  };

  filters: {
    "ApprovedPayees(address[])"(_payees?: null): ApprovedPayeesEventFilter;
    ApprovedPayees(_payees?: null): ApprovedPayeesEventFilter;

    "ChangedExecutor(address,address)"(
      _oldExecutor?: null,
      _newExecutor?: null
    ): ChangedExecutorEventFilter;
    ChangedExecutor(
      _oldExecutor?: null,
      _newExecutor?: null
    ): ChangedExecutorEventFilter;

    "ERC20TokensSupplied(tuple[])"(
      _tokens?: null
    ): ERC20TokensSuppliedEventFilter;
    ERC20TokensSupplied(_tokens?: null): ERC20TokensSuppliedEventFilter;

    "NFTsApproved(address,uint256[])"(
      _nftContract?: null,
      _tokenId?: null
    ): NFTsApprovedEventFilter;
    NFTsApproved(_nftContract?: null, _tokenId?: null): NFTsApprovedEventFilter;

    "PayeeChecked(address)"(_payee?: null): PayeeCheckedEventFilter;
    PayeeChecked(_payee?: null): PayeeCheckedEventFilter;

    "RoleAdminChanged(bytes32,bytes32,bytes32)"(
      role?: BytesLike | null,
      previousAdminRole?: BytesLike | null,
      newAdminRole?: BytesLike | null
    ): RoleAdminChangedEventFilter;
    RoleAdminChanged(
      role?: BytesLike | null,
      previousAdminRole?: BytesLike | null,
      newAdminRole?: BytesLike | null
    ): RoleAdminChangedEventFilter;

    "RoleGranted(bytes32,address,address)"(
      role?: BytesLike | null,
      account?: string | null,
      sender?: string | null
    ): RoleGrantedEventFilter;
    RoleGranted(
      role?: BytesLike | null,
      account?: string | null,
      sender?: string | null
    ): RoleGrantedEventFilter;

    "RoleRevoked(bytes32,address,address)"(
      role?: BytesLike | null,
      account?: string | null,
      sender?: string | null
    ): RoleRevokedEventFilter;
    RoleRevoked(
      role?: BytesLike | null,
      account?: string | null,
      sender?: string | null
    ): RoleRevokedEventFilter;

    "SharesWithdrawn(uint256,uint256,uint256,address,tuple[])"(
      _totalAmount?: null,
      _executorFee?: null,
      _ethPerPayee?: null,
      _caller?: null,
      _tokens?: null
    ): SharesWithdrawnEventFilter;
    SharesWithdrawn(
      _totalAmount?: null,
      _executorFee?: null,
      _ethPerPayee?: null,
      _caller?: null,
      _tokens?: null
    ): SharesWithdrawnEventFilter;

    "WillExecuted(bool,uint256,address,uint256,uint256,uint256)"(
      _exec?: null,
      _time?: null,
      _executor?: null,
      _unlockTime?: null,
      _totalBalance?: null,
      _numberOfPayees?: null
    ): WillExecutedEventFilter;
    WillExecuted(
      _exec?: null,
      _time?: null,
      _executor?: null,
      _unlockTime?: null,
      _totalBalance?: null,
      _numberOfPayees?: null
    ): WillExecutedEventFilter;

    "WillReport(address,address,uint256,bool,uint256,uint256,uint256)"(
      _owner?: null,
      _executor?: null,
      _unlockTime?: null,
      _withdrawAvailable?: null,
      _totalBalance?: null,
      _correspondingEth?: null,
      _executorFee?: null
    ): WillReportEventFilter;
    WillReport(
      _owner?: null,
      _executor?: null,
      _unlockTime?: null,
      _withdrawAvailable?: null,
      _totalBalance?: null,
      _correspondingEth?: null,
      _executorFee?: null
    ): WillReportEventFilter;
  };

  estimateGas: {
    DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<BigNumber>;

    checkedPayees(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    correspondingEth(overrides?: CallOverrides): Promise<BigNumber>;

    executeWill(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    executorFee(overrides?: CallOverrides): Promise<BigNumber>;

    getRoleAdmin(
      role: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    grantRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    hasRole(
      role: BytesLike,
      account: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    renounceRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    replaceExecutor(
      _newExecutor: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    resetWill(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    revokeRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    revokeWill(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setWill(
      _payeesAdd: string[],
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setWillNFTs(
      _nftContract: string,
      _tokenId: BigNumberish[],
      _payee: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setWillToken(
      _tokenContract: string[],
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    willManuscript(overrides?: CallOverrides): Promise<BigNumber>;

    willNFTs(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    willStatus(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    willTokens(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    withdrawShares(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    DEFAULT_ADMIN_ROLE(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    checkedPayees(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    correspondingEth(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    executeWill(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    executorFee(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getRoleAdmin(
      role: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    grantRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    hasRole(
      role: BytesLike,
      account: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    renounceRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    replaceExecutor(
      _newExecutor: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    resetWill(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    revokeRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    revokeWill(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setWill(
      _payeesAdd: string[],
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setWillNFTs(
      _nftContract: string,
      _tokenId: BigNumberish[],
      _payee: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setWillToken(
      _tokenContract: string[],
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    willManuscript(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    willNFTs(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    willStatus(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    willTokens(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    withdrawShares(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
