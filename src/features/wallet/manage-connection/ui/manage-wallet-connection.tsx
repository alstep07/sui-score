'use client';

import { ConnectButton, useWallet } from '@suiet/wallet-kit';
import { Button } from '@/shared/ui/button';
import "@suiet/wallet-kit/style.css";

export function ManageWalletConnection() {
  const wallet = useWallet()

  return (
    <div className="flex items-center gap-4">
      {wallet.connected ? (
        <>
          <span className="text-sm font-mono">
            {wallet.account?.address?.slice(0, 6)}...{wallet.account?.address?.slice(-4)}
          </span>
          <Button variant="outline" onClick={wallet.disconnect}>
            Disconnect
          </Button>
        </>
      ) : (
        <ConnectButton label="Connect" />
      )}
    </div>
  );
} 
