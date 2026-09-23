export function HowItWorks() {
  return (
    <section className="how-section" id="criterios">
      <div className="section-heading">
        <h2>Criterios claros, resultado orientativo</h2>
        <p>El motor aplica reglas fijas basadas en fuentes oficiales. Las mismas respuestas dan siempre el mismo resultado.</p>
      </div>
      <div className="how-grid">
        <article>
          <span>01</span>
          <h3>Describe el contexto</h3>
          <p>Tipo de destinatario, sector, origen del teléfono, solicitud y relación previa.</p>
        </article>
        <article>
          <span>02</span>
          <h3>El motor evalúa</h3>
          <p>Las reglas están versionadas en código y enlazadas a fuentes oficiales. No depende de una IA.</p>
        </article>
        <article>
          <span>03</span>
          <h3>Obtén el semáforo</h3>
          <p>Verde, ámbar o rojo, con el motivo, comprobaciones pendientes y fuentes que puedes abrir.</p>
        </article>
      </div>
      <p className="number-note"><b>Numeración 400.</b> Desde el 17 de octubre de 2026, comprueba si tu empresa debe usar este rango para llamadas comerciales.</p>
    </section>
  );
}
