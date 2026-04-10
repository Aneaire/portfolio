"use client";

import { navLink } from "@/constant/fixedText";
import { usePathname, useRouter } from "next/navigation";
import useSideBarStore from "../store/sidebar-store";
import { cn } from "@/lib/utils";

const NavBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { setHamburger, hamburgerShown } = useSideBarStore((state) => state);

  const handleClick = (href: string) => {
    if (pathname !== href) {
      setHamburger(!hamburgerShown);
      router.push(href);
    }
  };

  return (
    <div className="flex h-full flex-col gap-0.5">
      {navLink.map((link) => (
        <button
          onClick={() => handleClick(link.href)}
          key={link.name}
          className={cn(
            "relative w-full px-4 py-3 text-left text-sm font-medium transition-colors duration-200",
            pathname === link.href
              ? "text-primary"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {pathname === link.href && (
            <span className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 bg-primary" />
          )}
          {link.name}
        </button>
      ))}
    </div>
  );
};

export default NavBar;
