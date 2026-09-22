import type { Metadata } from "next";
import "./globals.css";
import { AnalyticsScript } from "@/components/AnalyticsScript";

export const metadata: Metadata = {
  title: "Semáforo 400",
  description: "Herramienta orientativa para revisar el contexto de una llamada comercial."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>
        <AnalyticsScript />
        {children}
      </body>
    </html>
  );
}
