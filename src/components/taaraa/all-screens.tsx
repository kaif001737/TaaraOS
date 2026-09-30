import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { LayoutGrid, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const modules = [
  ['OOH Ad Exchange', '/ooh-ad-exchange'],
  ['OOH Media Bazaar', '/ooh-media-bazaar'],
  ['OOH Partners', '/ooh-partners'],
  ['OOH Asset Store', '/ooh-bazaar'],
  ['Eye Store', '/eye-store'],
] as const;

export function AllScreensMenu() {
  const [open, setOpen] = useState(false);
  const [section, setSection] = useState('');
  const close = () => { setOpen(false); setSection(''); };
  return <div className="screens-control" onBlur={e => { if (!e.currentTarget.contains(e.relatedTarget as Node)) close(); }}>
    <Button type="button" variant="ghost" size="icon" className="screens-trigger" aria-label="All Screens" title="All Screens" aria-expanded={open} onClick={() => setOpen(!open)}><LayoutGrid size={19} /></Button>
    {open && <div className="screens-menu">
      <Link to="/home" onClick={close}>Agency</Link>
      <Link to="/brand" onClick={close}>Brand</Link>
      <Button variant="ghost" className="screens-section" aria-expanded={section === 'stakeholders'} onClick={() => setSection(section === 'stakeholders' ? '' : 'stakeholders')}>Stakeholders <ChevronDown size={14} /></Button>
      {section === 'stakeholders' && <div className="screens-submenu">
        <Link to="/partner-login/$role" params={{ role: 'installer' }} onClick={close}>Installer</Link>
        <Link to="/partner-login/$role" params={{ role: 'printer' }} onClick={close}>Printer</Link>
        <Link to="/partner-login/$role" params={{ role: 'logistics' }} onClick={close}>Logistic</Link>
        <Link to="/partner-login/$role" params={{ role: 'fabricator' }} onClick={close}>Fabricator</Link>
        <Link to="/partner-login/$role" params={{ role: 'proof-runner' }} onClick={close}>Proof Runner</Link>
      </div>}
      <Button variant="ghost" className="screens-section" aria-expanded={section === 'modules'} onClick={() => setSection(section === 'modules' ? '' : 'modules')}>All Modules <ChevronDown size={14} /></Button>
      {section === 'modules' && <div className="screens-submenu">{modules.map(([label, to]) => <Link key={to} to={to} onClick={close}>{label}</Link>)}</div>}
    </div>}
  </div>;
}