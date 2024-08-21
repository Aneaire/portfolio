"use client";
import { navLink } from "@/constant/fixedText";
import { usePathname, useRouter } from "next/navigation";
import useSideBarStore from "../store/sidebar-store";
import { Button } from "../ui/button";

const NavBar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const { setHamburger, hamburgerShown } = useSideBarStore((state) => state);

  const handleClick = (href: string) => {
    setHamburger(!hamburgerShown);
    router.push(href);
  };

  return (
    <div className="w-full flex-1 bg-foreground p-4">
      <div className="flex h-full flex-col gap-5">
        {navLink.map((link) => (
          <Button
            onClick={() => handleClick(link.href)}
            key={link.name}
            className={`relative mx-auto w-full max-w-[370px] overflow-hidden text-lg font-bold transition ${pathname != link.href && "hover:scale-95 hover:shadow-md"} ${
              link.variant == "accent" && "mt-auto"
            } `}
            variant={link.variant}
          >
            {link.name}
            {pathname === link.href && (
              <div
                className={`absolute right-0 top-0 h-full w-1.5 ${pathname === "/contact" ? "bg-blue-500" : "bg-accent"}`}
              />
            )}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default NavBar;
