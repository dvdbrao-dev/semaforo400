# Banner publicitario

La V1 reserva un bloque de publicidad entre el hero y la herramienta.

## Medida de diseño

- Proporción recomendada: 1200 × 180 px.
- En móvil el contenedor se adapta sin romper la composición.

## Integración

- Creatividad: `public/banner-colabora-mejoradora.webp` (1600 × 245 px, WebP optimizado).
- Componente: `src/components/PromoBanner.tsx`.
- Destino centralizado: `src/config/promo.ts`.
- Evento: `promo_click`, con las propiedades categóricas `campaign` y `destination`.

La URL del banner no se incluye en las propiedades de analítica para evitar enviar el número de teléfono a PostHog.
