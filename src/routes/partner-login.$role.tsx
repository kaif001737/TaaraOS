import { createFileRoute } from '@tanstack/react-router';
import { PartnerLogin } from '@/components/taaraa/portals';
export const Route = createFileRoute('/partner-login/$role')({
  head: () => ({ meta: [
    { title: 'Stakeholder Login | TAARAA OS' },
    { name: 'description', content: 'Stakeholder Login in TAARAA OS, the out-of-home advertising operating system.' },
    { property: 'og:title', content: 'Stakeholder Login | TAARAA OS' },
    { property: 'og:description', content: 'Stakeholder Login in TAARAA OS, the out-of-home advertising operating system.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: PartnerLogin,
});
