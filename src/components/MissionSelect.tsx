import { missions } from "@/data/missions";
import type { Mission } from "@/types/game";
import { StepIndicator } from "./StepIndicator";

type Props = {
  onSelect: (mission: Mission) => void;
};

export function MissionSelect({ onSelect }: Props) {
  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-8">
      <StepIndicator current={1} />
      <div className="mb-6">
        <p className="text-sm font-black text-blue-700">MISSION SELECT</p>
        <h2 className="mt-1 text-3xl font-black text-slate-950">今回のミッションを選べ</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {missions.map((mission) => (
          <article key={mission.id} className="rounded-3xl border border-white bg-white/90 p-5 shadow-card">
            <div className={`mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${mission.accent} text-3xl shadow-card`}>
              {mission.icon}
            </div>
            <h3 className="text-xl font-black text-slate-950">{mission.title}</h3>
            <p className="mt-1 font-bold text-blue-700">{mission.subtitle}</p>
            <p className="mt-3 text-sm leading-7 text-slate-600">{mission.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {mission.requiredStats.map((stat) => (
                <span key={stat} className="rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-700">
                  {stat}
                </span>
              ))}
            </div>
            <button
              type="button"
              onClick={() => onSelect(mission)}
              className="mt-5 w-full rounded-2xl bg-slate-950 px-5 py-3 font-black text-white transition active:scale-95"
            >
              このミッションで挑む
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
