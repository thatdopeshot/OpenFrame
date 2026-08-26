import Link from 'next/link';
import { Video } from 'lucide-react';
import { seoConfig } from '@/lib/seo';

export function MarketingFooter() {
  return (
    <footer className="border-t border-border bg-background px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-[1200px] gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <div className="flex items-start gap-2">
          <Video className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <div className="flex flex-col gap-1">
            <span className="font-mono text-xs text-muted-foreground">
              © 2026 IPEK TECH LLC. All rights reserved.
            </span>
            <span className="font-mono text-xs text-muted-foreground">
              30 North Gould Street, Suite N, Sheridan, WY 82801, United States
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            Legal
          </span>
          <div className="flex flex-col gap-1.5">
            <a
              href="mailto:mike@dopeshotuniversity.com"
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              mike@dopeshotuniversity.com
            </a>
            <a
              href={seoConfig.githubUrl}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
