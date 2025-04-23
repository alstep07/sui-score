"use client";

import { useEffect, useState } from "react";
import { addressEllipsis, ConnectButton, useWallet } from "@suiet/wallet-kit";
import "@suiet/wallet-kit/style.css";
import { getFullnodeUrl, SuiClient } from "@mysten/sui.js/client";

import { formatSuiBalance, handleError } from "@/lib/utils";
import { Button } from "@/shared/ui/button";
import { UnlinkIcon } from "lucide-react";

export const ManageWalletConnection: React.FC = () => {
  const [balance, setBalance] = useState<string>("0");

  const { connected, account, chain, disconnect } = useWallet();

  const onConnectError = (error: Error) => {
    console.log(error);

    if (error.message.includes("User rejected")) {
      return;
    }

    handleError(error);
  };

  useEffect(() => {
    if (!connected || !account?.address) return;

    const client = new SuiClient({ url: getFullnodeUrl("mainnet") });

    const fetchBalance = async () => {
      try {
        const balance = await client.getBalance({
          owner: account!.address,
          coinType: "0x2::sui::SUI",
        });

        setBalance(formatSuiBalance(balance.totalBalance));
      } catch (error) {
        console.error("Failed to fetch balance:", error);
      }
    };

    fetchBalance();
  }, [connected, account]);

  return (
    <div className="flex items-center gap-4">
      {connected ? (
        <>
          {account?.address && (
            <span className="text-sm font-mono">
              {addressEllipsis(account.address)}
            </span>
          )}
          {chain?.name && (
            <span className="rounded-md bg-muted p-1.5 text-xs font-mono">
              {chain?.name}
            </span>
          )}
          <span className="text-xs font-mono font-bold">{balance} SUI</span>
          <Button variant="outline" onClick={disconnect}>
            <UnlinkIcon className="w-4 h-4" />
          </Button>
        </>
      ) : (
        <ConnectButton label="Connect" onConnectError={onConnectError} />
      )}
    </div>
  );
}
