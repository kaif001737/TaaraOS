import { createFileRoute } from '@tanstack/react-router';
import { CampaignReview } from '@/components/taaraa/exchange';
export const Route = createFileRoute('/campaigns/$id/review')({
  head: () => ({ meta: [
    { title: 'Review Campaign | TAARAA OS' },
    { name: 'description', content: 'Review Campaign in TAARAA OS, the out-of-home advertising operating system.' },
    { property: 'og:title', content: 'Review Campaign | TAARAA OS' },
    { property: 'og:description', content: 'Review Campaign in TAARAA OS, the out-of-home advertising operating system.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: CampaignReview,
});
