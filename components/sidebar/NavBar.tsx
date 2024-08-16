"use client";
import { navLink } from "@/constant/fixedText";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

const NavBar = () => {
  const router = useRouter();
  return (
    <div className=" w-full flex-1 bg-foreground p-4">
      <div className=" flex gap-5 flex-col  h-full">
        {navLink.map((link) => (
          <Button
            onClick={() => router.replace(link.href)}
            key={link.name}
            className={`max-w-[370px] mx-auto font-bold text-lg w-full hover:scale-95 hover:shadow-md transition ${
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
