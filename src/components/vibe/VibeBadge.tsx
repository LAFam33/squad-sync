import { VibeType } from "@/types";
import { cn } from "@/lib/utils";

interface VibeBadgeProps {
  vibe: VibeType;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}

const vibeConfig: Record<VibeType, { label: string; emoji: string; colorClass: string; glowClass: string }> = {
  chaos: {
    label: "CHAOS",
    emoji: "🔥",
    colorClass: "bg-vibe-chaos text-white",
    glowClass: "glow-chaos",
  },
  active: {
    label: "ACTIVE",
    emoji: "⚡",
    colorClass: "bg-vibe-active text-black",
    glowClass: "glow-active",
  },
  chill: {
    label: "CHILL",
    emoji: "🌙",
    colorClass: "bg-vibe-chill text-white",
    glowClass: "glow-chill",
  },
  ghost: {
    label: "GHOST",
    emoji: "👻",
    colorClass: "bg-vibe-ghost text-white",
    glowClass: "",
  },
};

export function VibeBadge({ vibe, size = "md", showLabel = true, className }: VibeBadgeProps) {
  const config = vibeConfig[vibe];
  
  const sizeClasses = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-3 py-1",
    lg: "text-base px-4 py-1.5",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full font-bold uppercase tracking-wider",
        config.colorClass,
        sizeClasses[size],
        className
      )}
    >
      <span>{config.emoji}</span>
      {showLabel && <span>{config.label}</span>}
    </span>
  );
}

interface VibeIndicatorProps {
  vibe: VibeType;
  size?: "sm" | "md" | "lg";
  pulse?: boolean;
  className?: string;
}

export function VibeIndicator({ vibe, size = "md", pulse = false, className }: VibeIndicatorProps) {
  const config = vibeConfig[vibe];
  
  const sizeClasses = {
    sm: "w-2 h-2",
    md: "w-3 h-3",
    lg: "w-4 h-4",
  };

  return (
    <span
      className={cn(
        "inline-block rounded-full",
        config.colorClass,
        sizeClasses[size],
        pulse && "animate-pulse-vibe",
        className
      )}
    />
  );
}
