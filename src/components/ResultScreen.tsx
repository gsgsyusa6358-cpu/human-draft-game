import { statKeys } from "@/lib/calculateResult";
import type { DraftResult } from "@/types/game";
import { StatBar } from "./StatBar";

type ResultScreenProps = {
  result: DraftResult;
  onRetry: () => void;
};

export function ResultScreen({ result, onRetry }: ResultScreenProps) {
  const comboCount = result.activatedCombos.length + result.activatedBadCombos.length;

  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-card sm:p-9">
        <p className="text-sm font-black text-violet-700">Draft Result</p>
        <h2 className="mt-3 text-4xl font-black leading-tight text-ink sm:text-6xl">{result.resultType.name}</h2>
        <p className="mt-5 text-base leading-8 text-slate-700 sm:text-lg">{result.resultType.description}</p>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg bg-slate-950 p-5 text-white sm:col-span-1">
            <p className="text-sm font-black text-slate-300">総合スコア</p>
            <p className="mt-2 text-6xl font-black">{result.finalScore}</p>
            <p className="mt-2 text-xs font-bold text-slate-300">
              基礎 {result.baseScore} / コンボ +{result.comboBonus} / 危険 {result.badComboPenalty}
            </p>
          </div>
          <div className="rounded-lg bg-slate-50 p-5 sm:col-span-2">
            <p className="text-sm font-black text-slate-700">チーム能力</p>
            <div className="mt-3 grid grid-cols-3 gap-3">
              {statKeys.map((key) => (
                <StatBar key={key} statKey={key} value={result.totalStats[key]} max={25} />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8">
          <p className="text-lg font-black text-ink">指名メンバー</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {result.selectedCards.map((card) => (
              <span key={card.id} className="rounded-full bg-sky-50 px-3 py-2 text-sm font-bold text-sky-800">
                {card.name}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          <div className="rounded-lg border border-slate-200 p-5">
            <p className="text-lg font-black text-ink">発動したコンボ</p>
            <div className="mt-4 space-y-3">
              {comboCount === 0 && <p className="text-sm leading-7 text-slate-600">今回はコンボなし。静かな立ち上がりです。議事録だけは取ろう。</p>}
              {result.activatedCombos.map((combo) => (
                <div key={combo.id} className="rounded-lg bg-sky-50 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-black text-sky-900">{combo.name}</p>
                    <span className="rounded-full bg-sky-600 px-2 py-1 text-xs font-black text-white">+{combo.bonus}</span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-700">{combo.description}</p>
                </div>
              ))}
              {result.activatedBadCombos.map((combo) => (
                <div key={combo.id} className="rounded-lg bg-rose-50 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-black text-rose-900">{combo.name}</p>
                    <span className="rounded-full bg-rose-600 px-2 py-1 text-xs font-black text-white">{combo.penalty}</span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-700">{combo.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 p-5">
            <p className="text-lg font-black text-ink">監督コメント</p>
            <p className="mt-4 text-base leading-8 text-slate-700">{result.resultType.comment}</p>
            <div className="mt-6 rounded-lg bg-gradient-to-r from-sky-600 to-violet-600 p-5 text-white">
              <p className="text-xl font-black leading-9">欠点は、配置を間違えた才能である。</p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onRetry}
          className="mt-8 w-full rounded-lg bg-ink px-6 py-4 text-lg font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-slate-800"
        >
          もう一度ドラフトする
        </button>
      </div>
    </section>
  );
}
