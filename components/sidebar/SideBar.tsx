import { skills } from "@/constant/fixedText";
import Image from "next/image";
import { Badge } from "../ui/badge";
import Hamburger from "./Hamburger";
import HamburgerContent from "./HamburgerContent";
import NavBar from "./NavBar";

export const SideProfile = () => {
  return (
    <div className="min-h-2/6 w-full rounded-br-xl bg-foreground p-4 text-center">
      <div className="flex flex-col items-center justify-center">
        <div className="relative size-32 object-cover">
          <Image
            src={
              "https://utfs.io/f/069ce615-0670-4cd6-a9bc-51bc8f8341cc-15qpaj.jpg"
            }
            fill
            alt="profile"
            className="rounded-full"
            sizes="150px"
          />
        </div>
        <div className="pt-2">
          <h1 className="text-2xl font-bold">Angelo S Santiago</h1>
          <p className="mx-auto max-w-lg break-all font-montserrat text-sm leading-5">
            Passionate developer deeply engaged in coding and technology,
            constantly seeking to improve skills and contribute innovative
            solutions
          </p>
          <span className="mx-auto mt-3 flex max-w-lg flex-wrap items-center justify-center gap-1">
            {skills.map((skill, index) => (
              <Badge className="text-[12px]" key={index + 1}>
                {skill}
              </Badge>
            ))}
          </span>
        </div>
      </div>
    </div>
  );
};

const SideBar = () => {
  return (
    <>
      {/* Mobile */}
      <HamburgerContent />

      {/* Large screen */}
      <div className="sticky left-0 top-0 hidden h-screen max-h-screen w-3/12 min-w-[370px] flex-col space-y-3 text-background lg:flex">
        <SideProfile />
        <NavBar />
      </div>
      <Hamburger />
    </>
  );
};

export default SideBar;
