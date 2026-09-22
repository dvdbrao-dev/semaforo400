# Analítica

Semáforo 400 integra Umami de forma condicional. Si no hay `NEXT_PUBLIC_UMAMI_WEBSITE_ID`, no se carga ningún script de analítica.

## Variables

```bash
NEXT_PUBLIC_UMAMI_WEBSITE_ID=...
NEXT_PUBLIC_UMAMI_SRC=https://cloud.umami.is/script.js
```

## Eventos

- `cta_try_click`: clic para empezar desde hero.
- `cta_sources_click`: clic a fuentes desde hero.
- `question_answered`: pregunta respondida; solo se envían valores categóricos, nunca nombres o teléfonos.
- `tool_result`: resultado del semáforo con estado y categorías del caso.
- `tool_reset`: reinicio del formulario.
- `source_click`: apertura de una fuente oficial.
- `promo_placeholder_click`: interacción con el espacio publicitario provisional.

## Métricas recomendadas

1. Visitantes únicos.
2. % que empieza la herramienta.
3. % que completa las 5 preguntas.
4. Distribución verde / ámbar / rojo.
5. Distribución por sector.
6. Clics en fuentes oficiales.
7. CTR del banner publicitario cuando se sustituya el placeholder.

No se deben enviar datos personales ni texto libre a Umami.
