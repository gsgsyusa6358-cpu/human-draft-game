import { badCombos, goodCombos } from "@/data/combos";
import { resultTypes } from "@/data/results";
import { generateTeamName } from "@/lib/generateTeamName";
import type {
  EventChoice,
  GameResult,
  HumanCard,
  HumanStats,
  Mission,
  MissionOutcome,
  MissionParameter,
  RoleAssignment,
  RoleKey,
  StatKey
} from "@/types/game";

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
  const missionOutcome = judgeMissionOutcome(mission.id, score);

  return {
    mission,
    selectedCards,
    resultType,
    missionOutcome,
    missionParameters: buildMissionParameters(mission.id, score, totalStats, eventChoice.scoreModifier, activatedBadCombos.length),
    teamName: generateTeamName(resultType, activatedGoodCombos, selectedCards, mission),
    score,
    totalStats,
    goodCombos: activatedGoodCombos,
    badCombos: activatedBadCombos,
    roleBonus,
    eventChoice,
    comment: resultType.comment,
    directorComment: buildDirectorComment(eventChoice.scoreModifier, roleBonus, activatedGoodCombos.length, activatedBadCombos.length),
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

function judgeMissionOutcome(missionId: string, score: number): MissionOutcome {
  const rank = score >= 165 ? "S" : score >= 145 ? "A" : score >= 125 ? "B" : score >= 105 ? "C" : "D";
  const status = rank === "S" ? "GREAT CLEAR" : rank === "A" || rank === "B" ? "CLEAR" : rank === "C" ? "FAILED" : "BAD END";
  const labels: Record<string, Record<MissionOutcome["rank"], string>> = {
    "school-festival": {
      S: "文化祭優勝。伝説の出し物になる",
      A: "かなり盛り上がる。上位入賞",
      B: "普通に成功",
      C: "準備不足で微妙",
      D: "当日グダグダ"
    },
    "viral-plan": {
      S: "大バズ。通知が止まらない",
      A: "小バズ成功",
      B: "身内には刺さる",
      C: "ほぼ無風",
      D: "微妙に炎上"
    },
    baseball: {
      S: "快勝",
      A: "接戦勝利",
      B: "引き分け",
      C: "惜敗",
      D: "守備崩壊"
    },
    "department-rescue": {
      S: "部署再生",
      A: "空気が変わる",
      B: "一部改善",
      C: "会議だけ増える",
      D: "さらに崩壊"
    },
    island: {
      S: "全員生還",
      A: "かなりギリギリ生還",
      B: "なんとか生存",
      C: "食料不足で限界",
      D: "3日目で詰む"
    },
    "new-business": {
      S: "黒字化の兆し",
      A: "初期ユーザー獲得",
      B: "仮説検証成功",
      C: "誰にも刺さらない",
      D: "資金と気力が尽きる"
    },
    "company-chaos": {
      S: "謎に成長企業",
      A: "クセが武器になる",
      B: "なんとか回る",
      C: "会議が動物園",
      D: "組織崩壊"
    }
  };

  return {
    status,
    rank,
    label: labels[missionId]?.[rank] ?? "作戦完了",
    comment: buildOutcomeComment(status, rank)
  };
}

function buildOutcomeComment(status: MissionOutcome["status"], rank: MissionOutcome["rank"]) {
  if (status === "GREAT CLEAR") return `ランク${rank}。采配がハマり、クセの強さがそのまま突破力に変わりました。これはもう作戦勝ちです。`;
  if (status === "CLEAR") return `ランク${rank}。危ない場面はありましたが、配置と相性でミッションを押し切りました。`;
  if (status === "FAILED") return `ランク${rank}。勝ち筋は見えていましたが、現場の噛み合わせが足りず達成には届きませんでした。`;
  return `ランク${rank}。クセが才能になる前に、現場が先に限界を迎えました。次は配置から立て直しましょう。`;
}

function buildMissionParameters(missionId: string, score: number, stats: HumanStats, eventModifier: number, badComboCount: number): MissionParameter[] {
  const clamp = (value: number) => Math.max(0, Math.min(100, Math.round(value)));
  const base = clamp(score / 1.8);
  const chaos = clamp(stats.burst * 4 + badComboCount * 12 - stats.stability * 2);
  const fireRisk = clamp(chaos + Math.abs(Math.min(0, eventModifier)) * 6 - stats.trouble * 2);

  if (missionId === "island") {
    return [
      { label: "生存率", value: clamp(base + stats.trouble * 2) },
      { label: "食料管理", value: clamp(stats.execution * 4 + stats.stability * 3) },
      { label: "士気", value: clamp(stats.warmth * 4 + eventModifier * 2) },
      { label: "遭難リスク", value: clamp(100 - base + badComboCount * 10) }
    ];
  }

  if (missionId === "viral-plan" || missionId === "new-business") {
    return [
      { label: "作戦成功率", value: base },
      { label: "企画熱量", value: clamp(stats.idea * 4 + stats.burst * 3) },
      { label: "拡散力", value: clamp(stats.burst * 5 + eventModifier * 3) },
      { label: "炎上リスク", value: fireRisk }
    ];
  }

  if (missionId === "baseball") {
    return [
      { label: "勝率", value: base },
      { label: "守備安定", value: clamp(stats.stability * 4 + stats.teamwork * 3) },
      { label: "ベンチ士気", value: clamp(stats.warmth * 4 + stats.teamwork * 2) },
      { label: "カオス度", value: chaos }
    ];
  }

  if (missionId === "department-rescue" || missionId === "company-chaos") {
    return [
      { label: "再建進捗", value: base },
      { label: "現場士気", value: clamp(stats.warmth * 4 + stats.teamwork * 3) },
      { label: "論点整理", value: clamp(stats.insight * 5 + stats.execution * 2) },
      { label: "カオス度", value: chaos }
    ];
  }

  return [
    { label: "達成度", value: base },
    { label: "士気", value: clamp(stats.warmth * 4 + stats.teamwork * 2) },
    { label: "進捗", value: clamp(stats.execution * 4 + eventModifier * 3) },
    { label: "カオス度", value: chaos }
  ];
}

function buildDirectorComment(eventModifier: number, roleBonus: number, goodComboCount: number, badComboCount: number) {
  const eventText =
    eventModifier >= 7
      ? "イベント対応は大当たり。現場の空気が一段変わりました。"
      : eventModifier >= 3
        ? "イベント対応はまずまず。大事故を避けて前に進めています。"
        : eventModifier >= 0
          ? "イベント対応は最低限。もう一手、攻めた采配が欲しい場面でした。"
          : "イベント対応で傷口が広がりました。次は勢いより状況判断を優先したいところです。";
  const roleText = roleBonus >= 18 ? "役割配置はかなり良好です。" : roleBonus >= 10 ? "役割配置は機能しています。" : "役割配置にはまだ伸びしろがあります。";
  const comboText =
    badComboCount > 0
      ? `ただし危険コンボが${badComboCount}件発動。ここを放置すると次の局面で崩れます。`
      : goodComboCount > 0
        ? `良いコンボが${goodComboCount}件発動し、チームの噛み合わせが加速しました。`
        : "コンボ発動は控えめ。個の力で押している状態です。";

  return `${eventText} ${roleText} ${comboText}`;
}
