import { createFileRoute } from '@tanstack/react-router';
import { BrandReview } from '@/components/taaraa/portals';
export const Route = createFileRoute('/brand')({
  head: () => ({ meta: [
    { title: 'Brand Review | TAARAA OS' },
    { name: 'description', content: 'Brand Review in TAARAA OS, the out-of-home advertising operating system.' },
    { property: 'og:title', content: 'Brand Review | TAARAA OS' },
    { property: 'og:description', content: 'Brand Review in TAARAA OS, the out-of-home advertising operating system.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: BrandReview,
});
