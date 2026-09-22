export type Target = "consumer" | "self-employed" | "company";
export type Sector = "energy" | "telecom" | "other";
export type Origin =
  | "request"
  | "current-client"
  | "former-client"
  | "public-business-web"
  | "referral"
  | "external-database"
  | "other";

export type TrafficStatus = "green" | "amber" | "red";

export type LeadContext = {
  target: Target;
  sector: Sector;
  origin: Origin;
  requestedContact: boolean;
  previousRelationship: boolean;
};

export type LegalSourceId =
  | "AEPD_GENERAL"
  | "AEPD_B2B"
  | "AEPD_RIGHTS"
  | "AEPD_EXCLUSION"
  | "ENERGY_RD88"
  | "BOE_400"
  | "CNMC_400";

export type Decision = {
  status: TrafficStatus;
  title: string;
  summary: string;
  reasons: string[];
  checks: string[];
  sourceIds: LegalSourceId[];
  ruleIds: string[];
};
