const steps = ["タイトル", "ミッション", "ドラフト", "配置", "事件", "結果"];

type Props = {
  current: number;
};

export function StepIndicator({ current }: Props) {
  return (
    <div className="mx-auto mb-5 flex w-full max-w-3xl items-center gap-2 overflow-x-auto px-1 py-2">
      {steps.map((step, index) => (
        <div key={step} className="flex shrink-0 items-center gap-2">
          <div
            className={`flex h-8 min-w-8 items-center justify-center rounded-full border text-xs font-black ${
              index <= current ? "border-blue-600 bg-blue-600 text-white" : "border-slate-200 bg-white text-slate-400"
            }`}
          >
            {index + 1}
          </div>
          <span className={`text-xs font-bold ${index === current ? "text-slate-900" : "text-slate-400"}`}>{step}</span>
        </div>
      ))}
    </div>
  );
}
