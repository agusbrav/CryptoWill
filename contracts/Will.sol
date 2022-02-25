//SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "hardhat/console.sol";

/**
 * @dev The will contract need to be initializaed with the payees
 * The creation of the contract from "WillFactory" sets up the owner and lawyer roles
 */
contract Will is AccessControl, ReentrancyGuard {
    struct Manuscript {
        address testator;
        address payable lawyer;
        address payable[] payees;
        uint256 waitTime;
        bool executed;
        uint256 unlockTime;
    }
    bytes32 public constant LAWYER = keccak256("LAWYER");
    bytes32 public constant PAYEE = keccak256("PAYEE");
    bytes32 public constant OWNER = keccak256("OWNER");
    Manuscript public willManuscript;
    uint256 public lawyerFee;
    uint256 public correspondingTokens;
    uint256 public expireDate;
    event WillExecuted(uint256 _time); // Do i need to send the will address? more info about
    event SharesWithdrawn(
        uint256 _time,
        uint256 _totalAmount,
        uint256 _lawyerFee,
        uint256 _ethPerPayee,
        address _caller
    );
    event ChangedLawyer(address _oldLawyer, address payable _newLawyer);
    event WillReport(
        address _owner,
        address payable _lawyer,
        uint256 _unlockTime,
        bool _withdrawAvailable,
        uint256 _totalBalance,
        uint256 _correspondingTokens,
        uint256 _lawyerFee,
        uint256 _expireDate
    );
    event NewPayeeAdded(address _newPayee);
    event ApprovedPayees(address _payees);

    constructor(
        address _testator,
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
    function willStatus() public activeWill {
        uint256 remainingTime;
        if (
            willManuscript.executed == true &&
            block.timestamp < willManuscript.unlockTime
        ) {
            remainingTime = willManuscript.unlockTime - block.timestamp;
            emit WillReport(
                willManuscript.testator,
                willManuscript.lawyer,
                willManuscript.unlockTime,
                false,
                address(this).balance,
                correspondingTokens,
                lawyerFee,
                expireDate
            );
        }
        if (
            willManuscript.executed == true &&
            block.timestamp > willManuscript.unlockTime
        ) {
            emit WillReport(
                willManuscript.testator,
                willManuscript.lawyer,
                willManuscript.unlockTime,
                true,
                address(this).balance,
                correspondingTokens,
                lawyerFee,
                expireDate
            );
            for (uint256 i = 0; i < willManuscript.payees.length; i++) {
                emit ApprovedPayees(willManuscript.payees[i]);
            }
        }
    }

    function setWill(address payable[] memory _payeesAdd)
        public
        payable
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
            emit NewPayeeAdded(_payeesAdd[i]);
        }
        updateAllocations();
        expireDate = 7300 days; ///Set up 20 years from the setWill for the Will to expire and reclaim funds
        emit WillReport(
            willManuscript.testator,
            willManuscript.lawyer,
            willManuscript.unlockTime,
            false,
            address(this).balance,
            correspondingTokens,
            lawyerFee,
            expireDate
        );
    }

    /**
     * @dev The lawyer designated to a particular will should call this
     * If the owner of the will is deceased (non checkable haha) the lawyer can execute the will
     * after its executed every payee would need to wait the locked time to withdraw
     * If the owner its not deceased he can revert the executeWill and change the lawyer
     * Need to calculate the division between the payees and the lawyer fee for the contract execution
     */
    function executeWill() public onlyRole(LAWYER) activeWill {
        require(
            willManuscript.payees.length > 0,
            "There are no payees declared"
        );
        require(willManuscript.executed == false, "Already has been executed");
        willManuscript.unlockTime = block.timestamp + (willManuscript.waitTime);
        willManuscript.executed = true;
        updateAllocations();
        emit WillExecuted(block.timestamp);
    }

    /// The payee can withdraw his part when the will is executed and the locked time has passed.
    function withdrawShares() public onlyRole(PAYEE) nonReentrant activeWill {
        require(willManuscript.executed, "Will hasnt been executed yet");
        require(
            block.timestamp >= willManuscript.unlockTime,
            "Will hasnt been unlocked yet"
        );
        for (uint256 i = 0; i < willManuscript.payees.length; i++)
            willManuscript.payees[i].call{value: correspondingTokens}("");
        emit SharesWithdrawn(
            block.timestamp,
            address(this).balance,
            lawyerFee,
            correspondingTokens,
            msg.sender
        );
        selfdestruct(willManuscript.lawyer);
    }

    function resetWill(address payable _newLawyer) public onlyRole(OWNER) {
        willManuscript.executed = false;
        replaceLawyer(_newLawyer);
    }

    function replaceLawyer(address payable _newLawyer)
        internal
        onlyRole(OWNER)
    {
        address _oldLawyer = willManuscript.lawyer;
        willManuscript.lawyer = _newLawyer;
        revokeRole(LAWYER, _oldLawyer);
        grantRole(LAWYER, willManuscript.lawyer);
        emit ChangedLawyer(_oldLawyer, _newLawyer);
    }

    ///Function to reclaim the balance
    function updateAllocations() internal {
        uint256 dividends;
        dividends = willManuscript.payees.length;
        lawyerFee = address(this).balance / 10;
        correspondingTokens = (address(this).balance - lawyerFee) / dividends;
    }

    function reclaimOwnerBalance() public onlyRole(OWNER) {
        require(
            block.timestamp >= expireDate,
            "Expiracy date hasnt passed yet"
        );
        willManuscript.testator.call{value: address(this).balance}("");
    }
}
