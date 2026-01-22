"use client";

import useSideBarStore from "../store/sidebar-store";

const Hamburger = () => {
  const { setHamburger, hamburgerShown } = useSideBarStore((state) => state);

  if (hamburgerShown) return null;

  return (
    <button
      onClick={() => setHamburger(true)}
      className="fixed right-4 top-4 z-50 flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-border/50 bg-card/80 shadow-lg backdrop-blur-sm transition-colors hover:bg-card lg:hidden"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="size-5 fill-foreground"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
        />
      </svg>
    </button>
  );
};

export default Hamburger;
