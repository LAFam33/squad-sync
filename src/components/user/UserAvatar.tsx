import { User as UserType } from "@/types";
import { VibeIndicator } from "@/components/vibe/VibeBadge";
import { cn } from "@/lib/utils";

interface AvatarProps {
  user: UserType;
  size?: "sm" | "md" | "lg" | "xl";
  showVibe?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: "w-8 h-8 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-12 h-12 text-base",
  xl: "w-16 h-16 text-lg",
};

const vibeSizeMap = {
  sm: "sm" as const,
  md: "sm" as const,
  lg: "md" as const,
  xl: "md" as const,
};

export function UserAvatar({ user, size = "md", showVibe = true, className }: AvatarProps) {
  // Generate a consistent color based on username
  const colors = [
    "bg-vibe-chaos",
    "bg-vibe-active", 
    "bg-vibe-chill",
    "bg-primary",
  ];
  const colorIndex = user.username.charCodeAt(0) % colors.length;
  const bgColor = colors[colorIndex];

  return (
    <div className={cn("relative inline-flex", className)}>
      <div
        className={cn(
          "rounded-full flex items-center justify-center font-bold uppercase",
          sizeClasses[size],
          bgColor,
          user.currentVibe === "ghost" ? "opacity-50" : ""
        )}
      >
        {user.avatar ? (
          <img
            src={user.avatar}
            alt={user.displayName}
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          <span className={user.currentVibe === "active" ? "text-black" : "text-white"}>
            {user.displayName.charAt(0)}
          </span>
        )}
      </div>
      
      {showVibe && user.currentVibe !== "ghost" && (
        <div className="absolute -bottom-0.5 -right-0.5 p-0.5 bg-background rounded-full">
          <VibeIndicator vibe={user.currentVibe} size={vibeSizeMap[size]} pulse={user.isOnline} />
        </div>
      )}
    </div>
  );
}

interface AvatarStackProps {
  users: UserType[];
  max?: number;
  size?: "sm" | "md";
  className?: string;
}

export function AvatarStack({ users, max = 3, size = "sm", className }: AvatarStackProps) {
  const displayUsers = users.slice(0, max);
  const remaining = users.length - max;

  return (
    <div className={cn("flex items-center -space-x-2", className)}>
      {displayUsers.map((user) => (
        <UserAvatar 
          key={user.id} 
          user={user} 
          size={size} 
          showVibe={false}
          className="ring-2 ring-background"
        />
      ))}
      {remaining > 0 && (
        <div
          className={cn(
            "rounded-full flex items-center justify-center font-medium bg-muted text-muted-foreground ring-2 ring-background",
            size === "sm" ? "w-8 h-8 text-xs" : "w-10 h-10 text-sm"
          )}
        >
          +{remaining}
        </div>
      )}
    </div>
  );
}
