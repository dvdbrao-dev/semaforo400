"use client";

import { PROMO_CAMPAIGN, PROMO_URL } from "@/config/promo";
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
          {decision.checks.map((check) => <li key={check}>{check}</li>)}
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
        Esto es una orientación general, no asesoramiento jurídico. Antes de llamar, revisa tu caso con las fuentes enlazadas o con tu asesor.
      </p>

      <div className="result-promo">
        <p>
          <b>¿Vendes a empresas o autónomos?</b> Muchos de tus clientes pagan de más en luz. Si nos los presentas,
          revisamos sus facturas y tú te llevas una comisión.
        </p>
        <a
          href={PROMO_URL}
          target="_blank"
          rel="noreferrer"
          onClick={() => track("promo_click", { campaign: PROMO_CAMPAIGN, destination: "whatsapp", location: "result" })}
        >
          Hablar con Mejoradora Granada por WhatsApp
        </a>
      </div>
    </aside>
  );
}
