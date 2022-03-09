// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CryptoWillToken is IERC20, ERC20, Ownable {
    address public liquidityWallet;

    constructor() ERC20("Crypto Will Token", "CWT") {
        liquidityWallet = owner();
        _mint(liquidityWallet, 10000000000 * (10**18));
    }

    function mint(address _to, uint256 _amount) external onlyOwner {
        _mint(_to, _amount);
    }
}
