import Link from 'next/link';
import { LoginForm, LoginFormSkeleton } from './login-form';
import { Suspense } from 'react';

export default function LoginPage() {
  const googleEnabled = Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET);
  const githubEnabled = Boolean(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-2 mb-8">
          <span className="inline-flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="TDS Media" className="h-14 w-auto dark:hidden" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-white.png" alt="TDS Media" className="h-14 w-auto hidden dark:block" />
          </span>
        </Link>

        <Suspense fallback={<LoginFormSkeleton />}>
          <LoginForm googleEnabled={googleEnabled} githubEnabled={githubEnabled} />
        </Suspense>

        <p className="text-center text-xs text-muted-foreground mt-4">
          By continuing, you agree to our{' '}
          Terms of Service{' '}
          and{' '}
          Privacy Policy
        </p>
      </div>
    </div>
  );
}
