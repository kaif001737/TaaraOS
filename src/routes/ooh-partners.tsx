import { createFileRoute } from '@tanstack/react-router';
import { Partners } from '@/components/taaraa/market';
export const Route = createFileRoute('/ooh-partners')({
  head: () => ({ meta: [
    { title: 'OOH Partners | TAARAA OS' },
    { name: 'description', content: 'OOH Partners in TAARAA OS, the out-of-home advertising operating system.' },
    { property: 'og:title', content: 'OOH Partners | TAARAA OS' },
    { property: 'og:description', content: 'OOH Partners in TAARAA OS, the out-of-home advertising operating system.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: Partners,
});
