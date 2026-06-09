"use client";

import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  Twitter,
  FileText,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import ImageLightbox from "../ui/ImageLightbox";
import Hamburger from "./Hamburger";
import HamburgerContent from "./HamburgerContent";
import NavBar from "./NavBar";

export const SideProfile = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <div className="border border-border bg-card px-4 py-6">
      <div className="flex flex-col items-center space-y-5">
        <div className="relative">
          <div
            className="h-24 w-24 overflow-hidden border-2 border-primary cursor-pointer"
            onClick={() => setLightboxOpen(true)}
          >
            <Image
              src="/profile.png"
              width={96}
              height={96}
              alt="Angelo S Santiago"
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute -bottom-1 -right-1 h-3.5 w-3.5 border-2 border-background bg-primary" />
        </div>

        {lightboxOpen && (
          <ImageLightbox
            src="/profile.png"
            alt="Angelo S Santiago"
            onClose={() => setLightboxOpen(false)}
          />
        )}

        <div className="space-y-1 text-center">
          <h1 className="text-lg font-bold tracking-tight text-foreground">
            Angelo Santiago
          </h1>
          <p className="text-xs text-muted-foreground">Full Stack Developer</p>
          <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3" />
            <span>Pampanga, Philippines</span>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-1.5">
          {["TypeScript", "React", "AI/Automation"].map((tag) => (
            <span
              key={tag}
              className="border border-border px-2 py-0.5 text-xs text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>

        <Separator className="bg-border" />

        <a
          href="mailto:gelosantiago.dev@gmail.com"
          className="flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-primary"
        >
          <Mail className="h-3 w-3" />
          <span>gelosantiago.dev@gmail.com</span>
        </a>

        <Separator className="bg-border" />

        <div className="flex items-center gap-1">
          {[
            { icon: Github, href: "https://github.com/Aneaire", label: "GitHub" },
            { icon: Linkedin, href: "https://www.linkedin.com/in/angelo-santiago-842083318", label: "LinkedIn" },
            { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
          ].map(({ icon: Icon, href, label }) => (
            <Button
              key={label}
              variant="ghost"
              size="icon"
              asChild
              className="h-8 w-8 text-muted-foreground transition-colors hover:bg-transparent hover:text-primary"
            >
              <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                <Icon className="h-4 w-4" />
              </a>
            </Button>
          ))}
        </div>

        <div className="flex w-full gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 border-border text-xs hover:border-primary hover:bg-transparent hover:text-primary"
            asChild
          >
            <a href="/Resume UPDATED.pdf" download>
              <FileText className="mr-1.5 h-3 w-3" />
              Resume
            </a>
          </Button>
          <Button
            size="sm"
            className="flex-1 bg-primary text-xs font-semibold text-primary-foreground hover:bg-primary/90"
            asChild
          >
            <a href="/contact">
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

      <div className="sticky left-0 top-0 hidden h-screen max-h-screen w-72 flex-col space-y-3 p-4 lg:flex">
        <SideProfile />
        <div className="border border-border bg-card flex-1 p-2">
          <NavBar />
        </div>
      </div>

      <Hamburger />
    </>
  );
};

export default SideBar;
