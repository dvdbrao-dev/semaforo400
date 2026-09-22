# Semáforo 400

Herramienta visual de Mejoradora Granada para revisar, en cinco preguntas, el contexto de una llamada comercial y devolver una orientación conservadora en formato **verde / ámbar / rojo**.

## Stack

- Next.js 16
- React 19
- TypeScript
- CSS propio
- Motion
- Vitest
- PostHog Cloud EU para Product Analytics + Web Analytics

## Principios

- Sin IA en el motor de decisión.
- Sin nombres, teléfonos ni datos personales.
- Reglas deterministas y testeables.
- Fuentes oficiales visibles.
- Verde significa “posible en principio”, nunca “legal garantizado”.
- Si faltan datos importantes, la herramienta prefiere ámbar antes que dar una falsa seguridad.

## Desarrollo

```bash
npm install
npm run dev
npm test
npm run build
```

## Analítica

Copia `.env.example` a `.env.local` y configura el Project Token de PostHog Cloud EU. Sin esas variables, la web funciona normalmente pero no carga analítica.

Consulta `docs/ANALYTICS.md`.

## Banner

Hay un espacio publicitario premium reservado justo después del hero, preparado para una creatividad 1200 × 180 px.

Consulta `docs/BANNER.md`.

## Matriz de decisión

La lógica funcional está documentada en `docs/DECISION_MATRIX.md` y ejecutada en `src/engine/evaluate.ts`.

## Aviso

Semáforo 400 ofrece orientación general basada en fuentes oficiales. No sustituye asesoramiento jurídico ni una revisión específica del caso concreto.
