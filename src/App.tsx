
import { useEffect, useState } from "react";
import { EmotionalHome } from "./components/EmotionalHome";
import { JournalSection } from "./components/JournalSection";
import { Onboarding } from "./components/Onboarding";
import { SettingsButton, SettingsModal } from "./components/Settings";
import { useProfile } from "./context/ProfileContext";
import { Mood } from "./data/responses";
import { AmbientBackground } from "./components/AmbientBackground";
import { WelcomePopup } from "./components/WelcomePopup";
import { MomentsDashboard } from "./components/MomentsDashboard";

// type View = "home" | Mood;
type View = "home" | Mood | "moments";

function AppShell() {
  const { profile } = useProfile();
  const [view, setView] = useState<View>("home");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [onboarded, setOnboarded] = useState(profile.onboarded);

  useEffect(() => {
    document.documentElement.dataset.theme = profile.theme;
  }, [profile.theme]);

  if (!onboarded) {
    return <Onboarding onComplete={() => setOnboarded(true)} />;
  }

  // const currentMood: "idle" | Mood = view === "home" ? "idle" : view;
  const currentMood: "idle" | Mood = view === "home" || view === "moments" ? "idle" : view;

  return (
      <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-black py-16">
      <AmbientBackground mood={currentMood} />

      <SettingsButton onClick={() => setSettingsOpen(true)} />
      <SettingsModal open={settingsOpen} onClose={() => setSettingsOpen(false)} />
      <WelcomePopup open={showWelcome} onClose={() => setShowWelcome(false)} />

      {/* <main className="relative z-10 flex w-full justify-center">
        {view === "home" && <EmotionalHome onOpenSection={(mood) => setView(mood)} />}
        {(view === "happy" || view === "sad") && (
          <JournalSection mood={view} onBack={() => setView("home")} />
        )}
      </main> */}
      <main className="relative z-10 flex w-full justify-center">
        {view === "home" && (
          <EmotionalHome
            onOpenSection={(mood) => setView(mood)}
            onOpenMoments={() => setView("moments")}
          />
        )}
        {(view === "happy" || view === "sad") && (
          <JournalSection mood={view} onBack={() => setView("home")} />
        )}
        {view === "moments" && <MomentsDashboard onBack={() => setView("home")} />}
      </main>
    </div>
  );
}

function App() {
  return <AppShell />;
}

export default App;