// Editorial dates use the firm's timezone explicitly, regardless of the server timezone.
export const BLOG_PUBLICATION_SCHEDULE: Record<string, string> = {
  'pard-colombia-separacion-familiar-defensa': '2026-11-06T08:00:00-05:00',
  'divorcio-unilateral-colombia': '2026-11-13T08:00:00-05:00',
};

export function isBlogPublished(slug: string, now = Date.now()): boolean {
  const publicationDate = BLOG_PUBLICATION_SCHEDULE[slug];
  return !publicationDate || Date.parse(publicationDate) <= now;
}
