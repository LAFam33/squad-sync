import { useState } from "react";
import { X, MapPin } from "lucide-react";
import { VibeType } from "@/types";
import { cn } from "@/lib/utils";

interface CreatePlotScreenProps {
  onClose: () => void;
  onSubmit: (content: string, vibe: VibeType, location?: string) => void;
}

const vibeOptions: { vibe: VibeType; emoji: string; label: string; color: string }[] = [
  { vibe: "chaos", emoji: "🔥", label: "CHAOS", color: "bg-vibe-chaos" },
  { vibe: "active", emoji: "⚡", label: "ACTIVE", color: "bg-vibe-active" },
  { vibe: "chill", emoji: "🌙", label: "CHILL", color: "bg-vibe-chill" },
];

export function CreatePlotScreen({ onClose, onSubmit }: CreatePlotScreenProps) {
  const [content, setContent] = useState("");
  const [selectedVibe, setSelectedVibe] = useState<VibeType>("active");
  const [location, setLocation] = useState("");
  const [showLocation, setShowLocation] = useState(false);

  const handleSubmit = () => {
    if (content.trim() && selectedVibe) {
      onSubmit(content, selectedVibe, showLocation ? location : undefined);
      onClose();
    }
  };

  const charLimit = 280;
  const charsLeft = charLimit - content.length;

  return (
    <div className="fixed inset-0 z-50 bg-background animate-slide-up safe-top safe-bottom">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-border">
        <button
          onClick={onClose}
          className="p-2 rounded-full hover:bg-surface-2 transition-colors"
        >
          <X className="w-5 h-5 text-foreground" />
        </button>
        <h1 className="text-lg font-bold text-foreground">New Plot</h1>
        <button
          onClick={handleSubmit}
          disabled={!content.trim()}
          className={cn(
            "px-4 py-2 rounded-full font-semibold transition-all",
            content.trim()
              ? "bg-primary text-primary-foreground hover:opacity-90"
              : "bg-muted text-muted-foreground cursor-not-allowed"
          )}
        >
          Post
        </button>
      </header>

      {/* Content */}
      <div className="p-4 space-y-6">
        {/* Vibe Picker */}
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-3">
            What's the vibe?
          </label>
          <div className="flex gap-3">
            {vibeOptions.map((option) => (
              <button
                key={option.vibe}
                onClick={() => setSelectedVibe(option.vibe)}
                className={cn(
                  "flex-1 py-3 px-4 rounded-xl font-bold transition-all duration-200",
                  "border-2 flex flex-col items-center gap-1",
                  selectedVibe === option.vibe
                    ? `${option.color} border-transparent text-${option.vibe === "active" ? "black" : "white"} scale-105`
                    : "border-border bg-surface-1 text-foreground hover:bg-surface-2"
                )}
              >
                <span className="text-2xl">{option.emoji}</span>
                <span className="text-xs">{option.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Text Input */}
        <div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value.slice(0, charLimit))}
            placeholder="What's the plot? Where you at? What's happening?"
            className="w-full h-40 p-4 bg-surface-1 border border-border rounded-xl text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <div className="flex justify-end mt-2">
            <span
              className={cn(
                "text-sm",
                charsLeft < 20 ? "text-vibe-chaos" : "text-muted-foreground"
              )}
            >
              {charsLeft}
            </span>
          </div>
        </div>

        {/* Location Toggle */}
        <div>
          <button
            onClick={() => setShowLocation(!showLocation)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-full transition-colors",
              showLocation
                ? "bg-vibe-chill text-white"
                : "bg-surface-2 text-muted-foreground hover:text-foreground"
            )}
          >
            <MapPin className="w-4 h-4" />
            <span>Add location</span>
          </button>

          {showLocation && (
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g., Westlands, Kilimani, Karen..."
              className="mt-3 w-full px-4 py-3 bg-surface-1 border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          )}
        </div>
      </div>
    </div>
  );
}
