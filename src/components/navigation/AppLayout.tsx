import { ReactNode } from "react";
import { BottomNav, TabId } from "./BottomNav";

interface AppLayoutProps {
  children: ReactNode;
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  hideNav?: boolean;
}

export function AppLayout({ children, activeTab, onTabChange, hideNav = false }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Main content area with bottom padding for nav */}
      <main className={hideNav ? "" : "pb-20"}>
        {children}
      </main>
      
      {/* Bottom navigation */}
      {!hideNav && (
        <BottomNav activeTab={activeTab} onTabChange={onTabChange} />
      )}
    </div>
  );
}
