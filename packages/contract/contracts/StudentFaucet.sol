// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721EnumerableUpgradeable.sol";

contract StudentFaucet is
    ERC721Upgradeable,
    OwnableUpgradeable,
    PausableUpgradeable,
    ERC721EnumerableUpgradeable
{
    event Support(
        uint256 indexed id,
        address indexed supporter,
        uint256 indexed value
    );
    event Drop(address indexed target, uint256 indexed value);

    struct SupportData {
        string name;
        string icon;
        uint256 value;
    }

    string private _baseTokenURI;
    uint256 private _dropSize;
    uint256 private _totalDrop;
    uint256 private _interval;
    uint256 private _numOfSupporters;
    mapping(uint256 => SupportData) _supports;
    mapping(address => uint256) _lastReceiptDates;

    function initialize(
        string memory name_,
        string memory symbol_,
        string memory baseTokenURI_,
        uint256 dropSize_,
        uint256 interval_
    ) public initializer {
        __ERC721_init(name_, symbol_);
        __Ownable_init();
        __Pausable_init();
        _baseTokenURI = baseTokenURI_;
        _dropSize = dropSize_;
        _interval = interval_;
    }

    function setInterval(uint256 interval_) public onlyOwner {
        _interval = interval_;
    }

    function interval() public view returns (uint256) {
        return _interval;
    }

    function lastReceiptDate(address id) public view returns (uint256) {
        return _lastReceiptDates[id];
    }

    function changeBaseURI(string memory baseTokenURI_) public onlyOwner {
        _baseTokenURI = baseTokenURI_;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return _baseTokenURI;
    }

    function changeDropSize(uint256 dropSize_) public onlyOwner {
        _dropSize = dropSize_;
    }

    function totalDrop() public view returns (uint256) {
        return _totalDrop;
    }

    function dropSize() public view returns (uint256) {
        return _dropSize;
    }

    function drop(address to_) public onlyOwner {
        require(
            block.timestamp - _lastReceiptDates[to_] > _interval,
            "You have received"
        );
        emit Drop(to_, _dropSize);
        payable(to_).transfer(_dropSize);
        _totalDrop += _dropSize;
        _lastReceiptDates[to_] = block.timestamp;
        if (msg.sender.balance < _dropSize) {
            //送信ようWalletのガス代が不足してきたら補充
            payable(msg.sender).transfer(_dropSize * 100);
        }
    }

    function numberOfSupporter() public view returns (uint256) {
        return _numOfSupporters;
    }

    function support(string memory name_, string memory icon_) public payable {
        uint256 newTokenId = totalSupply();
        _mint(msg.sender, newTokenId);
        _supports[newTokenId] = SupportData(name_, icon_, msg.value);
        _numOfSupporters++;
        emit Support(newTokenId, msg.sender, msg.value);
    }

    function supportData(uint256 tokenId_)
        public
        view
        returns (SupportData memory)
    {
        return _supports[tokenId_];
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    )
        internal
        virtual
        override(ERC721Upgradeable, ERC721EnumerableUpgradeable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC721Upgradeable, ERC721EnumerableUpgradeable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
