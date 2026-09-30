import { createFileRoute } from '@tanstack/react-router';
import { Profile } from '@/components/taaraa/auth';
export const Route = createFileRoute('/agency/profile')({
  head: () => ({ meta: [
    { title: 'Agency Profile | TAARAA OS' },
    { name: 'description', content: 'Agency Profile in TAARAA OS, the out-of-home advertising operating system.' },
    { property: 'og:title', content: 'Agency Profile | TAARAA OS' },
    { property: 'og:description', content: 'Agency Profile in TAARAA OS, the out-of-home advertising operating system.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: Profile,
});
