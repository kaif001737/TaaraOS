import { createFileRoute } from '@tanstack/react-router';
import { Exchange } from '@/components/taaraa/exchange';
export const Route = createFileRoute('/ooh-ad-exchange')({
  head: () => ({ meta: [
    { title: 'OOH Ad Exchange | TAARAA OS' },
    { name: 'description', content: 'OOH Ad Exchange in TAARAA OS, the out-of-home advertising operating system.' },
    { property: 'og:title', content: 'OOH Ad Exchange | TAARAA OS' },
    { property: 'og:description', content: 'OOH Ad Exchange in TAARAA OS, the out-of-home advertising operating system.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: Exchange,
});
