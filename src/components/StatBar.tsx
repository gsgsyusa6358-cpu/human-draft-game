import { statLabels } from "@/lib/calculateResult";
import type { StatKey } from "@/types/game";

type StatBarProps = {
  label?: string;
  statKey?: StatKey;
  value: number;
  max?: number;
  compact?: boolean;
};

export function StatBar({ label, statKey, value, max = 5, compact = false }: StatBarProps) {
  const displayLabel = label ?? (statKey ? statLabels[statKey] : "");
  const width = `${Math.min(100, Math.max(0, (value / max) * 100))}%`;

  return (
    <div className={compact ? "space-y-1" : "space-y-1.5"}>
      <div className="flex items-center justify-between gap-2 text-[11px] font-bold text-slate-600">
        <span>{displayLabel}</span>
        <span className="tabular-nums text-slate-500">{value}</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-slate-200">
        <div className="h-full rounded-full bg-gradient-to-r from-sky-500 to-violet-500" style={{ width }} />
      </div>
    </div>
  );
}
