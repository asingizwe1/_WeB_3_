1. LockedGold & Election (Staking & Validator Voting)
From the LockedGold and Election contracts:

```solidity

// LockedGold.sol snippet
function lock(uint256 value) external {
    // Transfers CELO to this contract and increases nonvoting balance
    require(value > 0, "Must lock non-zero");
    _transferToContract(msg.sender, value);
    nonvoting[msg.sender] = nonvoting[msg.sender].add(value);
}

function vote(address group, uint256 value) external {
    // Moves CELO from non-voting to pending votes for a validator group
    require(value <= nonvoting[msg.sender], "Insufficient nonvoting balance");
    nonvoting[msg.sender] = nonvoting[msg.sender].sub(value);
    _electionContract.vote(group, value);
}]
```solidity

// Election.sol snippet
struct Votes {
    uint256 pending;
    uint256 active;
    uint256 total;
}

mapping(address => mapping(address => Votes)) public votes;

function vote(address group, uint256 value) external {
    Votes storage v = votes[msg.sender][group];
    v.pending = v.pending.add(value);
    v.total = v.total.add(value);
    _updateGroupTotalVotes(group, value);
}

function activate(address operator, address group) external {
    Votes storage v = votes[operator][group];
    require(v.pending > 0, "No pending votes");
    v.pending = 0;
    v.active = v.active.add(v.previousPending());
    // Now these votes earn rewards
}```
The LockedGold contract handles CELO locking, reveals nonvoting balances, and transfers voting stakes into the Election contract. Voting is initially placed in a pending status until activated after the epoch, where it becomes active and eligible for rewards 
Reddit
+15
docs.celo.org
+15
blog.openzeppelin.com
+15
.

⚖️ 2. Governance Contract (On‑Chain Proposals & Upgrades)
From Governance.sol in Celo’s core repository (over 1,400 lines):

```solidity

// Governance.sol snippet
contract Governance {
  function propose(bytes[] calldata transactions, string calldata description) external returns (uint256) {
    // Creates a new proposal with actions represented as transactions
  }

  function vote(uint256 proposalId, uint256 yesVotes, uint256 noVotes, uint256 abstainVotes) external {
    // Tallies votes from LockedGold-locked CELO
  }

  function execute(uint256 proposalId) external {
    // If approved, executes each transaction included in the proposal
  }
}```
This contract allows any locked CELO holder to submit a Celo Governance Proposal (CGP)—which includes an ordered list of transactions and a description—to be voted on by the community. Approved proposals are executed by submitting the transactions on-chain within a fixed window 

🛠️ 3. How to Interact (Celo CLI / SDK Example)
Via Celo CLI:
bash
Copy
Edit
# Lock CELO
celocli lockedgold:lock 1000 --from <your-address>

# Vote for validator
celocli lockedgold:vote --group <validatorGroupAddress> --value 500 --from <your-address>

# Submit a governance proposal
# JSON includes transactions to execute (e.g., upgrade contracts)
celocli governance:propose <jsonFile> "Proposal description" --from <your-address>
Via Celo SDK (JavaScript):
```javascript

import { newKit } from '@celo/contractkit'
const kit = newKit('https://forno.celo.org')

const lockedGold = await kit.contracts.getLockedGold()
await lockedGold.lock(kit.web3.utils.toWei('100'), true /*useCELO*/)

const governance = await kit.contracts.getGovernance()
const tx = await governance.propose([/*...encoded txs*/], "Upgrade proposal", { from: address })```
