import { createFileRoute } from '@tanstack/react-router';
import { MonitorPage } from '@/components/taaraa/exchange';
export const Route = createFileRoute('/campaigns/$id/monitor')({
  head: () => ({ meta: [
    { title: 'Campaign Monitor | TAARAA OS' },
    { name: 'description', content: 'Campaign Monitor in TAARAA OS, the out-of-home advertising operating system.' },
    { property: 'og:title', content: 'Campaign Monitor | TAARAA OS' },
    { property: 'og:description', content: 'Campaign Monitor in TAARAA OS, the out-of-home advertising operating system.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: MonitorPage,
});
