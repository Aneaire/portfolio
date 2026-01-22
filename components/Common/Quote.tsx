"use client";

import { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";

const quotes = [
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
  },
  {
    text: "Innovation distinguishes between a leader and a follower.",
    author: "Steve Jobs",
  },
  {
    text: "Code is like humor. When you have to explain it, it's bad.",
    author: "Cory House",
  },
  {
    text: "First, solve the problem. Then, write the code.",
    author: "John Johnson",
  },
  {
    text: "The best way to predict the future is to invent it.",
    author: "Alan Kay",
  },
  { text: "Simplicity is the soul of efficiency.", author: "Austin Freeman" },
  {
    text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    author: "Martin Fowler",
  },
  {
    text: "Programs must be written for people to read, and only incidentally for machines to execute.",
    author: "Harold Abelson",
  },
  {
    text: "The most disastrous thing that you can ever learn is your first programming language.",
    author: "Alan Kay",
  },
  {
    text: "Walking on water and developing software from a specification are easy if both are frozen.",
    author: "Edward V. Berard",
  },
  {
    text: "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    author: "Brian Kernighan",
  },
  {
    text: "There are only two hard things in Computer Science: cache invalidation and naming things.",
    author: "Phil Karlton",
  },
  {
    text: "Software and cathedrals are much the same – first we build them, then we pray.",
    author: "Sam Redwine",
  },
  {
    text: "The best error message is the one that never shows up.",
    author: "Thomas Fuchs",
  },
  { text: "Nine people can't make a baby in a month.", author: "Fred Brooks" },
  {
    text: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
  },
  {
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill",
  },
  {
    text: "The only impossible journey is the one you never begin.",
    author: "Tony Robbins",
  },
  {
    text: "Experience is the name everyone gives to their mistakes.",
    author: "Oscar Wilde",
  },
  {
    text: "The only limit to our realization of tomorrow will be our doubts of today.",
    author: "Franklin D. Roosevelt",
  },
  {
    text: "It does not matter how slowly you go as long as you do not stop.",
    author: "Confucius",
  },
  {
    text: "Everything you've ever wanted is on the other side of fear.",
    author: "George Addair",
  },
  {
    text: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt",
  },
  {
    text: "I have not failed. I've just found 10,000 ways that won't work.",
    author: "Thomas Edison",
  },
  {
    text: "The way to get started is to quit talking and begin doing.",
    author: "Walt Disney",
  },
  {
    text: "Don't watch the clock; do what it does. Keep going.",
    author: "Sam Levenson",
  },
  {
    text: "The future depends on what you do today.",
    author: "Mahatma Gandhi",
  },
  {
    text: "It is during our darkest moments that we must focus to see the light.",
    author: "Aristotle",
  },
  {
    text: "Whoever is happy will make others happy too.",
    author: "Anne Frank",
  },
  {
    text: "You will face many defeats in life, but never let yourself be defeated.",
    author: "Maya Angelou",
  },
  { text: "Creativity is intelligence having fun.", author: "Albert Einstein" },
  {
    text: "The secret to creativity is knowing how to hide your sources.",
    author: "Einstein",
  },
  {
    text: "Imagination is more important than knowledge.",
    author: "Albert Einstein",
  },
  {
    text: "The way to get good ideas is to get lots of ideas and throw the bad ones away.",
    author: "Linus Pauling",
  },
  {
    text: "Every great developer you know got there by solving problems they were unqualified to solve until they actually did it.",
    author: "Patrick McKenzie",
  },
  {
    text: "There's no shortage of remarkable ideas, what's missing is the will to execute them.",
    author: "Seth Godin",
  },
  {
    text: "Innovation is the ability to see change as an opportunity, not a threat.",
    author: "Steve Jobs",
  },
  {
    text: "Live as if you were to die tomorrow. Learn as if you were to live forever.",
    author: "Mahatma Gandhi",
  },
  {
    text: "The more that you read, the more things you will know. The more that you learn, the more places you'll go.",
    author: "Dr. Seuss",
  },
  {
    text: "Leadership and learning are indispensable to each other.",
    author: "John F. Kennedy",
  },
  {
    text: "Tell me and I forget. Teach me and I remember. Involve me and I learn.",
    author: "Benjamin Franklin",
  },
  {
    text: "The beautiful thing about learning is that nobody can take it away from you.",
    author: "B.B. King",
  },
  {
    text: "Education is the most powerful weapon which you can use to change the world.",
    author: "Nelson Mandela",
  },
  {
    text: "The only person who is educated is the one who has learned how to learn and change.",
    author: "Carl Rogers",
  },
  { text: "Learning never exhausts the mind.", author: "Leonardo da Vinci" },
  {
    text: "The question isn't whether AI is good or bad; it's what we do with it that matters.",
    author: "Fei-Fei Li",
  },
  {
    text: "AI is the new electricity. It will transform every industry.",
    author: "Andrew Ng",
  },
  {
    text: "The future is already here – it's just not evenly distributed.",
    author: "William Gibson",
  },
  {
    text: "Any sufficiently advanced technology is indistinguishable from magic.",
    author: "Arthur C. Clarke",
  },
  {
    text: "The AI revolution is about augmenting human capability, not replacing it.",
    author: "Satya Nadella",
  },
  {
    text: "Machine learning is the next electricity.",
    author: "Sebastian Thrun",
  },
  {
    text: "The goal of AI is to provide tools that amplify human creativity and intelligence.",
    author: "Demis Hassabis",
  },
  {
    text: "We are building tools that will help us solve problems that are currently unsolvable.",
    author: "Yann LeCun",
  },
];

const Quote = () => {
  const [currentQuote, setCurrentQuote] = useState<{
    text: string;
    author: string;
  } | null>(null);

  useEffect(() => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setCurrentQuote(randomQuote);
  }, []);

  if (!currentQuote) {
    return null;
  }

  return (
    <div className="w-full max-w-5xl">
      <div className="glass-effect relative overflow-hidden rounded-2xl p-8">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        <div className="absolute right-4 top-4">
          <Sparkles className="h-5 w-5 animate-pulse text-primary/50" />
        </div>

        <div className="relative z-10">
          <blockquote className="space-y-4">
            <p className="text-lg font-medium italic leading-relaxed text-foreground">
              &ldquo;{currentQuote.text}&rdquo;
            </p>
            <cite className="flex items-center gap-2 text-sm not-italic text-muted-foreground">
              <span className="h-px w-8 bg-primary/50" />
              {currentQuote.author}
            </cite>
          </blockquote>
        </div>
      </div>
    </div>
  );
};

export default Quote;
