'use client';

import { ManageWalletConnection } from '@/features/wallet';

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Sui Score</h1>
          <ManageWalletConnection />
        </div>

        <div className="grid gap-6">
          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Your Achievements</h2>
            <p className="text-muted-foreground">Connect your wallet to see your achievements</p>
          </div>
        </div>
      </div>
    </main>
  );
}
