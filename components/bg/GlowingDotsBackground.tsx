"use client";

import { useEffect, useState } from "react";

const MeshGradientBackground = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="fixed inset-0 -z-10 bg-background" />;
  }

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-background" />

      <div className="absolute -left-1/2 -top-1/2 h-[200%] w-[200%] animate-[spin_20s_linear_infinite]">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 animate-pulse rounded-full bg-primary/5 blur-[100px]" />
        <div
          className="absolute left-1/2 top-1/3 h-80 w-80 animate-pulse rounded-full bg-secondary/5 blur-[100px]"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute left-1/3 top-1/2 h-96 w-96 animate-pulse rounded-full bg-primary/5 blur-[100px]"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="bg-primary/3 absolute right-0 top-0 h-[800px] w-[800px] animate-float rounded-full blur-[150px]" />
      <div
        className="bg-secondary/3 absolute bottom-0 left-0 h-[600px] w-[600px] animate-float rounded-full blur-[150px]"
        style={{ animationDelay: "3s" }}
      />
      <div
        className="bg-primary/2 absolute left-1/2 top-1/2 h-[500px] w-[500px] animate-float rounded-full blur-[120px]"
        style={{ animationDelay: "5s" }}
      />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,background_100%)]" />
    </div>
  );
};

export default MeshGradientBackground;
