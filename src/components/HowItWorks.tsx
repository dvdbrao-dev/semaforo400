export function HowItWorks() {
  return (
    <section className="how-section" id="como-funciona">
      <div className="section-heading">
        <h2>Cómo decide el semáforo</h2>
        <p>Aplica reglas fijas escritas a partir de las fuentes oficiales. No hay una IA interpretando tu caso: las mismas respuestas dan siempre el mismo resultado.</p>
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
    </section>
  );
}
