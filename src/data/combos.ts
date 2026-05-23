import type { BadCombo, Combo } from "@/types/game";

export const combos: Combo[] = [
  {
    id: "vision-execution",
    members: ["big-mouth-ace", "silent-operator"],
    name: "ビジョン実装コンボ",
    description: "語る人と形にする人が揃った。口だけで終わるはずの夢が、現実に落ち始める。",
    bonus: 12
  },
  {
    id: "destroy-repair",
    members: ["meeting-crasher", "over-reader"],
    name: "破壊と修復コンボ",
    description: "壊す人と整える人が揃った。改革がただの破壊で終わらない。",
    bonus: 10
  },
  {
    id: "midnight-miracle",
    members: ["midnight-genius", "deadline-commander"],
    name: "徹夜の奇跡コンボ",
    description: "生活リズムは終わっているが、締切前の爆発力は異常。普通の会社では危険、企画では兵器。",
    bonus: 15
  },
  {
    id: "approval-sun",
    members: ["approval-monster", "sunny-person"],
    name: "承認燃料コンボ",
    description: "褒めて伸びる人と、自然に褒められる人が揃った。承認欲求がガソリンに変わる。",
    bonus: 10
  },
  {
    id: "meaning-idea",
    members: ["meaning-researcher", "midnight-genius"],
    name: "深掘り妄想コンボ",
    description: "意味を掘る人と世界観を作る人が揃った。謎に思想が深い企画が生まれる。",
    bonus: 12
  },
  {
    id: "stable-warm",
    members: ["silent-operator", "sunny-person"],
    name: "安心運用コンボ",
    description: "仕事を進める人と場を温める人が揃った。派手さはないが、チームが崩れにくい。",
    bonus: 10
  },
  {
    id: "chaos-front",
    members: ["big-mouth-ace", "approval-monster", "deadline-commander"],
    name: "前線カオス三銃士",
    description: "目立ちたい、語りたい、締切前に燃えたい。まとまれば強いが、監督がいないと爆発する。",
    bonus: 8
  }
];

export const badCombos: BadCombo[] = [
  {
    id: "main-character-war",
    members: ["big-mouth-ace", "approval-monster"],
    name: "主役争奪戦",
    description: "どちらも前に出たい。会議がいつの間にか自己PR合戦になる。",
    penalty: -8
  },
  {
    id: "too-chaotic",
    members: ["midnight-genius", "deadline-commander", "meeting-crasher"],
    name: "カオス過多",
    description: "発想・締切・破壊が揃いすぎた。爆発力はあるが、普通に現場が燃える。",
    penalty: -10
  },
  {
    id: "decisionless-kindness",
    members: ["over-reader", "sunny-person", "morning-dead"],
    name: "やさしすぎて決まらない会議",
    description: "空気は良い。でも誰も強く決めない。会議時間だけが優しく伸びていく。",
    penalty: -7
  }
];
