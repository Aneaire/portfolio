"use client";

import {
  Download,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Twitter,
  FileText,
} from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import Hamburger from "./Hamburger";
import HamburgerContent from "./HamburgerContent";
import NavBar from "./NavBar";
import { Badge } from "../ui/badge";

export const SideProfile = () => {
  return (
    <div className="glass-effect-strong relative overflow-hidden rounded-2xl p-6 text-center">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
      <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-primary via-violet-400 to-secondary" />

      <div className="relative z-10 flex flex-col items-center justify-center space-y-4">
        <div className="group relative">
          <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-primary to-secondary opacity-75 blur transition-opacity duration-500 group-hover:opacity-100" />
          <div className="relative size-28 overflow-hidden rounded-full bg-card">
            <Image
              src="https://utfs.io/f/069ce615-0670-4cd6-a9bc-51bc8f8341cc-15qpaj.jpg"
              fill
              alt="Angelo S Santiago - Profile"
              className="object-cover"
              sizes="112px"
              priority
            />
          </div>
          <div className="absolute bottom-1 right-1 h-4 w-4 animate-pulse rounded-full border-2 border-card bg-green-500" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Angelo Santiago
          </h1>
          <p className="text-sm font-medium text-muted-foreground">
            Full Stack Developer
          </p>
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3" />
            <span>Pampanga, Philippines</span>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          <Badge
            variant="secondary"
            className="border-primary/20 bg-primary/10 text-primary"
          >
            TypeScript
          </Badge>
          <Badge
            variant="secondary"
            className="border-secondary/20 bg-secondary/10 text-secondary"
          >
            React
          </Badge>
          <Badge
            variant="secondary"
            className="border-primary/20 bg-primary/10 text-primary"
          >
            AI/Automation
          </Badge>
        </div>

        <Separator className="bg-border/50" />

        <div className="flex w-full flex-col gap-2 text-sm text-muted-foreground">
          <a
            href="mailto:gelosantiago.dev@gmail.com"
            className="flex items-center justify-center gap-2 transition-colors hover:text-primary"
          >
            <Mail className="h-4 w-4" />
            <span>gelosantiago.dev@gmail.com</span>
          </a>
        </div>

        <Separator className="bg-border/50" />

        <div className="flex justify-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            asChild
            className="hover:bg-primary/10 hover:text-primary"
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
            size="icon"
            asChild
            className="hover:bg-primary/10 hover:text-primary"
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
            size="icon"
            asChild
            className="hover:bg-primary/10 hover:text-primary"
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

        <div className="flex w-full gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 border-primary/30 hover:bg-primary/10"
            asChild
          >
            <a href="/resume.pdf" download>
              <FileText className="mr-2 h-4 w-4" />
              Resume
            </a>
          </Button>
          <Button
            size="sm"
            className="flex-1 bg-primary hover:bg-primary/90"
            asChild
          >
            <a href="/contact">
              <Mail className="mr-2 h-4 w-4" />
              Contact
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
      <HamburgerContent />

      <div className="sticky left-0 top-0 hidden h-screen max-h-screen w-80 flex-col space-y-4 p-4 lg:flex">
        <SideProfile />
        <div className="glass-effect-strong flex-1 rounded-xl p-2">
          <NavBar />
        </div>
      </div>

      <Hamburger />
    </>
  );
};

export default SideBar;
