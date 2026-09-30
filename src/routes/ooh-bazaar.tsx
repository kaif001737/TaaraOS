import { createFileRoute, Outlet } from '@tanstack/react-router';
export const Route = createFileRoute('/ooh-bazaar')({ component: () => <Outlet /> });
