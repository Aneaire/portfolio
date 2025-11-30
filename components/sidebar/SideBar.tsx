import {
  Download,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Twitter,
} from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import Hamburger from "./Hamburger";
import HamburgerContent from "./HamburgerContent";
import NavBar from "./NavBar";

export const SideProfile = () => {
  return (
    <div className="relative bg-gradient-to-br from-foreground via-foreground to-foreground/95 p-6 text-center backdrop-blur-sm transition-all duration-500 md:rounded-2xl md:shadow-2xl">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-secondary/5 blur-3xl" />

      <div className="relative z-10 flex flex-col items-center justify-center space-y-4">
        {/* Profile Image */}
        <div className="group relative transition-all duration-300">
          <div className="relative size-36 overflow-hidden rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 p-1 shadow-xl">
            <div className="relative size-full overflow-hidden rounded-full bg-background">
              <Image
                src="https://utfs.io/f/069ce615-0670-4cd6-a9bc-51bc8f8341cc-15qpaj.jpg"
                fill
                alt="Angelo S Santiago - Profile"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="150px"
                priority
              />
            </div>
          </div>
          {/* Online status indicator */}
          <div className="absolute bottom-2 right-2 h-4 w-4 rounded-full border-2 border-background bg-green-500 shadow-lg">
            <div className="absolute inset-0 animate-ping rounded-full bg-green-500 opacity-75" />
          </div>
        </div>

        {/* Name and Title */}
        <div className="space-y-2 transition-all duration-300">
          <h1 className="text-3xl font-bold tracking-tight text-background">
            Angelo Santiago
          </h1>
          <div className="flex items-center justify-center gap-2 text-background/80">
            <div className="h-1 w-1 rounded-full bg-primary" />
            <span className="text-sm font-medium">Full Stack Dev / AI Automation / Data Engineering</span>
            <div className="h-1 w-1 rounded-full bg-primary" />
          </div>
        </div>

        {/* Description */}
        <p className="mx-auto max-w-xs text-sm font-medium leading-relaxed text-background/90 transition-all duration-300">
          Software developer specializing in AI automation and data engineering.
          Building robust applications and data pipelines while leveraging AI to
          accelerate development and drive business efficiency.
        </p>

        {/* Contact Info */}
        <div className="space-y-2 text-background/80 transition-all duration-300">
          <div className="flex items-center justify-center gap-2 text-xs">
            <MapPin className="h-3 w-3" />
            <span>Philippines, Pampanga</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-xs">
            <Mail className="h-3 w-3" />
            <span>gelosantiago.dev@gmail.com</span>
          </div>
        </div>

        <Separator className="bg-background/20" />

        {/* Social Links */}
        <div className="flex gap-3 transition-all duration-300">
          <Button
            variant="ghost"
            size="sm"
            className="h-9 w-9 p-0 text-background/80 hover:bg-background/15 hover:text-background"
            asChild
          >
            <a
              href="https://github.com/Aneaire"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-4 w-4" />
            </a>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-9 w-9 p-0 text-background/80 hover:bg-background/15 hover:text-background"
            asChild
          >
            <a
              href="www.linkedin.com/in/angelo-santiago-842083318"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-9 w-9 p-0 text-background/80 hover:bg-background/15 hover:text-background"
            asChild
          >
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter className="h-4 w-4" />
            </a>
          </Button>
        </div>

        {/* Download Resume */}
        <div className="transition-all duration-300">
          <Button
            variant="outline"
            size="sm"
            className="border-background/30 bg-background/10 text-background transition-all duration-200 hover:bg-background/20 hover:text-background"
            asChild
          >
            <a href="/resume.pdf" download>
              <Download className="mr-2 h-4 w-4" />
              Download Resume
            </a>
          </Button>
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
      <div className="sticky left-0 top-0 hidden h-screen max-h-screen w-3/12 min-w-[370px] flex-col space-y-4 p-4 text-background transition-all duration-500 lg:flex">
        <SideProfile />
        <div className="h-full transition-all duration-500">
          <NavBar />
        </div>
      </div>

      <Hamburger />
    </>
  );
};

export default SideBar;
