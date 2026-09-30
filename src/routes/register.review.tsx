import { createFileRoute } from '@tanstack/react-router';
import { Review } from '@/components/taaraa/auth';
export const Route = createFileRoute('/register/review')({
  head: () => ({ meta: [
    { title: 'Review Agency | TAARAA OS' },
    { name: 'description', content: 'Review Agency in TAARAA OS, the out-of-home advertising operating system.' },
    { property: 'og:title', content: 'Review Agency | TAARAA OS' },
    { property: 'og:description', content: 'Review Agency in TAARAA OS, the out-of-home advertising operating system.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: Review,
});
