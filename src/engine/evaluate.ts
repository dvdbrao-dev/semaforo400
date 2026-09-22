import type { Decision, LeadContext } from "./types";

const commonChecks = [
  "Identifica a la empresa y explica la finalidad comercial al inicio de la llamada.",
  "Respeta cualquier oposición o revocación de consentimiento de forma inmediata.",
  "Comprueba los sistemas de exclusión publicitaria cuando resulten aplicables.",
];

function withCommonChecks(checks: string[]): string[] {
  return Array.from(new Set([...checks, ...commonChecks]));
}

export function evaluateLead(context: LeadContext): Decision {
  const { target, sector, origin, requestedContact, previousRelationship } = context;

  if (requestedContact || origin === "request") {
    const energyChecks = sector === "energy"
      ? [
          "En energía, conserva prueba de la petición expresa, inequívoca, informada y para una finalidad específica.",
          "Si la llamada deriva en contratación energética, revisa las obligaciones específicas de grabación e información precontractual.",
        ]
      : ["Conserva prueba de cuándo y cómo se solicitó el contacto."];

    return {
      status: "green",
      title: "Contacto posible en principio",
      summary: "La persona o empresa ha solicitado el contacto. Aun así, debes respetar las obligaciones de identificación, oposición y trazabilidad.",
      reasons: [
        "Consta una solicitud de contacto.",
        target === "consumer" ? "El destinatario es un consumidor." : "El contacto se realiza en un contexto profesional o empresarial.",
      ],
      checks: withCommonChecks(energyChecks),
      sourceIds: sector === "energy"
        ? ["ENERGY_RD88", "AEPD_RIGHTS", "AEPD_EXCLUSION", "BOE_400"]
        : ["AEPD_GENERAL", "AEPD_RIGHTS", "AEPD_EXCLUSION", "BOE_400"],
      ruleIds: [sector === "energy" ? "CONSENT-ENERGY" : "CONSENT-GENERAL"],
    };
  }

  if (target === "consumer" && sector === "energy") {
    return {
      status: "red",
      title: "No llames todavía",
      summary: "Para una persona física en energía, una llamada comercial no solicitada entra en un escenario especialmente restrictivo.",
      reasons: [
        "El destinatario es una persona física.",
        "La finalidad es comercial y energética.",
        "No consta una petición expresa de contacto.",
      ],
      checks: withCommonChecks([
        "Obtén una petición expresa antes de realizar la llamada comercial.",
        "No tomes la mera existencia del teléfono en una web, un referido o una base externa como autorización suficiente.",
      ]),
      sourceIds: ["ENERGY_RD88", "AEPD_GENERAL", "AEPD_RIGHTS", "BOE_400"],
      ruleIds: ["ENERGY-CONSUMER-NO-REQUEST"],
    };
  }

  if (target === "consumer") {
    if (previousRelationship || origin === "current-client" || origin === "former-client") {
      return {
        status: "amber",
        title: "Revisa antes de llamar",
        summary: "Puede existir una base de interés legítimo, pero faltan datos para confirmar que se cumplen todas sus condiciones.",
        reasons: [
          "Existe o ha existido una relación comercial previa.",
          "No consta una solicitud expresa para esta llamada.",
        ],
        checks: withCommonChecks([
          "Confirma que los datos se obtuvieron lícitamente.",
          "Comprueba que el producto o servicio ofrecido sea similar al contratado anteriormente.",
          "Si la relación terminó, verifica que haya existido interacción durante el último año.",
        ]),
        sourceIds: ["AEPD_GENERAL", "AEPD_EXCLUSION", "AEPD_RIGHTS", "BOE_400"],
        ruleIds: ["CONSUMER-LEGITIMATE-INTEREST-CHECK"],
      };
    }

    return {
      status: "red",
      title: "No llames todavía",
      summary: "Con los datos indicados no aparece una base clara para una llamada comercial no solicitada a un consumidor.",
      reasons: [
        "No consta consentimiento o solicitud previa.",
        "No consta una relación comercial previa que permita valorar interés legítimo.",
        origin === "public-business-web" ? "La publicación del número por sí sola no equivale a consentimiento comercial." : "El origen del teléfono no acredita por sí solo una base para la llamada.",
      ],
      checks: withCommonChecks([
        "Obtén consentimiento o una solicitud de contacto antes de llamar.",
        "Documenta el origen del teléfono y la base jurídica aplicable.",
      ]),
      sourceIds: ["AEPD_GENERAL", "AEPD_EXCLUSION", "AEPD_RIGHTS", "BOE_400"],
      ruleIds: ["CONSUMER-NO-BASIS"],
    };
  }

  if (target === "self-employed" && sector === "energy") {
    return {
      status: "red",
      title: "No llames todavía",
      summary: "Un autónomo suele ser persona física. Si la llamada pretende vender suministro eléctrico y no ha sido solicitada, aplica un régimen especialmente restrictivo.",
      reasons: [
        "El destinatario es una persona física que actúa como autónomo o profesional.",
        "La finalidad es comercial y energética.",
        "No consta una petición expresa de contacto.",
      ],
      checks: withCommonChecks([
        "Obtén una petición expresa, inequívoca e informada antes de llamar.",
        "Si el suministro está a nombre de una sociedad mercantil y no de la persona física, vuelve a evaluar el caso como empresa.",
      ]),
      sourceIds: ["ENERGY_RD88", "AEPD_B2B", "AEPD_RIGHTS", "BOE_400"],
      ruleIds: ["ENERGY-SELF-EMPLOYED-NO-REQUEST"],
    };
  }

  if (target === "self-employed") {
    const riskyOrigin = origin === "external-database" || origin === "other";
    return {
      status: riskyOrigin ? "amber" : "green",
      title: riskyOrigin ? "Revisa antes de llamar" : "Contacto profesional posible en principio",
      summary: riskyOrigin
        ? "El contacto a un profesional puede ser posible si está vinculado a su actividad, pero debes acreditar el origen y la finalidad profesional del dato."
        : "La AEPD admite en principio el contacto comercial a empresarios individuales o profesionales cuando se refiere a su actividad profesional.",
      reasons: [
        "El destinatario actúa como empresario individual o profesional.",
        "La oferta debe guardar relación con su actividad empresarial o profesional.",
        ...(riskyOrigin ? ["El origen del teléfono requiere una comprobación adicional de procedencia y licitud."] : []),
      ],
      checks: withCommonChecks([
        "Asegúrate de que llamas a la persona en su condición profesional y no a título particular.",
        "Documenta de dónde procede el teléfono y evita reutilizar datos recogidos para una finalidad incompatible.",
      ]),
      sourceIds: ["AEPD_B2B", "AEPD_RIGHTS", "AEPD_EXCLUSION", "BOE_400"],
      ruleIds: [riskyOrigin ? "SELF-EMPLOYED-ORIGIN-CHECK" : "SELF-EMPLOYED-PROFESSIONAL"],
    };
  }

  const companyRiskyOrigin = origin === "external-database" || origin === "other";
  return {
    status: companyRiskyOrigin ? "amber" : "green",
    title: companyRiskyOrigin ? "Revisa antes de llamar" : "Contacto B2B posible en principio",
    summary: companyRiskyOrigin
      ? "El contacto con una empresa puede ser posible, pero el origen del dato necesita trazabilidad suficiente."
      : "Los datos de contacto profesionales pueden utilizarse en principio para relacionarse con la entidad, siempre que no se utilicen para contactar a la persona a título privado.",
    reasons: [
      "El destinatario es una empresa o una persona de contacto de una entidad.",
      "La finalidad debe ser relacionarse con la entidad.",
      ...(companyRiskyOrigin ? ["El origen del teléfono no es suficientemente claro con la información aportada."] : []),
    ],
    checks: withCommonChecks([
      "Confirma que el teléfono se usa en un contexto profesional o corporativo.",
      "No reutilices el dato para dirigirte a la persona a título particular.",
      ...(origin === "referral" ? ["Identifica quién facilitó el contacto y por qué existe una expectativa razonable de contacto profesional."] : []),
    ]),
    sourceIds: ["AEPD_B2B", "AEPD_RIGHTS", "BOE_400"],
    ruleIds: [companyRiskyOrigin ? "COMPANY-ORIGIN-CHECK" : "COMPANY-B2B"],
  };
}
