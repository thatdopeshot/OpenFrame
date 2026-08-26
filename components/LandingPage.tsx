'use client';

import Image from 'next/image';
import Link from 'next/link';

interface LandingPageProps {
  isLoggedIn: boolean;
}

/**
 * That Dope Shot client portal front door.
 *
 * This replaced OpenFrame's marketing site wholesale. Clients arrive here only
 * when they hit the bare domain instead of a share link, so the job is to say
 * where they are and get them moving: an existing client goes to their link,
 * Mike signs in. Nothing is sold on this page.
 */
export function LandingPage({ isLoggedIn }: LandingPageProps) {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <div className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="w-full max-w-md text-center">
          <Image
            src="/logo.png"
            alt="That Dope Shot"
            width={520}
            height={140}
            priority
            className="h-24 w-auto mx-auto mb-10 dark:hidden"
          />
          <Image
            src="/logo-white.png"
            alt="That Dope Shot"
            width={520}
            height={140}
            priority
            className="h-24 w-auto mx-auto mb-10 hidden dark:block"
          />

          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-4">
            Client review portal
          </h1>
          <p className="text-muted-foreground leading-relaxed mb-10">
            Watch your video, leave notes right on the frame, and download your
            finished files. If you are a client, use the link we sent you.
          </p>

          <Link
            href={isLoggedIn ? '/dashboard' : '/login'}
            className="inline-flex items-center justify-center w-full rounded-md bg-primary px-6 py-3 text-primary-foreground font-medium hover:opacity-90 transition-opacity"
          >
            {isLoggedIn ? 'Go to dashboard' : 'Sign in'}
          </Link>

          <p className="text-sm text-muted-foreground mt-8">
            Lost your link?{' '}
            <a
              href="mailto:mike@dopeshotuniversity.com"
              className="underline hover:text-foreground"
            >
              Email us
            </a>{' '}
            and we will resend it.
          </p>
        </div>
      </div>

      <footer className="border-t border-border py-6 px-6">
        <p className="text-xs text-muted-foreground text-center">
          &copy; {new Date().getFullYear()} That Dope Shot &middot;{' '}
          <a href="https://thatdopeshot.com" className="hover:text-foreground">
            thatdopeshot.com
          </a>
        </p>
      </footer>
    </main>
  );
}
