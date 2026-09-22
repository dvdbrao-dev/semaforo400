# Banner publicitario

La V1 reserva un bloque de publicidad entre el hero y la herramienta.

## Medida de diseño

- Proporción recomendada: 1200 × 180 px.
- En móvil el contenedor se adapta sin romper la composición.

## Integración final

El componente actual es `src/components/PromoBanner.tsx` y muestra un placeholder visual. Cuando exista la creatividad definitiva puede sustituirse por una imagen responsive o por un bloque HTML manteniendo el mismo contenedor.

El evento de analítica debe renombrarse de `promo_placeholder_click` a `promo_click` y registrar, como mínimo, `campaign` y `destination`.
