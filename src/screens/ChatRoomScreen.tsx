import { useState, useRef, useEffect } from "react";
import { ArrowLeft, Phone, Video, MoreVertical, Send, Image, Smile } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { mockChats, mockMessages, currentUser } from "@/data/mockData";
import { UserAvatar } from "@/components/user";
import { cn } from "@/lib/utils";

interface ChatRoomScreenProps {
  chatId: string;
  onBack: () => void;
}

export function ChatRoomScreen({ chatId, onBack }: ChatRoomScreenProps) {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState(mockMessages);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const chat = mockChats.find((c) => c.id === chatId);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!chat) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Chat not found</p>
      </div>
    );
  }

  const handleSend = () => {
    if (!newMessage.trim()) return;

    const message = {
      id: `msg-${Date.now()}`,
      sender: currentUser,
      content: newMessage,
      createdAt: new Date(),
      isRead: false,
    };

    setMessages([...messages, message]);
    setNewMessage("");
  };

  const otherUser = chat.participants[0];

  return (
    <div className="min-h-screen bg-background flex flex-col safe-top safe-bottom">
      {/* Header */}
      <header className="sticky top-0 z-40 glass-card border-b border-border">
        <div className="flex items-center gap-3 px-4 py-3">
          <button
            onClick={onBack}
            className="p-2 rounded-full hover:bg-surface-2 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>

          {chat.type === "dm" ? (
            <UserAvatar user={otherUser} size="md" />
          ) : (
            <div className="w-10 h-10 rounded-full bg-surface-2 flex items-center justify-center">
              <span className="text-lg">{chat.crew?.emoji || "👥"}</span>
            </div>
          )}

          <div className="flex-1">
            <h1 className="font-bold text-foreground">{chat.name}</h1>
            {chat.type === "dm" && otherUser.isOnline && (
              <p className="text-xs text-vibe-active">Active now</p>
            )}
            {chat.type === "crew" && (
              <p className="text-xs text-muted-foreground">{chat.participants.length} members</p>
            )}
          </div>

          <div className="flex items-center gap-1">
            <button className="p-2 rounded-full hover:bg-surface-2 transition-colors">
              <Phone className="w-5 h-5 text-foreground" />
            </button>
            <button className="p-2 rounded-full hover:bg-surface-2 transition-colors">
              <Video className="w-5 h-5 text-foreground" />
            </button>
            <button className="p-2 rounded-full hover:bg-surface-2 transition-colors">
              <MoreVertical className="w-5 h-5 text-foreground" />
            </button>
          </div>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => {
          const isOwn = message.sender.id === currentUser.id;

          return (
            <div
              key={message.id}
              className={cn("flex gap-2", isOwn ? "justify-end" : "justify-start")}
            >
              {!isOwn && <UserAvatar user={message.sender} size="sm" showVibe={false} />}

              <div
                className={cn(
                  "max-w-[75%] px-4 py-2 rounded-2xl",
                  isOwn
                    ? "bg-primary text-primary-foreground rounded-br-sm"
                    : "bg-surface-2 text-foreground rounded-bl-sm"
                )}
              >
                {chat.type === "crew" && !isOwn && (
                  <p className="text-xs font-medium text-primary mb-1">
                    {message.sender.displayName}
                  </p>
                )}
                <p>{message.content}</p>
                <p
                  className={cn(
                    "text-xs mt-1",
                    isOwn ? "text-primary-foreground/70" : "text-muted-foreground"
                  )}
                >
                  {formatDistanceToNow(message.createdAt, { addSuffix: true })}
                </p>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="sticky bottom-0 p-4 glass-card border-t border-border">
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-full hover:bg-surface-2 transition-colors">
            <Image className="w-5 h-5 text-muted-foreground" />
          </button>
          <div className="flex-1 relative">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type a message..."
              className="w-full pl-4 pr-10 py-3 bg-surface-1 border border-border rounded-full text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2">
              <Smile className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
          <button
            onClick={handleSend}
            disabled={!newMessage.trim()}
            className={cn(
              "p-3 rounded-full transition-all",
              newMessage.trim()
                ? "bg-primary text-primary-foreground hover:opacity-90"
                : "bg-surface-2 text-muted-foreground cursor-not-allowed"
            )}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
