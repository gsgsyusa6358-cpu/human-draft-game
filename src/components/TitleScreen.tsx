type TitleScreenProps = {
  onStart: () => void;
};

export function TitleScreen({ onStart }: TitleScreenProps) {
  return (
    <section className="mx-auto flex min-h-screen w-full max-w-4xl flex-col justify-center px-5 py-10">
      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-card sm:p-10">
        <p className="text-sm font-black text-sky-600">新任監督着任のお知らせ</p>
        <h1 className="mt-3 text-5xl font-black leading-tight text-ink sm:text-7xl">人間ドラフト会議</h1>
        <p className="mt-3 text-xl font-black text-violet-700">クセ強メンバーで最強チームを作れ</p>

        <div className="mt-8 space-y-4 text-base leading-8 text-slate-700 sm:text-lg">
          <p>あなたは新任監督。</p>
          <p>クセの強すぎる人間たちをドラフト指名し、崩壊寸前のチームを立て直せ。</p>
          <p>能力だけで選ぶと、たぶん終わる。</p>
          <p className="font-bold text-ink">クセを読め。相性を見ろ。配置を想像しろ。</p>
        </div>

        <button
          type="button"
          onClick={onStart}
          className="mt-10 w-full rounded-lg bg-ink px-6 py-4 text-lg font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-slate-800"
        >
          ドラフト開始
        </button>
      </div>
    </section>
  );
}
