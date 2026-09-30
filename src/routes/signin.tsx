import { createFileRoute } from '@tanstack/react-router';
import { SignIn } from '@/components/taaraa/auth';
export const Route = createFileRoute('/signin')({
  head: () => ({ meta: [
    { title: 'Sign In | TAARAA OS' },
    { name: 'description', content: 'Sign In in TAARAA OS, the out-of-home advertising operating system.' },
    { property: 'og:title', content: 'Sign In | TAARAA OS' },
    { property: 'og:description', content: 'Sign In in TAARAA OS, the out-of-home advertising operating system.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: SignIn,
});
