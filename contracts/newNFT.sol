// SPDX-License-Identifier: MIT
pragma solidity 0.8.25;
 
import "@0xcert/ethereum-erc721/src/contracts/tokens/nf-token-metadata.sol";
import "@0xcert/ethereum-erc721/src/contracts/ownership/ownable.sol";

 
contract newNFT is NFTokenMetadata, Ownable {
 
  
  constructor() {
    nftName = "Certificado PKRV";
    nftSymbol = "PKRV";
  }

    function mint(address _to, uint256 _tokenId, string calldata _uri) external onlyOwner{
        super._mint(_to, _tokenId);
        super._setTokenUri(_tokenId, _uri);
    }


}