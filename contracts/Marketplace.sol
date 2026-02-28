// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";

contract Marketplace is IERC721Receiver {
    struct Listing {
        address seller;
        address collection;
        uint256 tokenId;
        uint256 price;
        bool active;
    }

    uint256 private _listingIdCounter;
    mapping(uint256 => Listing) public listings;

    event Listed(
        uint256 indexed listingId,
        address indexed seller,
        address indexed collection,
        uint256 tokenId,
        uint256 price
    );

    event Sale(
        uint256 indexed listingId,
        address indexed buyer,
        uint256 price
    );

    event Cancelled(uint256 indexed listingId);

    function list(
        address collection,
        uint256 tokenId,
        uint256 price
    ) external {
        require(price > 0, "Price must be > 0");

        IERC721(collection).safeTransferFrom(
            msg.sender,
            address(this),
            tokenId
        );

        _listingIdCounter++;
        listings[_listingIdCounter] = Listing({
            seller: msg.sender,
            collection: collection,
            tokenId: tokenId,
            price: price,
            active: true
        });

        emit Listed(
            _listingIdCounter,
            msg.sender,
            collection,
            tokenId,
            price
        );
    }

    function buy(uint256 listingId) external payable {
        Listing storage listing = listings[listingId];
        require(listing.active, "Listing not active");
        require(msg.value == listing.price, "Incorrect ETH sent");

        listing.active = false;

        (bool sent, ) = listing.seller.call{value: msg.value}("");
        require(sent, "Failed to send ETH");

        IERC721(listing.collection).safeTransferFrom(
            address(this),
            msg.sender,
            listing.tokenId
        );

        emit Sale(listingId, msg.sender, listing.price);
    }

    function cancel(uint256 listingId) external {
        Listing storage listing = listings[listingId];
        require(listing.active, "Listing not active");
        require(listing.seller == msg.sender, "Not seller");

        listing.active = false;

        IERC721(listing.collection).safeTransferFrom(
            address(this),
            msg.sender,
            listing.tokenId
        );

        emit Cancelled(listingId);
    }

    function onERC721Received(
        address,
        address,
        uint256,
        bytes calldata
    ) external pure override returns (bytes4) {
        return IERC721Receiver.onERC721Received.selector;
    }
}

