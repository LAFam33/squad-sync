import { User, Plot, Crew, Chat, Message } from "@/types";

// Mock Users
export const mockUsers: User[] = [
  {
    id: "1",
    username: "kael",
    displayName: "Kael",
    avatar: undefined,
    currentVibe: "chaos",
    isOnline: true,
    location: { name: "Westlands", lat: -1.2641, lng: 36.8034 },
  },
  {
    id: "2",
    username: "zara",
    displayName: "Zara",
    avatar: undefined,
    currentVibe: "active",
    isOnline: true,
    location: { name: "Kilimani", lat: -1.2892, lng: 36.7870 },
  },
  {
    id: "3",
    username: "mwangi",
    displayName: "Mwangi",
    avatar: undefined,
    currentVibe: "chill",
    isOnline: true,
    location: { name: "Karen", lat: -1.3187, lng: 36.7119 },
  },
  {
    id: "4",
    username: "amara",
    displayName: "Amara",
    avatar: undefined,
    currentVibe: "ghost",
    isOnline: false,
  },
  {
    id: "5",
    username: "jayden",
    displayName: "Jayden",
    avatar: undefined,
    currentVibe: "active",
    isOnline: true,
    location: { name: "Lavington", lat: -1.2769, lng: 36.7651 },
  },
];

export const currentUser: User = {
  id: "0",
  username: "you",
  displayName: "You",
  avatar: undefined,
  currentVibe: "active",
  isOnline: true,
  location: { name: "Westlands", lat: -1.2641, lng: 36.8034 },
};

// Mock Plots
export const mockPlots: Plot[] = [
  {
    id: "p1",
    author: mockUsers[0],
    content: "🔥 CHAOS at Alchemist - vibes are immaculate rn. Who's linking?",
    vibe: "chaos",
    location: "Westlands",
    createdAt: new Date(Date.now() - 1000 * 60 * 15), // 15 mins ago
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 23), // 23 hours from now
    pullingUp: [mockUsers[1], mockUsers[4]],
    reactions: { fire: 12, heart: 5, laugh: 3, eyes: 8 },
    commentCount: 7,
  },
  {
    id: "p2",
    author: mockUsers[1],
    content: "⚡ ACTIVE - Someone pull up to Java, I'm bored af. Need company for lunch",
    vibe: "active",
    location: "Kilimani",
    createdAt: new Date(Date.now() - 1000 * 60 * 45), // 45 mins ago
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 20),
    pullingUp: [mockUsers[2]],
    reactions: { fire: 3, heart: 8, laugh: 1, eyes: 2 },
    commentCount: 4,
  },
  {
    id: "p3",
    author: mockUsers[2],
    content: "🌙 CHILL - Movie night at mine, got snacks. 3 spots left, first come first served",
    vibe: "chill",
    location: "Karen",
    createdAt: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 18),
    pullingUp: [mockUsers[0], mockUsers[1], mockUsers[4]],
    reactions: { fire: 6, heart: 15, laugh: 2, eyes: 4 },
    commentCount: 12,
  },
  {
    id: "p4",
    author: mockUsers[4],
    content: "⚡ Pool session at Village Market. Water's perfect, sun's out. Pull up!",
    vibe: "active",
    location: "Gigiri",
    createdAt: new Date(Date.now() - 1000 * 60 * 30),
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 21),
    pullingUp: [],
    reactions: { fire: 4, heart: 2, laugh: 0, eyes: 6 },
    commentCount: 2,
  },
];

// Mock Crews
export const mockCrews: Crew[] = [
  {
    id: "c1",
    name: "Day Ones",
    emoji: "🔥",
    memberCount: 8,
    members: mockUsers.slice(0, 4),
    inviteCode: "DAY1-2024",
    lastActivity: new Date(Date.now() - 1000 * 60 * 5),
    unreadCount: 3,
  },
  {
    id: "c2",
    name: "Work Fam",
    emoji: "💼",
    memberCount: 12,
    members: mockUsers,
    inviteCode: "WORK-SQUAD",
    lastActivity: new Date(Date.now() - 1000 * 60 * 60),
    unreadCount: 0,
  },
  {
    id: "c3",
    name: "Gym Bros",
    emoji: "💪",
    memberCount: 5,
    members: [mockUsers[0], mockUsers[4]],
    inviteCode: "LIFT-IT",
    lastActivity: new Date(Date.now() - 1000 * 60 * 60 * 3),
    unreadCount: 1,
  },
];

// Mock Chats
export const mockChats: Chat[] = [
  {
    id: "chat1",
    type: "dm",
    name: "Kael",
    participants: [mockUsers[0]],
    lastMessage: {
      id: "m1",
      sender: mockUsers[0],
      content: "Yo, you pulling up to Alchemist later?",
      createdAt: new Date(Date.now() - 1000 * 60 * 5),
      isRead: false,
    },
    unreadCount: 2,
  },
  {
    id: "chat2",
    type: "crew",
    name: "Day Ones",
    participants: mockUsers.slice(0, 4),
    crew: mockCrews[0],
    lastMessage: {
      id: "m2",
      sender: mockUsers[1],
      content: "Who's free this weekend?",
      createdAt: new Date(Date.now() - 1000 * 60 * 30),
      isRead: true,
    },
    unreadCount: 3,
  },
  {
    id: "chat3",
    type: "dm",
    name: "Zara",
    participants: [mockUsers[1]],
    lastMessage: {
      id: "m3",
      sender: mockUsers[1],
      content: "Thanks for linking earlier! 🙌",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
      isRead: true,
    },
    unreadCount: 0,
  },
  {
    id: "chat4",
    type: "crew",
    name: "Work Fam",
    participants: mockUsers,
    crew: mockCrews[1],
    lastMessage: {
      id: "m4",
      sender: mockUsers[2],
      content: "Happy Friday everyone! 🎉",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5),
      isRead: true,
    },
    unreadCount: 0,
  },
];

// Mock Messages for a chat
export const mockMessages: Message[] = [
  {
    id: "msg1",
    sender: mockUsers[0],
    content: "Yo what's the move tonight?",
    createdAt: new Date(Date.now() - 1000 * 60 * 60),
    isRead: true,
  },
  {
    id: "msg2",
    sender: currentUser,
    content: "Not sure yet, thinking Alchemist maybe",
    createdAt: new Date(Date.now() - 1000 * 60 * 55),
    isRead: true,
  },
  {
    id: "msg3",
    sender: mockUsers[0],
    content: "Bet, I'm down. What time?",
    createdAt: new Date(Date.now() - 1000 * 60 * 50),
    isRead: true,
  },
  {
    id: "msg4",
    sender: currentUser,
    content: "Like 9ish? I'll post a plot when I'm heading out",
    createdAt: new Date(Date.now() - 1000 * 60 * 45),
    isRead: true,
  },
  {
    id: "msg5",
    sender: mockUsers[0],
    content: "Yo, you pulling up to Alchemist later?",
    createdAt: new Date(Date.now() - 1000 * 60 * 5),
    isRead: false,
  },
];
