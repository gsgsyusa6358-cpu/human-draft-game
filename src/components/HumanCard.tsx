import { statKeys } from "@/lib/calculateResult";
import type { HumanCard as HumanCardType } from "@/types/game";
import { StatBar } from "./StatBar";

type HumanCardProps = {
  card: HumanCardType;
  selected: boolean;
  disabled?: boolean;
  onToggle: (card: HumanCardType) => void;
};

export function HumanCard({ card, selected, disabled = false, onToggle }: HumanCardProps) {
  return (
    <button
      type="button"
      onClick={() => onToggle(card)}
      disabled={disabled && !selected}
      className={`group relative flex h-full flex-col rounded-lg border p-4 text-left shadow-card transition ${
        selected
          ? "border-violet-500 bg-violet-50 ring-2 ring-violet-200"
          : "border-slate-200 bg-white hover:-translate-y-0.5 hover:border-sky-300"
      } ${disabled && !selected ? "cursor-not-allowed opacity-55" : "cursor-pointer"}`}
    >
      {selected && (
        <span className="absolute right-3 top-3 rounded-full bg-violet-600 px-3 py-1 text-xs font-bold text-white">
          指名済み
        </span>
      )}

      <div className="pr-16">
        <p className="text-xs font-bold uppercase tracking-wide text-sky-600">Human Card</p>
        <h3 className="mt-1 text-xl font-black leading-tight text-ink">{card.name}</h3>
        <p className="mt-1 text-sm font-bold text-violet-700">{card.nickname}</p>
      </div>

      <p className="mt-3 text-sm leading-7 text-slate-700">{card.description}</p>

      <div className="mt-4 grid gap-3 text-xs sm:grid-cols-2">
        <div>
          <p className="font-black text-slate-800">強み</p>
          <p className="mt-1 leading-6 text-slate-600">{card.strengths.join(" / ")}</p>
        </div>
        <div>
          <p className="font-black text-slate-800">弱み</p>
          <p className="mt-1 leading-6 text-slate-600">{card.weaknesses.join(" / ")}</p>
        </div>
      </div>

      <div className="mt-4 rounded-lg bg-slate-50 p-3">
        <p className="mb-2 text-xs font-black text-slate-700">能力値</p>
        <div className="grid grid-cols-3 gap-2">
          {statKeys.map((key) => (
            <StatBar key={key} statKey={key} value={card.stats[key]} compact />
          ))}
        </div>
      </div>
    </button>
  );
}
