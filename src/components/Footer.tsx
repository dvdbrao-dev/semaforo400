import Image from "next/image";

export function Footer() {
  return (
    <footer className="footer">
      <Image src="/logo-mejoradora-blanco.png" alt="Mejoradora Granada" width={150} height={72} />
      <div>
        <p>Semáforo 400 · Herramienta orientativa para equipos comerciales.</p>
        <p>Última revisión de fuentes: 22 de septiembre de 2026.</p>
      </div>
      <a href="#top">Volver arriba ↑</a>
    </footer>
  );
}
