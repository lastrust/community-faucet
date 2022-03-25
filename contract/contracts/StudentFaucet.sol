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
    struct SupportData {
        string name;
        string icon;
        uint256 value;
    }
    string private _baseTokenURI;
    uint256 private _dropSize;
    mapping(uint256 => SupportData) _supports;
    event Support(
        uint256 indexed id,
        address indexed supporter,
        uint256 indexed value
    );
    event Drop(address indexed target, uint256 indexed value);

    function initialize(
        string memory name_,
        string memory symbol_,
        string memory baseTokenURI_,
        uint256 dropSize_
    ) public initializer {
        __ERC721_init(name_, symbol_);
        __Ownable_init();
        __Pausable_init();
        _baseTokenURI = baseTokenURI_;
        _dropSize = dropSize_;
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

    function dropSize() public view returns (uint256) {
        return _dropSize;
    }

    function drop(address to_) public onlyOwner {
        emit Drop(to_, _dropSize);
        payable(to_).transfer(_dropSize);
        if (msg.sender.balance < _dropSize) {
            //送信ようWalletのガス代が不足してきたら補充
            payable(msg.sender).transfer(_dropSize * 100);
        }
    }

    function support(string memory name_, string memory icon_) public payable {
        uint256 newTokenId = totalSupply();
        _mint(msg.sender, newTokenId);
        _supports[newTokenId] = SupportData(name_, icon_, msg.value);
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
