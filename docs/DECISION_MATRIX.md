# Matriz de decisión — Semáforo 400

> Documento funcional, no dictamen jurídico. La interfaz debe ser conservadora cuando falten datos relevantes.

## Variables

1. Destinatario: consumidor / autónomo-profesional / empresa.
2. Sector: energía / telecom / otro.
3. Origen del teléfono: solicitud, cliente actual, antiguo cliente, web/ficha pública de empresa, referido, base externa u otro.
4. Solicitud expresa de contacto: sí / no.
5. Relación comercial previa: sí / no.

## Prioridad de reglas

| Prioridad | Escenario | Resultado | Motivo principal |
|---|---|---|---|
| 1 | Existe solicitud expresa de contacto | Verde | Hay una expectativa clara de contacto; deben conservarse prueba y garantías aplicables. |
| 2 | Consumidor persona física + energía + no solicitado | Rojo | El RD 88/2026 establece un régimen especialmente restrictivo para llamadas energéticas no solicitadas. |
| 3 | Autónomo persona física + energía + no solicitado | Rojo | Si actúa como persona física, el régimen energético específico puede resultar aplicable. |
| 4 | Consumidor + relación previa + sector no energético | Ámbar | Puede existir interés legítimo, pero hay que verificar licitud del dato, similitud del servicio e interacción reciente. |
| 5 | Consumidor sin solicitud ni relación previa | Rojo | No aparece una base clara con los datos disponibles. |
| 6 | Autónomo/profesional + finalidad profesional | Verde/Ámbar | En principio puede existir interés legítimo si el contacto se limita a la actividad profesional; base externa u origen incierto exige revisión. |
| 7 | Empresa / persona de contacto de entidad | Verde/Ámbar | En principio puede contactarse para relacionarse con la entidad; base externa u origen incierto exige revisión. |

## Regla de diseño

- Verde = posible en principio, nunca "legal garantizado".
- Ámbar = faltan comprobaciones relevantes.
- Rojo = no llamar todavía con la información indicada.

## Numeración 400

La resolución de 14/04/2026 atribuye el rango NXY=400 a llamadas comerciales y fija seis meses desde su entrada en vigor para su plena operatividad. La obligación concreta depende del ámbito de la Ley 10/2025 y sus excepciones, por lo que la V1 informa de esta obligación pero no pretende resolver por sí sola si cada empresa está dentro del ámbito subjetivo de dicha ley.
