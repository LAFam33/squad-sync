import { MapPin, Filter, Layers } from "lucide-react";
import { mockUsers } from "@/data/mockData";
import { UserAvatar } from "@/components/user";
import { VibeBadge } from "@/components/vibe";
import { cn } from "@/lib/utils";

interface MapScreenProps {
  onUserClick: (userId: string) => void;
}

export function MapScreen({ onUserClick }: MapScreenProps) {
  // Filter users who have locations and aren't ghosts
  const visibleUsers = mockUsers.filter(
    (user) => user.location && user.currentVibe !== "ghost"
  );

  return (
    <div className="min-h-screen bg-background safe-top">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-40 p-4 safe-top">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-foreground bg-background/80 backdrop-blur px-4 py-2 rounded-full">
            Map
          </h1>
          <div className="flex gap-2">
            <button className="p-3 rounded-full glass-card hover:bg-surface-2 transition-colors">
              <Filter className="w-5 h-5 text-foreground" />
            </button>
            <button className="p-3 rounded-full glass-card hover:bg-surface-2 transition-colors">
              <Layers className="w-5 h-5 text-foreground" />
            </button>
          </div>
        </div>
      </header>

      {/* Map Placeholder - Dark tactical grid */}
      <div className="min-h-screen tactical-grid bg-surface-0 flex items-center justify-center relative">
        <div className="text-center p-8">
          <MapPin className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
          <h2 className="text-xl font-bold text-foreground mb-2">Map View</h2>
          <p className="text-muted-foreground max-w-xs">
            Mapbox integration coming soon. You'll see your crew's locations here.
          </p>
        </div>

        {/* Simulated pins on the map */}
        <div className="absolute inset-0 pointer-events-none">
          {visibleUsers.map((user, index) => {
            // Random positions for demo
            const positions = [
              { top: "25%", left: "30%" },
              { top: "40%", left: "60%" },
              { top: "55%", left: "25%" },
              { top: "35%", left: "75%" },
              { top: "60%", left: "55%" },
            ];
            const pos = positions[index % positions.length];

            const vibeColor = {
              chaos: "bg-vibe-chaos glow-chaos",
              active: "bg-vibe-active glow-active",
              chill: "bg-vibe-chill glow-chill",
              ghost: "bg-vibe-ghost",
            }[user.currentVibe];

            return (
              <button
                key={user.id}
                onClick={() => onUserClick(user.id)}
                className="absolute pointer-events-auto transform -translate-x-1/2 -translate-y-1/2"
                style={{ top: pos.top, left: pos.left }}
              >
                <div className={cn("w-4 h-4 rounded-full", vibeColor)} />
                <div className="mt-1 px-2 py-1 bg-surface-1/90 backdrop-blur rounded text-xs font-medium text-foreground whitespace-nowrap">
                  {user.displayName}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Cards - Nearby Crew */}
      <div className="absolute bottom-24 left-0 right-0 px-4">
        <div className="overflow-x-auto pb-2 -mx-4 px-4">
          <div className="flex gap-3 w-max">
            {visibleUsers.map((user) => (
              <button
                key={user.id}
                onClick={() => onUserClick(user.id)}
                className="glass-card rounded-xl p-3 flex items-center gap-3 min-w-[200px] hover:bg-surface-2/50 transition-colors"
              >
                <UserAvatar user={user} size="md" />
                <div className="text-left">
                  <p className="font-semibold text-foreground text-sm">{user.displayName}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <VibeBadge vibe={user.currentVibe} size="sm" showLabel={false} />
                    {user.location && (
                      <span className="text-xs text-muted-foreground">{user.location.name}</span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
