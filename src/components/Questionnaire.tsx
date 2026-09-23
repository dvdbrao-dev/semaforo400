"use client";

import { useMemo, useState } from "react";
import { ORIGIN_OPTIONS, SECTOR_OPTIONS, TARGET_OPTIONS } from "@/data/questions";
import { evaluateLead } from "@/engine/evaluate";
import type { LeadContext, Origin, Sector, Target } from "@/engine/types";
import { track } from "@/lib/analytics";
import { ResultCard } from "./ResultCard";

type Draft = Partial<LeadContext>;
const initialDraft: Draft = {};

function BoolChoice({ name, value, onChange }: { name: string; value: boolean | undefined; onChange: (value: boolean) => void }) {
  return (
    <div className="segmented" role="group" aria-label={name}>
      <button type="button" aria-pressed={value === true} className={value === true ? "is-selected" : ""} onClick={() => onChange(true)}>Sí</button>
      <button type="button" aria-pressed={value === false} className={value === false ? "is-selected" : ""} onClick={() => onChange(false)}>No</button>
    </div>
  );
}

export function Questionnaire() {
  const [draft, setDraft] = useState<Draft>(initialDraft);
  const [submitted, setSubmitted] = useState(false);

  const complete =
    draft.target !== undefined &&
    draft.sector !== undefined &&
    draft.origin !== undefined &&
    draft.requestedContact !== undefined &&
    draft.previousRelationship !== undefined;

  const decision = useMemo(() => {
    if (!submitted || !complete) return null;
    return evaluateLead(draft as LeadContext);
  }, [submitted, complete, draft]);

  function update<K extends keyof LeadContext>(key: K, value: LeadContext[K]) {
    setDraft((current) => {
      const next = { ...current, [key]: value };
      if (key === "origin" && value === "request") next.requestedContact = true;
      return next;
    });
    setSubmitted(false);
    track("question_answered", { question: key, value: String(value) });
  }

  function calculate() {
    if (!complete) return;
    const result = evaluateLead(draft as LeadContext);
    setSubmitted(true);
    track("tool_result", {
      status: result.status,
      target: draft.target,
      sector: draft.sector,
      origin: draft.origin,
      requested: draft.requestedContact,
      previousRelationship: draft.previousRelationship,
    });
    if (window.matchMedia("(max-width: 900px)").matches) {
      requestAnimationFrame(() => document.getElementById("resultado")?.scrollIntoView({ behavior: "smooth", block: "start" }));
    }
  }

  function reset() {
    setDraft(initialDraft);
    setSubmitted(false);
    track("tool_reset");
  }

  return (
    <section className="tool-section" id="herramienta" aria-labelledby="tool-title">
      <div className="tool-intro">
        <div>
          <p className="eyebrow">Herramienta</p>
          <h2 id="tool-title">Evalúa tu llamada comercial</h2>
          <p>Responde cinco preguntas. No pedimos nombres, teléfonos ni datos de contacto.</p>
        </div>
        <span>01 / 05 · Contexto de la llamada</span>
      </div>

      <div className="tool-panel">
        <div className="questions-card">
          <div className="questions-card__header">
            <h3>Datos de la llamada</h3>
            <span>No guardamos teléfonos</span>
          </div>

          <div className="question-grid">
            <label className="question-row">
              <span className="question-copy"><b>1. ¿A quién vas a llamar?</b><small>Tipo de destinatario</small></span>
              <select value={draft.target ?? ""} onChange={(e) => update("target", e.target.value as Target)}>
                <option value="" disabled>Selecciona una opción</option>
                {TARGET_OPTIONS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
              </select>
            </label>

            <label className="question-row">
              <span className="question-copy"><b>2. ¿Qué vendes?</b><small>La energía tiene reglas específicas</small></span>
              <select value={draft.sector ?? ""} onChange={(e) => update("sector", e.target.value as Sector)}>
                <option value="" disabled>Selecciona una opción</option>
                {SECTOR_OPTIONS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
              </select>
            </label>

            <label className="question-row">
              <span className="question-copy"><b>3. ¿De dónde salió el teléfono?</b><small>Procedencia del dato</small></span>
              <select value={draft.origin ?? ""} onChange={(e) => update("origin", e.target.value as Origin)}>
                <option value="" disabled>Selecciona una opción</option>
                {ORIGIN_OPTIONS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
              </select>
            </label>

            <div className="question-row question-row--boolean">
              <span className="question-copy"><b>4. ¿Te pidió información?</b><small>Solicitud expresa de contacto</small></span>
              <BoolChoice name="¿Te pidió información?" value={draft.requestedContact} onChange={(value) => update("requestedContact", value)} />
            </div>

            <div className="question-row question-row--boolean">
              <span className="question-copy"><b>5. ¿Existe relación comercial previa?</b><small>Actual o anterior</small></span>
              <BoolChoice name="¿Existe relación comercial previa?" value={draft.previousRelationship} onChange={(value) => update("previousRelationship", value)} />
            </div>
          </div>

          <div className="question-actions">
            <button type="button" className="text-button" onClick={reset}>Reiniciar</button>
            <button type="button" className="primary-button" disabled={!complete} onClick={calculate}>Ver resultado</button>
          </div>
        </div>

        <div className="result-shell" id="resultado" key={decision ? `${decision.status}-${decision.ruleIds.join("-")}` : "empty"}>
          <ResultCard decision={decision} />
        </div>
      </div>
    </section>
  );
}
