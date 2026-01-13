import { useState } from "react";
import { Plus, Search, Copy, QrCode, ChevronRight, Users } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { mockCrews } from "@/data/mockData";
import { cn } from "@/lib/utils";

interface CrewsScreenProps {
  onCrewClick: (crewId: string) => void;
  onCreateCrew: () => void;
  onJoinCrew: () => void;
}

export function CrewsScreen({ onCrewClick, onCreateCrew, onJoinCrew }: CrewsScreenProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCrews = mockCrews.filter((crew) =>
    crew.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background safe-top">
      {/* Header */}
      <header className="sticky top-0 z-40 glass-card border-b border-border">
        <div className="flex items-center justify-between px-4 py-3">
          <div>
            <h1 className="text-xl font-bold text-foreground">Crews</h1>
            <p className="text-sm text-muted-foreground">{mockCrews.length} squads</p>
          </div>
          <button
            onClick={onCreateCrew}
            className="p-2 rounded-full bg-primary text-primary-foreground hover:opacity-90 transition-colors"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="px-4 pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search crews..."
              className="w-full pl-10 pr-4 py-2 bg-surface-1 border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      </header>

      {/* Quick Actions */}
      <div className="p-4 flex gap-3">
        <button
          onClick={onJoinCrew}
          className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-surface-2 rounded-xl hover:bg-surface-3 transition-colors"
        >
          <Copy className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">Enter Code</span>
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-surface-2 rounded-xl hover:bg-surface-3 transition-colors">
          <QrCode className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">Scan QR</span>
        </button>
      </div>

      {/* Crew List */}
      <div className="px-4 space-y-3">
        {filteredCrews.map((crew) => (
          <button
            key={crew.id}
            onClick={() => onCrewClick(crew.id)}
            className="w-full glass-card rounded-xl p-4 hover:bg-surface-2/50 transition-colors text-left"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-surface-2 flex items-center justify-center">
                <span className="text-2xl">{crew.emoji}</span>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-foreground">{crew.name}</h3>
                  {crew.unreadCount && crew.unreadCount > 0 && (
                    <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                      {crew.unreadCount}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3 mt-1">
                  <span className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Users className="w-3.5 h-3.5" />
                    {crew.memberCount} members
                  </span>
                  {crew.lastActivity && (
                    <span className="text-sm text-muted-foreground">
                      • {formatDistanceToNow(crew.lastActivity, { addSuffix: true })}
                    </span>
                  )}
                </div>
              </div>

              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
          </button>
        ))}

        {filteredCrews.length === 0 && (
          <div className="p-8 text-center text-muted-foreground">
            <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No crews found</p>
          </div>
        )}
      </div>
    </div>
  );
}
