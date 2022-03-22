// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";

contract StudentFaucet is
    ERC721Upgradeable,
    OwnableUpgradeable,
    PausableUpgradeable
{
    function initialize() public initializer {
        __ERC721_init("AStarFaucetDonors", "AFD");
        __Ownable_init();
        __Pausable_init();
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override
        returns (string memory)
    {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );

        return "";
    }
}
