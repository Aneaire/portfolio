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
  invert,
  className,
  showDescription = true,
}: SkillCardProps) => {
  const [showDesc, setShowDesc] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      setShowDesc(true);
    }, 1200);
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
        "group relative flex w-[130px] flex-none flex-col items-center border border-border bg-card p-4 transition-colors duration-200 hover:border-primary sm:w-[140px]",
        className,
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="mb-3 flex items-center justify-center">
        <img
          alt={alt}
          src={icon}
          className={cn("size-12 object-contain transition-transform duration-300 group-hover:scale-105", invert && "invert")}

        />
      </div>

      <h3 className="line-clamp-1 text-xs font-semibold text-muted-foreground transition-colors group-hover:text-foreground">
        {name}
      </h3>

      {showDescription && (
        <div
          className={cn(
            "mt-1 overflow-hidden text-xs text-muted-foreground/70 transition-all duration-300",
            showDesc ? "max-h-24 opacity-100" : "max-h-0 opacity-0",
          )}
        >
          {desc}
        </div>
      )}
    </a>
  );
};

export default SkillCard;
