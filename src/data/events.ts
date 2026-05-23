import type { MissionEvent } from "@/types/game";

export const events: MissionEvent[] = [
  {
    id: "school-festival-eve",
    missionId: "school-festival",
    title: "本番前日の絶望",
    description: "本番前日、中心メンバーが「もう間に合わんくない？」と言い出しました。",
    choices: [
      { id: "all-night", text: "全員で徹夜する", description: "士気は上がるが、翌朝の顔色は終わる。", scoreModifier: 4 },
      { id: "operator-plan", text: "実務神に段取りを組ませる", description: "黙ってToDoが整理され、急に現実が動き出す。", scoreModifier: 8 },
      { id: "sunny-warm", text: "太陽人間に空気を温めさせる", description: "焦りが少し笑いに変わり、手が動き始める。", scoreModifier: 6 },
      { id: "ace-speech", text: "口だけエースに最後の演説をさせる", description: "いい話ではある。いい話ではあるが、手は動いていない。", scoreModifier: 3 }
    ]
  },
  {
    id: "viral-soul",
    missionId: "viral-plan",
    title: "魂がない問題",
    description: "締切前夜、深夜だけ天才が急に「この企画、魂がない」と言い出しました。",
    choices: [
      { id: "line", text: "追いLINEする", description: "通知だけが増え、魂はさらに遠ざかる。", scoreModifier: -3 },
      { id: "wait", text: "そっとしておく", description: "深夜の発酵を待つ。賭けだが、たまに当たる。", scoreModifier: 2 },
      { id: "sunny-pickup", text: "太陽人間に迎えに行かせる", description: "孤独な天才の玄関に、あたたかい現実が届く。", scoreModifier: 5 },
      { id: "meaning", text: "研究員に企画の意味を再定義させる", description: "なぜやるのかが言語化され、急に企画が立ち上がる。", scoreModifier: 8 }
    ]
  },
  {
    id: "baseball-shoulder",
    missionId: "baseball",
    title: "エースの肩が重い",
    description: "試合当日、エースが急に「肩が重い」と言い出しました。",
    choices: [
      { id: "guts", text: "根性で投げさせる", description: "根性は便利な言葉だが、肩は便利ではない。", scoreModifier: -4 },
      { id: "defense", text: "実務神に守備位置を整えさせる", description: "声は小さいが、外野の一歩目まで変わる。", scoreModifier: 7 },
      { id: "truth", text: "会議クラッシャーに本音を聞かせる", description: "痛いところを突くが、作戦は少し現実的になる。", scoreModifier: 4 },
      { id: "bench", text: "太陽人間にベンチの空気を整えさせる", description: "ミスしても戻れる場所がある。それだけで守備は変わる。", scoreModifier: 5 }
    ]
  },
  {
    id: "department-silence",
    missionId: "department-rescue",
    title: "本音が死んだ会議",
    description: "会議中、誰も本音を言わず、空気だけが死んでいます。",
    choices: [
      { id: "ask-all", text: "とりあえず全員に意見を求める", description: "順番に当てるほど、目線が資料に沈んでいく。", scoreModifier: 1 },
      { id: "crash", text: "会議クラッシャーに違和感を言わせる", description: "場は凍る。でも凍ったものは、割れることもある。", scoreModifier: 6 },
      { id: "read-room", text: "空気読みすぎ職人に裏の感情を拾わせる", description: "言葉になる前の不満が、ようやく机の上に置かれる。", scoreModifier: 7 },
      { id: "structure", text: "研究員に課題を構造化させる", description: "混沌が図になり、何から直すかが見えてくる。", scoreModifier: 8 }
    ]
  },
  {
    id: "island-food",
    missionId: "island",
    title: "食料が少ない",
    description: "3日目、食料が思ったより少ないことに気づきました。",
    choices: [
      { id: "spirit", text: "気合いで乗り切る", description: "気合いはカロリーにならない。", scoreModifier: -5 },
      { id: "stock", text: "実務神に備蓄管理させる", description: "葉っぱ一枚まで台帳に載り、生存率が上がる。", scoreModifier: 8 },
      { id: "search", text: "特攻隊長に探索させる", description: "危ないが、なぜか何かを持って帰ってくる。", scoreModifier: 5 },
      { id: "survival-plan", text: "研究員に生存戦略を立てさせる", description: "水、火、休息。思想より先に順番を決める。", scoreModifier: 6 }
    ]
  },
  {
    id: "business-no-reaction",
    missionId: "new-business",
    title: "反応ゼロの初回リリース",
    description: "初回リリース後、まったく反応がありません。",
    choices: [
      { id: "continue", text: "そのまま続ける", description: "継続は大事。ただし同じ壁に同じ速度で突っ込んでいる。", scoreModifier: -2 },
      { id: "break-cause", text: "会議クラッシャーに原因を壊してもらう", description: "耳は痛いが、見ないふりしていた前提が割れる。", scoreModifier: 6 },
      { id: "broadcast", text: "承認欲求モンスターに発信させる", description: "見られる場所に出ると、急に火力が上がる。", scoreModifier: 5 },
      { id: "customer-meaning", text: "研究員に顧客の意味を掘らせる", description: "誰の何を変えるのかが、ようやく輪郭を持つ。", scoreModifier: 8 }
    ]
  },
  {
    id: "company-meeting",
    missionId: "company-chaos",
    title: "クセ強すぎ会議",
    description: "全員クセが強すぎて、会議が動物園になっています。",
    choices: [
      { id: "free", text: "全員を自由にさせる", description: "自由は尊い。議事録は消えた。", scoreModifier: -4 },
      { id: "adjust", text: "空気読みすぎ職人に調整させる", description: "火種を拾い、燃える前にそっと遠ざける。", scoreModifier: 6 },
      { id: "point", text: "会議クラッシャーに論点を絞らせる", description: "多少痛いが、話すべきことだけが残る。", scoreModifier: 5 },
      { id: "warm", text: "太陽人間に場を整えさせる", description: "まとまらない人たちが、少なくとも同じ部屋に戻ってくる。", scoreModifier: 7 }
    ]
  }
];
