"use client";

import useSideBarStore from "../store/sidebar-store";
import { Button } from "../ui/button";
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
      <div className="relative z-10 flex h-full w-80 animate-slide-in-left flex-col overflow-y-auto bg-card p-4 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Navigation</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setHamburger(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        <SideProfile />
        <div className="glass-effect-strong mt-4 rounded-xl p-2">
          <NavBar />
        </div>
      </div>
    </div>
  );
};

export default HamburgerContent;
