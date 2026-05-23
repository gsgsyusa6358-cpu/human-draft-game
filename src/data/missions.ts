import type { Mission } from "@/types/game";

export const missions: Mission[] = [
  {
    id: "school-festival",
    title: "文化祭で優勝しろ",
    subtitle: "ノリと段取りと空気づくりで勝ち切れ",
    description: "限られた時間で出し物を作り、クラス全体を巻き込み、当日の熱量で優勝を狙うミッション。",
    icon: "🎉",
    accent: "from-sky-500 to-violet-500",
    media: {
      webmPath: "/media/mission-school-festival.webm",
      mp4Path: "/media/mission-school-festival.mp4",
      gifPath: "/media/mission-school-festival.gif"
    },
    requiredStats: ["協調性", "場を温める力", "爆発力"],
    weights: { idea: 1.1, execution: 1.1, teamwork: 1.4, burst: 1.3, stability: 1, insight: 1, warmth: 1.5, trouble: 1, morning: 0.9 }
  },
  {
    id: "viral-plan",
    title: "バズる企画を作れ",
    subtitle: "普通を壊して、記憶に残る企画を生め",
    description: "SNSで広がる企画を作るミッション。尖った発想と一瞬の爆発力が重要。",
    icon: "🚀",
    accent: "from-indigo-500 to-fuchsia-500",
    media: {
      webmPath: "/media/mission-buzz.webm",
      mp4Path: "/media/mission-buzz.mp4",
      gifPath: "/media/mission-buzz.gif"
    },
    requiredStats: ["発想力", "爆発力", "本質を見る力"],
    weights: { idea: 1.6, execution: 1, teamwork: 0.9, burst: 1.5, stability: 0.7, insight: 1.4, warmth: 1, trouble: 1, morning: 0.8 }
  },
  {
    id: "baseball",
    title: "草野球チームを勝たせろ",
    subtitle: "クセ強メンバーを束ねて試合に勝て",
    description: "能力も性格もバラバラな草野球チームを勝利に導くミッション。安定感とチームワークが鍵。",
    icon: "⚾",
    accent: "from-blue-500 to-emerald-500",
    media: {
      webmPath: "/media/mission-baseball.webm",
      mp4Path: "/media/mission-baseball.mp4",
      gifPath: "/media/mission-baseball.gif"
    },
    requiredStats: ["協調性", "安定感", "トラブル耐性"],
    weights: { idea: 1, execution: 1.2, teamwork: 1.5, burst: 1.2, stability: 1.4, insight: 1.2, warmth: 1.1, trouble: 1.3, morning: 1.1 }
  },
  {
    id: "department-rescue",
    title: "崩壊寸前の部署を救え",
    subtitle: "空気が死んだ部署を立て直せ",
    description: "売上低下、長すぎる会議、誰も本音を言わない部署を再生するミッション。",
    icon: "🧩",
    accent: "from-cyan-500 to-blue-600",
    media: {
      webmPath: "/media/mission-office-crisis.webm",
      mp4Path: "/media/mission-office-crisis.mp4",
      gifPath: "/media/mission-office-crisis.gif"
    },
    requiredStats: ["実行力", "安定感", "本質を見る力"],
    weights: { idea: 1.1, execution: 1.4, teamwork: 1.3, burst: 0.9, stability: 1.5, insight: 1.4, warmth: 1.2, trouble: 1.3, morning: 1 }
  },
  {
    id: "island",
    title: "無人島で30日生き残れ",
    subtitle: "思想より水、企画より火起こし",
    description: "クセ強メンバーだけで無人島生活を30日乗り切るミッション。実行力とトラブル耐性が命。",
    icon: "🏝️",
    accent: "from-teal-500 to-blue-500",
    media: {
      webmPath: "/media/mission-island.webm",
      mp4Path: "/media/mission-island.mp4",
      gifPath: "/media/mission-island.gif"
    },
    requiredStats: ["実行力", "トラブル耐性", "安定感"],
    weights: { idea: 0.9, execution: 1.6, teamwork: 1.2, burst: 1, stability: 1.5, insight: 1, warmth: 1, trouble: 1.6, morning: 1.4 }
  },
  {
    id: "new-business",
    title: "新規事業を立ち上げろ",
    subtitle: "何もないところに、意味と売上を作れ",
    description: "ゼロから事業を立ち上げるミッション。発想、実行、突破力のバランスが重要。",
    icon: "💡",
    accent: "from-violet-500 to-blue-500",
    media: {
      webmPath: "/media/mission-startup.webm",
      mp4Path: "/media/mission-startup.mp4",
      gifPath: "/media/mission-startup.gif"
    },
    requiredStats: ["発想力", "実行力", "爆発力"],
    weights: { idea: 1.5, execution: 1.4, teamwork: 1.1, burst: 1.3, stability: 1, insight: 1.4, warmth: 0.9, trouble: 1.2, morning: 1 }
  },
  {
    id: "company-chaos",
    title: "クセ強社員だけで会社を回せ",
    subtitle: "まともな人材がいない会社を成立させろ",
    description: "全員クセが強い。だが、配置次第では謎に回る。人間の欠点を才能に変えるミッション。",
    icon: "🏢🔥",
    accent: "from-slate-700 to-violet-600",
    media: {
      webmPath: "/media/mission-chaos-company.webm",
      mp4Path: "/media/mission-chaos-company.mp4",
      gifPath: "/media/mission-chaos-company.gif"
    },
    requiredStats: ["本質を見る力", "協調性", "場を温める力"],
    weights: { idea: 1.2, execution: 1.2, teamwork: 1.4, burst: 1.1, stability: 1.2, insight: 1.5, warmth: 1.4, trouble: 1.3, morning: 0.9 }
  }
];
