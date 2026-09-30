import { createFileRoute } from '@tanstack/react-router';
import { ListAsset } from '@/components/taaraa/market';
export const Route = createFileRoute('/ooh-bazaar/list')({
  head: () => ({ meta: [
    { title: 'List New Asset | TAARAA OS' },
    { name: 'description', content: 'List New Asset in TAARAA OS, the out-of-home advertising operating system.' },
    { property: 'og:title', content: 'List New Asset | TAARAA OS' },
    { property: 'og:description', content: 'List New Asset in TAARAA OS, the out-of-home advertising operating system.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: ListAsset,
});
