import { describe, expect, it } from "vitest";
import { evaluateLead } from "./evaluate";
import type { LeadContext } from "./types";

const base: LeadContext = {
  target: "consumer",
  sector: "other",
  origin: "other",
  requestedContact: false,
  previousRelationship: false,
};

describe("evaluateLead", () => {
  it("da verde cuando existe una solicitud expresa", () => {
    const result = evaluateLead({ ...base, requestedContact: true });
    expect(result.status).toBe("green");
  });

  it("da rojo a consumidor de energía sin solicitud", () => {
    const result = evaluateLead({ ...base, sector: "energy" });
    expect(result.status).toBe("red");
  });

  it("da rojo a autónomo persona física en energía sin solicitud", () => {
    const result = evaluateLead({ ...base, target: "self-employed", sector: "energy" });
    expect(result.status).toBe("red");
  });

  it("da ámbar a consumidor con relación previa", () => {
    const result = evaluateLead({ ...base, previousRelationship: true, origin: "current-client" });
    expect(result.status).toBe("amber");
  });

  it("da verde en B2B con contacto corporativo público", () => {
    const result = evaluateLead({
      ...base,
      target: "company",
      sector: "telecom",
      origin: "public-business-web",
    });
    expect(result.status).toBe("green");
  });

  it("da ámbar si el dato profesional viene de una base externa", () => {
    const result = evaluateLead({
      ...base,
      target: "self-employed",
      origin: "external-database",
    });
    expect(result.status).toBe("amber");
  });

  it("no da verde si el origen dice 'me lo pidió' pero la pregunta 4 dice que no", () => {
    const result = evaluateLead({ ...base, origin: "request", requestedContact: false });
    expect(result.status).not.toBe("green");
  });

  it("incluye la comprobación de numeración 400 en todos los resultados", () => {
    const result = evaluateLead({ ...base, requestedContact: true });
    expect(result.checks.some((c) => c.includes("400"))).toBe(true);
  });

  it("da ámbar a particular de energía con relación previa (interés legítimo, art. 13.y RD 88/2026)", () => {
    const result = evaluateLead({ ...base, sector: "energy", origin: "former-client", previousRelationship: true });
    expect(result.status).toBe("amber");
  });

  it("da verde a empresa en energía con contacto corporativo (el art. 13.y solo cubre personas físicas)", () => {
    const result = evaluateLead({ ...base, target: "company", sector: "energy", origin: "public-business-web" });
    expect(result.status).toBe("green");
  });
});
