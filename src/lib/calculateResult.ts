import { badCombos, goodCombos } from "@/data/combos";
import { resultTypes } from "@/data/results";
import { generateTeamName } from "@/lib/generateTeamName";
import type { EventChoice, GameResult, HumanCard, HumanStats, Mission, RoleAssignment, RoleKey, StatKey } from "@/types/game";

export const statLabels: Record<StatKey, string> = {
  idea: "発想力",
  execution: "実行力",
  teamwork: "協調性",
  burst: "爆発力",
  stability: "安定感",
  insight: "本質を見る力",
  warmth: "場を温める力",
  trouble: "トラブル耐性",
  morning: "朝の強さ"
};

const statKeys = Object.keys(statLabels) as StatKey[];

export const roleLabels: Record<RoleKey, string> = {
  leader: "リーダー",
  strategist: "参謀",
  executor: "実行隊長",
  moodMaker: "ムードメーカー",
  wildcard: "奇策担当"
};

export function calculateRoleBonus(cards: HumanCard[], assignment: RoleAssignment): number {
  const byId = new Map(cards.map((card) => [card.id, card]));

  return (Object.entries(assignment) as [RoleKey, string][]).reduce((total, [role, humanId]) => {
    const human = byId.get(humanId);
    if (!human) return total;

    if (human.id === "meaning-researcher" && role === "strategist") return total + 8;
    if (human.id === "silent-operator" && role === "executor") return total + 8;
    if (human.id === "sunny-person" && role === "moodMaker") return total + 8;
    if (human.id === "midnight-genius" && role === "wildcard") return total + 8;
    if (human.id === "big-mouth-ace" && role === "leader") return total + 5;
    if (human.id === "meeting-crasher" && (role === "strategist" || role === "wildcard")) return total + 5;
    if (human.id === "approval-monster" && (role === "leader" || role === "wildcard")) return total + 4;
    if (human.id === "deadline-commander" && (role === "executor" || role === "wildcard")) return total + 5;
    if (human.id === "over-reader" && role === "moodMaker") return total + 6;
    if (human.id === "morning-dead" && role !== "executor") return total + 2;

    return total;
  }, 0);
}

export function calculateResult(
  selectedCards: HumanCard[],
  mission: Mission,
  roleAssignment: RoleAssignment,
  eventChoice: EventChoice
): GameResult {
  const totalStats = statKeys.reduce(
    (totals, key) => ({
      ...totals,
      [key]: selectedCards.reduce((sum, card) => sum + card.stats[key], eventChoice.statModifiers?.[key] ?? 0)
    }),
    {} as HumanStats
  );

  const weightedScore = statKeys.reduce((sum, key) => sum + totalStats[key] * mission.weights[key], 0);
  const memberIds = selectedCards.map((card) => card.id);
  const hasMembers = (members: string[]) => members.every((member) => memberIds.includes(member));
  const activatedGoodCombos = goodCombos.filter((combo) => hasMembers(combo.members));
  const activatedBadCombos = badCombos.filter((combo) => hasMembers(combo.members));
  const comboBonus = activatedGoodCombos.reduce((sum, combo) => sum + combo.bonus, 0);
  const badComboPenalty = activatedBadCombos.reduce((sum, combo) => sum + combo.penalty, 0);
  const roleBonus = calculateRoleBonus(selectedCards, roleAssignment);
  const score = Math.round(weightedScore + comboBonus + badComboPenalty + roleBonus + eventChoice.scoreModifier);
  const resultType = judgeResultType(totalStats);

  return {
    mission,
    selectedCards,
    resultType,
    teamName: generateTeamName(resultType, activatedGoodCombos, selectedCards, mission),
    score,
    totalStats,
    goodCombos: activatedGoodCombos,
    badCombos: activatedBadCombos,
    roleBonus,
    eventChoice,
    comment: resultType.comment,
    roleAssignment
  };
}

function judgeResultType(stats: HumanStats) {
  if (stats.burst >= 18 && stats.stability <= 11) return resultTypes[0];
  if (stats.stability >= 18 && stats.execution >= 17) return resultTypes[1];
  if (stats.idea >= 18 && stats.teamwork <= 12) return resultTypes[2];
  if (stats.burst >= 17 && stats.trouble >= 16 && stats.teamwork <= 14) return resultTypes[3];
  if (stats.warmth >= 18 && stats.burst <= 12) return resultTypes[4];
  if (stats.idea >= 19 && stats.execution <= 13) return resultTypes[5];
  return resultTypes[6];
}
