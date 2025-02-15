// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
//ERC-721 is a standard for non-fungible tokens (NFTs) on Ethereum
//ERC-20 (fungible tokens), each ERC-721 token is unique
//and cannot be exchanged 1:1 with another.

/*
Feature  	        ERC-20 (Fungible Tokens)	                            ERC-721 (Non-Fungible Tokens)
Fungibility 	    Yes (all tokens are identical)	                        No (each token is unique)
Balance Tracking	balanceOf(address) returns total tokens owned	        balanceOf(address) returns number of NFTs owned
Ownership	        No unique ownership (all tokens are the same)       	Each token has a unique owner (ownerOf(tokenId))
Transfers         	Uses transfer() and transferFrom()                  	Uses safeTransferFrom()
Approval	        approve(spender, amount)	                            approve(spender, tokenId)

ERC-165 is a standard for detecting interfaces in smart contracts.
 It allows a contract to declare which interfaces it supports
, making it possible for other contracts (or dApps) to check compatibility without manually calling every function.
*/

//Without ERC-165→Contracts would have to manually check if another contract supports a given function.
//ERC-165→Contracts can automatically verify supported interfaces using supportsInterface(bytes4 interfaceID).
interface IERC165{
//An interface ID is derived by XORing (^) the first 4 bytes (function selector) of each function in the interface.
function supportsInterface(bytes4 interfaceID)
external
view
returns (bool);
}

interface IRC721 is IERC165 {
function balanceOf(address owner) external view returns (uint256 balance);
function ownerOf(uint256 tokenId) external view returns (address owner);
function safeTransferFrom(address from, address to, uint256 tokenId)external;
function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes calldata data
    ) external;
 function transferFrom(address from, address to, uint256 tokenId) external;
 function approve(address to, uint256 tokenId) external;
function getApproved(uint256 tokenId)
        external
        view
        returns (address operator);
    function setApprovalForAll(address operator, bool _approved) external;
    function isApprovedForAll(address owner, address operator)
        external
        view
        returns (bool);
}

interface ERC721Receiver{
//onERC721Received function is used to handle the safe transfer of ERC-721 tokens to smart contracts
// called when an ERC-721 token is sent to a contract via
function onErC721Received(
address operator,//address that initiated the transfer.
address from,
uint256 tokenId,// ERC-721 token has a unique tokenId
//The sender can attach extra information, such as metadata or specific instructions for how the receiving contract should handle the NFT.
// useful in cases like NFT staking or gaming applications where a token transfer may require some extra logic.
bytes calldata data
) external returns (bytes4);

}

contract ERC721 is IERC721 {
    event Transfer(address indexed from,
     address indexed to, 
     uint256 indexed id
    );
    event ApprovalForAll(
        address indexed owner, address indexed operator, bool approved
    );
    // Mapping from token ID to owner address
    mapping(uint256 => address) internal _ownerOf;

    // Mapping owner address to token count
    mapping(address => uint256) internal _balanceOf;

    // Mapping from token ID to approved address
    mapping(uint256 => address) internal _approvals;

    // Mapping from owner to operator approvals
    mapping(address => mapping(address => bool)) public isApprovedForAll;

function supportsInterface(bytes4 interfaceId)
        external
        pure
        returns (bool)
    {
        return interfaceId == type(IERC721).interfaceId
            || interfaceId == type(IERC165).interfaceId;
    }

    function ownerOf(uint256 id) external view returns (address owner) {
        owner = _ownerOf[id];
        require(owner != address(0), "token doesn't exist");
    }

    function balanceOf(address owner) external view returns (uint256) {
        require(owner != address(0), "owner = zero address");
        return _balanceOf[owner];
    }

    function setApprovalForAll(address operator, bool approved) external {
        isApprovedForAll[msg.sender][operator] = approved;
        emit ApprovalForAll(msg.sender, operator, approved);
    }

    function approve(address spender, uint256 id) external {
        address owner = _ownerOf[id];
        require(
            msg.sender == owner || isApprovedForAll[owner][msg.sender],
            "not authorized"
        );

        _approvals[id] = spender;

        emit Approval(owner, spender, id);
    }

    function getApproved(uint256 id) external view returns (address) {
        require(_ownerOf[id] != address(0), "token doesn't exist");
        return _approvals[id];
    }

    function _isApprovedOrOwner(address owner, address spender, uint256 id)
        internal
        view
        returns (bool)
    {
        return (
            spender == owner || isApprovedForAll[owner][spender]
                || spender == _approvals[id]
        );
    }

    function transferFrom(address from, address to, uint256 id) public {
        require(from == _ownerOf[id], "from != owner");
        require(to != address(0), "transfer to zero address");

        require(_isApprovedOrOwner(from, msg.sender, id), "not authorized");

        _balanceOf[from]--;
        _balanceOf[to]++;
        _ownerOf[id] = to;

        delete _approvals[id];

        emit Transfer(from, to, id);
    }

    function safeTransferFrom(address from, address to, uint256 id) external {
        transferFrom(from, to, id);

        require(
            to.code.length == 0
                || IERC721Receiver(to).onERC721Received(msg.sender, from, id, "")
                    == IERC721Receiver.onERC721Received.selector,
            "unsafe recipient"
        );
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 id,
        bytes calldata data
    ) external {
        transferFrom(from, to, id);

        require(
            to.code.length == 0
                || IERC721Receiver(to).onERC721Received(msg.sender, from, id, data)
                    == IERC721Receiver.onERC721Received.selector,
            "unsafe recipient"
        );
    }

    function _mint(address to, uint256 id) internal {
        require(to != address(0), "mint to zero address");
        require(_ownerOf[id] == address(0), "already minted");

        _balanceOf[to]++;
        _ownerOf[id] = to;

        emit Transfer(address(0), to, id);
    }

    function _burn(uint256 id) internal {
        address owner = _ownerOf[id];
        require(owner != address(0), "not minted");

        _balanceOf[owner] -= 1;

        delete _ownerOf[id];
        delete _approvals[id];

        emit Transfer(owner, address(0), id);
    }
}

contract MyNFT is ERC721 {
    function mint(address to, uint256 id) external {
        _mint(to, id);
    }

    function burn(uint256 id) external {
        require(msg.sender == _ownerOf[id], "not owner");
        _burn(id);
    }
}








