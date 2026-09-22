import type { LegalSourceId } from "@/engine/types";

export type LegalSource = {
  id: LegalSourceId;
  authority: string;
  title: string;
  url: string;
  note: string;
};

export const LEGAL_SOURCES: Record<LegalSourceId, LegalSource> = {
  AEPD_GENERAL: {
    id: "AEPD_GENERAL",
    authority: "AEPD",
    title: "Llamadas no solicitadas con fines comerciales",
    url: "https://www.aepd.es/preguntas-frecuentes/5-publicidad-no-deseada/FAQ-0503-llamadas-no-solicitadas-con-fines-comerciales-con-intervencion-humana",
    note: "Consentimiento previo o una base jurídica válida, con condiciones estrictas para el interés legítimo.",
  },
  AEPD_B2B: {
    id: "AEPD_B2B",
    authority: "AEPD",
    title: "Empresarios individuales y profesionales liberales",
    url: "https://www.aepd.es/preguntas-frecuentes/5-publicidad-no-deseada/FAQ-0506-recepcion-de-llamadas-publicitarias-si-soy-un-empresario-individual-o-un-profesional-liberal",
    note: "El contacto debe referirse a la actividad profesional o a la relación con la entidad, no a la persona a título privado.",
  },
  AEPD_RIGHTS: {
    id: "AEPD_RIGHTS",
    authority: "AEPD",
    title: "Garantías al realizar una llamada comercial",
    url: "https://www.aepd.es/preguntas-frecuentes/5-publicidad-no-deseada/FAQ-0507-como-se-garantizan-mis-derechos-de-proteccion-de-datos-cuando-recibo-una-llamada",
    note: "Identificación, finalidad comercial, oposición y garantías de trazabilidad al inicio de la llamada.",
  },
  AEPD_EXCLUSION: {
    id: "AEPD_EXCLUSION",
    authority: "AEPD",
    title: "Sistemas de exclusión publicitaria",
    url: "https://www.aepd.es/preguntas-frecuentes/5-publicidad-no-deseada/FAQ-0505-estoy-inscrito-en-un-sistema-de-exclusion-publicitaria-y-sigo-recibiendo-llamadas",
    note: "Las campañas deben comprobar los sistemas de exclusión cuando corresponda, salvo consentimiento específico aplicable.",
  },
  ENERGY_RD88: {
    id: "ENERGY_RD88",
    authority: "BOE",
    title: "Real Decreto 88/2026 — comercialización de energía eléctrica",
    url: "https://www.boe.es/buscar/act.php?id=BOE-A-2026-3212",
    note: "Para consumidores persona física, la venta telefónica energética no solicitada tiene requisitos especialmente restrictivos.",
  },
  CNMC_ENERGY_2026: {
    id: "CNMC_ENERGY_2026",
    authority: "CNMC",
    title: "Obligaciones de las comercializadoras eléctricas en contratación telefónica",
    url: "https://www.cnmc.es/prensa/consulta-obligaciones-electricidad-20260610",
    note: "La CNMC recuerda que las comercializadoras no pueden realizar llamadas comerciales o de contratación no solicitadas sin una petición expresa, inequívoca e informada del consumidor.",
  },
  BOE_400: {
    id: "BOE_400",
    authority: "BOE",
    title: "Resolución de 14 de abril de 2026 — numeración 400",
    url: "https://www.boe.es/buscar/act.php?id=BOE-A-2026-8409",
    note: "El rango 400 se atribuye a llamadas comerciales y debe estar plenamente operativo seis meses después de la entrada en vigor de la resolución.",
  },
  CNMC_400: {
    id: "CNMC_400",
    authority: "CNMC",
    title: "Asignación inicial de numeración 400",
    url: "https://www.cnmc.es/sectores-que-regulamos/telecomunicaciones/resoluciones-de-registro-de-numeracion-en-el-ambito-telecomunicaciones",
    note: "La CNMC gestiona la asignación del rango 400 a operadores.",
  },
};

export const SOURCE_LIST = Object.values(LEGAL_SOURCES);
