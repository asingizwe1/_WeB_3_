// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract B {
    uint256 public num;
    address public sender;
    uint256 public value;

    function setVariable(uint256 _num) public payable {
        num = _num;
        sender = msg.sender;
        value = msg.value;
    }
}

contract A {
    event Delegate_Response(bool success, bytes data);

    uint256 public num;
    address public sender;
    uint256 public value;

    function setVariable(address _contract, uint256 _num) public payable {
        (bool success, bytes memory data) = _contract.delegatecall(
            abi.encodeWithSignature("setVariable(uint256)", _num)
        );
        emit Delegate_Response(success, data);
    }
}
