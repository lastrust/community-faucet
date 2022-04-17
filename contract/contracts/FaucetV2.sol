// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./StudentFaucet.sol";
import "hardhat/console.sol";

contract CommunityFaucetV2 is StudentFaucet {
    bool initializedV2;
    uint256 internal _interval;
    uint256 internal _totalDrop;
    mapping(address => bool) internal _droppers;

    function initializeV2() public onlyOwner {
        require(!initializedV2);
        initializedV2 = true;
        _droppers[msg.sender] = true;
    }

    modifier onlyDropper() {
        require(_droppers[msg.sender], "You are't Dropper");
        _;
    }

    function dropV2(address to_) public onlyDropper {
        require(
            block.timestamp - _lastReceiptDates[to_] > interval(),
            "You have received"
        );
        uint256 _dropSize = dropSize();
        emit Drop(to_, _dropSize);
        payable(to_).transfer(_dropSize);
        _totalDrop += _dropSize;
        _lastReceiptDates[to_] = block.timestamp;
        if (msg.sender.balance < _dropSize) {
            //送信ようWalletのガス代が不足してきたら補充
            payable(msg.sender).transfer(_dropSize * 100);
        }
    }

    function totalDropV2() public view returns (uint256) {
        return _totalDrop + totalDrop();
    }

    function addDropper(address dropper_) public onlyOwner {
        _droppers[dropper_] = true;
    }
}
