// src/hooks/useWallet.ts
import { useEffect, useCallback } from "react";
import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";

const injected = new InjectedConnector({
    supportedChainIds: [84532], // Base Sepolia; adjust if needed
});

export const useWallet = () => {
    const { activate, deactivate, account, active, library } = useWeb3React();

    // Auto-connect if previously connected
    /*useEffect(() => {
        const connected = localStorage.getItem("walletConnected");
        if (connected === "true") {
            activate(injected).catch(() => {
                // ignore errors
            });
        }
    }, [activate]);*/

    // Listen to account changes in MetaMask
    useEffect(() => {
        const { ethereum } = window as any;
        if (ethereum && ethereum.on) {
            const handleAccountsChanged = (accounts: string[]) => {
                console.log("MetaMask accountsChanged:", accounts);
                if (accounts.length === 0) {
                    // User has locked MetaMask or disconnected all accounts
                    console.log("No accounts available, deactivating");
                    deactivate();
                    localStorage.removeItem("walletConnected");
                } else {
                    // Account changed; web3-react will update `account`
                    console.log("New account:", accounts[0]);
                }
            };
            const handleChainChanged = (chainId: string) => {
                console.log("Chain changed to", chainId);
                // Optionally: if wrong chain, you can deactivate or show warning
            };
            ethereum.on("accountsChanged", handleAccountsChanged);
            ethereum.on("chainChanged", handleChainChanged);

            return () => {
                if (ethereum.removeListener) {
                    ethereum.removeListener("accountsChanged", handleAccountsChanged);
                    ethereum.removeListener("chainChanged", handleChainChanged);
                }
            };
        }
    }, [deactivate]);

    const connect = useCallback(async () => {
        try {
            if (active) {
                // If already connected in react state, deactivate first so that
                // activate() triggers event flow again
                await deactivate();
            }
            await activate(injected);
            localStorage.setItem("walletConnected", "true");
        } catch (err) {
            console.error("Connection error:", err);
            throw err;
        }
    }, [activate, deactivate, active]);

    const disconnect = useCallback(() => {
        try {
            deactivate();
        } catch { }
        localStorage.removeItem("walletConnected");
    }, [deactivate]);

    return { connect, disconnect, account, active, library };
};
