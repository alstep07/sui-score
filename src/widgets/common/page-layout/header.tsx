import { ManageWalletConnection } from "@/features/wallet";
import { Logo } from "@/shared/ui/logo";

export const Header = () => {
  return (
    <header className="p-4 flex flex-col md:flex-row justify-between items-center gap-4">
      <Logo />
      <ManageWalletConnection />
    </header>
  );
};
