"use client";

import { useState } from "react";
import { DraftScreen } from "@/components/DraftScreen";
import { MissionScreen } from "@/components/MissionScreen";
import { ResultScreen } from "@/components/ResultScreen";
import { TitleScreen } from "@/components/TitleScreen";
import { calculateResult } from "@/lib/calculateResult";
import type { DraftResult, HumanCard } from "@/types/game";

type Screen = "title" | "mission" | "draft" | "result";

export default function Home() {
  const [screen, setScreen] = useState<Screen>("title");
  const [selectedCards, setSelectedCards] = useState<HumanCard[]>([]);
  const [result, setResult] = useState<DraftResult | null>(null);

  const toggleCard = (card: HumanCard) => {
    setSelectedCards((current) => {
      const exists = current.some((selected) => selected.id === card.id);
      if (exists) return current.filter((selected) => selected.id !== card.id);
      if (current.length >= 5) return current;
      return [...current, card];
    });
  };

  const showResult = () => {
    if (selectedCards.length !== 5) return;
    setResult(calculateResult(selectedCards));
    setScreen("result");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const retry = () => {
    setSelectedCards([]);
    setResult(null);
    setScreen("draft");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main>
      {screen === "title" && <TitleScreen onStart={() => setScreen("mission")} />}
      {screen === "mission" && <MissionScreen onNext={() => setScreen("draft")} />}
      {screen === "draft" && <DraftScreen selectedCards={selectedCards} onToggleCard={toggleCard} onSubmit={showResult} />}
      {screen === "result" && result && <ResultScreen result={result} onRetry={retry} />}
    </main>
  );
}
