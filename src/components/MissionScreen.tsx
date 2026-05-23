type MissionScreenProps = {
  onNext: () => void;
};

export function MissionScreen({ onNext }: MissionScreenProps) {
  return (
    <section className="mx-auto flex min-h-screen w-full max-w-3xl flex-col justify-center px-5 py-10">
      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-card sm:p-10">
        <p className="text-sm font-black text-violet-700">Mission 01</p>
        <h2 className="mt-3 text-4xl font-black leading-tight text-ink sm:text-5xl">崩壊寸前の部署を立て直せ</h2>

        <div className="mt-8 space-y-4 text-base leading-8 text-slate-700">
          <p>売上は落ちている。</p>
          <p>会議は長い。</p>
          <p>誰も本音を言わない。</p>
          <p>やる気のある人ほど疲れ、優しい人ほど黙っている。</p>
          <p className="pt-3 font-bold text-ink">
            あなたはこの部署の新任監督。クセ強メンバー10人の中から5人を選び、チームを立て直してください。
          </p>
        </div>

        <button
          type="button"
          onClick={onNext}
          className="mt-10 w-full rounded-lg bg-gradient-to-r from-sky-600 to-violet-600 px-6 py-4 text-lg font-black text-white shadow-lg transition hover:-translate-y-0.5"
        >
          ドラフトへ進む
        </button>
      </div>
    </section>
  );
}
