//SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

/**
 * Once created, every Will contract will have its balance and members.
 * The creation of the contract from "WillFactory" sets up the owner and lawyer roles.
 */
contract Will is AccessControl, ReentrancyGuard {
    /// This struct has the useful information of the contract (members, waitTime, if its already executed bool and unlockTime)
    struct Manuscript {
        address payable testator;
        address payable lawyer;
        address payable[] payees;
        uint256 waitTime;
        bool executed;
        uint256 unlockTime;
    }

    struct WillToken {
        string tokenName;
        IERC20 token;
        uint256 correspondingTokens;
        uint256 lawyerTokenFee;
    }

    WillToken[] public willTokens;
    bytes32 public constant LAWYER = keccak256("LAWYER");
    bytes32 public constant PAYEE = keccak256("PAYEE");
    bytes32 public constant OWNER = keccak256("OWNER");
    WillToken public tokenSt;
    Manuscript public willManuscript;
    uint256 public lawyerFee;
    uint256 public correspondingEth;
    uint256 public expireDate;

    /**
     * WillReport event trigers all info from the manuscript
     * Can be called with WillStatus function or its called automatically after setting up the will
     */
    event WillReport(
        address _owner,
        address _lawyer,
        uint256 _unlockTime,
        bool _withdrawAvailable,
        uint256 _totalBalance,
        uint256 _correspondingEth,
        uint256 _lawyerFee,
        uint256 _expireDate
    );
    /**
     * WillExecuted event will be emitted once the corresponding lawyer signer calls
     * the executeWill function to start counting looked time in order to claim the assets
     */
    event WillExecuted(
        bool _exec,
        uint256 _time,
        address _lawyer,
        uint256 _unlockTime,
        uint256 _totalBalance,
        uint256 _numberOfPayees
    );
    /**
     * Once function withdrawShares is called and the conditions are met:
     * the executeWill function has been executed and unlockTime has passed.
     * Any payee member in the contract will be able to call withdrawShares to claim its assets for everyone
     * and destroy the Will. This event its emmited once and after that the contract will be destroyed.
     */
    event SharesWithdrawn(
        uint256 _totalAmount,
        uint256 _lawyerFee,
        uint256 _ethPerPayee,
        address _caller
    );
    ///Event emited for each payee setted up by the owner in the willStatus function
    event ApprovedPayees(address _payees);
    ///Event emited after resetting the contract with resetWill and changing lawyer.
    event ChangedLawyer(address _oldLawyer, address _newLawyer);
    ///Event emited from willStatus and setWillTokens for each ERC20 token in the will smart contract.
    event ERC20Supplied(string _tokenName, IERC20 _token, uint256 _amount);

    /**
     * The constructor sets up the roles and roles admin
     * This garantees that the main roles are set up in the creation of the smart contract
     * Once created you can add payees and change the lawyer but only the owner has this privileges
     */
    constructor(
        address payable _testator,
        address payable _lawyer,
        uint256 _waitTime
    ) {
        willManuscript.testator = _testator;
        willManuscript.lawyer = _lawyer;
        willManuscript.waitTime = _waitTime * 1 days;
        willManuscript.executed = false;
        _setupRole(OWNER, _testator);
        _setupRole(LAWYER, _lawyer);
        _setRoleAdmin(LAWYER, OWNER);
        _setRoleAdmin(PAYEE, OWNER);
        expireDate = block.timestamp + 7300 days; ///Set up 20 years from creation of the Will contract.
    }

    modifier activeWill() {
        require(
            address(this).balance > 0 && willManuscript.payees.length > 0,
            "This will has not been set up"
        );
        _;
    }

    /** Checks the current payees, testator, lawyer, execution, amount and lock time
     * Should probably manage this status throug events
     */
    function willStatus() public {
        emit WillReport(
            willManuscript.testator,
            willManuscript.lawyer,
            willManuscript.unlockTime,
            willManuscript.executed,
            address(this).balance,
            correspondingEth,
            lawyerFee,
            expireDate
        );
        for (uint256 i = 0; i < willManuscript.payees.length; i++)
            emit ApprovedPayees(willManuscript.payees[i]);
        for (uint256 i = 0; i < willTokens.length; i++)
            emit ERC20Supplied(
                willTokens[i].tokenName,
                willTokens[i].token,
                IERC20(willTokens[i].token).balanceOf(address(this))
            );
    }

    /**
     * The setWill function works as a configuration for the will members and assets
     * This function can only be called from the OWNER
     */
    function setWill(address payable[] memory _payeesAdd)
        public
        payable
        nonReentrant
        onlyRole(OWNER)
    {
        require(
            _payeesAdd.length < (100 - willManuscript.payees.length),
            "Max payees its 100"
        );
        for (uint256 i = 0; i < _payeesAdd.length; i++) {
            require(
                _payeesAdd[i] != willManuscript.lawyer,
                "The lawyer cant be also a payee"
            );
            grantRole(PAYEE, _payeesAdd[i]);
            willManuscript.payees.push(_payeesAdd[i]);
        }
        updateEthAllocations();
        if (willTokens.length > 0) updateTokensAllocations();
        willStatus();
    }

    function setWillToken(
        string memory _tokenName,
        IERC20 _tokenContract,
        uint256 _amount
    ) public payable nonReentrant onlyRole(OWNER) {
        IERC20 paymentToken = IERC20(_tokenContract);
        require(willTokens.length <= 20, "The max number of tokens is 20");
        require(
            paymentToken.allowance(msg.sender, address(this)) >= _amount,
            "Insuficient Allowance"
        );
        require(
            paymentToken.transferFrom(msg.sender, address(this), _amount),
            "Transfer Failed"
        );
        tokenSt.tokenName = _tokenName;
        tokenSt.token = _tokenContract;
        willTokens.push(tokenSt);
        updateSingleTokenAllocations(
            willTokens.length - 1
        );
        emit ERC20Supplied(_tokenName, _tokenContract, _amount);
    }

    /**
     * If the owner of the will is deceased (non checkable yet) the lawyer can execute the will
     * after its executed every payee would need to wait the locked time to withdraw
     * If the owner its not deceased he can revert the executeWill and change the lawyer
     */
    function executeWill() public onlyRole(LAWYER) activeWill {
        require(willManuscript.executed == false, "Already has been executed");
        willManuscript.unlockTime = block.timestamp + (willManuscript.waitTime);
        willManuscript.executed = true;
        emit WillExecuted(
            willManuscript.executed,
            willManuscript.waitTime,
            willManuscript.lawyer,
            willManuscript.unlockTime,
            address(this).balance,
            willManuscript.payees.length
        );
    }

    /// The payee can withdraw his part when the will is executed and the locked time has passed.
    function withdrawShares() public onlyRole(PAYEE) nonReentrant activeWill {
        require(willManuscript.executed, "Will hasnt been executed yet");
        require(
            block.timestamp >= willManuscript.unlockTime,
            "Will hasnt been unlocked yet"
        );
        emit SharesWithdrawn(
            address(this).balance,
            lawyerFee,
            correspondingEth,
            msg.sender
        );
        for (uint256 i = 0; i < willManuscript.payees.length; i++)
            willManuscript.payees[i].call{value: correspondingEth}("");
        for (uint256 i = 0; i < willTokens.length; i++)
            for (uint256 j = 0; j < willManuscript.payees.length; j++) {
                willTokens[i].token.transfer(
                    willManuscript.payees[j],
                    willTokens[i].correspondingTokens
                );
                willTokens[i].token.transfer(
                    willManuscript.lawyer,
                    willTokens[i].lawyerTokenFee
                );
            }
        selfdestruct(willManuscript.lawyer);
    }

    /**
     * If the will has been executed and the owner wants to revert it he can call this function
     * Also can be called to change the lawyer
     */
    function resetWill(address payable _newLawyer) public onlyRole(OWNER) {
        willManuscript.executed = false;
        willManuscript.unlockTime = 0;
        replaceLawyer(_newLawyer);
    }

    function replaceLawyer(address payable _newLawyer) private {
        address _oldLawyer = willManuscript.lawyer;
        willManuscript.lawyer = _newLawyer;
        revokeRole(LAWYER, _oldLawyer);
        grantRole(LAWYER, willManuscript.lawyer);
        emit ChangedLawyer(_oldLawyer, _newLawyer);
    }

    ///Updates the dividends of the payees and the lawer fee (10% of the total balance)
    function updateEthAllocations() private {
        lawyerFee = address(this).balance / 10;
        correspondingEth =
            (address(this).balance - lawyerFee) /
            willManuscript.payees.length;
    }

    ///Updates the dividends of the payees and the lower fee (10% of the total balance)
    function updateSingleTokenAllocations(uint256 _index) private {
        uint256 tokenBalanace;
        tokenBalanace = IERC20(willTokens[_index].token).balanceOf(
            address(this)
        );
        willTokens[_index].lawyerTokenFee = tokenBalanace / 10;
        willTokens[_index].correspondingTokens =
            (tokenBalanace - lawyerFee) /
            willManuscript.payees.length;
    }

    ///Updates the dividends of the payees and the lower fee (10% of the total balance)
    function updateTokensAllocations() private {
        uint256 tokenBalanace;
        for (uint256 i = 0; i < willTokens.length; i++) {
            tokenBalanace = IERC20(willTokens[i].token).balanceOf(
                address(this)
            );
            willTokens[i].lawyerTokenFee = tokenBalanace / 10;
            willTokens[i].correspondingTokens =
                (tokenBalanace - lawyerFee) /
                willManuscript.payees.length;
        }
    }

    /**
     * Function to reclaim the balance from the owner address
     * After a lock period that its assigned in the last setWill called by the owner (plus 20 years)
     * This function will transfer all ETH to the OWNER and destroy the will Contract.
     */
    function reclaimOwnerBalance() public onlyRole(OWNER) {
        require(
            block.timestamp >= expireDate,
            "Expiracy date hasnt passed yet"
        );
        for (uint256 i = 0; i < willTokens.length; i++)
            willTokens[i].token.transfer(
                willManuscript.testator,
                IERC20(willTokens[i].token).balanceOf(address(this))
            );
        selfdestruct(willManuscript.testator);
    }
}
