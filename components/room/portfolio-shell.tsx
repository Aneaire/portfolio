"use client";

import { usePathname } from "next/navigation";
import SideBar from "@/components/sidebar/SideBar";
import Footer from "@/components/footer/Footer";

export function PortfolioShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname === "/") return <main>{children}</main>;
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1 gap-0">
        <SideBar />
        <main className="min-h-screen flex-1 px-4 py-2">{children}</main>
      </div>
      <Footer />
    </div>
  );
}
