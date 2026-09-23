import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Semáforo 400 | Mejoradora Granada",
  description: "Evalúa el contexto de una llamada comercial en menos de 30 segundos con criterios y fuentes oficiales."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
