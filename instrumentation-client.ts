import posthog from "posthog-js";

const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
const host = process.env.NEXT_PUBLIC_POSTHOG_HOST;

if (token && host) {
  posthog.init(token, {
    api_host: host,
    persistence: "memory", // sin cookies ni localStorage: no hace falta banner de consentimiento
    defaults: "2026-05-30",
    autocapture: false,
    capture_pageview: true,
    capture_pageleave: true,
    capture_dead_clicks: false,
    capture_exceptions: false,
    capture_heatmaps: false,
    capture_performance: false,
    disable_session_recording: true,
    mask_all_element_attributes: true,
    mask_all_text: true,
    person_profiles: "identified_only",
    property_denylist: [
      "name",
      "email",
      "phone",
      "telefono",
      "nif",
      "cups",
      "message",
      "text",
    ],
  });

  window.posthog = posthog;
}
