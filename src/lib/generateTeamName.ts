import type { Combo, HumanCard, Mission, ResultType } from "@/types/game";

export function generateTeamName(resultType: ResultType, combos: Combo[], members: HumanCard[], mission: Mission): string {
  const comboIds = combos.map((combo) => combo.id);
  const memberIds = members.map((member) => member.id);

  if (comboIds.includes("all-night-miracle")) return "徹夜カオス株式会社";
  if (comboIds.includes("vision-implementation")) return "口だけから始まる実装部隊";
  if (comboIds.includes("secure-operation")) return "要塞守備職人ズ";
  if (comboIds.includes("deep-fantasy")) return "バズ狙い深夜企画部";
  if (resultType.id === "kind-undecided") return "優しすぎる未決定委員会";
  if (resultType.id === "wild-miracle") return "野良犬イノベーションズ";
  if (mission.id === "island") return "無人島ギリギリ生存隊";
  if (mission.id === "school-festival") return "文化祭逆転優勝組";
  if (mission.id === "department-rescue") return "崩壊部署再生委員会";
  if (memberIds.includes("deadline-commander")) return "火事場の奇跡軍団";
  return "クセ強ドリームチーム";
}
