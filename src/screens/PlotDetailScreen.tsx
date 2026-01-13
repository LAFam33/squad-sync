import { useState } from "react";
import { ArrowLeft, MapPin, Car, MessageCircle, Share2 } from "lucide-react";
import { formatDistanceToNow, differenceInHours } from "date-fns";
import { Plot, Comment } from "@/types";
import { mockPlots, mockUsers, currentUser } from "@/data/mockData";
import { VibeBadge } from "@/components/vibe";
import { UserAvatar } from "@/components/user";
import { cn } from "@/lib/utils";

interface PlotDetailScreenProps {
  plotId: string;
  onBack: () => void;
}

const reactionEmojis = {
  fire: "🔥",
  heart: "❤️",
  laugh: "😂",
  eyes: "👀",
};

// Mock comments
const mockComments: Comment[] = [
  {
    id: "c1",
    author: mockUsers[1],
    content: "On my way! Save me a spot 🔥",
    createdAt: new Date(Date.now() - 1000 * 60 * 10),
  },
  {
    id: "c2",
    author: mockUsers[2],
    content: "What's the dress code?",
    createdAt: new Date(Date.now() - 1000 * 60 * 8),
  },
  {
    id: "c3",
    author: mockUsers[0],
    content: "Come as you are, vibes only 🙌",
    createdAt: new Date(Date.now() - 1000 * 60 * 5),
  },
];

export function PlotDetailScreen({ plotId, onBack }: PlotDetailScreenProps) {
  const [newComment, setNewComment] = useState("");
  const [isPullingUp, setIsPullingUp] = useState(false);

  const plot = mockPlots.find((p) => p.id === plotId);

  if (!plot) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Plot not found</p>
      </div>
    );
  }

  const hoursLeft = differenceInHours(plot.expiresAt, new Date());
  const timeAgo = formatDistanceToNow(plot.createdAt, { addSuffix: true });

  const vibeAccentClass = {
    chaos: "border-vibe-chaos",
    active: "border-vibe-active",
    chill: "border-vibe-chill",
    ghost: "border-vibe-ghost",
  }[plot.vibe];

  return (
    <div className="min-h-screen bg-background safe-top safe-bottom">
      {/* Header */}
      <header className="sticky top-0 z-40 glass-card border-b border-border">
        <div className="flex items-center gap-3 px-4 py-3">
          <button
            onClick={onBack}
            className="p-2 rounded-full hover:bg-surface-2 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <h1 className="text-lg font-bold text-foreground">Plot</h1>
        </div>
      </header>

      {/* Plot Content */}
      <div className={cn("p-4 border-b-4", vibeAccentClass)}>
        <div className="flex items-start gap-3 mb-4">
          <UserAvatar user={plot.author} size="lg" />
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-foreground">{plot.author.displayName}</span>
              <span className="text-muted-foreground">@{plot.author.username}</span>
            </div>
            <p className="text-sm text-muted-foreground">{timeAgo}</p>
          </div>
          <VibeBadge vibe={plot.vibe} size="md" />
        </div>

        <p className="text-lg text-foreground leading-relaxed mb-4">{plot.content}</p>

        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          {plot.location && (
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {plot.location}
            </span>
          )}
          <span>{hoursLeft > 0 ? `Expires in ${hoursLeft}h` : "Expiring soon"}</span>
        </div>

        {/* Reactions */}
        <div className="flex items-center gap-3 py-3 border-t border-b border-border">
          {(Object.keys(plot.reactions) as Array<keyof typeof plot.reactions>).map((key) => (
            <button
              key={key}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-2 hover:bg-surface-3 transition-colors"
            >
              <span>{reactionEmojis[key]}</span>
              <span className="text-sm text-muted-foreground">{plot.reactions[key]}</span>
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 mt-4">
          <button
            onClick={() => setIsPullingUp(!isPullingUp)}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all",
              isPullingUp
                ? "bg-primary text-primary-foreground glow-chaos"
                : "bg-surface-2 text-foreground hover:bg-surface-3"
            )}
          >
            <Car className="w-5 h-5" />
            <span>{isPullingUp ? "Pulling up! 🔥" : "I'm pulling up"}</span>
          </button>
          <button className="p-3 rounded-xl bg-surface-2 hover:bg-surface-3 transition-colors">
            <Share2 className="w-5 h-5 text-foreground" />
          </button>
        </div>
      </div>

      {/* Who's Pulling Up */}
      {plot.pullingUp.length > 0 && (
        <div className="p-4 border-b border-border">
          <h3 className="text-sm font-semibold text-muted-foreground mb-3">
            {plot.pullingUp.length} pulling up
          </h3>
          <div className="space-y-3">
            {plot.pullingUp.map((user) => (
              <div key={user.id} className="flex items-center gap-3">
                <UserAvatar user={user} size="sm" />
                <span className="font-medium text-foreground">{user.displayName}</span>
                <span className="text-sm text-muted-foreground">@{user.username}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Comments */}
      <div className="p-4">
        <h3 className="text-sm font-semibold text-muted-foreground mb-4">
          Comments ({mockComments.length})
        </h3>
        <div className="space-y-4">
          {mockComments.map((comment) => (
            <div key={comment.id} className="flex gap-3">
              <UserAvatar user={comment.author} size="sm" showVibe={false} />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-foreground">{comment.author.displayName}</span>
                  <span className="text-xs text-muted-foreground">
                    {formatDistanceToNow(comment.createdAt, { addSuffix: true })}
                  </span>
                </div>
                <p className="text-foreground mt-1">{comment.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Comment Input */}
      <div className="sticky bottom-20 p-4 glass-card border-t border-border">
        <div className="flex items-center gap-3">
          <UserAvatar user={currentUser} size="sm" showVibe={false} />
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="flex-1 px-4 py-2 bg-surface-1 border border-border rounded-full text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            disabled={!newComment.trim()}
            className={cn(
              "p-2 rounded-full transition-colors",
              newComment.trim()
                ? "text-primary hover:bg-surface-2"
                : "text-muted-foreground cursor-not-allowed"
            )}
          >
            <MessageCircle className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
