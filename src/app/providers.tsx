"use client";

import {
  WalletProvider,
  SuietWallet,
  SuiWallet,
  EthosWallet,
} from "@suiet/wallet-kit";
import { PropsWithChildren } from "react";

export function Providers({ children }: PropsWithChildren) {
  return (
    <WalletProvider
      autoConnect
      defaultWallets={[SuietWallet, SuiWallet, EthosWallet]}
    >
      {children}
    </WalletProvider>
  );
}
