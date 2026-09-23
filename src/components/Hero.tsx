"use client";

import Image from "next/image";
import { track } from "@/lib/analytics";

export function Hero() {
  function scrollToTool(location: string) {
    track("cta_try_click", { location });
    document.getElementById("herramienta")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Mejoradora Granada, inicio">
          <Image src="/logo-mejoradora-blanco.png" alt="Mejoradora Granada" width={188} height={90} loading="eager" style={{ width: "100%", height: "auto" }} />
        </a>
        <nav className="site-nav" aria-label="Navegación principal">
          <a href="#herramienta">Herramienta</a>
          <a href="#criterios">Criterios</a>
          <a href="#fuentes" onClick={() => track("cta_sources_click", { location: "header" })}>Fuentes</a>
        </nav>
        <button type="button" className="header-cta" onClick={() => scrollToTool("header")}>Probar herramienta</button>
      </header>

      <section className="hero" id="top" aria-labelledby="hero-title">
        <div className="hero__copy">
          <p className="eyebrow">Herramienta para equipos comerciales</p>
          <h1 id="hero-title">Semáforo 400</h1>
          <p className="hero__subhead">Evalúa una llamada comercial en menos de 30 segundos.</p>
          <p className="hero__lead">Cinco preguntas para revisar el contexto de un contacto comercial y obtener una orientación clara basada en criterios y fuentes oficiales.</p>
          <div className="hero__actions">
            <button type="button" className="primary-button" onClick={() => scrollToTool("hero")}>Probar herramienta</button>
            <a className="secondary-button" href="#criterios">Ver criterios</a>
          </div>
          <p className="authority-row">Basado en fuentes oficiales <span>AEPD · CNMC · BOE</span></p>
        </div>
        <div className="hero__preview" aria-hidden="true">
          <span>Una respuesta con contexto</span>
          <div className="hero__preview-states"><i /><i /><i /></div>
          <strong>Verde, ámbar o rojo.</strong>
          <p>Motivos, comprobaciones y fuentes para revisar antes de llamar.</p>
        </div>
      </section>
    </>
  );
}
