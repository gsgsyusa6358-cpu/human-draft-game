import { statLabels } from "@/lib/calculateResult";
import type { HumanCard as HumanCardType, StatKey } from "@/types/game";
import { StatBar } from "./StatBar";

const featuredStats: StatKey[] = ["idea", "execution", "teamwork", "burst", "stability", "insight"];

type Props = {
  card: HumanCardType;
  selected?: boolean;
  onClick?: () => void;
};

export function HumanCard({ card, selected = false, onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative w-full rounded-3xl border bg-white p-4 text-left shadow-card transition ${
        selected ? "scale-[1.02] border-blue-500 ring-4 ring-blue-100" : "border-white active:scale-[0.99]"
      }`}
    >
      {selected && <span className="absolute right-4 top-4 rounded-full bg-blue-600 px-3 py-1 text-xs font-black text-white">指名済み</span>}
      <div className="flex gap-4">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-gradient-to-br from-slate-100 to-blue-100 text-5xl">
          {card.emoji}
        </div>
        <div className="min-w-0 pt-1">
          <h3 className="text-lg font-black text-slate-950">{card.name}</h3>
          <p className="mt-1 text-xs font-bold leading-5 text-blue-700">{card.nickname}</p>
        </div>
      </div>
      <p className="mt-4 text-sm leading-7 text-slate-600">{card.description}</p>
      <div className="mt-4 grid grid-cols-2 gap-2">
        {featuredStats.map((key) => (
          <StatBar key={key} label={statLabels[key]} value={card.stats[key]} />
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {card.bestRoles.slice(0, 3).map((role) => (
          <span key={role} className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-black text-slate-600">
            {role}
          </span>
        ))}
      </div>
    </button>
  );
}
