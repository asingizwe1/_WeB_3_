// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
//to trade one ERC20 token for another.
import "contracts/ERC20_token.sol";

/*
How to swap tokens
1. Alice has 100 tokens from AliceCoin, which is a ERC20 token.
2. Bob has 100 tokens from BobCoin, which is also a ERC20 token.
3. Alice and Bob wants to trade 10 AliceCoin for 20 BobCoin.
4. Alice or Bob deploys TokenSwap
5. Alice approves TokenSwap to withdraw 10 tokens from AliceCoin
6. Bob approves TokenSwap to withdraw 20 tokens from BobCoin
7. Alice or Bob calls TokenSwap.swap()
8. Alice and Bob traded tokens successfully.
*/
contract TokenSwap{//Details of an instance of a token
IERC20 public token1;
address public owner1;
uint256 public amount1;
IERC20 public token2;
address public owner2;
uint256 public amount2;

constructor(
address _token1,
address  _owner1,
uint256 _amount1,
address _token2,
address _owner2,
uint256  _amount2
){
//IERC20(_token1) and IERC20(_token2) are used to convert those addresses into IERC20 interfaces
//allowing you to call functions like transfer() or approve().
token1=IERC20(_token1);
owner1=_owner1;
amount1=_amount1;
token2=IERC20(_token2);
owner2=_owner2;
amount2=_amount2;
}
function swap()public{
require(msg.sender==owner1||msg.sender==owner2,"Not authorized");
require(
//allowance method in Solidity is part of the ERC-20 token standard and is used to check how much of a token a spender is allowed to use on behalf of an owner
//address(this) casts the contract instance (this) into an address type.
    token1.allowance(owner1,address(this))>=amount1,
    "Token 1 allowance too low"
);
require(
            token2.allowance(owner2, address(this)) >= amount2,
            "Token 2 allowance too low"
        );

_safeTransferFrom(token1,owner1,owner2,amount1);
_safeTransferFrom(token2, owner2, owner1, amount2);
}
function _safeTransferFrom(
         IERC20 token,
        address sender,
        address recipient,
        uint256 amount
) private {
bool sent=token.transferFrom(sender,recipient,amount);
//transferFrom() returns true if the transfer is successful and false otherwise.
require(sent,"Token transfer failed");
}


}

/*
 a spender is an address that has been authorized by the token owner to transfer tokens using the approve() function

Real-World Example of a Contract as a Spender
Decentralized Exchanges (DEXs): When you trade tokens on Uniswap, you must approve the Uniswap smart contract as a spender before it can swap tokens for you.
Staking Contracts: When you stake tokens, the staking contract acts as a spender to move your tokens into the staking pool.

*/