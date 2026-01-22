"use client";

import emailjs from "@emailjs/browser";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Loader2, Send } from "lucide-react";

const EmailForm = () => {
  const emailKey = process.env.NEXT_PUBLIC_EMAIL_API_KEY!;
  const serviceId = process.env.NEXT_PUBLIC_EMAIL_SERVER_ID!;
  const templateId = process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_ID!;
  const form = useRef<HTMLFormElement>(null);
  const [sending, setSending] = useState(false);

  const sendEmail = (e: any) => {
    e.preventDefault();

    if (!form.current) return;

    const firstName = form.current["first_name"]?.value.trim();
    const lastName = form.current["lastName"]?.value.trim();
    const email = form.current["email"]?.value.trim();
    const phoneNumber = form.current["phoneNumber"]?.value.trim();
    const message = form.current["message"]?.value.trim();

    if (!firstName || !lastName || !email || !message) {
      toast.error("Please fill out all required fields.");
      return;
    }

    toast.loading("Sending message...", { id: "message-sending" });
    setSending(true);

    emailjs
      .sendForm(serviceId, templateId, form.current, {
        publicKey: emailKey,
      })
      .then(
        () => {
          form.current?.reset();
          toast.success(
            "Message sent successfully! I'll get back to you soon.",
            { id: "message-sending" },
          );
          setSending(false);
        },
        (error: any) => {
          toast.error("Failed to send message. Please try again.", {
            id: "message-sending",
          });
          console.error("Email sending error:", error);
          setSending(false);
        },
      );
  };

  return (
    <form className="space-y-6" ref={form} onSubmit={sendEmail}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium">First Name *</label>
          <input
            className="input-form"
            placeholder="John"
            type="text"
            name="first_name"
            required
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">Last Name *</label>
          <input
            className="input-form"
            placeholder="Doe"
            type="text"
            name="lastName"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium">
            Email Address *
          </label>
          <input
            className="input-form"
            placeholder="john@example.com"
            type="email"
            name="email"
            required
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">Phone Number</label>
          <input
            className="input-form [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            placeholder="+1 (555) 000-0000"
            type="tel"
            name="phoneNumber"
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">Message *</label>
        <textarea
          className="input-form min-h-32 resize-y"
          name="message"
          placeholder="Tell me about your project, timeline, and how I can help..."
          required
        />
      </div>

      <Button
        type="submit"
        disabled={sending}
        className="w-full min-w-[200px] bg-primary hover:bg-primary/90 md:w-auto"
      >
        {sending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="mr-2 h-4 w-4" />
            Send Message
          </>
        )}
      </Button>
    </form>
  );
};

export default EmailForm;
