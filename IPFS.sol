// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyIPFSNFT is ERC721URIStorage, Ownable {
    uint256 private _tokenIds;

    constructor() ERC721("MyIPFSNFT", "IPFSNFT") {}

    function mintNFT(address recipient, string memory tokenURI) public onlyOwner returns (uint256) {
        _tokenIds += 1;
        uint256 newItemId = _tokenIds;
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);
        return newItemId;
    }
}
/*
ERC721URIStorage
We import ERC721URIStorage which lets us associate each token ID with a tokenURI. That tokenURI will point to IPFS metadata (JSON file).

2️⃣ mintNFT function
Takes in:

recipient: the address that will receive the NFT.

tokenURI: the URI (usually ipfs://<CID>) pointing to metadata on IPFS.

Mints the NFT and links the token ID to the IPFS URI.

3️⃣ Example IPFS tokenURI
Your metadata JSON on IPFS might look like this (e.g. uploaded via Pinata, NFT.storage, or a local IPFS node):

json
Copy
Edit
{
  "name": "My Cool NFT",
  "description": "This is my first NFT stored on IPFS!",
  "image": "ipfs://QmYourImageCID"
}
➡ Suppose this JSON file is stored at:

cpp
Copy
Edit
ipfs://QmYourMetadataCID
4️⃣ Minting example
You call:

javascript
Copy
Edit
await contract.mintNFT(userAddress, "ipfs://QmYourMetadataCID");
✅ Now the NFT points to metadata on IPFS.*/

