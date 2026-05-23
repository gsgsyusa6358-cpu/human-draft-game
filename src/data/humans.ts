import type { HumanCard } from "@/types/game";

export const humans: HumanCard[] = [
  {
    id: "big-mouth-ace",
    name: "口だけエース",
    nickname: "発言だけメジャーリーガー",
    description: "会議では誰よりも壮大なビジョンを語る。ただし、実行フェーズになると急にベンチ裏へ消える。",
    strengths: ["場を盛り上げる", "ビジョンを語れる", "プレゼンが強い"],
    weaknesses: ["実務から逃げる", "責任を取る直前で消える", "話が大きくなりがち"],
    bestRoles: ["リーダー", "広報", "初期アイデア出し"],
    stats: { idea: 4, execution: 1, teamwork: 3, burst: 4, stability: 1, insight: 3, warmth: 4, trouble: 2, morning: 3 }
  },
  {
    id: "silent-operator",
    name: "静かな実務神",
    nickname: "何も言わずに全部終わらせる守備職人",
    description: "会議では空気。でも気づいたら資料も段取りも全部終わっている。声は小さいが、仕事の信頼度は異常。",
    strengths: ["正確性", "安定感", "継続力"],
    weaknesses: ["自己主張が弱い", "評価されにくい", "前に出るのが苦手"],
    bestRoles: ["実行隊長", "仕組み化担当", "守備職人"],
    stats: { idea: 2, execution: 5, teamwork: 4, burst: 2, stability: 5, insight: 3, warmth: 3, trouble: 4, morning: 4 }
  },
  {
    id: "meeting-crasher",
    name: "会議クラッシャー",
    nickname: "それ意味あります？砲の使い手",
    description: "空気を読まずに本質を突く。停滞した会議を壊せるが、言い方次第で全員のメンタルも壊す。",
    strengths: ["本質を突く", "無駄を壊す", "停滞を突破する"],
    weaknesses: ["敵を作りやすい", "場を凍らせる", "言葉が鋭すぎる"],
    bestRoles: ["改革担当", "問題提起役", "ブレーキ役"],
    stats: { idea: 4, execution: 3, teamwork: 1, burst: 4, stability: 2, insight: 5, warmth: 1, trouble: 3, morning: 3 }
  },
  {
    id: "over-reader",
    name: "空気読みすぎ職人",
    nickname: "全員の顔色を読む人間レーダー",
    description: "その場の空気を読みすぎて、自分の意見がログアウトする。揉め事の察知能力はプロ級。",
    strengths: ["調整力", "共感力", "揉め事察知"],
    weaknesses: ["決断が遅い", "自分を犠牲にする", "強く言えない"],
    bestRoles: ["調整役", "ムードメーカー", "ケア担当"],
    stats: { idea: 3, execution: 3, teamwork: 5, burst: 1, stability: 4, insight: 4, warmth: 5, trouble: 3, morning: 3 }
  },
  {
    id: "midnight-genius",
    name: "深夜だけ天才",
    nickname: "午前2時の神アイデア製造機",
    description: "昼はゾンビ。夜中になると急に世界の真理に近づく。生活リズムと引き換えに発想力を得た人間。",
    strengths: ["独創性", "発想力", "世界観づくり"],
    weaknesses: ["昼に弱い", "締切管理が危険", "生活が不安定"],
    bestRoles: ["企画担当", "奇策担当", "クリエイティブ担当"],
    stats: { idea: 5, execution: 2, teamwork: 2, burst: 5, stability: 1, insight: 5, warmth: 2, trouble: 2, morning: 1 }
  },
  {
    id: "morning-dead",
    name: "朝完全停止型",
    nickname: "午前中だけ未起動アプリ",
    description: "朝は人間の形をした読み込み中画面。午後から少しずつ起動し、夕方にようやく本来の力を出す。",
    strengths: ["午後から粘る", "一度入ると集中する", "地味に継続できる"],
    weaknesses: ["朝会議に弱い", "初速が遅い", "起動まで時間がかかる"],
    bestRoles: ["午後の実行役", "裏方", "継続作業担当"],
    stats: { idea: 3, execution: 3, teamwork: 3, burst: 2, stability: 3, insight: 3, warmth: 3, trouble: 3, morning: 1 }
  },
  {
    id: "approval-monster",
    name: "承認欲求モンスター",
    nickname: "褒めると3倍働く目立ちたがり屋",
    description: "褒められると覚醒する。無視されると闇落ちする。使い方を間違えるとチームの温度を乱す。",
    strengths: ["目立つ仕事に強い", "火がつくと爆発する", "発信力がある"],
    weaknesses: ["評価されないと不機嫌", "主役を奪いにいく", "メンタルが外部評価に左右される"],
    bestRoles: ["営業", "発表", "SNS担当", "前線担当"],
    stats: { idea: 4, execution: 3, teamwork: 2, burst: 5, stability: 2, insight: 2, warmth: 3, trouble: 2, morning: 3 }
  },
  {
    id: "meaning-researcher",
    name: "意味が見えないと動かない研究員",
    nickname: "納得するまで1ミリも動かない深掘り職人",
    description: "意味が見えない作業には身体が拒否反応を起こす。だが、一度意味がつながると異常な深さまで掘る。",
    strengths: ["構造化", "本質理解", "言語化"],
    weaknesses: ["単純作業が遅い", "納得まで時間がかかる", "意味のない指示に弱い"],
    bestRoles: ["参謀", "設計担当", "診断担当"],
    stats: { idea: 5, execution: 2, teamwork: 3, burst: 3, stability: 2, insight: 5, warmth: 3, trouble: 3, morning: 2 }
  },
  {
    id: "sunny-person",
    name: "場を温める太陽人間",
    nickname: "いるだけで空気が柔らかくなる人",
    description: "この人がいると、なぜか会議の空気が少しマシになる。能力値には出にくいが、チームの温度を保つ重要人物。",
    strengths: ["安心感", "関係構築", "場づくり"],
    weaknesses: ["厳しいことを言いにくい", "勝負どころで押し切れない", "優しさで抱えがち"],
    bestRoles: ["ムードメーカー", "橋渡し役", "チームケア"],
    stats: { idea: 3, execution: 3, teamwork: 5, burst: 2, stability: 4, insight: 3, warmth: 5, trouble: 4, morning: 4 }
  },
  {
    id: "deadline-commander",
    name: "締切前だけ覚醒する特攻隊長",
    nickname: "普段サボって最後に全部持っていく火事場人間",
    description: "通常時はゆるい。締切前日になると急にスーパーサイヤ人化する。計画性はないが、爆発力は本物。",
    strengths: ["火事場の馬鹿力", "突破力", "ラストスパート"],
    weaknesses: ["計画性がない", "周囲を焦らせる", "通常時の信頼が低い"],
    bestRoles: ["緊急対応", "突破役", "ラストスパート担当"],
    stats: { idea: 3, execution: 4, teamwork: 2, burst: 5, stability: 1, insight: 3, warmth: 2, trouble: 4, morning: 2 }
  }
];
