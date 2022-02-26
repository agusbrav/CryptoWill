//SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;
import "hardhat/console.sol";
import "./Will.sol";

/**
 * @dev Factory of will contracts each one will have his balance and properties.
 * Only one will may be created through this contract
 */
contract WillFactory {
    mapping(address => address) public willOwners; //Owner address to contract address
    event WillCreated(address _owner, address _newWIll);

    function createWillContract(address payable _lawyer, uint256 _lockTime)
        external
        returns (address)
    {
        require(
            willOwners[msg.sender] == address(0),
            "You already have a will contract"
        );

        require(_lockTime != 0, "The minimum time is 1 day");
        require(_lockTime < 366 days, "The maximun time is 365 days");
        Will will = new Will(payable(msg.sender), _lawyer, _lockTime);
        willOwners[msg.sender] = address(will);
        emit WillCreated(msg.sender, willOwners[msg.sender]);
        return willOwners[msg.sender];
    }

    function checkWills(address _address) external view returns (address) {
        require(
            willOwners[_address] != address(0),
            "You do not have a deployed Will"
        );
        console.log(
            "There is a deployed will from this address here: ",
            willOwners[_address]
        );
        return willOwners[_address];
    }
}
