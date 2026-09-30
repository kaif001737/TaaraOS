import { createFileRoute } from '@tanstack/react-router';
import { Bazaar } from '@/components/taaraa/market';
export const Route = createFileRoute('/ooh-bazaar/')({
  head: () => ({ meta: [
    { title: 'OOH Asset Store | TAARAA OS' },
    { name: 'description', content: 'OOH Asset Store in TAARAA OS, the out-of-home advertising operating system.' },
    { property: 'og:title', content: 'OOH Asset Store | TAARAA OS' },
    { property: 'og:description', content: 'OOH Asset Store in TAARAA OS, the out-of-home advertising operating system.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: Bazaar,
});
