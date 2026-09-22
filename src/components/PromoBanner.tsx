"use client";

import { track } from "@/lib/analytics";

export function PromoBanner() {
  return (
    <section className="promo-shell" aria-label="Espacio publicitario reservado">
      <div className="promo-slot">
        <div className="promo-slot__glow" />
        <div className="promo-slot__eyebrow">ESPACIO PUBLICITARIO · 1200 × 180</div>
        <div className="promo-slot__content">
          <div>
            <strong>Tu banner irá aquí.</strong>
            <span>Preparado para sustituir esta pieza por una creatividad final sin tocar el layout.</span>
          </div>
          <button
            type="button"
            className="promo-slot__button"
            onClick={() => track("promo_placeholder_click")}
          >
            Banner reservado
          </button>
        </div>
      </div>
    </section>
  );
}
