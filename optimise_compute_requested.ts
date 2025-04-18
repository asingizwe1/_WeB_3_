// import { ... } from "@solana/web3.js"

async function buildOptimalTransaction(
    connection: Connection,
    instructions: Array<TransactionInstruction>,
    signer: Signer,
    lookupTables: Array<AddressLookupTableAccount>,
  ) {
    const [microLamports, units, recentBlockhash] = await Promise.all([
      100 /* Get optimal priority fees - https://solana.com/developers/guides/advanced/how-to-use-priority-fees*/,
      getSimulationComputeUnits(
        connection,
        instructions,
        signer.publicKey,
        lookupTables,
      ),
      connection.getLatestBlockhash(),
    ]);
  
    instructions.unshift(
      ComputeBudgetProgram.setComputeUnitPrice({ microLamports }),
    );
    if (units) {
      // probably should add some margin of error to units
      instructions.unshift(ComputeBudgetProgram.setComputeUnitLimit({ units }));
    }
    return {
      transaction: new VersionedTransaction(
        new TransactionMessage({
          instructions,
          recentBlockhash: recentBlockhash.blockhash,
          payerKey: signer.publicKey,
        }).compileToV0Message(lookupTables),
      ),
      recentBlockhash,
    };
  }