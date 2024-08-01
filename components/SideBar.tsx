import { navLink, skills } from "@/constant/fixedText";
import Image from "next/image";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

const SideProfile = () => {
  return (
    <div className=" w-full min-h-2/6 bg-foreground rounded-br-xl p-4 text-center">
      <div className="flex flex-col items-center justify-center">
        <div className=" size-32 relative object-cover">
          <Image
            src={
              "https://utfs.io/f/069ce615-0670-4cd6-a9bc-51bc8f8341cc-15qpaj.jpg"
            }
            fill
            alt="profile"
            className=" rounded-full"
          />
        </div>
        <div className="pt-2">
          <h1 className=" font-bold text-2xl">Angelo S Santiago</h1>
          <p className=" leading-5 break-all font-montserrat text-sm">
            Passionate developer deeply engaged in coding and technology,
            constantly seeking to improve skills and contribute innovative
            solutions
          </p>
          <span className=" flex flex-wrap gap-1 items-center justify-center mt-3">
            {skills.map((skill, index) => (
              <Badge className=" text-[12px]" key={index + 1}>
                {skill}
              </Badge>
            ))}
          </span>
        </div>
      </div>
    </div>
  );
};

const NavBar = () => {
  return (
    <div className=" w-full flex-1 bg-foreground p-4">
      <div className=" flex gap-5 flex-col  h-full">
        {navLink.map((link) => (
          <Button
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

const SideBar = () => {
  return (
    <>
      <div className="sticky text-background h-screen max-h-screen w-3/12 top-0 left-0 space-y-3 min-w-[370px] hidden lg:flex flex-col">
        <SideProfile />
        <NavBar />
      </div>
      <button className=" block absolute top-4 right-4 lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-5 fill-white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>
    </>
  );
};

export default SideBar;
