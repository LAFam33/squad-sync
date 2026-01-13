export type VibeType = "chaos" | "active" | "chill" | "ghost";

export interface User {
  id: string;
  username: string;
  displayName: string;
  avatar?: string;
  currentVibe: VibeType;
  isOnline: boolean;
  location?: {
    name: string;
    lat?: number;
    lng?: number;
  };
}

export interface Plot {
  id: string;
  author: User;
  content: string;
  vibe: VibeType;
  location?: string;
  createdAt: Date;
  expiresAt: Date;
  pullingUp: User[];
  reactions: {
    fire: number;
    heart: number;
    laugh: number;
    eyes: number;
  };
  commentCount: number;
}

export interface Comment {
  id: string;
  author: User;
  content: string;
  createdAt: Date;
}

export interface Crew {
  id: string;
  name: string;
  emoji?: string;
  memberCount: number;
  members: User[];
  inviteCode: string;
  lastActivity?: Date;
  unreadCount?: number;
}

export interface Message {
  id: string;
  sender: User;
  content: string;
  createdAt: Date;
  isRead: boolean;
  plotEmbed?: Plot;
}

export interface Chat {
  id: string;
  type: "dm" | "crew";
  name: string;
  avatar?: string;
  participants: User[];
  lastMessage?: Message;
  unreadCount: number;
  crew?: Crew;
}

export interface Notification {
  id: string;
  type: "pulling_up" | "vibe_change" | "new_plot" | "message";
  title: string;
  body: string;
  createdAt: Date;
  isRead: boolean;
  relatedUser?: User;
  relatedPlot?: Plot;
}
