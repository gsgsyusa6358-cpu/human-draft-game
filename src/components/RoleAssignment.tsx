import { useState } from "react";
import { roleLabels } from "@/lib/calculateResult";
import type { HumanCard, Mission, RoleAssignment, RoleKey } from "@/types/game";
import { StepIndicator } from "./StepIndicator";

const roles = Object.keys(roleLabels) as RoleKey[];

type Props = {
  mission: Mission;
  selectedCards: HumanCard[];
  onBack: () => void;
  onComplete: (assignment: RoleAssignment) => void;
};

const emptyAssignment: RoleAssignment = {
  leader: "",
  strategist: "",
  executor: "",
  moodMaker: "",
  wildcard: ""
};

export function RoleAssignmentScreen({ mission, selectedCards, onBack, onComplete }: Props) {
  const [assignment, setAssignment] = useState<RoleAssignment>(emptyAssignment);
  const chosenIds = Object.values(assignment).filter(Boolean);
  const isComplete = roles.every((role) => assignment[role]);

  const updateRole = (role: RoleKey, humanId: string) => {
    setAssignment((current) => ({ ...current, [role]: humanId }));
  };

  return (
    <section className="mx-auto w-full max-w-3xl px-4 py-8">
      <StepIndicator current={3} />
      <div className="mb-5 rounded-3xl border border-white bg-white/90 p-5 shadow-card">
        <p className="text-xs font-black text-blue-700">ROLE ASSIGNMENT</p>
        <h2 className="mt-2 text-3xl font-black text-slate-950">クセを置く場所を決めろ</h2>
        <p className="mt-2 text-sm font-bold leading-6 text-slate-600">
          {mission.icon} {mission.title}。同じ人を複数役割には置けません。
        </p>
      </div>
      <div className="space-y-4">
        {roles.map((role) => (
          <label key={role} className="block rounded-3xl border border-white bg-white p-4 shadow-card">
            <span className="mb-2 block text-sm font-black text-slate-950">{roleLabels[role]}</span>
            <select
              value={assignment[role]}
              onChange={(event) => updateRole(role, event.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-bold text-slate-800"
            >
              <option value="">配置する人を選ぶ</option>
              {selectedCards.map((card) => {
                const usedByOtherRole = chosenIds.includes(card.id) && assignment[role] !== card.id;
                return (
                  <option key={card.id} value={card.id} disabled={usedByOtherRole}>
                    {card.emoji} {card.name}
                  </option>
                );
              })}
            </select>
          </label>
        ))}
      </div>
      <div className="mt-6 grid grid-cols-2 gap-3">
        <button type="button" onClick={onBack} className="rounded-2xl border border-slate-200 bg-white px-5 py-4 font-black text-slate-700 shadow-card active:scale-95">
          戻る
        </button>
        <button
          type="button"
          onClick={() => onComplete(assignment)}
          disabled={!isComplete}
          className="rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 px-5 py-4 font-black text-white shadow-card active:scale-95 disabled:bg-none disabled:bg-slate-300"
        >
          事件へ
        </button>
      </div>
    </section>
  );
}
