import { useState } from "react";
import { Search, MessageCircle, Users } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { mockChats } from "@/data/mockData";
import { UserAvatar } from "@/components/user";
import { cn } from "@/lib/utils";

interface ChatsScreenProps {
  onChatClick: (chatId: string) => void;
}

type ChatTab = "all" | "dms" | "crews";

export function ChatsScreen({ onChatClick }: ChatsScreenProps) {
  const [activeTab, setActiveTab] = useState<ChatTab>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredChats = mockChats.filter((chat) => {
    if (activeTab === "dms" && chat.type !== "dm") return false;
    if (activeTab === "crews" && chat.type !== "crew") return false;
    if (searchQuery && !chat.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  const totalUnread = mockChats.reduce((acc, chat) => acc + chat.unreadCount, 0);

  return (
    <div className="min-h-screen bg-background safe-top">
      {/* Header */}
      <header className="sticky top-0 z-40 glass-card border-b border-border">
        <div className="px-4 py-3">
          <h1 className="text-xl font-bold text-foreground">Chats</h1>
          {totalUnread > 0 && (
            <p className="text-sm text-muted-foreground">{totalUnread} unread messages</p>
          )}
        </div>

        {/* Search */}
        <div className="px-4 pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search chats..."
              className="w-full pl-10 pr-4 py-2 bg-surface-1 border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 px-4 pb-3">
          {[
            { id: "all" as const, label: "All" },
            { id: "dms" as const, label: "DMs", icon: MessageCircle },
            { id: "crews" as const, label: "Crews", icon: Users },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-colors",
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-surface-2 text-muted-foreground hover:text-foreground"
              )}
            >
              {tab.icon && <tab.icon className="w-4 h-4" />}
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      {/* Chat List */}
      <div className="divide-y divide-border">
        {filteredChats.map((chat) => (
          <button
            key={chat.id}
            onClick={() => onChatClick(chat.id)}
            className="w-full flex items-center gap-3 p-4 hover:bg-surface-1 transition-colors text-left"
          >
            {chat.type === "dm" ? (
              <UserAvatar user={chat.participants[0]} size="lg" />
            ) : (
              <div className="w-12 h-12 rounded-full bg-surface-2 flex items-center justify-center">
                <span className="text-xl">{chat.crew?.emoji || "👥"}</span>
              </div>
            )}

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-foreground truncate">{chat.name}</span>
                {chat.lastMessage && (
                  <span className="text-xs text-muted-foreground">
                    {formatDistanceToNow(chat.lastMessage.createdAt, { addSuffix: false })}
                  </span>
                )}
              </div>
              {chat.lastMessage && (
                <p className="text-sm text-muted-foreground truncate mt-0.5">
                  {chat.type === "crew" && (
                    <span className="font-medium">{chat.lastMessage.sender.displayName}: </span>
                  )}
                  {chat.lastMessage.content}
                </p>
              )}
            </div>

            {chat.unreadCount > 0 && (
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                {chat.unreadCount}
              </span>
            )}
          </button>
        ))}

        {filteredChats.length === 0 && (
          <div className="p-8 text-center text-muted-foreground">
            <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No chats found</p>
          </div>
        )}
      </div>
    </div>
  );
}
