"use client";

import Image from "next/image";
import { PROMO_CAMPAIGN, PROMO_URL } from "@/config/promo";
import { track } from "@/lib/analytics";

export function PromoBanner() {
  return (
    <section className="promo-shell" aria-label="Colabora con Mejoradora Granada">
      <a
        className="promo-banner"
        href={PROMO_URL}
        target="_blank"
        rel="noreferrer"
        onClick={() => track("promo_click", { placement: "desktop_banner", campaign: PROMO_CAMPAIGN })}
      >
        <Image
          src="/banner-colabora-mejoradora.webp"
          alt="Colabora con Mejoradora Granada. Gana más con los clientes que ya tienes. Nueva línea de ingresos en energía y telecom. Sin costes, sin ser experto. Quiero colaborar."
          width={1600}
          height={245}
          loading="eager"
          style={{ width: "100%", height: "auto" }}
          sizes="(max-width: 1200px) 100vw, 1280px"
        />
      </a>

      <div className="promo-mobile">
        <p className="promo-mobile__eyebrow">Colabora con Mejoradora Granada</p>
        <h2>Gana más con los clientes que ya tienes.</h2>
        <p>Nueva línea de ingresos en energía y telecom.<br />Sin costes. Sin ser experto.</p>
        <ul>
          <li>Comisión por venta</li>
          <li>Herramientas y soporte</li>
          <li>Tú aportas el contacto, nosotros hacemos el resto.</li>
        </ul>
        <a
          href={PROMO_URL}
          target="_blank"
          rel="noreferrer"
          onClick={() => track("promo_click", { placement: "mobile_card", campaign: PROMO_CAMPAIGN })}
        >
          Quiero colaborar
        </a>
      </div>
    </section>
  );
}
