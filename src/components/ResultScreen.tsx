"use client";

import { useEffect, useMemo, useState } from "react";
import { roleLabels } from "@/lib/calculateResult";
import type { GameResult, MissionOutcomeStatus, RoleKey } from "@/types/game";
import { MediaPanel } from "./MediaPanel";
import { StepIndicator } from "./StepIndicator";

const roleKeys = Object.keys(roleLabels) as RoleKey[];

type Props = {
  result: GameResult;
  onRetry: () => void;
  onBackToMissions: () => void;
};

export function ResultScreen({ result, onRetry, onBackToMissions }: Props) {
  const [message, setMessage] = useState("");
  const membersById = useMemo(() => new Map(result.selectedCards.map((card) => [card.id, card])), [result.selectedCards]);
  const resultMedia = getResultMedia(result.missionOutcome.status);
  const statusTone = getStatusTone(result.missionOutcome.status);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const shareText = `「人間ドラフト会議」でミッションに挑戦。
攻略結果は【${result.missionOutcome.status} / ランク${result.missionOutcome.rank}】。
${result.missionOutcome.label}

欠点は、配置を間違えた才能である。`;

  const share = async () => {
    setMessage("");
    try {
      if (navigator.share) {
        await navigator.share({ title: "人間ドラフト会議", text: shareText });
        return;
      }
      await navigator.clipboard.writeText(shareText);
      setMessage("攻略結果をコピーしました");
    } catch {
      setMessage("共有をキャンセルしました");
    }
  };

  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-8">
      <StepIndicator current={5} />

      <div className={`relative overflow-hidden rounded-[2rem] border border-white p-5 text-white shadow-card ${statusTone.hero}`}>
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
        <MediaPanel
          webmPath={resultMedia.webmPath}
          mp4Path={resultMedia.mp4Path}
          gifPath={resultMedia.gifPath}
          title={resultMedia.title}
          fallbackIcon={resultMedia.icon}
          fallbackLabel={resultMedia.label}
          className="relative mb-5 aspect-[16/9] max-h-72"
        />
        <div className="relative animate-fade-up">
          <p className="text-sm font-black text-blue-100">MISSION RESULT</p>
          <h1 className="mt-2 text-2xl font-black leading-tight sm:text-4xl">
            {result.mission.icon} {result.mission.title}
          </h1>
          <div className="mt-5 grid grid-cols-[1fr_auto] items-end gap-3">
            <div>
              <p className={`inline-flex rounded-full px-4 py-2 text-sm font-black ${statusTone.badge}`}>{result.missionOutcome.status}</p>
              <p className="mt-4 text-3xl font-black tracking-normal sm:text-5xl">{result.missionOutcome.label}</p>
            </div>
            <div className="rounded-3xl bg-white px-5 py-4 text-center text-slate-950 shadow-card">
              <p className="text-xs font-black text-slate-500">RANK</p>
              <p className="text-5xl font-black">{result.missionOutcome.rank}</p>
            </div>
          </div>
          <div className="mt-5 inline-flex rounded-2xl bg-white px-5 py-3 text-2xl font-black text-slate-950">
            ミッション達成度 {result.score}
          </div>
        </div>
      </div>

      <section className="mt-5 rounded-3xl border border-white bg-white p-5 shadow-card">
        <h2 className="text-xl font-black text-slate-950">ミッション別パラメータ</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {result.missionParameters.map((parameter) => (
            <ParameterBar key={parameter.label} label={parameter.label} value={parameter.value} />
          ))}
        </div>
      </section>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <article className="rounded-3xl border border-white bg-white p-5 shadow-card">
          <p className="text-xs font-black text-blue-700">結果コメント</p>
          <p className="mt-3 text-base font-bold leading-8 text-slate-700">{result.missionOutcome.comment}</p>
        </article>
        <article className="rounded-3xl border border-white bg-white p-5 shadow-card">
          <p className="text-xs font-black text-blue-700">監督采配コメント</p>
          <h2 className="mt-2 text-xl font-black text-slate-950">{result.eventChoice.text}</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">{result.directorComment}</p>
        </article>
      </div>

      <section className="mt-5 rounded-3xl border border-white bg-white p-5 shadow-card">
        <h2 className="text-xl font-black text-slate-950">選んだ5人</h2>
        <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-5">
          {result.selectedCards.map((card) => (
            <div key={card.id} className="rounded-2xl bg-slate-50 p-3 text-center">
              <div className="text-4xl">{card.emoji}</div>
              <p className="mt-2 text-sm font-black text-slate-950">{card.name}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-5 rounded-3xl border border-white bg-white p-5 shadow-card">
        <h2 className="text-xl font-black text-slate-950">役割配置</h2>
        <div className="mt-4 grid gap-2 md:grid-cols-2">
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
      </section>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <ComboPanel title="発動コンボ" empty="コンボ発動なし。個の力で押している状態です。" items={result.goodCombos.map((combo) => ({ ...combo, value: `+${combo.bonus}` }))} />
        <ComboPanel title="危険コンボ" empty="危険コンボなし。現場はまだ制御できています。" items={result.badCombos.map((combo) => ({ ...combo, value: `${combo.penalty}` }))} />
      </div>

      <article className="mt-5 rounded-3xl border border-white bg-white p-6 shadow-card">
        <p className="text-xs font-black text-blue-700">チーム傾向</p>
        <h2 className="mt-2 text-2xl font-black text-slate-950">{result.resultType.name}</h2>
        <p className="mt-3 text-sm leading-7 text-slate-600">{result.resultType.description}</p>
        <p className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm font-bold leading-7 text-slate-700">{result.comment}</p>
      </article>

      <article className="mt-5 rounded-3xl border border-white bg-white p-6 shadow-card">
        <p className="rounded-2xl bg-gradient-to-r from-blue-50 to-violet-50 p-5 text-center text-xl font-black leading-8 text-slate-950">
          欠点は、配置を間違えた才能である。
        </p>
      </article>

      <div className="mt-6 grid gap-3 md:grid-cols-3">
        <button type="button" onClick={share} className="rounded-2xl bg-slate-950 px-5 py-4 font-black text-white shadow-card active:scale-95">
          攻略結果をシェア
        </button>
        <button type="button" onClick={onRetry} className="rounded-2xl bg-white px-5 py-4 font-black text-slate-800 shadow-card active:scale-95">
          もう一度挑戦する
        </button>
        <button type="button" onClick={onBackToMissions} className="rounded-2xl bg-white px-5 py-4 font-black text-slate-800 shadow-card active:scale-95">
          別ミッションに挑戦する
        </button>
      </div>
      {message && <p className="mt-3 text-center text-sm font-black text-blue-700">{message}</p>}
    </section>
  );
}

function ParameterBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4">
      <div className="flex items-center justify-between gap-3">
        <p className="font-black text-slate-700">{label}</p>
        <p className="text-2xl font-black text-slate-950">{value}</p>
      </div>
      <div className="mt-3 h-3 rounded-full bg-white">
        <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-violet-500" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function getStatusTone(status: MissionOutcomeStatus) {
  if (status === "GREAT CLEAR") return { hero: "bg-slate-950", badge: "bg-yellow-300 text-slate-950" };
  if (status === "CLEAR") return { hero: "bg-gradient-to-br from-blue-950 to-violet-950", badge: "bg-blue-100 text-blue-800" };
  if (status === "FAILED") return { hero: "bg-gradient-to-br from-slate-900 to-rose-950", badge: "bg-rose-100 text-rose-800" };
  return { hero: "bg-gradient-to-br from-slate-950 to-zinc-800", badge: "bg-zinc-200 text-zinc-950" };
}

function getResultMedia(status: MissionOutcomeStatus) {
  if (status === "GREAT CLEAR") {
    return {
      title: "GREAT CLEAR / S",
      icon: "🏆",
      label: "GREAT CLEAR",
      webmPath: "/media/result-great-clear.webm",
      mp4Path: "/media/result-great-clear.mp4",
      gifPath: "/media/result-great-clear.gif"
    };
  }
  if (status === "CLEAR") {
    return {
      title: "CLEAR / A-B",
      icon: "✨",
      label: "CLEAR",
      webmPath: "/media/result-clear.webm",
      mp4Path: "/media/result-clear.mp4",
      gifPath: "/media/result-clear.gif"
    };
  }
  if (status === "FAILED") {
    return {
      title: "FAILED / C",
      icon: "⚠️",
      label: "FAILED",
      webmPath: "/media/result-failed.webm",
      mp4Path: "/media/result-failed.mp4",
      gifPath: "/media/result-failed.gif"
    };
  }
  return {
    title: "BAD END / D",
    icon: "💀",
    label: "BAD END",
    webmPath: "/media/result-bad-end.webm",
    mp4Path: "/media/result-bad-end.mp4",
    gifPath: "/media/result-bad-end.gif"
  };
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
