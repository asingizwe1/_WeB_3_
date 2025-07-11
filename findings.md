### [S-#] storing the password on chain MAKES IT VISIBLE TO ANYONE (ROOT CAUSE +impact)
(try to be simple and )
**Description:** All data stored on chain is visible to anyone and `PasswordStore::s_password` variable intended to be private can be read by accessing `PasswordStore::getPassword` Function, which is intended to be only called by the owner of the contract

We show on such method of reading  any data off chain below

**Impact:**  Anyone can read password, breaking protocol's rules

**Proof of Concept:**(Prove to the protocol that this is real issue-especially in competitive audits) Paste all you have got when testing on a local chain


**Recommended Mitigation:**  One could encrypt password off chain and decrypt on chain .remove view functions
(you can add code you think)

### [S-#] `PasswordStore::setPassword` has no access control meaning a non owner can change a password

**Description:** The `PasswordStore::setPassword` function is set to br an `external` function, however, the natspec of the function and overral purpose of the smart contract is theat `This function allows only the owner to set the password`

#you can indicate the snippet using the style below using ```javascript key word or any other format you want it to be in..for formatting purposes

```javascript

    function setPassword(string memory newPassword) external {
    ->    //@audit - There are no access controls
        s_password = newPassword;
        emit SetNetPassword();}

```


**Impact:** Anyone can change password severely affecting contract's functionality

**Proof of Concept:**(using protocol's existing test suit here could be helpfil) Add the following the `PasswordStore.t.sol` test file.

<details> helps to collapse in review
<summary>Code</Summary>

```javascript
function test_anyone_can_set_password(address randomAddress) public {
vm.assume(RandomAddress !=owner);//ensures that the random address isnt owner
vm.prank(randomAddress);//here we are being a random address and we are proving that anyone can actually call this
        string memory expectedPassword = "myNewPassword"; 
        passwordStore.setPassword(expectedPassword);
//the test is to show that any address can change the password
        vm.prank(owner);
        string memory actualPassword = passwordStore.getPassword();
        assertEq(actualPassword, expectedPassword);
    
}
 

```

</details>

**Recommended Mitigation:** Add an access control condition to the `setPassword` function

```javascript
if(msg.sender !=s_owner){
revert PasswordStore__NotOwner();
}

```