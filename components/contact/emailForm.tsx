"use client";

import { useRef, useState } from "react";
import { toast } from "sonner";
import { Loader2, Send } from "lucide-react";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  message: string;
}

const EmailForm = () => {
  const form = useRef<HTMLFormElement>(null);
  const [sending, setSending] = useState(false);

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.current) return;

    const formData: FormData = {
      firstName: form.current["firstName"]?.value.trim(),
      lastName: form.current["lastName"]?.value.trim(),
      email: form.current["email"]?.value.trim(),
      phoneNumber: form.current["phoneNumber"]?.value.trim(),
      message: form.current["message"]?.value.trim(),
    };

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.message
    ) {
      toast.error("Please fill out all required fields.");
      return;
    }

    toast.loading("Sending message...", { id: "message-sending" });
    setSending(true);

    try {
      const response = await fetch("/api/send-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to send message");
      }

      form.current?.reset();
      toast.success("Message sent! I'll get back to you soon.", {
        id: "message-sending",
      });
    } catch (error) {
      toast.error("Failed to send message. Please try again.", {
        id: "message-sending",
      });
      console.error("Email sending error:", error);
    } finally {
      setSending(false);
    }
  };

  return (
    <form className="space-y-5" ref={form} onSubmit={sendEmail}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="section-label mb-2 block">First Name *</label>
          <input
            className="input-form"
            placeholder="John"
            type="text"
            name="firstName"
            required
          />
        </div>
        <div>
          <label className="section-label mb-2 block">Last Name *</label>
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
          <label className="section-label mb-2 block">Email Address *</label>
          <input
            className="input-form"
            placeholder="john@example.com"
            type="email"
            name="email"
            required
          />
        </div>
        <div>
          <label className="section-label mb-2 block">Phone Number</label>
          <input
            className="input-form [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            placeholder="+1 (555) 000-0000"
            type="tel"
            name="phoneNumber"
          />
        </div>
      </div>

      <div>
        <label className="section-label mb-2 block">Message *</label>
        <textarea
          className="input-form min-h-36 resize-y"
          name="message"
          placeholder="Tell me about your project, timeline, and how I can help..."
          required
        />
      </div>

      <button
        type="submit"
        disabled={sending}
        className="inline-flex items-center gap-2 bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {sending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            Send Message
          </>
        )}
      </button>
    </form>
  );
};

export default EmailForm;
