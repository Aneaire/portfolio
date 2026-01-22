"use client";

import Container from "@/components/Common/Container";
import Quote from "@/components/Common/Quote";
import EmailForm from "@/components/contact/emailForm";
import { Separator } from "@/components/ui/separator";
import { personalInfo } from "@/constant/fixedText";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  Send,
  ExternalLink,
  Clock,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const ContactInfoCard = ({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  href?: string;
}) => {
  const content = (
    <div className="glass-effect flex items-center gap-4 rounded-xl p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10">
      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="font-medium text-foreground">{value}</p>
      </div>
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel="noopener noreferrer"
        className="block"
      >
        {content}
      </a>
    );
  }

  return content;
};

const ContactPage = () => {
  return (
    <Container title="Get In Touch">
      <div className="space-y-8">
        <div className="glass-effect rounded-xl p-6">
          <p className="leading-relaxed text-muted-foreground">
            I&apos;m always interested in hearing about new projects and
            opportunities. Whether you have a question or just want to say hi,
            feel free to reach out!
          </p>
          <div className="mt-4 flex items-center gap-2 text-sm text-primary">
            <Clock className="h-4 w-4" />
            <span>Typically responds within 24 hours</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <ContactInfoCard
            icon={Mail}
            label="Email"
            value="gelosantiago.dev@gmail.com"
            href="mailto:gelosantiago.dev@gmail.com"
          />
          <ContactInfoCard
            icon={Phone}
            label="Phone"
            value={personalInfo.number}
            href={`tel:${personalInfo.number}`}
          />
          <ContactInfoCard
            icon={MapPin}
            label="Location"
            value={`${personalInfo.location}`}
          />
          <ContactInfoCard
            icon={MessageSquare}
            label="Social"
            value="Connect on LinkedIn"
            href="https://www.linkedin.com/in/angelo-santiago-842083318"
          />
        </div>

        <Separator className="bg-border/50" />

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Send className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-semibold">Send a Message</h2>
          </div>
          <p className="text-muted-foreground">
            Fill out the form below and I&apos;ll get back to you as soon as
            possible.
          </p>
          <div className="w-full max-w-2xl">
            <EmailForm />
          </div>
        </div>

        <Separator className="bg-border/50" />

        <div className="glass-effect rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-secondary/10">
              <MessageSquare className="h-5 w-5 text-secondary" />
            </div>
            <div className="flex-1">
              <h3 className="mb-2 font-semibold">Quick Response Guide</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                For the fastest response, please include:
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Project details</Badge>
                <Badge variant="secondary">Timeline</Badge>
                <Badge variant="secondary">Budget range</Badge>
                <Badge variant="secondary">Your email</Badge>
              </div>
            </div>
          </div>
        </div>

        <Quote />
      </div>
    </Container>
  );
};

export default ContactPage;
