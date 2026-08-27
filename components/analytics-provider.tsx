'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import posthog from 'posthog-js';

/**
 * PostHog for the review portal (TDS Photography org, "That Dope Shot Website"
 * project — the same one thatdopeshot.com reports into, since this is
 * photography-business traffic).
 *
 * Clients never log in, so "who was here" is answered by WHICH hub or project
 * they came through, not by identity: every event carries `client_hub` when the
 * visit entered via /c/<slug>, and session replay shows what they actually did.
 */
const KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const HOST = 'https://us.i.posthog.com';

let initialized = false;

export function AnalyticsProvider() {
  const pathname = usePathname();

  useEffect(() => {
    if (!KEY || initialized) return;
    initialized = true;
    posthog.init(KEY, {
      api_host: HOST,
      capture_pageview: false, // captured manually below so SPA routes count
      capture_pageleave: true,
      session_recording: { maskAllInputs: true },
      persistence: 'localStorage+cookie',
    });
  }, []);

  useEffect(() => {
    if (!KEY || !pathname) return;
    // Remember which client's hub this visitor came through, then stamp every
    // later event (plays, downloads, project views) with it.
    const hubMatch = pathname.match(/^\/c\/([^/]+)/);
    if (hubMatch) {
      posthog.register({ client_hub: hubMatch[1] });
    }
    posthog.capture('$pageview');
  }, [pathname]);

  return null;
}
