"use client";

import Container from "@/components/Common/Container";
import Quote from "@/components/Common/Quote";
import EmailForm from "@/components/contact/emailForm";
import { personalInfo } from "@/constant/fixedText";
import {
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  Send,
} from "lucide-react";

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
    <div className="flex items-center gap-4 border border-border bg-card p-4 transition-colors duration-200 hover:border-foreground/30">
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center border border-border text-muted-foreground">
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <p className="section-label mb-0.5">{label}</p>
        <p className="text-sm font-medium text-foreground">{value}</p>
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
        <div className="border-l-2 border-border pl-5">
          <p className="text-sm leading-relaxed text-muted-foreground">
            Always interested in new projects and opportunities. Whether you
            have a question or just want to say hi — feel free to reach out.
            Typically responds within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
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
            label="LinkedIn"
            value="Connect on LinkedIn"
            href="https://www.linkedin.com/in/angelo-santiago-842083318"
          />
        </div>

        <div className="h-px bg-border" />

        <div className="space-y-5">
          <div>
            <p className="section-label mb-2">Contact Form</p>
            <div className="flex items-center gap-2">
              <Send className="h-4 w-4 text-primary" />
              <h2 className="text-xl font-semibold">Send a Message</h2>
            </div>
            <div className="mt-2 h-px w-8 bg-primary" />
          </div>

          <div className="w-full max-w-2xl">
            <EmailForm />
          </div>
        </div>

        <div className="h-px bg-border" />

        <div className="border border-border bg-card p-5">
          <p className="section-label mb-3">Quick Response Guide</p>
          <p className="mb-4 text-xs text-muted-foreground">
            For the fastest response, please include:
          </p>
          <div className="flex flex-wrap gap-2">
            {["Project details", "Timeline", "Budget range", "Your email"].map((item) => (
              <span
                key={item}
                className="border border-border px-3 py-1 text-xs text-muted-foreground"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <Quote />
      </div>
    </Container>
  );
};

export default ContactPage;
