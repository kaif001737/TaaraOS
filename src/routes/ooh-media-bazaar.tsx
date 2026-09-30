import { createFileRoute } from '@tanstack/react-router';
import { MediaBazaar } from '@/components/taaraa/market';
export const Route = createFileRoute('/ooh-media-bazaar')({
  head: () => ({ meta: [
    { title: 'OOH Media Bazaar | TAARAA OS' },
    { name: 'description', content: 'OOH Media Bazaar in TAARAA OS, the out-of-home advertising operating system.' },
    { property: 'og:title', content: 'OOH Media Bazaar | TAARAA OS' },
    { property: 'og:description', content: 'OOH Media Bazaar in TAARAA OS, the out-of-home advertising operating system.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: MediaBazaar,
});
