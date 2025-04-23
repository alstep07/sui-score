"use client";

import { useEffect, useState } from "react";
import { addressEllipsis, ConnectButton, useWallet } from "@suiet/wallet-kit";
import "@suiet/wallet-kit/style.css";
import { getFullnodeUrl, SuiClient } from "@mysten/sui.js/client";

import { formatSuiBalance, handleError } from "@/lib/utils";
import { Button } from "@/shared/ui/button";
import { UnlinkIcon } from "lucide-react";

export function ManageWalletConnection() {
  const wallet = useWallet();
  const [balance, setBalance] = useState<string>("0");

  const onConnectError = (error: Error) => {
    console.log(error);

    if (error.message.includes("User rejected")) {
      return;
    }

    handleError(error);
  };

  useEffect(() => {
    if (!wallet.connected || !wallet.account?.address) return;

    const client = new SuiClient({ url: getFullnodeUrl("mainnet") });

    const fetchBalance = async () => {
      try {
        const balance = await client.getBalance({
          owner: wallet.account!.address,
          coinType: "0x2::sui::SUI",
        });

        setBalance(formatSuiBalance(balance.totalBalance));
      } catch (error) {
        console.error("Failed to fetch balance:", error);
      }
    };

    fetchBalance();
  }, [wallet.connected, wallet.account?.address, wallet.account]);

  return (
    <div className="flex items-center gap-4">
      {wallet.connected ? (
        <>
          <span className="text-sm font-mono">
            {addressEllipsis(wallet.account?.address ?? "")}
          </span>
          <span className="rounded-md bg-muted p-1.5 text-xs font-mono">
            {wallet.chain?.name}
          </span>
          <span className="text-xs font-mono font-bold">{balance} SUI</span>
          <Button variant="outline" onClick={wallet.disconnect}>
            <UnlinkIcon className="w-4 h-4" />
          </Button>
        </>
      ) : (
        <ConnectButton label="Connect" onConnectError={onConnectError} />
      )}
    </div>
  );
}
