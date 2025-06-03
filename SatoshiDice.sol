// SPDX-License-Identifier: MIT
/*
Porting means adapting an existing program (in this case, a smart contract written in Solidity for Ethereum) so that it works on another platform — in your case, Polkadot’s EVM-compatible chain Westend.

It usually involves:

Upgrading old Solidity versions.

Adapting incompatible code (e.g., outdated syntax).

Deploying it on the new platform (Westend) using a tool like Foundry.

Testing and comparing performance with the original.
 */
pragma solidity ^0.8.24;

contract SatoshiDice {
    struct Bet {
        address user;
        uint blockNumber;
        uint cap;
        uint amount;
    }

    uint public constant FEE_NUMERATOR = 1;
    uint public constant FEE_DENOMINATOR = 100;
    uint public constant MAXIMUM_CAP = 100000;
    uint public constant MAXIMUM_BET_SIZE = 1 ether;

    address public owner;
    uint public counter = 0;
    mapping(uint => Bet) public bets;

    event BetPlaced(uint id, address indexed user, uint cap, uint amount);
    event Roll(uint id, uint rolled);

    constructor() {
        owner = msg.sender;
    }

    function wager(uint cap) external payable {
        require(cap <= MAXIMUM_CAP, "Cap too high");
        require(msg.value <= MAXIMUM_BET_SIZE, "Bet too large");

        counter++;
        bets[counter] = Bet(msg.sender, block.number + 3, cap, msg.value);
        emit BetPlaced(counter, msg.sender, cap, msg.value);
    }

    function roll(uint id) external {
        Bet storage bet = bets[id];
        require(msg.sender == bet.user, "Not your bet");
        require(block.number >= bet.blockNumber, "Too early to roll");
        require(block.number <= bet.blockNumber + 255, "Too late to roll");

        bytes32 random = keccak256(abi.encodePacked(blockhash(bet.blockNumber), id));
        uint rolled = uint(random) % MAXIMUM_CAP;
        if (rolled < bet.cap) {
            uint payout = (bet.amount * MAXIMUM_CAP) / bet.cap;
            uint fee = (payout * FEE_NUMERATOR) / FEE_DENOMINATOR;
            payout -= fee;
            payable(msg.sender).transfer(payout);
        }

        emit Roll(id, rolled);
        delete bets[id];
    }

    function fund() external payable {}

    function kill() external {
        require(msg.sender == owner, "Only owner");
        selfdestruct(payable(owner));
    }
}

/*pragma solidity ^0.4.18;

contract SatoshiDice {
    struct Bet {
        address user;
        uint block;
        uint cap;
        uint amount; 
    }

    uint public constant FEE_NUMERATOR = 1;
    uint public constant FEE_DENOMINATOR = 100;
    uint public constant MAXIMUM_CAP = 100000;
    uint public constant MAXIMUM_BET_SIZE = 1e18;

    address owner;
    uint public counter = 0;
    mapping(uint => Bet) public bets;

    event BetPlaced(uint id, address user, uint cap, uint amount);
    event Roll(uint id, uint rolled);

    function SatoshiDice () public {
        owner = msg.sender;
    }

    function wager (uint cap) public payable {
        require(cap <= MAXIMUM_CAP);
        require(msg.value <= MAXIMUM_BET_SIZE);

        counter++;
        bets[counter] = Bet(msg.sender, block.number + 3, cap, msg.value);
        BetPlaced(counter, msg.sender, cap, msg.value);
    }

    function roll(uint id) public {
        Bet storage bet = bets[id];
        require(msg.sender == bet.user);
        require(block.number >= bet.block);
        require(block.number <= bet.block + 255);

        bytes32 random = keccak256(block.blockhash(bet.block), id);
        uint rolled = uint(random) % MAXIMUM_CAP;
        if (rolled < bet.cap) {
            uint payout = bet.amount * MAXIMUM_CAP / bet.cap;
            uint fee = payout * FEE_NUMERATOR / FEE_DENOMINATOR;
            payout -= fee;
            msg.sender.transfer(payout);
        }

        emit Roll(id, rolled);
        delete bets[id];
    }

    function fund () payable public {}

    function kill () public {
        require(msg.sender == owner);
        selfdestruct(owner);
    }
}
