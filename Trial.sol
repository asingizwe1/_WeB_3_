pragma solidity ^0.8.26;
// SPDX-License-Identifier: MIT
contract trial1 {
    
//its meant to be an integer being mapped to type BOOK
mapping (uint16=>book) mappy;
struct book {
string author;
string title ;

}

function addBook(uint16 _id, string memory author,string memory title) public {
    //you dont put values directly
    mappy[_id]=book(author,title);
//book[13]=book("football","Smith");
//book[16]=book("foot","Dr. Mark");
}

}
