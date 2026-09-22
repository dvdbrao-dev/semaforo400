export type AnalyticsPayload = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    umami?: {
      track: (event: string, data?: AnalyticsPayload) => void;
    };
  }
}

export function track(event: string, data?: AnalyticsPayload) {
  if (typeof window === "undefined") return;
  window.umami?.track(event, data);
}
