"use client";

import { SOURCE_LIST } from "@/data/sources";
import { track } from "@/lib/analytics";

export function SourcesSection() {
  return (
    <section className="sources-section" id="fuentes">
      <div className="section-heading section-heading--sources">
        <span className="kicker">FUENTES</span>
        <h2>Que puedas comprobarlo<br />vale más que una opinión.</h2>
        <p>La herramienta está pensada para ser conservadora: cuando faltan datos relevantes, no convierte una duda en un “sí”.</p>
      </div>

      <div className="sources-list">
        {SOURCE_LIST.map((source) => (
          <a
            href={source.url}
            target="_blank"
            rel="noreferrer"
            key={source.id}
            onClick={() => track("source_click", { source: source.id, location: "sources_section" })}
          >
            <span className="source-authority">{source.authority}</span>
            <span className="source-copy"><b>{source.title}</b><small>{source.note}</small></span>
            <span className="source-arrow">↗</span>
          </a>
        ))}
      </div>
    </section>
  );
}
