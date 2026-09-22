"use client";

import Image from "next/image";
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
        <a className="brand" href="#top" aria-label="Mejoradora Granada">
          <Image
            src="/logo-mejoradora-blanco.png"
            alt="Mejoradora Granada"
            width={260}
            height={125}
            priority
          />
        </a>
        <nav className="site-nav" aria-label="Navegación principal">
          <a href="#herramienta">Herramienta</a>
          <a href="#como-funciona">Cómo funciona</a>
          <a href="#fuentes">Fuentes</a>
        </nav>
        <button type="button" className="header-cta" onClick={scrollToTool}>Probar herramienta <span>→</span></button>
      </header>

      <section className="hero" id="top">
        <div className="hero__copy">
          <motion.span
            className="kicker"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            VENTAS MÁS SEGURAS · MENOS DUDAS
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.04 }}
          >
            SEMÁFORO <em>400</em>
            <span>¿Puedo llamar a este lead?</span>
          </motion.h1>
          <motion.p
            className="hero__lead"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            Cinco preguntas. Un resultado visual. Fuentes oficiales para entender si una llamada comercial encaja mejor en verde, ámbar o rojo.
          </motion.p>

          <motion.div
            className="hero__actions"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.16 }}
          >
            <button type="button" className="primary-button primary-button--hero" onClick={scrollToTool}>
              Probar herramienta <span>→</span>
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
