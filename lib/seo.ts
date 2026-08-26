const FALLBACK_SITE_URL = 'https://review.thatdopeshot.com';

function normalizeSiteUrl(rawUrl: string | undefined): string {
  if (!rawUrl) {
    return FALLBACK_SITE_URL;
  }

  const trimmed = rawUrl.trim();

  if (!trimmed) {
    return FALLBACK_SITE_URL;
  }

  const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;

  try {
    return new URL(withProtocol).origin;
  } catch {
    return FALLBACK_SITE_URL;
  }
}

export function getSiteUrl(): string {
  return normalizeSiteUrl(process.env.NEXT_PUBLIC_APP_URL ?? process.env.NEXTAUTH_URL);
}

export const seoConfig = {
  name: 'TDS Media',
  title: 'Client Review Portal',
  description:
    'Review and download your photos and video from TDS Media. Leave feedback right on the frame.',
  keywords: [
    'that dope shot',
    'client review portal',
    'video review',
    'photo and video delivery',
    'branding photography',
    'washington dc photographer',
  ],
  url: getSiteUrl(),
  ogImage: '/meta.webp',
  logoPath: '/icon.svg',
  logo: '/icon.svg?v=2',
  githubUrl: 'https://thatdopeshot.com',
} as const;
