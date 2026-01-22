"use client";

import { useState, useRef } from "react";
import { ISKillList } from "@/constant/fixedText";
import { cn } from "@/lib/utils";

interface SkillCardProps extends ISKillList {
  className?: string;
  showDescription?: boolean;
}

const SkillCard = ({
  name,
  icon,
  desc,
  alt,
  link,
  className,
  showDescription = true,
}: SkillCardProps) => {
  const [showDesc, setShowDesc] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      setShowDesc(true);
    }, 1500);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setShowDesc(false);
  };

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group relative flex w-[140px] flex-none flex-col items-center rounded-xl border border-border/50 bg-card p-5 transition-all duration-500 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 sm:w-[150px] md:w-[160px]",
        className,
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative z-10 flex w-full flex-col items-center text-center">
        <div className="relative mb-3">
          <div className="absolute inset-0 rounded-full bg-primary/20 opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-50" />
          <img
            alt={alt}
            src={icon}
            className="relative size-14 object-contain transition-transform duration-500 group-hover:scale-110"
          />
        </div>

        <h3 className="mb-1 line-clamp-1 text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
          {name}
        </h3>

        {showDescription && (
          <div
            className={cn(
              "overflow-hidden text-xs text-muted-foreground transition-all duration-300",
              showDesc ? "max-h-32 opacity-100" : "max-h-0 opacity-0",
            )}
          >
            {desc}
          </div>
        )}
      </div>
    </a>
  );
};

export default SkillCard;
