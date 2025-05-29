// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
/*🧩 Next Steps (in parallel)
 Set up ERC-20 token and deploy to Base testnet

 Write RewardManager.sol and test logging flow

 Design redemption interface (airtime, data, etc.)

 Add basic wallet or custodial system (for non-tech users)

 Get a local partner to help validate entries

 Talk to KCCA, MTN, or NGOs about reward partnerships
 */
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
/*This is your standard ERC-20 token (symbol PPEN).
You deploy it once, mint an initial supply, and use its address anywhere you need to reference “PlasticPenny.”
 */
contract PlasticPenny is ERC20, Ownable {
    constructor(uint256 initialSupply) ERC20("PlasticPenny", "PPEN") {
        _mint(msg.sender, initialSupply);
    }

    /// @notice Owner can mint new tokens (e.g., to top up reward pool)
    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }

    /// @notice Owner can burn tokens from any address (e.g., reclaim unredeemed tokens)
    function burn(address from, uint256 amount) external onlyOwner {
        _burn(from, amount);
    }
}
