import { createSorobanContext, SorobanNetwork } from "@soroban-sdk/client";
import freighterApi from "@stellar/freighter-api";
import { useState } from "react";

export function useSorobanContext() {
  const [ctx] = useState(() =>
    createSorobanContext({
      rpcUrl: import.meta.env.VITE_SOROBAN_RPC_URL!,
      network: SorobanNetwork.TESTNET,
    })
  );
  return ctx;
}

export function useWalletSigner() {
  return async (txXdr: string) => {
    const signed = await freighterApi.signTransaction(txXdr, {
      networkPassphrase: SorobanNetwork.TESTNET,
    });
    return signed.xdr;
  };
}
