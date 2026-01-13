import { useState } from "react";
import { AppLayout, TabId } from "@/components/navigation";
import {
  FeedScreen,
  CreatePlotScreen,
  PlotDetailScreen,
  ChatsScreen,
  ChatRoomScreen,
  CrewsScreen,
  CrewDetailScreen,
  MapScreen,
  ProfileScreen,
  AuthScreen,
} from "@/screens";

type Screen =
  | { type: "auth" }
  | { type: "feed" }
  | { type: "create-plot" }
  | { type: "plot-detail"; plotId: string }
  | { type: "chats" }
  | { type: "chat-room"; chatId: string }
  | { type: "crews" }
  | { type: "crew-detail"; crewId: string }
  | { type: "map" }
  | { type: "profile" };

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>("feed");
  const [screen, setScreen] = useState<Screen>({ type: "feed" });

  if (!isAuthenticated) {
    return <AuthScreen onComplete={() => setIsAuthenticated(true)} />;
  }

  const handleTabChange = (tab: TabId) => {
    setActiveTab(tab);
    setScreen({ type: tab === "feed" ? "feed" : tab === "chats" ? "chats" : tab === "map" ? "map" : tab === "crews" ? "crews" : "profile" });
  };

  const renderScreen = () => {
    switch (screen.type) {
      case "feed":
        return (
          <FeedScreen
            onCreatePlot={() => setScreen({ type: "create-plot" })}
            onPlotClick={(plotId) => setScreen({ type: "plot-detail", plotId })}
          />
        );
      case "create-plot":
        return (
          <CreatePlotScreen
            onClose={() => setScreen({ type: "feed" })}
            onSubmit={() => setScreen({ type: "feed" })}
          />
        );
      case "plot-detail":
        return (
          <PlotDetailScreen
            plotId={screen.plotId}
            onBack={() => setScreen({ type: "feed" })}
          />
        );
      case "chats":
        return (
          <ChatsScreen
            onChatClick={(chatId) => setScreen({ type: "chat-room", chatId })}
          />
        );
      case "chat-room":
        return (
          <ChatRoomScreen
            chatId={screen.chatId}
            onBack={() => setScreen({ type: "chats" })}
          />
        );
      case "crews":
        return (
          <CrewsScreen
            onCrewClick={(crewId) => setScreen({ type: "crew-detail", crewId })}
            onCreateCrew={() => {}}
            onJoinCrew={() => {}}
          />
        );
      case "crew-detail":
        return (
          <CrewDetailScreen
            crewId={screen.crewId}
            onBack={() => setScreen({ type: "crews" })}
            onOpenChat={() => {}}
          />
        );
      case "map":
        return <MapScreen onUserClick={() => {}} />;
      case "profile":
        return <ProfileScreen onSettingsClick={() => {}} />;
      default:
        return null;
    }
  };

  const hideNav = screen.type === "create-plot" || screen.type === "chat-room";

  return (
    <AppLayout activeTab={activeTab} onTabChange={handleTabChange} hideNav={hideNav}>
      {renderScreen()}
    </AppLayout>
  );
};

export default Index;
