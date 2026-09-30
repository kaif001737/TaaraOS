import { Link, useNavigate } from '@tanstack/react-router';
import { Bell, Search, Wallet, X, ArrowRight, Plus } from 'lucide-react';
import { useMemo, useRef, useState, useEffect } from 'react';
import { useDemo, money, campaignJobCode } from '@/lib/demo';

type Hit = { title: string; sub: string; kind: string; to: string; params?: Record<string, string>; score: number };

const pages = [
  { title: 'OOH Ad Exchange', sub: 'Brands, campaigns, approvals, live monitoring', to: '/ooh-ad-exchange', k: 'campaign brand create ad exchange approval live' },
  { title: 'OOH Media Bazaar', sub: 'Stakeholder and partner market', to: '/ooh-media-bazaar', k: 'market bazaar media' },
  { title: 'OOH Partners', sub: 'Fabricators, printers, logistics, installers', to: '/ooh-partners', k: 'partner fabricator printer logistics installer vendor' },
  { title: 'OOH Asset Store', sub: 'Buy and sell physical assets', to: '/ooh-bazaar', k: 'asset billboard unipole buy sell hoarding' },
  { title: 'List New Asset', sub: 'Publish an asset for sale', to: '/ooh-bazaar/list', k: 'list sell publish asset' },
  { title: 'Eye Store', sub: 'iStake, iBox, iTag, iSticker products', to: '/eye-store', k: 'eye store product cart istake ibox itag isticker' },
  { title: 'Agency Profile', sub: 'Your agency details and code', to: '/agency/profile', k: 'agency profile account code gst' },
];
const products = ['iStake™', 'iBox™', 'iTag™', 'iSticker™'];

function score(q: string, text: string, title: string) {
  const t = text.toLowerCase(), ti = title.toLowerCase();
  const words = q.toLowerCase().split(/\s+/).filter(Boolean);
  if (!words.length) return 0;
  let s = 0;
  for (const w of words) {
    if (ti.startsWith(w)) s += 10; else if (ti.includes(w)) s += 6; else if (t.includes(w)) s += 3; else return 0;
  }
  return s;
}

export function useSearch(q: string) {
  const { data } = useDemo();
  return useMemo(() => {
    if (!q.trim()) return [] as Hit[];
    const hits: Hit[] = [];
    const push = (h: Omit<Hit, 'score'>, text: string) => { const s = score(q, text, h.title); if (s) hits.push({ ...h, score: s }); };
    pages.forEach(p => push({ title: p.title, sub: p.sub, kind: 'Page', to: p.to }, `${p.title} ${p.sub} ${p.k}`));
    data.campaigns.forEach(c => push({ title: c.name, sub: `Job Code: ${campaignJobCode(c)} · ${c.brand} · ${c.location} · ${c.status}`, kind: 'Campaign', to: ['Live', 'Completed'].includes(c.status) ? '/campaigns/$id/monitor' : '/campaigns/$id/review', params: { id: c.id } }, `${c.name} ${campaignJobCode(c)} ${c.brand} ${c.location} ${c.channel} ${c.status} ${c.id}`));
    data.brands.forEach(b => push({ title: b.name, sub: `Brand · ${b.contact ?? ''} · ${b.email ?? ''}`, kind: 'Brand', to: '/ooh-ad-exchange' }, Object.values(b).join(' ')));
    data.partners.forEach(p => push({ title: p.name, sub: `${p.category ?? ''} · ${p.location ?? ''} · ${p.rate ?? ''}`, kind: 'Partner', to: '/ooh-partners' }, Object.values(p).join(' ')));
    data.assets.forEach(a => push({ title: `${a.name} (${a.id})`, sub: `${a.type ?? ''} · ${a.location ?? ''} · ${a.rate ?? ''}`, kind: 'Asset', to: '/ooh-bazaar' }, Object.values(a).join(' ')));
    data.orders.forEach(o => push({ title: `Order ${o.id}`, sub: `${o.name} · ${o.amount ?? ''} · ${o.status ?? ''}`, kind: 'Order', to: '/home' }, Object.values(o).join(' ')));
    products.forEach(p => push({ title: p, sub: 'Eye Store product', kind: 'Product', to: '/eye-store' }, `${p} eye store product`));
    return hits.sort((a, b) => b.score - a.score).slice(0, 12);
  }, [q, data]);
}

