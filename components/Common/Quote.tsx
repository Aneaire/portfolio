"use client";

import { useState, useEffect } from "react";

const quotes = [
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Code is like humor. When you have to explain it, it's bad.", author: "Cory House" },
  { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
  { text: "Simplicity is the soul of efficiency.", author: "Austin Freeman" },
  { text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.", author: "Martin Fowler" },
  { text: "The best way to predict the future is to invent it.", author: "Alan Kay" },
  { text: "Programs must be written for people to read, and only incidentally for machines to execute.", author: "Harold Abelson" },
  { text: "There are only two hard things in Computer Science: cache invalidation and naming things.", author: "Phil Karlton" },
  { text: "The best error message is the one that never shows up.", author: "Thomas Fuchs" },
  { text: "Every great developer you know got there by solving problems they were unqualified to solve until they actually did it.", author: "Patrick McKenzie" },
  { text: "AI is the new electricity. It will transform every industry.", author: "Andrew Ng" },
  { text: "Any sufficiently advanced technology is indistinguishable from magic.", author: "Arthur C. Clarke" },
  { text: "The future is already here — it's just not evenly distributed.", author: "William Gibson" },
];

const Quote = () => {
  const [currentQuote, setCurrentQuote] = useState<{ text: string; author: string } | null>(null);

  useEffect(() => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setCurrentQuote(randomQuote);
  }, []);

  if (!currentQuote) return null;

  return (
    <div className="w-full max-w-5xl">
      <div className="border-l-2 border-primary py-4 pl-6">
        <p className="text-base italic leading-relaxed text-muted-foreground">
          &ldquo;{currentQuote.text}&rdquo;
        </p>
        <p className="mt-3 text-xs text-muted-foreground/60">— {currentQuote.author}</p>
      </div>
    </div>
  );
};

export default Quote;
