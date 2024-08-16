"use client";

import useSideBarStore from "../store/sidebar-store";
import { Button } from "../ui/button";
import NavBar from "./NavBar";
import { SideProfile } from "./SideBar";

const HamburgerContent = () => {
  const { hamburgerShown, setHamburger } = useSideBarStore((state) => state);

  if (!hamburgerShown) return null;

  return (
    <div className="fixed left-0 top-0 z-10 flex h-screen max-h-screen w-full flex-col text-background lg:hidden">
      <div className="relative flex flex-1 flex-col">
        <SideProfile />
        <NavBar />
        <Button onClick={() => setHamburger(false)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="absolute right-3 top-4 size-7"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </Button>
      </div>
    </div>
  );
};

export default HamburgerContent;
