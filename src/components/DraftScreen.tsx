import { humans } from "@/data/humans";
import type { HumanCard as HumanCardType, Mission } from "@/types/game";
import { HumanCard } from "./HumanCard";
import { StepIndicator } from "./StepIndicator";

type Props = {
  mission: Mission;
  selectedCards: HumanCardType[];
  onToggleCard: (card: HumanCardType) => void;
  onNext: () => void;
};

export function DraftScreen({ mission, selectedCards, onToggleCard, onNext }: Props) {
  const canProceed = selectedCards.length === 5;

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-8 pb-28">
      <StepIndicator current={2} />
      <div className="mb-5 rounded-3xl border border-white bg-white/90 p-5 shadow-card">
        <p className="text-xs font-black text-blue-700">現在のミッション</p>
        <h2 className="mt-2 text-2xl font-black text-slate-950">
          {mission.icon} {mission.title}
        </h2>
        <p className="mt-1 font-bold text-slate-700">{mission.subtitle}</p>
        <p className="mt-3 text-sm font-bold text-blue-700">重要能力：{mission.requiredStats.join(" / ")}</p>
      </div>
      <div className="mb-5 flex items-end justify-between gap-3">
        <div>
          <p className="text-sm font-black text-slate-500">DRAFT BOARD</p>
          <h2 className="text-3xl font-black text-slate-950">{selectedCards.length} / 5人 指名中</h2>
        </div>
        <button
          type="button"
          onClick={onNext}
          disabled={!canProceed}
          className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-black text-white shadow-card transition active:scale-95 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          配置へ
        </button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {humans.map((human) => (
          <HumanCard
            key={human.id}
            card={human}
            selected={selectedCards.some((selected) => selected.id === human.id)}
            onClick={() => onToggleCard(human)}
          />
        ))}
      </div>
      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-slate-200 bg-white/95 p-4 backdrop-blur md:hidden">
        <button
          type="button"
          onClick={onNext}
          disabled={!canProceed}
          className="w-full rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 px-5 py-4 font-black text-white shadow-card transition active:scale-95 disabled:bg-none disabled:bg-slate-300"
        >
          {canProceed ? "5人決定、役割配置へ" : `あと${5 - selectedCards.length}人 指名`}
        </button>
      </div>
    </section>
  );
}
