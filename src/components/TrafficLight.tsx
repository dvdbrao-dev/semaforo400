import type { TrafficStatus } from "@/engine/types";

type Props = { active?: TrafficStatus | null };

const states: { id: TrafficStatus; label: string; description: string }[] = [
  { id: "green", label: "Verde", description: "Posible en principio" },
  { id: "amber", label: "Ámbar", description: "Revisar antes de llamar" },
  { id: "red", label: "Rojo", description: "No llames todavía" },
];

export function TrafficLight({ active = null }: Props) {
  return (
    <div className="status-scale" aria-label="Semáforo de decisión">
      {states.map((state) => (
        <div
          className={`status-scale__item status-scale__item--${state.id} ${active === state.id ? "is-active" : ""}`}
          aria-current={active === state.id ? "true" : undefined}
          key={state.id}
        >
          <span className="status-scale__dot" aria-hidden="true" />
          <span><b>{state.label}</b><small>{state.description}</small></span>
        </div>
      ))}
    </div>
  );
}
