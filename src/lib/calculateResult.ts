import { badCombos, combos } from "@/data/combos";
import { getResultType } from "@/data/results";
import type { DraftResult, HumanCard, HumanStats, StatKey } from "@/types/game";

export const statLabels: Record<StatKey, string> = {
  idea: "発想",
  execution: "実行",
  teamwork: "協調",
  burst: "爆発",
  stability: "安定",
  insight: "本質",
  warmth: "温度",
  trouble: "耐性",
  morning: "朝"
};

export const statKeys = Object.keys(statLabels) as StatKey[];

export const emptyStats = (): HumanStats => ({
  idea: 0,
  execution: 0,
  teamwork: 0,
  burst: 0,
  stability: 0,
  insight: 0,
  warmth: 0,
  trouble: 0,
  morning: 0
});

const includesAllMembers = (selectedIds: Set<string>, members: string[]) => {
  return members.every((member) => selectedIds.has(member));
};

const decideResultTypeId = (stats: HumanStats) => {
  if (stats.burst >= 18 && stats.stability <= 11) return "fireworks";
  if (stats.stability >= 18 && stats.execution >= 17) return "fortress";
  if (stats.idea >= 18 && stats.teamwork <= 12) return "meeting-dead";
  if (stats.burst >= 17 && stats.trouble >= 16 && stats.teamwork <= 14) return "stray-dogs";
  if (stats.warmth >= 18 && stats.burst <= 12) return "too-kind";
  if (stats.idea >= 19 && stats.execution <= 13) return "genius-dependent";
  return "unfinished";
};

export const calculateResult = (selectedCards: HumanCard[]): DraftResult => {
  if (selectedCards.length !== 5) {
    throw new Error("結果判定には5人の指名が必要です。");
  }

  const totalStats = selectedCards.reduce<HumanStats>((totals, card) => {
    statKeys.forEach((key) => {
      totals[key] += card.stats[key];
    });
    return totals;
  }, emptyStats());

  const selectedIds = new Set(selectedCards.map((card) => card.id));
  const activatedCombos = combos.filter((combo) => includesAllMembers(selectedIds, combo.members));
  const activatedBadCombos = badCombos.filter((combo) => includesAllMembers(selectedIds, combo.members));

  const baseScore = statKeys.reduce((score, key) => score + totalStats[key], 0);
  const comboBonus = activatedCombos.reduce((score, combo) => score + combo.bonus, 0);
  const badComboPenalty = activatedBadCombos.reduce((score, combo) => score + combo.penalty, 0);
  const finalScore = baseScore + comboBonus + badComboPenalty;
  const resultType = getResultType(decideResultTypeId(totalStats));

  return {
    selectedCards,
    totalStats,
    baseScore,
    comboBonus,
    badComboPenalty,
    finalScore,
    activatedCombos,
    activatedBadCombos,
    resultType
  };
};
