import { createFileRoute } from '@tanstack/react-router';
import { RegisterSuccess } from '@/components/taaraa/auth';
export const Route = createFileRoute('/register/success')({
  head: () => ({ meta: [
    { title: 'Agency Account Created | TAARAA OS' },
    { name: 'description', content: 'Agency Account Created in TAARAA OS, the out-of-home advertising operating system.' },
    { property: 'og:title', content: 'Agency Account Created | TAARAA OS' },
    { property: 'og:description', content: 'Agency Account Created in TAARAA OS, the out-of-home advertising operating system.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: RegisterSuccess,
});
