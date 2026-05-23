"use client";

import { useState } from "react";
import { DraftScreen } from "@/components/DraftScreen";
import { EventPhase } from "@/components/EventPhase";
import { MissionSelect } from "@/components/MissionSelect";
import { ResultScreen } from "@/components/ResultScreen";
import { RoleAssignmentScreen } from "@/components/RoleAssignment";
import { TitleScreen } from "@/components/TitleScreen";
import { calculateResult } from "@/lib/calculateResult";
import { playBeep } from "@/lib/sound";
import type { EventChoice, GameResult, HumanCard, Mission, RoleAssignment } from "@/types/game";

type Screen = "title" | "mission" | "draft" | "roles" | "event" | "result";

export default function Home() {
  const [screen, setScreen] = useState<Screen>("title");
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);
  const [selectedCards, setSelectedCards] = useState<HumanCard[]>([]);
  const [roleAssignment, setRoleAssignment] = useState<RoleAssignment | null>(null);
  const [result, setResult] = useState<GameResult | null>(null);

  const moveTo = (next: Screen) => {
    playBeep("button", soundEnabled);
    setScreen(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const chooseMission = (mission: Mission) => {
    setSelectedMission(mission);
    setSelectedCards([]);
    setRoleAssignment(null);
    setResult(null);
    moveTo("draft");
  };

  const toggleCard = (card: HumanCard) => {
    playBeep("select", soundEnabled);
    setSelectedCards((current) => {
      const exists = current.some((selected) => selected.id === card.id);
      if (exists) return current.filter((selected) => selected.id !== card.id);
      if (current.length >= 5) return current;
      return [...current, card];
    });
  };

  const completeRoles = (assignment: RoleAssignment) => {
    setRoleAssignment(assignment);
    moveTo("event");
  };

  const completeEvent = (choice: EventChoice) => {
    if (!selectedMission || !roleAssignment) return;
    setResult(calculateResult(selectedCards, selectedMission, roleAssignment, choice));
    playBeep("result", soundEnabled);
    setScreen("result");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const restartDraft = () => {
    setSelectedCards([]);
    setRoleAssignment(null);
    setResult(null);
    moveTo("draft");
  };

  const backToMissions = () => {
    setSelectedMission(null);
    setSelectedCards([]);
    setRoleAssignment(null);
    setResult(null);
    moveTo("mission");
  };

  return (
    <main className="min-h-screen">
      <div className="fixed right-3 top-3 z-30">
        <button
          type="button"
          onClick={() => setSoundEnabled((value) => !value)}
          className="rounded-full border border-slate-200 bg-white/90 px-3 py-2 text-xs font-bold shadow-card active:scale-95"
          aria-pressed={soundEnabled}
        >
          音 {soundEnabled ? "ON" : "OFF"}
        </button>
      </div>

      {screen === "title" && <TitleScreen onStart={() => moveTo("mission")} />}
      {screen === "mission" && <MissionSelect onSelect={chooseMission} />}
      {screen === "draft" && selectedMission && (
        <DraftScreen mission={selectedMission} selectedCards={selectedCards} onToggleCard={toggleCard} onNext={() => moveTo("roles")} />
      )}
      {screen === "roles" && selectedMission && (
        <RoleAssignmentScreen mission={selectedMission} selectedCards={selectedCards} onBack={() => moveTo("draft")} onComplete={completeRoles} />
      )}
      {screen === "event" && selectedMission && <EventPhase mission={selectedMission} onChoose={completeEvent} />}
      {screen === "result" && result && <ResultScreen result={result} onRetry={restartDraft} onBackToMissions={backToMissions} />}
    </main>
  );
}
