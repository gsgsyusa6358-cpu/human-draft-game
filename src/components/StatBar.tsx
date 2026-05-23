type Props = {
  label: string;
  value: number;
  max?: number;
};

export function StatBar({ label, value, max = 5 }: Props) {
  const width = `${Math.min(100, (value / max) * 100)}%`;

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-[11px] font-bold text-slate-600">
        <span>{label}</span>
        <span>{value}</span>
      </div>
      <div className="h-2 rounded-full bg-slate-100">
        <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-violet-500" style={{ width }} />
      </div>
    </div>
  );
}
