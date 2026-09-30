import { createFileRoute } from '@tanstack/react-router';
import { EyeStore } from '@/components/taaraa/market';
export const Route = createFileRoute('/eye-store')({
  head: () => ({ meta: [
    { title: 'Eye Store | TAARAA OS' },
    { name: 'description', content: 'Eye Store in TAARAA OS, the out-of-home advertising operating system.' },
    { property: 'og:title', content: 'Eye Store | TAARAA OS' },
    { property: 'og:description', content: 'Eye Store in TAARAA OS, the out-of-home advertising operating system.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: EyeStore,
});
