//SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

/**
 * @title Will Contract for Tokens and NFTs
 * @author https://github.com/agusbrav
 * @dev Once created, every Will contract will have its balance and members.
 * The creation of the contract from "WillFactory" sets up the owner and executor roles.
 */
contract Will is AccessControl, ReentrancyGuard {
    /// @dev This struct has the useful information of the contract
    struct Manuscript {
        address testator;
        address executor;
        address[] payees;
        bool executed;
        uint256 waitTime;
        uint256 unlockTime;
    }
    
    /// @dev Define the scruct that will be used to know the corresponding equity per ERC20 token (Divided in equal parts)
    struct WillToken {
        IERC20 token;
        uint256 correspondingTokens;
    }

    /// @dev Define the scruct that will be used to know the corresponding equity per ERC721 token (Divided in equal parts)
    struct WillNFT {
        IERC721 nft;
        uint256 id;
    }

    bytes32 public constant EXECUTOR = keccak256("EXECUTOR");
    bytes32 public constant PAYEE = keccak256("PAYEE");
    bytes32 public constant OWNER = keccak256("OWNER");

    uint8 public totalPayees;

    /// @dev Mapping of Payees => Each NFT assigned (Nft contract and Id)
    mapping(address => WillNFT[]) public willNFTs;

    uint256 public executorFee;
    uint256 public correspondingEth;

    WillToken[] public willTokens;
    Manuscript public willManuscript;

    /**
     * @notice WillReport event trigers all info from the manuscript
     * Can be called with WillStatus function or its called automatically after setting up the will
     */
    event WillReport(
        address _owner,
        address _executor,
        uint256 _unlockTime,
        bool _withdrawAvailable,
        uint256 _totalBalance,
        uint256 _correspondingEth,
        uint256 _executorFee
    );

    /**
     * @notice WillExecuted event will be emitted once the corresponding executor signer calls
     * the executeWill function to start counting looked time in order to claim the assets
     */
    event WillExecuted(
        bool _exec,
        uint256 _time,
        address _executor,
        uint256 _unlockTime,
        uint256 _totalBalance,
        uint256 _numberOfPayees
    );

    /**
     * @notice Once function withdrawShares is called and the conditions are met:
     * the executeWill function has been executed and unlockTime has passed.
     * Any payee member in the contract will be able to call withdrawShares to claim its assets for everyone
     * and destroy the Will. This event its emmited once and after that the contract will be destroyed.
     */
    event SharesWithdrawn(
        uint256 _totalAmount,
        uint256 _executorFee,
        uint256 _ethPerPayee,
        address _caller,
        WillToken[] _tokens
    );

    /// @notice Event emited for each payee setted up by the owner in the willStatus function
    event ApprovedPayees(address[] _payees);
    /// @notice Event emited after resetting the contract with resetWill and changing executor.
    event ChangedExecutor(address _oldExecutor, address _newExecutor);
    /// @notice Event emited from willStatus and setWillTokens for each ERC20 token in the will smart contract.
    event ERC20TokensSupplied(WillToken[] _tokens);
    /// @notice Event emited after the payee withdraw its shares. When this event its emited this address will no longer be a payee.
    event PayeeChecked(address _payee);

    /**
     * @dev The constructor sets up the roles and roles admin
     * This garantees that the main roles are set up in the creation of the smart contract
     * Once created you can add payees and change the executor but only the owner has this privileges
     */
    constructor(
        address payable _testator,
        address payable _executor,
        uint256 _waitTime
    ) {
        willManuscript.testator = _testator;
        willManuscript.executor = _executor;
        willManuscript.waitTime = _waitTime * 1 days;
        willManuscript.executed = false;
        _setupRole(OWNER, _testator);
        _setupRole(EXECUTOR, _executor);
        _setRoleAdmin(EXECUTOR, OWNER);
        _setRoleAdmin(PAYEE, OWNER);
    }

    /// The will ETH balance must be at least 0.2 ETH and have 1 payee in order to be active
    modifier activeWill() {
        require(
            address(this).balance > 0.2 ether &&
                willManuscript.payees.length > 0,
            "This will has not been set up"
        );
        require(!willManuscript.executed, "Will has already been executed");
        _;
    }

    /**
     * @dev Checks the current payees, testator, executor, execution, amount and lock time
     * Should probably manage this status throug events
     */
    function willStatus() public {
        emit WillReport(
            willManuscript.testator,
            willManuscript.executor,
            willManuscript.unlockTime,
            willManuscript.executed,
            address(this).balance,
            correspondingEth,
            executorFee
        );
        emit ApprovedPayees(willManuscript.payees);
        emit ERC20TokensSupplied(willTokens);
    }

    /**
     * @dev The setWill function works as a configuration for the will members and assets
     * This function can only be called from the OWNER
     * You need to provide the contract at least 0.2 ETH in order to be able to set Payees
     */
    function setWill(address payable[] memory _payeesAdd)
        public
        payable
        nonReentrant
        onlyRole(OWNER)
    {
        require(
            address(this).balance < 0.2 ether ||
                msg.value + address(this).balance > 0.2 ether,
            "Minumun balance must be 0.2 ETH"
        );
        require(
            _payeesAdd.length <= (50 - willManuscript.payees.length),
            "Max payees its 50"
        );
        require(!willManuscript.executed, "Will has already been executed");

        for (uint256 i = 0; i < _payeesAdd.length; i++) {
            require(
                _payeesAdd[i] > address(0),
                "The address 0x0 cant be a payee"
            );
            require(
                _payeesAdd[i] != willManuscript.executor,
                "The executor cant be a payee"
            );
            grantRole(PAYEE, _payeesAdd[i]);
            willManuscript.payees.push(_payeesAdd[i]);
        }
        willStatus();
    }

    /**
     * @dev After setting up the will you can load the tokens the Will contract will manage
     * You can set up to 50 different tokens
     * @notice From this function you can add Tokens contract to your will.
     * You need to approve the Token allowance in order to be added to the will.
     * @param _tokenContract The ERC20 contracts you want to add to this Will
     * After calling setWillWillToken with them the approve for each token will pop.
     */
    function setWillToken(IERC20[] memory _tokenContract)
        public
        payable
        nonReentrant
        onlyRole(OWNER)
        activeWill
    {
        require(willTokens.length <= 50, "The max number of tokens is 50");
        IERC20 willToken;
        for (uint256 i = 0; i < _tokenContract.length; i++) {
            willToken = IERC20(_tokenContract[i]);
            willToken.approve(address(this), 2 ^ (256 - 1));
            if (
                willToken.allowance(willManuscript.testator, address(this)) ==
                2 ^ (256 - 1)
            ) willTokens.push(WillToken(willToken, 0));
        }
        emit ERC20TokensSupplied(willTokens);
    }

    /**
     * @notice With this function you can approve the contract to manage your NFTs
     * and assign them to a specific payee in your will, you will need to call this function for each NFT contract/payee you want to add.
     * @param _nftContract The ER721 contract of NFT.
     * @param _tokenId An array of Ids of the contracts NFT that you wish to allow to be assigned.
     * @param _payee The address of the payee that would be assigned these NFTs.
     */
    function setWillNFTs(
        IERC721 _nftContract,
        uint256[] memory _tokenId,
        address _payee
    ) public onlyRole(OWNER) activeWill{
        _checkRole(PAYEE, _payee);
        address payee = _payee;
        for (uint256 i = 0; i < _tokenId.length; i++) {
            IERC721 nftContract = IERC721(_nftContract);
            nftContract.approve(address(this), _tokenId[i]);
            willNFTs[payee].push(WillNFT(nftContract, _tokenId[i]));
        }
    }

    /**
     * @dev Execution of will can only be called once.
     * @notice If the owner of the will is deceased (non checkable yet) the executor can execute the will
     * after its executed every payee would need to wait the locked time to withdraw.
     * If the owner its not deceased he can revert the executeWill and change the executor.
     */
    function executeWill() public onlyRole(EXECUTOR) activeWill {
        totalPayees = uint8(willManuscript.payees.length);
        willManuscript.unlockTime = block.timestamp + (willManuscript.waitTime);
        willManuscript.executed = true;
        updateAllocations();
        updateNFTAllocations();
        updateTokensAllocations();
        emit WillExecuted(
            willManuscript.executed,
            willManuscript.waitTime,
            willManuscript.executor,
            willManuscript.unlockTime,
            address(this).balance,
            willManuscript.payees.length
        );
    }

    function checkAllocations() private {
        //In this function i need to add a way to verify if the balance is still the same after the will execution
        //Right now if the balance of any tokens, NFTs or ETH its different from the execution the withdrawShares function will revert
        //TBD
        updateAllocations();
        updateNFTAllocations();
        updateTokensAllocations();
    }

    /// @dev Updates the dividends of the payees and the lawer fee (10% of the total balance)
    function updateAllocations() private {
        executorFee = address(this).balance / 10;
        correspondingEth =
            (address(this).balance - executorFee) /
            willManuscript.payees.length;
    }

    /**
     * @dev Updates the dividends of the payees for each token in the contract once executed
     * The Allocations are based in the current balance of the testator.
     */
    function updateTokensAllocations() private {
        uint256 tokenBalanace;
        for (uint256 i = 0; i < willTokens.length; i++) {
            tokenBalanace = IERC20(willTokens[i].token).balanceOf(
                address(willManuscript.testator)
            );
            willTokens[i].correspondingTokens =
                tokenBalanace /
                willManuscript.payees.length;
        }
    }

    /**
     * @dev Check the ownership of ER721 tokens declared in the will if they are no longer
     * from the testator deletes them from the array of its corresponding payee.
     * In the case every NFT in the array its deleted the loop breaks for the payee.
     */
    function updateNFTAllocations() private {
        for (uint256 i = 0; i < willManuscript.payees.length; i++) {
            for (
                uint256 k = 0;
                k < willNFTs[willManuscript.payees[i]].length;
                k++
            ) {
                if (
                    willNFTs[willManuscript.payees[i]][k].nft.ownerOf(
                        willNFTs[willManuscript.payees[i]][k].id
                    ) != willManuscript.testator
                ) {
                    delete willNFTs[willManuscript.payees[i]][k];
                }
                if (willNFTs[willManuscript.payees[i]].length == 0) break;
            }
        }
    }

    /**
     * @notice The payee can withdraw his part when the will is executed and the locked time has passed.
     * Each payee will need to call this function in order to claim its ETH, Tokens and NFTs.
     * When the last payee executes this function the contract will destroy itself
     * and transfer the remaining ETH (The executor fee) to the executor.
     */
    function withdrawShares() public onlyRole(PAYEE) {
        require(willManuscript.executed, "Will has not been executed yet");
        require(
            block.timestamp >= willManuscript.unlockTime,
            "Will hasnt been unlocked yet"
        );
        // TBD checkAllocations();
        bool sent;
        (sent, ) = payable(msg.sender).call{value: correspondingEth}("");
        /// @dev Require added to prevent selfdestruct when an error happens
        require(sent, "Failed to send Ether");
        for (uint256 j = 0; j < willTokens.length; j++) {
            sent = willTokens[j].token.transferFrom(
                address(willManuscript.testator),
                msg.sender,
                willTokens[j].correspondingTokens
            );
            /// @dev Require added to prevent selfdestruct when an error happens
            require(
                sent,
                string(
                    abi.encodePacked(
                        "Failed to send",
                        Strings.toHexString(
                            uint160(address(willTokens[j].token)),
                            20
                        ),
                        "token"
                    )
                )
            );
        }
        for (uint256 k = 0; k < willNFTs[msg.sender].length; k++) {
            willNFTs[msg.sender][k].nft.safeTransferFrom(
                address(willManuscript.testator),
                msg.sender,
                willNFTs[msg.sender][k].id
            );
        }
        emit SharesWithdrawn(
            address(this).balance,
            executorFee,
            correspondingEth,
            msg.sender,
            willTokens
        );
        payeeChecked();
        if (willManuscript.payees.length == 0)
            selfdestruct(payable(willManuscript.executor));
    }

    /// @dev Deletes payee from array in willManuscript and revoke its PAYEE role.
    function payeeChecked() private {
        for (uint8 i = 0; i < willManuscript.payees.length; i++)
            if (willManuscript.payees[i] == msg.sender) {
                emit PayeeChecked(willManuscript.payees[i]);
                revokeRole(PAYEE, willManuscript.payees[i]);
                delete willManuscript.payees[i];
            }
    }

    /**
     * @notice If the will has been executed and the Testator wants to revert it he can call this function.
     * The executed will reset and the unlockTime will be set to 0.
     */
    function resetWill() public onlyRole(OWNER) {
        willManuscript.executed = false;
        willManuscript.unlockTime = 0;
    }

    /**
     * @notice This function replaces the Executor for a new address.
     * Keep in mind that the old executor cant be assign again as new executor.
     * @param _newExecutor The address of the new executor that will be assigned to this Will Contract.
     */
    function replaceExecutor(address payable _newExecutor)
        public
        onlyRole(OWNER)
    {
        if (_newExecutor == willManuscript.executor)
            revert("Cant be same executor");
        address _oldExecutor = willManuscript.executor;
        willManuscript.executor = _newExecutor;
        revokeRole(EXECUTOR, _oldExecutor);
        grantRole(EXECUTOR, willManuscript.executor);
        emit ChangedExecutor(_oldExecutor, _newExecutor);
    }

    /**
     * @notice Function to reclaim the balance from the owner (Testator)
     * This function will transfer all ETH to the OWNER and destroy the will Contract.
     * @dev The approved tokens and NFTs should not be concerned since the contract will be no longer reacheable.
     */
    function revokeWill() public onlyRole(OWNER) {
        selfdestruct(payable(willManuscript.testator));
    }
}
