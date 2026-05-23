export type StatKey =
  | "idea"
  | "execution"
  | "teamwork"
  | "burst"
  | "stability"
  | "insight"
  | "warmth"
  | "trouble"
  | "morning";

export type HumanStats = Record<StatKey, number>;

export type HumanCard = {
  id: string;
  name: string;
  nickname: string;
  description: string;
  strengths: string[];
  weaknesses: string[];
  bestRoles: string[];
  stats: HumanStats;
};

export type Combo = {
  id: string;
  members: string[];
  name: string;
  description: string;
  bonus: number;
};

export type BadCombo = {
  id: string;
  members: string[];
  name: string;
  description: string;
  penalty: number;
};

export type ResultType = {
  id: string;
  name: string;
  description: string;
  comment: string;
};

export type DraftResult = {
  selectedCards: HumanCard[];
  totalStats: HumanStats;
  baseScore: number;
  comboBonus: number;
  badComboPenalty: number;
  finalScore: number;
  activatedCombos: Combo[];
  activatedBadCombos: BadCombo[];
  resultType: ResultType;
};
