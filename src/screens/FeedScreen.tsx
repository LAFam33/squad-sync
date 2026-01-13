import { useState } from "react";
import { Plus, Bell } from "lucide-react";
import { PlotCard } from "@/components/plot";
import { mockPlots, currentUser } from "@/data/mockData";
import { VibeBadge } from "@/components/vibe";

interface FeedScreenProps {
  onCreatePlot: () => void;
  onPlotClick: (plotId: string) => void;
}

export function FeedScreen({ onCreatePlot, onPlotClick }: FeedScreenProps) {
  const [pullingUpPlots, setPullingUpPlots] = useState<Set<string>>(new Set());

  const handlePullUp = (plotId: string) => {
    setPullingUpPlots((prev) => {
      const next = new Set(prev);
      if (next.has(plotId)) {
        next.delete(plotId);
      } else {
        next.add(plotId);
      }
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 glass-card border-b border-border safe-top">
        <div className="flex items-center justify-between px-4 py-3">
          <div>
            <h1 className="text-xl font-bold text-foreground">VIBE_OS</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-muted-foreground">Your vibe:</span>
              <VibeBadge vibe={currentUser.currentVibe} size="sm" />
            </div>
          </div>
          <button className="relative p-2 rounded-full hover:bg-surface-2 transition-colors">
            <Bell className="w-5 h-5 text-foreground" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-vibe-chaos rounded-full" />
          </button>
        </div>
      </header>

      {/* Feed */}
      <div className="px-4 py-4 space-y-4">
        {mockPlots.map((plot) => (
          <PlotCard
            key={plot.id}
            plot={plot}
            isPullingUp={pullingUpPlots.has(plot.id)}
            onPullUp={() => handlePullUp(plot.id)}
            onClick={() => onPlotClick(plot.id)}
          />
        ))}
      </div>

      {/* FAB - Create Plot */}
      <button
        onClick={onCreatePlot}
        className="fixed bottom-24 right-4 z-40 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-transform glow-chaos"
      >
        <Plus className="w-6 h-6" />
      </button>
    </div>
  );
}
