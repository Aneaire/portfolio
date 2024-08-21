"use client";

import emailjs from "@emailjs/browser";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";

const EmailForm = () => {
  const emailKey = process.env.NEXT_PUBLIC_EMAIL_API_KEY!;
  const serviceId = process.env.NEXT_PUBLIC_EMAIL_SERVER_ID!;
  const templateId = process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_ID!;
  const form = useRef<HTMLFormElement>(null);
  const [sending, setSending] = useState(false);

  const sendEmail = (e: any) => {
    e.preventDefault();

    if (!form.current) return;

    // Validation: Ensure all fields are filled
    const firstName = form.current["first_name"].value.trim();
    const lastName = form.current["lastName"].value.trim();
    const email = form.current["email"].value.trim();
    const phoneNumber = form.current["phoneNumber"].value.trim();
    const message = form.current["message"].value.trim();

    if (!firstName || !lastName || !email || !phoneNumber || !message) {
      toast("Please fill out all fields before submitting.", {
        style: { background: "red", color: "white" },
      });
      return;
    }

    toast("Sending message...", { id: "message-sending" });
    setSending(true);
    emailjs
      .sendForm(serviceId, templateId, form.current, {
        publicKey: emailKey,
      })
      .then(
        () => {
          console.log("SUCCESS!");
          form.current?.reset();
          toast("Message sent successfully, I'll get back to you", {
            style: { background: "green", color: "white" },
          });
          toast.dismiss("message-sending");
          setSending(false);
        },
        (error: any) => {
          console.log("FAILED...");
          toast("Message failed to send. Please try again.", {
            style: { background: "red", color: "white" },
          });
          toast.dismiss("message-sending");
          setSending(false);
        },
      );
  };

  return (
    <form className="w-full space-y-5" ref={form} onSubmit={sendEmail}>
      <div className="flex w-full items-stretch gap-2 md:gap-5 lg:gap-10">
        <span className="flex-1">
          <input
            className="input-form"
            placeholder="First Name"
            type="text"
            name="first_name"
          />
        </span>
        <span className="flex-1">
          <input
            className="input-form"
            placeholder="Last Name"
            type="text"
            name="lastName"
          />
        </span>
      </div>
      <div className="flex w-full flex-col items-stretch gap-4 md:flex-row md:gap-5 lg:gap-10">
        <span className="flex-1">
          <input
            className="input-form"
            placeholder="Email Address"
            type="email"
            name="email"
          />
        </span>
        <span className="flex-1">
          <input
            className="input-form [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            placeholder="Phone Number"
            type="number"
            name="phoneNumber"
          />
        </span>
      </div>
      <textarea
        className="input-form min-h-48 text-gray-900"
        name="message"
        placeholder="Message"
        cols={100}
      />
      <Button
        className="bg-accent text-lg tracking-wide text-white hover:bg-white hover:text-accent"
        type="submit"
        disabled={sending}
      >
        Send Message
      </Button>
    </form>
  );
};

export default EmailForm;
