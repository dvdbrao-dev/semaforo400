export type AnalyticsPayload = Record<string, string | number | boolean | undefined>;
export type AnalyticsEventName =
  | "cta_try_click"
  | "cta_sources_click"
  | "question_answered"
  | "tool_result"
  | "tool_reset"
  | "source_click"
  | "promo_click";

export function track(event: AnalyticsEventName, data?: AnalyticsPayload) {
  if (typeof window === "undefined") return;
  if (!process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN) return;

  window.posthog?.capture(event, data);
}
