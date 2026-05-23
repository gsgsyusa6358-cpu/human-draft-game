"use client";

import { useEffect, useMemo, useState } from "react";
import { roleLabels, statLabels } from "@/lib/calculateResult";
import type { GameResult, RoleKey, StatKey } from "@/types/game";
import { StepIndicator } from "./StepIndicator";

const statKeys = Object.keys(statLabels) as StatKey[];
const roleKeys = Object.keys(roleLabels) as RoleKey[];

type Props = {
  result: GameResult;
  onRetry: () => void;
  onBackToMissions: () => void;
};

export function ResultScreen({ result, onRetry, onBackToMissions }: Props) {
  const [message, setMessage] = useState("");
  const membersById = useMemo(() => new Map(result.selectedCards.map((card) => [card.id, card])), [result.selectedCards]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const shareText = `「人間ドラフト会議」で遊んだ結果、
チームタイプは
【${result.resultType.name}】でした。

欠点は、配置を間違えた才能である。`;

  const share = async () => {
    setMessage("");
    try {
      if (navigator.share) {
        await navigator.share({ title: "人間ドラフト会議", text: shareText });
        return;
      }
      await navigator.clipboard.writeText(shareText);
      setMessage("結果をコピーしました");
    } catch {
      setMessage("共有をキャンセルしました");
    }
  };

  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-8">
      <StepIndicator current={5} />
      <div className="relative overflow-hidden rounded-[2rem] border border-white bg-slate-950 p-6 text-white shadow-card">
        <div className="confetti">
          {Array.from({ length: 18 }).map((_, index) => (
            <span
              key={index}
              style={{
                left: `${(index * 17) % 100}%`,
                top: `${(index * 29) % 80}%`,
                background: index % 3 === 0 ? "#60a5fa" : index % 3 === 1 ? "#a78bfa" : "#facc15",
                transform: `rotate(${index * 21}deg)`
              }}
            />
          ))}
        </div>
        <div className="relative animate-fade-up">
          <p className="text-sm font-black text-blue-200">🏆 あなたのチームタイプ</p>
          <h1 className="mt-3 text-4xl font-black leading-tight tracking-normal">{result.resultType.name}</h1>
          <p className="mt-5 text-2xl font-black text-blue-200">{result.teamName}</p>
          <div className="mt-6 inline-flex rounded-2xl bg-white px-5 py-3 text-3xl font-black text-slate-950">総合スコア {result.score}</div>
        </div>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <article className="rounded-3xl border border-white bg-white p-5 shadow-card">
          <p className="text-xs font-black text-blue-700">挑戦ミッション</p>
          <h2 className="mt-2 text-2xl font-black text-slate-950">
            {result.mission.icon} {result.mission.title}
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">{result.resultType.description}</p>
        </article>
        <article className="rounded-3xl border border-white bg-white p-5 shadow-card">
          <p className="text-xs font-black text-blue-700">イベント選択結果</p>
          <h2 className="mt-2 text-xl font-black text-slate-950">{result.eventChoice.text}</h2>
          <p className="mt-2 text-sm leading-7 text-slate-600">{result.eventChoice.description}</p>
        </article>
      </div>

      <div className="mt-5 rounded-3xl border border-white bg-white p-5 shadow-card">
        <h2 className="text-xl font-black text-slate-950">選んだ5人</h2>
        <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-5">
          {result.selectedCards.map((card) => (
            <div key={card.id} className="rounded-2xl bg-slate-50 p-3 text-center">
              <div className="text-4xl">{card.emoji}</div>
              <p className="mt-2 text-sm font-black text-slate-950">{card.name}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <article className="rounded-3xl border border-white bg-white p-5 shadow-card">
          <h2 className="text-xl font-black text-slate-950">役割配置</h2>
          <div className="mt-4 space-y-2">
            {roleKeys.map((role) => {
              const member = membersById.get(result.roleAssignment[role]);
              return (
                <div key={role} className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                  <span className="text-sm font-black text-slate-500">{roleLabels[role]}</span>
                  <span className="text-sm font-black text-slate-950">
                    {member?.emoji} {member?.name}
                  </span>
                </div>
              );
            })}
          </div>
          <p className="mt-3 text-sm font-black text-blue-700">役割適性ボーナス +{result.roleBonus}</p>
        </article>

        <article className="rounded-3xl border border-white bg-white p-5 shadow-card">
          <h2 className="text-xl font-black text-slate-950">チーム能力</h2>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {statKeys.map((key) => (
              <div key={key} className="rounded-2xl bg-slate-50 px-3 py-2">
                <p className="text-[11px] font-black text-slate-500">{statLabels[key]}</p>
                <p className="text-lg font-black text-slate-950">{result.totalStats[key]}</p>
              </div>
            ))}
          </div>
        </article>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <ComboPanel title="発動した良いコンボ" empty="今回は良いコンボなし。まだ噛み合う余地あり。" items={result.goodCombos.map((combo) => ({ ...combo, value: `+${combo.bonus}` }))} />
        <ComboPanel title="発動した危険コンボ" empty="危険コンボなし。監督、ちゃんと見ています。" items={result.badCombos.map((combo) => ({ ...combo, value: `${combo.penalty}` }))} />
      </div>

      <article className="mt-5 rounded-3xl border border-white bg-white p-6 shadow-card">
        <p className="text-xs font-black text-blue-700">監督コメント</p>
        <p className="mt-3 text-base font-bold leading-8 text-slate-700">{result.comment}</p>
        <p className="mt-6 rounded-2xl bg-gradient-to-r from-blue-50 to-violet-50 p-5 text-center text-xl font-black leading-8 text-slate-950">
          欠点は、配置を間違えた才能である。
        </p>
      </article>

      <div className="mt-6 grid gap-3 md:grid-cols-3">
        <button type="button" onClick={share} className="rounded-2xl bg-slate-950 px-5 py-4 font-black text-white shadow-card active:scale-95">
          結果をシェア
        </button>
        <button type="button" onClick={onRetry} className="rounded-2xl bg-white px-5 py-4 font-black text-slate-800 shadow-card active:scale-95">
          もう一度遊ぶ
        </button>
        <button type="button" onClick={onBackToMissions} className="rounded-2xl bg-white px-5 py-4 font-black text-slate-800 shadow-card active:scale-95">
          ミッション選択に戻る
        </button>
      </div>
      {message && <p className="mt-3 text-center text-sm font-black text-blue-700">{message}</p>}
    </section>
  );
}

type ComboItem = {
  id: string;
  name: string;
  description: string;
  value: string;
};

function ComboPanel({ title, empty, items }: { title: string; empty: string; items: ComboItem[] }) {
  return (
    <article className="rounded-3xl border border-white bg-white p-5 shadow-card">
      <h2 className="text-xl font-black text-slate-950">{title}</h2>
      <div className="mt-4 space-y-3">
        {items.length === 0 && <p className="rounded-2xl bg-slate-50 p-4 text-sm font-bold text-slate-500">{empty}</p>}
        {items.map((item) => (
          <div key={item.id} className="animate-pop rounded-2xl bg-slate-50 p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="font-black text-slate-950">{item.name}</p>
              <span className="rounded-full bg-blue-600 px-3 py-1 text-sm font-black text-white">{item.value}</span>
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
          </div>
        ))}
      </div>
    </article>
  );
}
