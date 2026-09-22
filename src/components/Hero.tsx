"use client";

import { motion } from "motion/react";
import { track } from "@/lib/analytics";
import { TrafficLight } from "./TrafficLight";

export function Hero() {
  function scrollToTool() {
    track("cta_try_click", { location: "hero" });
    document.getElementById("herramienta")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <>
      <header className="site-header">
        <a className="brand brand--text" href="#top" aria-label="Semáforo 400, inicio">
          <b>Semáforo 400</b>
          <small>por Mejoradora Granada</small>
        </a>
        <nav className="site-nav" aria-label="Navegación principal">
          <a href="#herramienta">Herramienta</a>
          <a href="#como-funciona">Cómo funciona</a>
          <a href="#fuentes">Fuentes</a>
        </nav>
        <button type="button" className="header-cta" onClick={scrollToTool}>Comprobar una llamada</button>
      </header>

      <section className="hero" id="top">
        <div className="hero__copy">
          <motion.p
            className="hero__date"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            {/* CAMBIAR_TRAS_17_OCTUBRE: pasar a "En vigor desde el 17 de octubre de 2026" */}
            El 17 de octubre de 2026 cambian las reglas de las llamadas comerciales
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.04 }}
          >
            ¿Puedo llamar a este lead?
          </motion.h1>
          <motion.p
            className="hero__lead"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            Contesta cinco preguntas sobre el contacto y te decimos si la llamada es verde, ámbar o roja, qué norma aplica y dónde comprobarlo en la AEPD, la CNMC o el BOE. No hace falta meter nombres ni teléfonos.
          </motion.p>

          <motion.div
            className="hero__actions"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.16 }}
          >
            <button type="button" className="primary-button primary-button--hero" onClick={scrollToTool}>
              Comprobar una llamada
            </button>
            <a className="secondary-button" href="#fuentes" onClick={() => track("cta_sources_click", { location: "hero" })}>
              Ver fuentes oficiales
            </a>
          </motion.div>

          <div className="authority-row" aria-label="Fuentes oficiales">
            <span><b>BOE</b><small>Normativa</small></span>
            <span><b>CNMC</b><small>Numeración 400</small></span>
            <span><b>AEPD</b><small>Protección de datos</small></span>
          </div>
        </div>

        <div className="hero__visual" aria-hidden="true">
          <TrafficLight />
          <div className="hero-float-card">
            <span className="hero-float-card__row hero-float-card__row--green"><i /> <b>VERDE</b><small>encaja en principio</small></span>
            <span className="hero-float-card__row hero-float-card__row--amber"><i /> <b>ÁMBAR</b><small>revisa antes</small></span>
            <span className="hero-float-card__row hero-float-card__row--red"><i /> <b>ROJO</b><small>no llames todavía</small></span>
          </div>
        </div>
      </section>
    </>
  );
}
