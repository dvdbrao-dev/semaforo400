"use client";

import { LEGAL_SOURCES } from "@/data/sources";
import type { Decision } from "@/engine/types";
import { track } from "@/lib/analytics";
import { TrafficLight } from "./TrafficLight";

type Props = { decision: Decision | null };

const STATUS_TITLE = {
  green: "Posible en principio",
  amber: "Revisar antes de llamar",
  red: "No llames todavía",
} as const;

export function ResultCard({ decision }: Props) {
  if (!decision) {
    return (
      <aside className="result-card result-card--empty" aria-label="Resultado pendiente">
        <p className="result-card__eyebrow">Resultado</p>
        <TrafficLight />
        <div className="result-empty">
          <h3>Una respuesta con contexto</h3>
          <p>Completa las cinco preguntas para ver el estado, los motivos, las comprobaciones y las fuentes aplicables.</p>
        </div>
      </aside>
    );
  }

  return (
    <aside className={`result-card result-card--${decision.status}`} aria-label="Resultado de la evaluación">
      <p className="result-card__eyebrow">Resultado</p>
      <TrafficLight active={decision.status} />
      <div className="result-card__summary" aria-live="polite">
        <h3>{STATUS_TITLE[decision.status]}</h3>
        <p>{decision.summary}</p>
      </div>

      <div className="result-section">
        <h4>Por qué</h4>
        <ul>{decision.reasons.map((reason) => <li key={reason}>{reason}</li>)}</ul>
      </div>

      <div className="result-section">
        <h4>Antes de llamar</h4>
        <ul>{decision.checks.map((check) => <li key={check}>{check}</li>)}</ul>
      </div>

      <div className="result-section result-section--sources">
        <h4>Fuentes</h4>
        <div className="result-sources">
          {decision.sourceIds.map((sourceId) => {
            const source = LEGAL_SOURCES[sourceId];
            return (
              <a
                href={source.url}
                target="_blank"
                rel="noreferrer"
                key={source.id}
                onClick={() => track("source_click", { source: source.id, location: "result" })}
              >
                <b>{source.authority}</b><span>{source.title}</span>
              </a>
            );
          })}
        </div>
      </div>

      <p className="result-disclaimer">Orientación general. No sustituye revisión jurídica específica.</p>
    </aside>
  );
}
