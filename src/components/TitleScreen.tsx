import { MediaPanel } from "./MediaPanel";

type Props = {
  onStart: () => void;
};

export function TitleScreen({ onStart }: Props) {
  return (
    <section className="mx-auto flex min-h-screen w-full max-w-3xl flex-col justify-center px-5 py-14">
      <div className="animate-fade-up rounded-[2rem] border border-white bg-white/85 p-6 shadow-card backdrop-blur">
        <MediaPanel
          webmPath="/media/title-draft.webm"
          mp4Path="/media/title-draft.mp4"
          gifPath="/media/title-draft.gif"
          title="DRAFT OPENING"
          fallbackIcon="🎴"
          fallbackLabel="HUMAN DRAFT"
          className="mb-6 aspect-[16/9] max-h-64"
        />
        <div className="mb-6 inline-flex rounded-full bg-slate-900 px-4 py-2 text-sm font-black text-white">監督就任のお知らせ</div>
        <h1 className="text-5xl font-black leading-tight tracking-normal text-slate-950 sm:text-6xl">人間ドラフト会議</h1>
        <p className="mt-3 text-xl font-black text-blue-700">クセ強メンバーで最強チームを作れ</p>
        <div className="mt-8 space-y-4 text-base font-bold leading-8 text-slate-700">
          <p>あなたは新任監督。</p>
          <p>クセの強すぎる人間たちをドラフト指名し、ミッション達成を目指せ。</p>
          <p>能力だけで選ぶと、たぶん終わる。クセを読め。相性を見ろ。配置を想像しろ。</p>
        </div>
        <button
          type="button"
          onClick={onStart}
          className="mt-9 w-full rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 px-6 py-4 text-lg font-black text-white shadow-card transition active:scale-95"
        >
          ドラフト開始
        </button>
      </div>
    </section>
  );
}
