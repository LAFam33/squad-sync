import { useState } from "react";
import { ArrowLeft, Copy, Share2, UserPlus, MessageCircle, Settings, LogOut, Users, Check } from "lucide-react";
import { mockCrews, mockUsers } from "@/data/mockData";
import { UserAvatar } from "@/components/user";
import { VibeIndicator } from "@/components/vibe";
import { cn } from "@/lib/utils";

interface CrewDetailScreenProps {
  crewId: string;
  onBack: () => void;
  onOpenChat: () => void;
}

export function CrewDetailScreen({ crewId, onBack, onOpenChat }: CrewDetailScreenProps) {
  const [copied, setCopied] = useState(false);

  const crew = mockCrews.find((c) => c.id === crewId);

  if (!crew) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Crew not found</p>
      </div>
    );
  }

  const handleCopyCode = () => {
    navigator.clipboard.writeText(crew.inviteCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
          <h1 className="text-lg font-bold text-foreground">Crew Details</h1>
        </div>
      </header>

      {/* Crew Info */}
      <div className="p-6 text-center border-b border-border">
        <div className="w-20 h-20 rounded-3xl bg-surface-2 flex items-center justify-center mx-auto mb-4">
          <span className="text-4xl">{crew.emoji}</span>
        </div>
        <h2 className="text-2xl font-bold text-foreground">{crew.name}</h2>
        <p className="text-muted-foreground mt-1">{crew.memberCount} members</p>
      </div>

      {/* Quick Actions */}
      <div className="flex justify-center gap-4 p-6 border-b border-border">
        <button
          onClick={onOpenChat}
          className="flex flex-col items-center gap-2"
        >
          <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
            <MessageCircle className="w-5 h-5" />
          </div>
          <span className="text-xs text-muted-foreground">Chat</span>
        </button>

        <button className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-full bg-surface-2 text-foreground flex items-center justify-center hover:bg-surface-3 transition-colors">
            <UserPlus className="w-5 h-5" />
          </div>
          <span className="text-xs text-muted-foreground">Invite</span>
        </button>

        <button className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-full bg-surface-2 text-foreground flex items-center justify-center hover:bg-surface-3 transition-colors">
            <Settings className="w-5 h-5" />
          </div>
          <span className="text-xs text-muted-foreground">Settings</span>
        </button>
      </div>

      {/* Invite Code */}
      <div className="p-4 border-b border-border">
        <h3 className="text-sm font-semibold text-muted-foreground mb-3">Invite Code</h3>
        <div className="flex items-center gap-3">
          <div className="flex-1 px-4 py-3 bg-surface-1 border border-border rounded-xl font-mono text-lg text-foreground tracking-wider">
            {crew.inviteCode}
          </div>
          <button
            onClick={handleCopyCode}
            className={cn(
              "p-3 rounded-xl transition-all",
              copied
                ? "bg-vibe-active text-black"
                : "bg-surface-2 text-foreground hover:bg-surface-3"
            )}
          >
            {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
          </button>
          <button className="p-3 rounded-xl bg-surface-2 text-foreground hover:bg-surface-3 transition-colors">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Members */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-muted-foreground">Members</h3>
          <button className="flex items-center gap-1 text-sm text-primary">
            <Users className="w-4 h-4" />
            See all
          </button>
        </div>

        <div className="space-y-3">
          {crew.members.map((member) => (
            <div
              key={member.id}
              className="flex items-center gap-3 p-3 bg-surface-1 rounded-xl"
            >
              <UserAvatar user={member} size="md" />
              <div className="flex-1">
                <p className="font-semibold text-foreground">{member.displayName}</p>
                <p className="text-sm text-muted-foreground">@{member.username}</p>
              </div>
              <div className="flex items-center gap-2">
                <VibeIndicator vibe={member.currentVibe} size="md" pulse={member.isOnline} />
                {member.location && (
                  <span className="text-xs text-muted-foreground">{member.location.name}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Leave Button */}
      <div className="p-4 mt-auto">
        <button className="w-full flex items-center justify-center gap-2 py-3 bg-destructive/10 text-destructive rounded-xl hover:bg-destructive/20 transition-colors">
          <LogOut className="w-5 h-5" />
          <span className="font-semibold">Leave Crew</span>
        </button>
      </div>
    </div>
  );
}
