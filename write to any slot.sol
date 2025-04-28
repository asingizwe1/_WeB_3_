/**
It writes an address to a specific, pre-agreed slot.

Any contract that knows the slot can read it or change it later — no need for normal Solidity variables.
 */
/*
 If you're building upgradeable contracts, writing low-level libraries, or doing deep gas optimizations,
then manual storage slot management is super important.

But if you're just writing normal smart contracts, you usually don't need to worry about it.If you're building upgradeable contracts, writing low-level libraries, or doing deep gas optimizations,
then manual storage slot management is super important.

But if you're just writing normal smart contracts, you usually don't need to worry about it.*/

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

library StorageSlot {
    // Wrap address in a struct so that it can be passed around as a storage pointer
    struct AddressSlot {
        address value;
    }

    function getAddressSlot(bytes32 slot)
        internal
        pure
        returns (AddressSlot storage pointer)
    {
        assembly {
            // Get the pointer to AddressSlot stored at slot
            pointer.slot := slot
        }
    }
}

contract TestSlot {
    bytes32 public constant TEST_SLOT = keccak256("TEST_SLOT");

    function write(address _addr) external {
        StorageSlot.AddressSlot storage data =
            StorageSlot.getAddressSlot(TEST_SLOT);
        data.value = _addr;
    }

    function get() external view returns (address) {
        StorageSlot.AddressSlot storage data =
            StorageSlot.getAddressSlot(TEST_SLOT);
        return data.value;
    }
}

