# Analítica

Semáforo 400 utiliza **PostHog Cloud EU** para Product Analytics + Web Analytics.

La integración sigue el patrón actual recomendado para Next.js: `instrumentation-client.ts`. Si no existe `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN`, la web funciona con normalidad y no se inicializa PostHog.

## Variables

```bash
NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN=phc_...
NEXT_PUBLIC_POSTHOG_HOST=https://eu.i.posthog.com
```

Estas variables se configuran en Vercel. El Project Token de PostHog es un token público de ingestión del frontend; no se utiliza ninguna Personal API Key.

## Privacidad de la V1

- `autocapture: false`
- Session Replay desactivado.
- No se llama a `identify()`.
- No se envían nombres, teléfonos, emails, NIF, CUPS ni texto libre.
- Los eventos personalizados contienen únicamente categorías necesarias para analizar el funnel.

## Eventos

- `cta_try_click`: clic para empezar desde hero.
- `cta_sources_click`: clic a fuentes desde hero.
- `question_answered`: pregunta respondida; solo valores categóricos.
- `tool_result`: resultado del semáforo con estado y categorías del caso.
- `tool_reset`: reinicio del formulario.
- `source_click`: apertura de una fuente oficial.
- `promo_click`: clic en el banner de colaboración; solo envía campaña y tipo de destino, nunca el teléfono o la URL.

PostHog añade además pageviews/pageleaves para Web Analytics.

## Funnels recomendados

### Uso de la herramienta

`$pageview → cta_try_click → question_answered → tool_result`

### Publicidad

`$pageview → tool_result → promo_click`

### Fuentes

`tool_result → source_click`

## Métricas recomendadas

1. Visitantes y pageviews.
2. Fuente/referrer de tráfico.
3. % que pulsa Probar herramienta.
4. % que completa el cuestionario.
5. Distribución verde / ámbar / rojo.
6. Distribución por sector y tipo de destinatario.
7. Origen del teléfono declarado.
8. Clics en fuentes oficiales.
9. CTR del banner publicitario.

No incorporar datos personales a propiedades de eventos.
