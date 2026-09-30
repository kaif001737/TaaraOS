import { createFileRoute } from '@tanstack/react-router';
import { Home } from '@/components/taaraa/market';
export const Route = createFileRoute('/home')({
  head: () => ({ meta: [
    { title: 'Home | TAARAA OS' },
    { name: 'description', content: 'Home in TAARAA OS, the out-of-home advertising operating system.' },
    { property: 'og:title', content: 'Home | TAARAA OS' },
    { property: 'og:description', content: 'Home in TAARAA OS, the out-of-home advertising operating system.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: Home,
});
