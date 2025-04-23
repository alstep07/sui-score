'use client';

import { WalletProvider } from '@suiet/wallet-kit';
import { PropsWithChildren } from 'react';

export function Providers({ children }: PropsWithChildren) {
  return (
    <WalletProvider>
      {children}
    </WalletProvider>
  );
} 