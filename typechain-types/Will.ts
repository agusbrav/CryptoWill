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
    "ERC20TokensSupplied(address)": EventFragment;
    "NFTWithdrawn(address,address,uint256)": EventFragment;
    "NFTsApproved(address,uint256[])": EventFragment;
    "PayeeChecked(address)": EventFragment;
    "RoleAdminChanged(bytes32,bytes32,bytes32)": EventFragment;
    "RoleGranted(bytes32,address,address)": EventFragment;
    "RoleRevoked(bytes32,address,address)": EventFragment;
    "SharesWithdrawn(uint256,address)": EventFragment;
    "TokenWithdrawn(address,address,uint256)": EventFragment;
    "WillExecuted(bool,uint256,address,uint256,uint256,uint256)": EventFragment;
    "WillReport(address,address,uint256,bool,uint256,uint256,uint256)": EventFragment;
    "WillReseted()": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "ApprovedPayees"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ChangedExecutor"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ERC20TokensSupplied"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "NFTWithdrawn"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "NFTsApproved"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "PayeeChecked"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RoleAdminChanged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RoleGranted"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RoleRevoked"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SharesWithdrawn"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "TokenWithdrawn"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "WillExecuted"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "WillReport"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "WillReseted"): EventFragment;
}

export type ApprovedPayeesEvent = TypedEvent<[string[]], { payees: string[] }>;

export type ApprovedPayeesEventFilter = TypedEventFilter<ApprovedPayeesEvent>;

export type ChangedExecutorEvent = TypedEvent<
  [string, string],
  { oldExecutor: string; newExecutor: string }
>;

export type ChangedExecutorEventFilter = TypedEventFilter<ChangedExecutorEvent>;

export type ERC20TokensSuppliedEvent = TypedEvent<
  [string],
  { tokenAddress: string }
>;

export type ERC20TokensSuppliedEventFilter =
  TypedEventFilter<ERC20TokensSuppliedEvent>;

export type NFTWithdrawnEvent = TypedEvent<
  [string, string, BigNumber],
  { nft: string; caller: string; id: BigNumber }
>;

export type NFTWithdrawnEventFilter = TypedEventFilter<NFTWithdrawnEvent>;

export type NFTsApprovedEvent = TypedEvent<
  [string, BigNumber[]],
  { nftContract: string; tokenId: BigNumber[] }
>;

export type NFTsApprovedEventFilter = TypedEventFilter<NFTsApprovedEvent>;

export type PayeeCheckedEvent = TypedEvent<[string], { payee: string }>;

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
  [BigNumber, string],
  { ethPerPayee: BigNumber; caller: string }
>;

export type SharesWithdrawnEventFilter = TypedEventFilter<SharesWithdrawnEvent>;

export type TokenWithdrawnEvent = TypedEvent<
  [string, string, BigNumber],
  { token: string; caller: string; amount: BigNumber }
>;

export type TokenWithdrawnEventFilter = TypedEventFilter<TokenWithdrawnEvent>;

export type WillExecutedEvent = TypedEvent<
  [boolean, BigNumber, string, BigNumber, BigNumber, BigNumber],
  {
    exec: boolean;
    time: BigNumber;
    executor: string;
    unlockTime: BigNumber;
    totalBalance: BigNumber;
    numberOfPayees: BigNumber;
  }
>;

export type WillExecutedEventFilter = TypedEventFilter<WillExecutedEvent>;

export type WillReportEvent = TypedEvent<
  [string, string, BigNumber, boolean, BigNumber, BigNumber, BigNumber],
  {
    owner: string;
    executor: string;
    unlockTime: BigNumber;
    withdrawAvailable: boolean;
    totalBalance: BigNumber;
    correspondingEth: BigNumber;
    executorFee: BigNumber;
  }
>;

export type WillReportEventFilter = TypedEventFilter<WillReportEvent>;

export type WillResetedEvent = TypedEvent<[], {}>;

