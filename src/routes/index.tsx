import { createFileRoute } from '@tanstack/react-router';
import { Welcome } from '@/components/taaraa/auth';
export const Route = createFileRoute('/')({
  head: () => ({ meta: [
    { title: 'Agency Control Center | TAARAA OS' },
    { name: 'description', content: 'Agency Control Center in TAARAA OS, the out-of-home advertising operating system.' },
    { property: 'og:title', content: 'Agency Control Center | TAARAA OS' },
    { property: 'og:description', content: 'Agency Control Center in TAARAA OS, the out-of-home advertising operating system.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: Welcome,
});
