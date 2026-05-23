import { humans } from "@/data/humans";
import type { HumanCard as HumanCardType } from "@/types/game";
import { HumanCard } from "./HumanCard";

type DraftScreenProps = {
  selectedCards: HumanCardType[];
  onToggleCard: (card: HumanCardType) => void;
  onSubmit: () => void;
};

export function DraftScreen({ selectedCards, onToggleCard, onSubmit }: DraftScreenProps) {
  const isComplete = selectedCards.length === 5;
  const selectedIds = new Set(selectedCards.map((card) => card.id));

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
      <div className="sticky top-0 z-10 -mx-4 border-b border-slate-200 bg-paper/95 px-4 py-4 backdrop-blur sm:static sm:mx-0 sm:border-0 sm:bg-transparent sm:px-0 sm:py-0">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-black text-sky-600">Draft Board</p>
            <h2 className="mt-1 text-3xl font-black text-ink sm:text-5xl">10人の中から5人を指名してください</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">能力だけで選ぶと、たぶん終わる。クセの置き場所まで想像してください。</p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white px-5 py-3 shadow-card">
            <p className="text-sm font-black text-slate-500">選択状況</p>
            <p className="text-2xl font-black text-ink">{selectedCards.length} / 5人 指名中</p>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {humans.map((card) => (
          <HumanCard
            key={card.id}
            card={card}
            selected={selectedIds.has(card.id)}
            disabled={selectedCards.length >= 5}
            onToggle={onToggleCard}
          />
        ))}
      </div>

      <div className="sticky bottom-0 mt-8 border-t border-slate-200 bg-paper/95 px-1 py-4 backdrop-blur">
        <button
          type="button"
          onClick={onSubmit}
          disabled={!isComplete}
          className={`w-full rounded-lg px-6 py-4 text-lg font-black shadow-lg transition ${
            isComplete
              ? "bg-ink text-white hover:-translate-y-0.5 hover:bg-slate-800"
              : "cursor-not-allowed bg-slate-200 text-slate-500"
          }`}
        >
          この5人で勝負する
        </button>
      </div>
    </section>
  );
}
