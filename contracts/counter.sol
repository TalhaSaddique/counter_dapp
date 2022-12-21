// SPDX-License-Identifier: MIT
pragma solidity >= 0.5.0 <= 0.9.0;

contract Counter {
    uint256 public counter = 0;

    function increment() public returns (uint256) {
        counter = counter+1;
        return counter;
    }
}