import { formatDistanceToNow, differenceInHours } from "date-fns";
import { MapPin, MessageCircle, Car } from "lucide-react";
import { Plot } from "@/types";
import { VibeBadge } from "@/components/vibe/VibeBadge";
import { UserAvatar, AvatarStack } from "@/components/user/UserAvatar";
import { cn } from "@/lib/utils";

interface PlotCardProps {
  plot: Plot;
  onPullUp?: () => void;
  onReact?: (reaction: keyof Plot["reactions"]) => void;
  onComment?: () => void;
  onClick?: () => void;
  isPullingUp?: boolean;
}

const reactionEmojis: Record<keyof Plot["reactions"], string> = {
  fire: "🔥",
  heart: "❤️",
  laugh: "😂",
  eyes: "👀",
};

export function PlotCard({ 
  plot, 
  onPullUp, 
  onReact, 
  onComment, 
  onClick,
  isPullingUp = false 
}: PlotCardProps) {
  const hoursLeft = differenceInHours(plot.expiresAt, new Date());
  const timeAgo = formatDistanceToNow(plot.createdAt, { addSuffix: true });

  const vibeAccentClass = {
    chaos: "border-l-vibe-chaos",
    active: "border-l-vibe-active",
    chill: "border-l-vibe-chill",
    ghost: "border-l-vibe-ghost",
  }[plot.vibe];

  return (
    <div
      onClick={onClick}
      className={cn(
        "glass-card rounded-xl p-4 border-l-4 transition-all duration-200 cursor-pointer",
        "hover:bg-surface-2/50 active:scale-[0.99]",
        vibeAccentClass
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <UserAvatar user={plot.author} size="md" />
          <div>
            <p className="font-semibold text-foreground">{plot.author.displayName}</p>
            <p className="text-xs text-muted-foreground">{timeAgo}</p>
          </div>
        </div>
        <VibeBadge vibe={plot.vibe} size="sm" />
      </div>

      {/* Content */}
      <p className="text-foreground mb-3 leading-relaxed">{plot.content}</p>

      {/* Location & Expiry */}
      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
        {plot.location && (
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" />
            {plot.location}
          </span>
        )}
        <span className="text-xs">
          {hoursLeft > 0 ? `${hoursLeft}h left` : "Expiring soon"}
        </span>
      </div>

      {/* Reactions Bar */}
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        {(Object.keys(plot.reactions) as Array<keyof Plot["reactions"]>).map((key) => {
          const count = plot.reactions[key];
          if (count === 0) return null;
          return (
            <button
              key={key}
              onClick={(e) => {
                e.stopPropagation();
                onReact?.(key);
              }}
              className="flex items-center gap-1 px-2 py-1 rounded-full bg-surface-2 hover:bg-surface-3 transition-colors text-sm"
            >
              <span>{reactionEmojis[key]}</span>
              <span className="text-muted-foreground">{count}</span>
            </button>
          );
        })}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-3 border-t border-border">
        <div className="flex items-center gap-4">
          {/* Pull Up Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPullUp?.();
            }}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition-all duration-200",
              isPullingUp
                ? "bg-primary text-primary-foreground glow-chaos"
                : "bg-surface-2 text-foreground hover:bg-surface-3"
            )}
          >
            <Car className="w-4 h-4" />
            <span>{isPullingUp ? "Pulling up!" : "I'm pulling up"}</span>
          </button>

          {/* Comments */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onComment?.();
            }}
            className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span className="text-sm">{plot.commentCount}</span>
          </button>
        </div>

        {/* Who's Pulling Up */}
        {plot.pullingUp.length > 0 && (
          <div className="flex items-center gap-2">
            <AvatarStack users={plot.pullingUp} max={3} size="sm" />
            <span className="text-xs text-muted-foreground">pulling up</span>
          </div>
        )}
      </div>
    </div>
  );
}
