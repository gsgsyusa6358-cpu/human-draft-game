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
  emoji: string;
  avatarUrl?: string;
  stats: HumanStats;
};

export type Mission = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  accent: string;
  requiredStats: string[];
  weights: HumanStats;
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

export type RoleKey = "leader" | "strategist" | "executor" | "moodMaker" | "wildcard";

export type RoleAssignment = Record<RoleKey, string>;

export type EventChoice = {
  id: string;
  text: string;
  description: string;
  scoreModifier: number;
  statModifiers?: Partial<HumanStats>;
};

export type MissionEvent = {
  id: string;
  missionId: string;
  title: string;
  description: string;
  choices: EventChoice[];
};

export type ResultType = {
  id: string;
  name: string;
  description: string;
  comment: string;
};

export type GameResult = {
  mission: Mission;
  selectedCards: HumanCard[];
  resultType: ResultType;
  teamName: string;
  score: number;
  totalStats: HumanStats;
  goodCombos: Combo[];
  badCombos: BadCombo[];
  roleBonus: number;
  eventChoice: EventChoice;
  comment: string;
  roleAssignment: RoleAssignment;
};
