import * as React from "react";
import { cn } from "@/lib/utils";
import { Footer } from "./footer";
import { Header } from "./header";

interface PageLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const PageLayout = React.memo(function PageLayout({
  children,
  className,
  ...props
}: PageLayoutProps) {
  return (
    <div className="max-w-7xl mx-auto relative min-h-screen flex flex-col" {...props}>
      <Header />
      <main className={cn("flex-1 px-4 py-6", className)}>{children}</main>
      <Footer />
    </div>
  );
});

export { Footer } from "./footer";
