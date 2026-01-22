"use client";

import { Github, Linkedin, Twitter, Mail, Heart, Code2 } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: "https://github.com/Aneaire", label: "GitHub" },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/angelo-santiago-842083318",
      label: "LinkedIn",
    },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Mail, href: "mailto:gelosantiago.dev@gmail.com", label: "Email" },
  ];

  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "Skills", href: "/skills" },
    { label: "Projects", href: "/projects" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <footer className="mt-auto border-t border-border/50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Code2 className="h-5 w-5 text-primary" />
            <span className="text-sm">
              Built with <Heart className="mx-1 inline h-3 w-3 text-red-500" />{" "}
              by Angelo Santiago
            </span>
          </div>

          <div className="flex items-center gap-6">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="mr-2 text-sm text-muted-foreground">
              {currentYear}
            </span>
            <div className="flex gap-1">
              {socialLinks.map((social) => (
                <Button
                  key={social.label}
                  variant="ghost"
                  size="icon"
                  asChild
                  className="h-8 w-8 hover:bg-primary/10 hover:text-primary"
                >
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                  >
                    <social.icon className="h-4 w-4" />
                  </a>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
