import Image from "next/image";

export function Footer() {
  return (
    <footer className="footer">
      <Image src="/logo-mejoradora-blanco.png" alt="Mejoradora Granada" width={180} height={87} />
      <div>
        <p>Semáforo 400 · Herramienta orientativa para equipos comerciales.</p>
        <p>Última revisión de fuentes: 22 septiembre 2026.</p>
      </div>
      <a href="#top">Volver arriba ↑</a>
    </footer>
  );
}