export function GlobalSearch({ placeholder = 'Search campaigns, assets, stakeholders or products', autoFocus = false, onPick }: { placeholder?: string; autoFocus?: boolean; onPick?: () => void }) {
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const hits = useSearch(q);
  const navigate = useNavigate();
  const go = (h: Hit) => { setOpen(false); setQ(''); onPick?.(); navigate({ to: h.to as '/home', params: h.params as never }); };
  return <div className="gsearch" onBlur={e => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false); }}>
    <div className="search-field"><Search size={16} /><input aria-label="Search TAARAA OS" autoFocus={autoFocus} value={q} placeholder={placeholder}
      onChange={e => { setQ(e.target.value); setOpen(true); setActive(0); }} onFocus={() => setOpen(true)}
      onKeyDown={e => { if (e.key === 'ArrowDown') { e.preventDefault(); setActive(a => Math.min(a + 1, hits.length - 1)); } else if (e.key === 'ArrowUp') { e.preventDefault(); setActive(a => Math.max(a - 1, 0)); } else if (e.key === 'Enter' && hits[active]) go(hits[active]); else if (e.key === 'Escape') setOpen(false); }} />
      {q && <button type="button" className="icon-button" aria-label="Clear search" onClick={() => setQ('')}><X size={14} /></button>}</div>
    {open && q.trim() && <div className="gsearch-results" role="listbox">
      <div className="gsearch-meta">About {hits.length} result{hits.length === 1 ? '' : 's'} for “{q}”</div>
      {hits.map((h, i) => <button type="button" key={h.kind + h.title + i} className={i === active ? 'gsearch-hit active' : 'gsearch-hit'} onMouseEnter={() => setActive(i)} onClick={() => go(h)}>
        <span className="gsearch-kind">{h.kind}</span><span className="gsearch-text"><strong>{h.title}</strong><small>{h.sub}</small></span><ArrowRight size={14} /></button>)}
      {!hits.length && <p className="gsearch-empty">No results. Try a brand, city, asset code or product name.</p>}
    </div>}
  </div>;
}

export function SearchPopover({ onClose }: { onClose: () => void }) {
  return <div className="nav-panel nav-search"><GlobalSearch autoFocus onPick={onClose} placeholder="Search anything in TAARAA OS" /></div>;
}

export function NotificationsPanel({ onClose }: { onClose: () => void }) {
  const { data } = useDemo();
  const [read, setRead] = useState<string[]>(() => []);
  useEffect(() => { try { setRead(JSON.parse(localStorage.getItem('taaraa-read') || '[]')); } catch { /* ignore */ } }, []);
  const items = [
    ...data.campaigns.map(c => ({ id: 'c' + c.id + c.status, title: `${c.name}`, sub: `Job Code: ${campaignJobCode(c)} · Status: ${c.status}`, to: ['Live', 'Completed'].includes(c.status) ? '/campaigns/$id/monitor' : '/campaigns/$id/review', params: { id: c.id } })),
    ...data.orders.map(o => ({ id: 'o' + o.id, title: `Order ${o.id} confirmed`, sub: `${o.name} · ${o.amount}`, to: '/home', params: {} })),
  ];
  const markAll = () => { const ids = items.map(i => i.id); setRead(ids); localStorage.setItem('taaraa-read', JSON.stringify(ids)); };
  return <div className="nav-panel"><div className="nav-panel-head"><strong>Notifications</strong><button onClick={markAll}>Mark all read</button></div>
    {items.map(i => <Link key={i.id} to={i.to as '/home'} params={i.params as never} className={read.includes(i.id) ? 'notif' : 'notif unread'} onClick={() => { const r = [...read, i.id]; setRead(r); localStorage.setItem('taaraa-read', JSON.stringify(r)); onClose(); }}><strong>{i.title}</strong><small>{i.sub}</small></Link>)}
    {!items.length && <p className="gsearch-empty">You're all caught up.</p>}</div>;
}

export function useUnread() {
  const { data } = useDemo();
  const [n, setN] = useState(0);
  useEffect(() => { let read: string[] = []; try { read = JSON.parse(localStorage.getItem('taaraa-read') || '[]'); } catch { /* ignore */ }
    const ids = [...data.campaigns.map(c => 'c' + c.id + c.status), ...data.orders.map(o => 'o' + o.id)]; setN(ids.filter(i => !read.includes(i)).length); });
  return n;
}

export function WalletPanel() {
  const { data, update } = useDemo();
  const [amt, setAmt] = useState('');
  const ref = useRef<HTMLInputElement>(null);
  const spent = data.orders.reduce((s, o) => s + Number(String(o.amount || 0).replace(/[^0-9.]/g, '') || 0), 0);
  const balance = (data.wallet ?? 500000) - spent;
  return <div className="nav-panel"><div className="nav-panel-head"><strong>CBDC Wallete</strong><small>Demo balance</small></div>
    <div className="wallet-balance"><span>Available</span><strong>{money(balance)}</strong></div>
    <form className="wallet-add" onSubmit={e => { e.preventDefault(); const v = Number(amt); if (!v) { ref.current?.focus(); return; } update({ wallet: (data.wallet ?? 500000) + v }); setAmt(''); }}>
      <input ref={ref} type="number" min="1" placeholder="Amount (₹)" value={amt} onChange={e => setAmt(e.target.value)} /><button type="submit"><Plus size={14} /> Add (demo)</button></form>
    <div className="nav-panel-sub">Recent transactions</div>
    {data.orders.slice(0, 5).map(o => <div className="notif" key={o.id}><strong>−{o.amount}</strong><small>{o.name} · {o.date}</small></div>)}
    {!data.orders.length && <p className="gsearch-empty">No transactions yet.</p>}
    <p className="gsearch-empty">Top-ups are simulated — no real money is moved.</p></div>;
}

export const NavIcons = { Bell, Wallet, Search };
