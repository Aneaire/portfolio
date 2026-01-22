"use client";

import { navLink } from "@/constant/fixedText";
import { usePathname, useRouter } from "next/navigation";
import useSideBarStore from "../store/sidebar-store";
import { Button } from "../ui/button";
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
    <div className="h-full w-full">
      <div className="flex h-full flex-col gap-2">
        {navLink.map((link) => (
          <Button
            onClick={() => handleClick(link.href)}
            key={link.name}
            variant="ghost"
            className={cn(
              "relative w-full justify-start gap-3 px-4 py-6 text-sm font-medium transition-all duration-300",
              pathname === link.href
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
            )}
          >
            {pathname === link.href && (
              <div className="absolute left-0 top-1/2 h-8 w-1 -translate-y-1/2 rounded-r-full bg-primary" />
            )}
            <span
              className={cn(
                "transition-transform duration-300",
                pathname === link.href && "translate-x-1",
              )}
            >
              {link.name}
            </span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default NavBar;
