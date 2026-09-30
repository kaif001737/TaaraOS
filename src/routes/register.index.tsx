import { createFileRoute } from '@tanstack/react-router';
import { Register } from '@/components/taaraa/auth';
export const Route = createFileRoute('/register/')({
  head: () => ({ meta: [
    { title: 'Register Agency | TAARAA OS' },
    { name: 'description', content: 'Register Agency in TAARAA OS, the out-of-home advertising operating system.' },
    { property: 'og:title', content: 'Register Agency | TAARAA OS' },
    { property: 'og:description', content: 'Register Agency in TAARAA OS, the out-of-home advertising operating system.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: Register,
});
