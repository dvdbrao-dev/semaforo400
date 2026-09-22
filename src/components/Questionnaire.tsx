"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ORIGIN_OPTIONS, SECTOR_OPTIONS, TARGET_OPTIONS } from "@/data/questions";
import { evaluateLead } from "@/engine/evaluate";
import type { LeadContext, Origin, Sector, Target } from "@/engine/types";
import { track } from "@/lib/analytics";
import { ResultCard } from "./ResultCard";

type Draft = Partial<LeadContext>;

const initialDraft: Draft = {};

function BoolChoice({ value, onChange }: { value: boolean | undefined; onChange: (value: boolean) => void }) {
  return (
    <div className="segmented">
      <button type="button" className={value === true ? "is-selected" : ""} onClick={() => onChange(true)}>Sí</button>
      <button type="button" className={value === false ? "is-selected" : ""} onClick={() => onChange(false)}>No</button>
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
      // Si el origen es "me pidió que le contactara", la pregunta 4 no puede ser "No".
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
  }

  function reset() {
    setDraft(initialDraft);
    setSubmitted(false);
    track("tool_reset");
  }

  return (
    <section className="tool-section" id="herramienta">
      <div className="tool-intro">
        <h2>Describe el contacto antes de marcar</h2>
        <p>
          No pedimos nombres ni teléfonos, solo el contexto: a quién llamas, qué vendes y de dónde sacaste el número.
          No hay registro y el resultado sale al momento.
        </p>
      </div>

      <div className="tool-panel">
        <div className="questions-card">
          <div className="questions-card__header">
            <div>
              <h3>Tu llamada</h3>
            </div>
            <span className="privacy-chip">No guardamos teléfonos</span>
          </div>

          <div className="question-grid">
            <label className="question-row">
              <span className="question-number">1</span>
              <span className="question-copy"><b>¿A quién vas a llamar?</b><small>Define el tipo de destinatario.</small></span>
              <select value={draft.target ?? ""} onChange={(e) => update("target", e.target.value as Target)}>
                <option value="" disabled>Selecciona</option>
                {TARGET_OPTIONS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
              </select>
            </label>

            <label className="question-row">
              <span className="question-number">2</span>
              <span className="question-copy"><b>¿Qué vendes?</b><small>La energía tiene reglas propias más estrictas.</small></span>
              <select value={draft.sector ?? ""} onChange={(e) => update("sector", e.target.value as Sector)}>
                <option value="" disabled>Selecciona</option>
                {SECTOR_OPTIONS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
              </select>
            </label>

            <label className="question-row">
              <span className="question-number">3</span>
              <span className="question-copy"><b>¿De dónde salió el teléfono?</b><small>La procedencia importa.</small></span>
              <select value={draft.origin ?? ""} onChange={(e) => update("origin", e.target.value as Origin)}>
                <option value="" disabled>Selecciona</option>
                {ORIGIN_OPTIONS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
              </select>
            </label>

            <div className="question-row">
              <span className="question-number">4</span>
              <span className="question-copy"><b>¿Te pidió información?</b><small>Solicitud expresa de contacto.</small></span>
              <BoolChoice value={draft.requestedContact} onChange={(value) => update("requestedContact", value)} />
            </div>

            <div className="question-row">
              <span className="question-number">5</span>
              <span className="question-copy"><b>¿Existe relación comercial previa?</b><small>Actual o anterior.</small></span>
              <BoolChoice value={draft.previousRelationship} onChange={(value) => update("previousRelationship", value)} />
            </div>
          </div>

          <div className="question-actions">
            <button type="button" className="text-button" onClick={reset}>Reiniciar</button>
            <button type="button" className="primary-button" disabled={!complete} onClick={calculate}>
              Ver resultado
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={decision ? `${decision.status}-${decision.ruleIds.join("-")}` : "empty"}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.24 }}
          >
            <ResultCard decision={decision} />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
