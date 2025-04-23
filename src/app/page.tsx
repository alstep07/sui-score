"use client";

import { ManageWalletConnection } from "@/features/wallet";
import { PageLayout } from "@/widgets/common";

export default function Home() {
  return (
    <PageLayout>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Sui Score</h1>
        <ManageWalletConnection />
      </div>
    </PageLayout>
  );
}
