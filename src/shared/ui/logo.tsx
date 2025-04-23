import { cn } from "@/lib/utils";
import { Droplet } from "lucide-react";
import Link from "next/link";

export const Logo: React.FC = () => {
  return (
    <Link href="/">
      <div className={cn("flex items-end gap-2")}>
        <Droplet className="size-8 text-blue-900" strokeWidth={3} />
        <span className="text-2xl font-bold font-mono">SuiScore</span>
      </div>
    </Link>
  );
};
