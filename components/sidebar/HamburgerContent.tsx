"use client";

import useSideBarStore from "../store/sidebar-store";
import NavBar from "./NavBar";
import { SideProfile } from "./SideBar";
import { X } from "lucide-react";

const HamburgerContent = () => {
  const { hamburgerShown, setHamburger } = useSideBarStore((state) => state);

  if (!hamburgerShown) return null;

  return (
    <div className="fixed inset-0 z-50 flex lg:hidden">
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={() => setHamburger(false)}
      />
      <div className="relative z-10 flex h-full w-72 animate-slide-in-left flex-col overflow-y-auto border-r border-border bg-background p-4 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <span className="section-label">Menu</span>
          <button
            onClick={() => setHamburger(false)}
            className="flex h-7 w-7 items-center justify-center border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
        <SideProfile />
        <div className="mt-3 border border-border bg-card p-2">
          <NavBar />
        </div>
      </div>
    </div>
  );
};

export default HamburgerContent;
