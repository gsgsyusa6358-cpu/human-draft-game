import { events } from "@/data/events";
import type { EventChoice, Mission } from "@/types/game";
import { MediaPanel } from "./MediaPanel";
import { StepIndicator } from "./StepIndicator";

type Props = {
  mission: Mission;
  onChoose: (choice: EventChoice) => void;
};

export function EventPhase({ mission, onChoose }: Props) {
  const event = events.find((item) => item.missionId === mission.id) ?? events[0];
  const eventMediaPath = getEventMediaPath(mission.id);

  return (
    <section className="mx-auto w-full max-w-3xl px-4 py-8">
      <StepIndicator current={4} />
      <div className="rounded-3xl border border-white bg-white p-5 shadow-card">
        <MediaPanel
          webmPath={eventMediaPath}
          title="EVENT CUT"
          fallbackIcon={mission.icon}
          fallbackLabel={event.title}
          className="mb-5 aspect-[16/9] max-h-56"
        />
        <p className="text-xs font-black text-blue-700">EVENT PHASE</p>
        <h2 className="mt-2 text-3xl font-black text-slate-950">{event.title}</h2>
        <p className="mt-4 text-base font-bold leading-8 text-slate-700">{event.description}</p>
      </div>
      <div className="mt-5 space-y-3">
        {event.choices.map((choice) => (
          <button
            key={choice.id}
            type="button"
            onClick={() => onChoose(choice)}
            className="w-full rounded-3xl border border-white bg-white p-5 text-left shadow-card transition active:scale-[0.98]"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="text-base font-black text-slate-950">{choice.text}</span>
              <span className={`rounded-full px-3 py-1 text-sm font-black ${choice.scoreModifier >= 0 ? "bg-blue-50 text-blue-700" : "bg-rose-50 text-rose-700"}`}>
                {choice.scoreModifier > 0 ? "+" : ""}
                {choice.scoreModifier}
              </span>
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-600">{choice.description}</p>
          </button>
        ))}
      </div>
    </section>
  );
}

function getEventMediaPath(missionId: string) {
  if (missionId === "viral-plan") return "/media/event-midnight.webm";
  if (missionId === "company-chaos" || missionId === "department-rescue") return "/media/event-chaos.webm";
  return "/media/event-crisis.webm";
}
