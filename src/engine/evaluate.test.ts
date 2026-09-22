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
});
