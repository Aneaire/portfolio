"use client";

import { Loader2 } from "lucide-react";

interface LoadingOverlayProps {
  show: boolean;
}

function LoadingOverlay({ show }: LoadingOverlayProps) {
  if (!show) return null;
  return (
    <div className="animate-fade-in fixed inset-0 z-[9999] flex items-center justify-center bg-background/70 backdrop-blur-sm transition-opacity">
      <Loader2 className="h-16 w-16 animate-spin text-accent" />
    </div>
  );
}

export default LoadingOverlay;
