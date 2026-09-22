import posthog from "posthog-js";

export type AnalyticsPayload = Record<string, string | number | boolean | undefined>;

export function track(event: string, data?: AnalyticsPayload) {
  if (typeof window === "undefined") return;
  if (!process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN) return;

  posthog.capture(event, data);
}
