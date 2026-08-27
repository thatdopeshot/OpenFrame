'use client';

import { useState } from 'react';
import { Check, Copy, Link2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

/**
 * Shows the workspace's client hub link (/c/<slug>) on the workspace page so
 * it can always be found and re-sent. Before this, the link existed only in
 * whatever chat or note it was first shared in.
 */
export function ClientHubLinkCard({
  slug,
  publicProjectCount,
}: {
  slug: string;
  publicProjectCount: number;
}) {
  const [copied, setCopied] = useState(false);
  const url =
    typeof window !== 'undefined'
      ? `${window.location.origin}/c/${slug}`
      : `/c/${slug}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard can be unavailable (permissions); the URL is visible to
      // select by hand, so failing silently is fine.
    }
  };

  return (
    <Card className="mb-8 border-primary/30">
      <CardContent className="py-4 flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <Link2 className="h-4 w-4 text-primary flex-none" />
          <div className="min-w-0">
            <p className="text-sm font-medium">Client link</p>
            <p className="text-sm text-muted-foreground truncate">{url}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground whitespace-nowrap">
            {publicProjectCount > 0
              ? `shows ${publicProjectCount} public ${publicProjectCount === 1 ? 'project' : 'projects'}`
              : 'no public projects yet — link shows nothing'}
          </span>
          <Button size="sm" variant="outline" onClick={copy}>
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 mr-1.5" /> Copied
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5 mr-1.5" /> Copy link
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
