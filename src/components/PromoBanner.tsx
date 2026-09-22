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
        onClick={() =>
          track("promo_click", {
            campaign: PROMO_CAMPAIGN,
            destination: "whatsapp",
          })
        }
      >
        <Image
          className="promo-banner__image"
          src="/banner-colabora-mejoradora.webp"
          alt="Colabora con Mejoradora Granada: gana más con los clientes que ya tienes"
          width={1600}
          height={245}
          sizes="(max-width: 620px) calc(100vw - 24px), (max-width: 900px) calc(100vw - 52px), 1420px"
        />
      </a>
    </section>
  );
}
