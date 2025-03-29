# nyumba_nft
for the money

## Initial story
1. We want to be able to facilitate the buying and selling of real estate properties using NFTs.
2. We want to create a marketplace for these NFTs.
3. We want to enable asset management for these NFTs.(rent collection, occupancy management, etc)

## Building blocks
the asset shall be reprensented by two NFTs
1. Ownership token
2. Occupancy token

### Asset Tokenization
- Ownership token
- Occupancy token token

#### Ownership token
- Represents ownership of a property
- Can be bought and sold
- Can be fractionalized **(future)**
- Can be used as collateral **(future)**

#### Occupancy token
- Represents the right to occupy a property
- Is transfered to the current occupant of the property
- rent is paid to the owner of the Ownership token
**?? How do we pay to the owner of the Occupancy token**
- Payment extends the duration of the Occupancy token
- Once the duration of the Occupancy token expires, the Ocupancy token is transferred to the owner of the Ownership token.

This is important in the occasion that the Ownership token is sold, the Occupancy token is transferred to the new owner of the Ownership token. The rent is also transferred to the new owner of the Ownership token.
