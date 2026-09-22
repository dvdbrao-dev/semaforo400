"use client";

import { LEGAL_SOURCES } from "@/data/sources";
import type { Decision } from "@/engine/types";
import { track } from "@/lib/analytics";
import { TrafficLight } from "./TrafficLight";

type Props = {
  decision: Decision | null;
};

const STATUS_COPY = {
  green: "RIESGO BAJO",
  amber: "REVISAR",
  red: "ALTO RIESGO",
} as const;

export function ResultCard({ decision }: Props) {
  if (!decision) {
    return (
      <aside className="result-card result-card--empty">
        <div className="result-card__topline">
          <span>RESULTADO</span>
          <span className="status-pill">—</span>
        </div>
        <div className="result-empty">
          <TrafficLight compact />
          <div>
            <h3>Completa las 5 preguntas</h3>
            <p>El semáforo se encenderá con una recomendación y las comprobaciones que deberías hacer.</p>
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside className={`result-card result-card--${decision.status}`}>
      <div className="result-card__topline">
        <span>RESULTADO</span>
        <span className={`status-pill status-pill--${decision.status}`}>{STATUS_COPY[decision.status]}</span>
      </div>

      <div className="result-card__hero">
        <TrafficLight active={decision.status} compact />
        <div>
          <h3>{decision.title}</h3>
          <p>{decision.summary}</p>
        </div>
      </div>

      <div className="result-section">
        <span className="result-section__label">POR QUÉ</span>
        <ul>
          {decision.reasons.map((reason) => <li key={reason}>{reason}</li>)}
        </ul>
      </div>

      <div className="result-section">
        <span className="result-section__label">ANTES DE LLAMAR</span>
        <ul>
          {decision.checks.slice(0, 5).map((check) => <li key={check}>{check}</li>)}
        </ul>
      </div>

      <div className="result-sources">
        {decision.sourceIds.slice(0, 4).map((sourceId) => {
          const source = LEGAL_SOURCES[sourceId];
          return (
            <a
              href={source.url}
              target="_blank"
              rel="noreferrer"
              key={source.id}
              onClick={() => track("source_click", { source: source.id })}
            >
              <span>{source.authority}</span>
              {source.title}
            </a>
          );
        })}
      </div>

      <p className="result-disclaimer">
        Orientación general basada en fuentes oficiales. No sustituye asesoramiento jurídico ni una revisión del caso concreto.
      </p>
    </aside>
  );
}
