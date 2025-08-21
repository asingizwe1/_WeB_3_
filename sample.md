//type declaration
//enums can be used to create custom types with a finite set of constant values
//implicit conversion isnt allowed in enums
// the enum below is to ensure that we dont pick a winner when we are already calculating a winner
enum RuffleState {
        OPEN, //raffle is open for entries
        CALCULATING //raffle is calculating winner
    } 