export type WillResetedEventFilter = TypedEventFilter<WillResetedEvent>;

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
      overrides?: CallOverrides
    ): Promise<
      [string, string, BigNumber, boolean, BigNumber] & {
        _testator: string;
        _executor: string;
        _unlockTime: BigNumber;
        _executed: boolean;
        _ethBalance: BigNumber;
      }
    >;

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
    overrides?: CallOverrides
  ): Promise<
    [string, string, BigNumber, boolean, BigNumber] & {
      _testator: string;
      _executor: string;
      _unlockTime: BigNumber;
      _executed: boolean;
      _ethBalance: BigNumber;
    }
  >;

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

    willStatus(
      overrides?: CallOverrides
    ): Promise<
      [string, string, BigNumber, boolean, BigNumber] & {
        _testator: string;
        _executor: string;
        _unlockTime: BigNumber;
        _executed: boolean;
        _ethBalance: BigNumber;
      }
    >;

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
    "ApprovedPayees(address[])"(payees?: null): ApprovedPayeesEventFilter;
    ApprovedPayees(payees?: null): ApprovedPayeesEventFilter;

    "ChangedExecutor(address,address)"(
      oldExecutor?: null,
      newExecutor?: null
    ): ChangedExecutorEventFilter;
    ChangedExecutor(
      oldExecutor?: null,
      newExecutor?: null
    ): ChangedExecutorEventFilter;

    "ERC20TokensSupplied(address)"(
      tokenAddress?: null
    ): ERC20TokensSuppliedEventFilter;
    ERC20TokensSupplied(tokenAddress?: null): ERC20TokensSuppliedEventFilter;

    "NFTWithdrawn(address,address,uint256)"(
      nft?: null,
      caller?: null,
      id?: null
    ): NFTWithdrawnEventFilter;
    NFTWithdrawn(nft?: null, caller?: null, id?: null): NFTWithdrawnEventFilter;

    "NFTsApproved(address,uint256[])"(
      nftContract?: null,
      tokenId?: null
    ): NFTsApprovedEventFilter;
    NFTsApproved(nftContract?: null, tokenId?: null): NFTsApprovedEventFilter;

    "PayeeChecked(address)"(payee?: null): PayeeCheckedEventFilter;
    PayeeChecked(payee?: null): PayeeCheckedEventFilter;

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

    "SharesWithdrawn(uint256,address)"(
      ethPerPayee?: null,
      caller?: null
    ): SharesWithdrawnEventFilter;
    SharesWithdrawn(
      ethPerPayee?: null,
      caller?: null
    ): SharesWithdrawnEventFilter;

    "TokenWithdrawn(address,address,uint256)"(
      token?: null,
      caller?: null,
      amount?: null
    ): TokenWithdrawnEventFilter;
    TokenWithdrawn(
      token?: null,
      caller?: null,
      amount?: null
    ): TokenWithdrawnEventFilter;

    "WillExecuted(bool,uint256,address,uint256,uint256,uint256)"(
      exec?: null,
      time?: null,
      executor?: null,
      unlockTime?: null,
      totalBalance?: null,
      numberOfPayees?: null
    ): WillExecutedEventFilter;
    WillExecuted(
      exec?: null,
      time?: null,
      executor?: null,
      unlockTime?: null,
      totalBalance?: null,
      numberOfPayees?: null
    ): WillExecutedEventFilter;

    "WillReport(address,address,uint256,bool,uint256,uint256,uint256)"(
      owner?: null,
      executor?: null,
      unlockTime?: null,
      withdrawAvailable?: null,
      totalBalance?: null,
      correspondingEth?: null,
      executorFee?: null
    ): WillReportEventFilter;
    WillReport(
      owner?: null,
      executor?: null,
      unlockTime?: null,
      withdrawAvailable?: null,
      totalBalance?: null,
      correspondingEth?: null,
      executorFee?: null
    ): WillReportEventFilter;

    "WillReseted()"(): WillResetedEventFilter;
    WillReseted(): WillResetedEventFilter;
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

    willStatus(overrides?: CallOverrides): Promise<BigNumber>;

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

    willStatus(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    willTokens(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    withdrawShares(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
