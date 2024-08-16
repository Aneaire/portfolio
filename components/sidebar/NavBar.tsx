"use client";
import { navLink } from "@/constant/fixedText";
import { useRouter } from "next/navigation";
import useSideBarStore from "../store/sidebar-store";
import { Button } from "../ui/button";

const NavBar = () => {
  const router = useRouter();
  const { setHamburger, hamburgerShown } = useSideBarStore((state) => state);

  const handleClick = (href: string) => {
    setHamburger(!hamburgerShown);
    router.replace(href);
  };

  return (
    <div className="w-full flex-1 bg-foreground p-4">
      <div className="flex h-full flex-col gap-5">
        {navLink.map((link) => (
          <Button
            onClick={() => handleClick(link.href)}
            key={link.name}
            className={`mx-auto w-full max-w-[370px] text-lg font-bold transition hover:scale-95 hover:shadow-md ${
              link.variant == "accent" && "mt-auto"
            }`}
            variant={link.variant}
          >
            {link.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default NavBar;
