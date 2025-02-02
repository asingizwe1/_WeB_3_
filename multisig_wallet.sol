// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
//multi-sig wallet

//The wallet owners can-submit a transaction,approve and revoke approval of pending transactions
//anyone can execute a transaction after enough owners has approved it.
contract Multisig{
event Deposit(address indexed sender, uint256 amount, uint256 balance);

event SubmitTransaction(
address indexed owner,
uint256 indexed txIndex,//represents uinque id for each transaction submitted on multisig
//basically its the position of transaction in the transactions array
address indexed to,
uint256 value,
bytes data
);//txindex is indexed to make it easier to quickly,track and filter specific transactions

event ConfirmTransaction(address indexed owner,uint256 indexed );
event RevokeTransaction(address indexed owner,uint256 indexed );
event ExecuteTransaction(address indexed owner,uint256 indexed );

address[] public owners;
mapping (address=>bool) public isOwner;
uint256 public numConfirmationsRequired;

struct Transaction{
address to;
bytes value;
bytes data;
//bytes data property is used to store arbitrary data that can be sent along with the transaction
//enables contract carry extra info, execute functions and interact with other smart contracts
bool executed;
uint256 numConfirmations;
}

// mapping from tx index => owner => bool
//using a mapping with in a mapping
//[] [] -  we shall use 2 [] to access the address and its respective index, since its a double mapping
mapping(uint256=>mapping (address=>bool)) public isConfirmed;

Transaction[] public transactions;

modifier onlyOwner(){
require(isOwner[msg.sender],"not owner");
    _;
}

modifier txExists(uint256 _txIndex){
    require(!transactions[_txIndex],"tx doesnt exist");
_;
}
 modifier notExecuted(uint256 _txIndex){
require(!transactions[_txIndex].executed,"tx already executed");
_;
 }

modifier notConfirmed(uint256 _txIndex){
    require(!isConfirmed[_txIndex][msg.sender],"tx already confirmed");
}

constructor(address[]memory _owners, uint256 _numConfirmationsRequired){
require(_owner.length>0,"owners required");
_;
}

require(_numConfirmationsRequired>0
    && _numConfirmationsRequired<=_owners.length,
    "invalid number of required confirmations");

        for (uint256 i = 0; i < _owners.length; i++) {
            address owner = _owners[i];
//On each iteration, the line address owner = _owners[i]; retrieves the owner address at index i in the _owners array.
//This variable owner is used to represent the current owner being processed.

            require(owner != address(0), "invalid owner");
            //The above  ensures that the owner address is not the zero address (0x000...0).
            // The zero address is not a valid owner, so the loop will throw an error if encountered.
            require(!isOwner[owner], "owner not unique");
//The above makes sure the owner hasn't been added before.
//[]- we use these for mappings and arrays
            isOwner[owner] = true;
            owners.push(owner);
        }

        numConfirmationsRequired = _numConfirmationsRequired;
    }

receive() external payable { 
    emit Deposit(msg.sender, msg.value, address(this).balance);
}

function sunbmitTransaction(address _to,uint256 _value , bytes memory _data) public onlyOwner{
        uint256 txIndex = transactions.length;
        
        Transaction.push(Transaction({to:_to,
         value: _value,
          data:_data,
          executed:false,
          numConfirmations:0}));

}

emit SubmitTransaction(msg.sender, txIndex, _to, _value, _data);
//allows an owner to confirm a specific transaction BY TAKING UP INDEX.
   //always create modifiers for the different cases of a use case
    function confirmTransaction(uint256 _txIndex)
       //modifiers
        public
        onlyOwner//Ensures only an owner can call this function.
        txExists(_txIndex)//Ensures the transaction exists before confirming.
        notExecuted(_txIndex)// Ensures the transaction is not already executed.
        notConfirmed(_txIndex)//Ensures the sender hasn't confirmed it before.
    {
        Transaction storage transaction = transactions[_txIndex];
        //This retrieves the transaction object from the transactions array using _txIndex.
        transaction.numConfirmations += 1;
        //above helps in tracking how many owners have approved it
        isConfirmed[_txIndex][msg.sender] = true;
//_txIndex represents the transaction ID.
// second key msg.sender (the caller's address) ensures that only this owner is marked as confirmed.
        emit ConfirmTransaction(msg.sender, _txIndex);
    }
function executeTransaction(uint256 _txIndex)
        //specify modifiers for functions to ensure wrong cases are catered for
        public
        onlyOwner
        txExists(_txIndex)
        notExecuted(_txIndex)
    {
        Transaction storage transaction = transactions[_txIndex];
//for a given usecase to be summarised in a function, first generate modifiers to cater for that given function

//below for transcation to occure.. confirmations must exceed the required number
require(
            transaction.numConfirmations >= numConfirmationsRequired,
            "cannot execute tx"
        );
        transaction.executed = true;

//bool success → Captures whether the transaction execution was successful (true) or failed (false).
//comma (,) means that we are ignoring any additional return values from .call().
        (bool success,) =
//This is a low-level function call that sends Ether and optional data to an address
          //transaction.to - recipient address of the transaction.
            transaction.to.call{value: transaction.value}(transaction.data);
        require(success, "tx failed");

}


    function revokeConfirmation(uint256 _txIndex)
        public
        onlyOwner
        txExists(_txIndex)
        notExecuted(_txIndex)
    {
        Transaction storage transaction = transactions[_txIndex];
        require(isConfirmed[_txIndex][msg.sender], "tx not confirmed");

        transaction.numConfirmations -= 1;
        isConfirmed[_txIndex][msg.sender] = false;

        emit RevokeConfirmation(msg.sender, _txIndex);
    }

    function getOwners() public view returns (address[] memory) {
        return owners;
    }

    function getTransactionCount() public view returns (uint256) {
        return transactions.length;
    }

    function getTransaction(uint256 _txIndex)
        public
        view
        returns (
            address to,
            uint256 value,
            bytes memory data,
            bool executed,
            uint256 numConfirmations
        )
    {
        Transaction storage transaction = transactions[_txIndex];
        return (
            transaction.to,
            transaction.value,
            transaction.data,
            transaction.executed,
            transaction.numConfirmations
        );
    }





