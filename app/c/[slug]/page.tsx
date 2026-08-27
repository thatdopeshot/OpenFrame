import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

/**
 * Client hub: ONE link that opens everything we've delivered to a client.
 *
 * The app's share links are per-video and projects are shared by making them
 * PUBLIC, which left multi-year clients holding one link per year. This page
 * closes that gap without touching the access model: it lists only the
 * PUBLIC projects of one workspace, found by an unguessable slug. Private
 * projects in the same workspace stay invisible, so per-year access control
 * still works by flipping a project's visibility.
 */
export default async function ClientHubPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const workspace = await db.workspace.findUnique({
    where: { slug },
    select: {
      name: true,
      projects: {
        where: { visibility: 'PUBLIC' },
        orderBy: { name: 'desc' },
        select: {
          id: true,
          name: true,
          videos: {
            orderBy: { position: 'asc' },
            select: {
              id: true,
              versions: {
                orderBy: { versionNumber: 'desc' },
                take: 1,
                select: { thumbnailUrl: true },
              },
            },
          },
        },
      },
    },
  });

  if (!workspace || workspace.projects.length === 0) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-6 py-14">
        <div className="mb-12 text-center">
          <Image
            src="/logo.png"
            alt="TDS Media"
            width={520}
            height={140}
            priority
            className="h-16 w-auto mx-auto mb-8 dark:hidden"
          />
          <Image
            src="/logo-white.png"
            alt="TDS Media"
            width={520}
            height={140}
            priority
            className="h-16 w-auto mx-auto mb-8 hidden dark:block"
          />
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            {workspace.name}
          </h1>
          <p className="text-muted-foreground mt-3">
            Your videos, ready to watch and download. Pick a collection below.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {workspace.projects.map((project) => {
            const thumb = project.videos.find(
              (v) => v.versions[0]?.thumbnailUrl
            )?.versions[0]?.thumbnailUrl;
            return (
              <Link
                key={project.id}
                href={`/projects/${project.id}`}
                className="group rounded-lg border border-border bg-card overflow-hidden hover:border-primary transition-colors"
              >
                <div className="aspect-video bg-muted relative">
                  {thumb ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={thumb}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  ) : null}
                </div>
                <div className="p-5 flex items-baseline justify-between gap-3">
                  <span className="font-medium text-lg group-hover:text-primary transition-colors">
                    {project.name}
                  </span>
                  <span className="text-sm text-muted-foreground whitespace-nowrap">
                    {project.videos.length}{' '}
                    {project.videos.length === 1 ? 'video' : 'videos'}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-14">
          Questions?{' '}
          <a href="mailto:mike@dopeshotuniversity.com" className="underline hover:text-foreground">
            Email us
          </a>
          .
        </p>
      </div>
    </main>
  );
}
