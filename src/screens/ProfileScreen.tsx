import { useState } from "react";
import {
  Settings,
  Bell,
  Shield,
  Moon,
  HelpCircle,
  LogOut,
  ChevronRight,
  QrCode,
  Copy,
  Check,
  Eye,
  EyeOff,
} from "lucide-react";
import { currentUser } from "@/data/mockData";
import { UserAvatar } from "@/components/user";
import { VibeBadge, VibeIndicator } from "@/components/vibe";
import { VibeType } from "@/types";
import { cn } from "@/lib/utils";

interface ProfileScreenProps {
  onSettingsClick: () => void;
}

const vibeOptions: { vibe: VibeType; emoji: string }[] = [
  { vibe: "chaos", emoji: "🔥" },
  { vibe: "active", emoji: "⚡" },
  { vibe: "chill", emoji: "🌙" },
  { vibe: "ghost", emoji: "👻" },
];

export function ProfileScreen({ onSettingsClick }: ProfileScreenProps) {
  const [currentVibe, setCurrentVibe] = useState<VibeType>(currentUser.currentVibe);
  const [isGhost, setIsGhost] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyUsername = () => {
    navigator.clipboard.writeText(`@${currentUser.username}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleGhost = () => {
    if (isGhost) {
      setIsGhost(false);
      setCurrentVibe("active");
    } else {
      setIsGhost(true);
      setCurrentVibe("ghost");
    }
  };

  return (
    <div className="min-h-screen bg-background safe-top safe-bottom">
      {/* Header */}
      <header className="sticky top-0 z-40 glass-card border-b border-border">
        <div className="flex items-center justify-between px-4 py-3">
          <h1 className="text-xl font-bold text-foreground">Profile</h1>
          <button
            onClick={onSettingsClick}
            className="p-2 rounded-full hover:bg-surface-2 transition-colors"
          >
            <Settings className="w-5 h-5 text-foreground" />
          </button>
        </div>
      </header>

      {/* Profile Card */}
      <div className="p-6 text-center border-b border-border">
        <UserAvatar user={{ ...currentUser, currentVibe }} size="xl" className="mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-foreground">{currentUser.displayName}</h2>
        <button
          onClick={handleCopyUsername}
          className="flex items-center gap-1 mx-auto mt-1 text-muted-foreground hover:text-foreground transition-colors"
        >
          <span>@{currentUser.username}</span>
          {copied ? (
            <Check className="w-4 h-4 text-vibe-active" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </button>
        <VibeBadge vibe={currentVibe} size="md" className="mt-4" />
      </div>

      {/* Ghost Mode Toggle */}
      <div className="p-4 border-b border-border">
        <button
          onClick={toggleGhost}
          className={cn(
            "w-full flex items-center justify-between p-4 rounded-xl transition-all",
            isGhost ? "bg-vibe-ghost/20 border border-vibe-ghost" : "bg-surface-1"
          )}
        >
          <div className="flex items-center gap-3">
            {isGhost ? (
              <EyeOff className="w-5 h-5 text-vibe-ghost" />
            ) : (
              <Eye className="w-5 h-5 text-foreground" />
            )}
            <div className="text-left">
              <p className="font-semibold text-foreground">Ghost Mode</p>
              <p className="text-sm text-muted-foreground">
                {isGhost ? "You're invisible" : "You're visible to crews"}
              </p>
            </div>
          </div>
          <div
            className={cn(
              "w-12 h-7 rounded-full relative transition-colors",
              isGhost ? "bg-vibe-ghost" : "bg-surface-3"
            )}
          >
            <div
              className={cn(
                "absolute top-1 w-5 h-5 rounded-full bg-white transition-transform",
                isGhost ? "left-6" : "left-1"
              )}
            />
          </div>
        </button>
      </div>

      {/* Vibe Selector */}
      {!isGhost && (
        <div className="p-4 border-b border-border">
          <h3 className="text-sm font-semibold text-muted-foreground mb-3">Set Your Vibe</h3>
          <div className="flex gap-3">
            {vibeOptions
              .filter((opt) => opt.vibe !== "ghost")
              .map((option) => (
                <button
                  key={option.vibe}
                  onClick={() => setCurrentVibe(option.vibe)}
                  className={cn(
                    "flex-1 py-4 rounded-xl border-2 transition-all",
                    currentVibe === option.vibe
                      ? option.vibe === "chaos"
                        ? "bg-vibe-chaos border-vibe-chaos glow-chaos"
                        : option.vibe === "active"
                        ? "bg-vibe-active border-vibe-active glow-active text-black"
                        : "bg-vibe-chill border-vibe-chill glow-chill"
                      : "border-border bg-surface-1 hover:bg-surface-2"
                  )}
                >
                  <span className="text-2xl">{option.emoji}</span>
                </button>
              ))}
          </div>
        </div>
      )}

      {/* QR Code Section */}
      <div className="p-4 border-b border-border">
        <button className="w-full flex items-center justify-between p-4 bg-surface-1 rounded-xl hover:bg-surface-2 transition-colors">
          <div className="flex items-center gap-3">
            <QrCode className="w-5 h-5 text-foreground" />
            <div className="text-left">
              <p className="font-semibold text-foreground">My QR Code</p>
              <p className="text-sm text-muted-foreground">Share your profile</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>

      {/* Menu Items */}
      <div className="p-4 space-y-2">
        {[
          { icon: Bell, label: "Notifications", sublabel: "Manage alerts" },
          { icon: Shield, label: "Privacy", sublabel: "Location & visibility" },
          { icon: Moon, label: "Appearance", sublabel: "Always dark mode" },
          { icon: HelpCircle, label: "Help & Support", sublabel: "Get assistance" },
        ].map((item) => (
          <button
            key={item.label}
            className="w-full flex items-center justify-between p-4 bg-surface-1 rounded-xl hover:bg-surface-2 transition-colors"
          >
            <div className="flex items-center gap-3">
              <item.icon className="w-5 h-5 text-foreground" />
              <div className="text-left">
                <p className="font-semibold text-foreground">{item.label}</p>
                <p className="text-sm text-muted-foreground">{item.sublabel}</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
        ))}
      </div>

      {/* Logout */}
      <div className="p-4">
        <button className="w-full flex items-center justify-center gap-2 py-3 bg-destructive/10 text-destructive rounded-xl hover:bg-destructive/20 transition-colors">
          <LogOut className="w-5 h-5" />
          <span className="font-semibold">Log Out</span>
        </button>
      </div>
    </div>
  );
}
