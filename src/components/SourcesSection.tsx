"use client";

import { SOURCE_LIST } from "@/data/sources";
import { track } from "@/lib/analytics";

export function SourcesSection() {
  return (
    <section className="sources-section" id="fuentes">
      <div className="section-heading section-heading--sources">
        <h2>Fuentes oficiales</h2>
        <p>Cada resultado enlaza a estas páginas para que compruebes la regla tú mismo. Cuando falta un dato importante, la herramienta da ámbar o rojo, nunca verde.</p>
        <p>Última revisión: 22 de septiembre de 2026.</p>
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
