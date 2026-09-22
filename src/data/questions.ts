import type { Origin, Sector, Target } from "@/engine/types";

export const TARGET_OPTIONS: { value: Target; label: string; hint: string }[] = [
  { value: "consumer", label: "Particular", hint: "Persona física a título privado" },
  { value: "self-employed", label: "Autónomo / profesional", hint: "Contacto vinculado a su actividad" },
  { value: "company", label: "Empresa", hint: "Sociedad o persona de contacto" },
];

export const SECTOR_OPTIONS: { value: Sector; label: string; hint: string }[] = [
  { value: "energy", label: "Energía", hint: "Luz, gas o servicios energéticos" },
  { value: "telecom", label: "Telefonía", hint: "Fibra, móvil o comunicaciones" },
  { value: "other", label: "Otro", hint: "Cualquier otro producto o servicio" },
];

export const ORIGIN_OPTIONS: { value: Origin; label: string }[] = [
  { value: "request", label: "Me pidió que le contactara" },
  { value: "current-client", label: "Cliente actual" },
  { value: "former-client", label: "Antiguo cliente" },
  { value: "public-business-web", label: "Web / ficha pública de empresa" },
  { value: "referral", label: "Me lo pasó un contacto" },
  { value: "external-database", label: "Base de datos externa" },
  { value: "other", label: "Otro origen" },
];
