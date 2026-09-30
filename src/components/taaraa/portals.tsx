import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from '@tanstack/react-router';
import { ArrowRight, Check, ShieldCheck, Radio, Printer, Truck, HardHat, BarChart3, X, Monitor, MapPin, CalendarDays, Upload } from 'lucide-react';
import billboard from '@/assets/billboard.jpg';
import { useDemo, money, campaignJobCode } from '@/lib/demo';
import { Button, Page, Status, Success, Modal, PaymentChoices } from './common';

export const roles: Record<string, { label: string; prefix: string; desc: string }> = {
  installer: { label: 'Installer', prefix: 'INS', desc: 'Install boards and upload installation proof.' },
  printer: { label: 'Printer', prefix: 'PRN', desc: 'Receive print jobs and update printing status.' },
  logistics: { label: 'Logistics', prefix: 'LOG', desc: 'Manage pickups and deliveries to sites.' },
  fabricator: { label: 'Fabricator', prefix: 'FAB', desc: 'Handle structure fabrication work orders.' },
  'proof-runner': { label: 'Proof Runner', prefix: 'PRF', desc: 'Capture daily campaign proof photos on site.' },
};

const nizam = (prefix: string) => `NZM-${prefix}-${Math.floor(100000 + Math.random() * 900000)}`;

export function PartnerLogin() {
  const { role } = useParams({ from: '/partner-login/$role' });
  const r = roles[role];
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (!r) return;
    const key = `taaraa-nizam-${role}`;
    const saved = localStorage.getItem(key);
    const v = saved || nizam(r.prefix);
    localStorage.setItem(key, v);
    setId(v);
  }, [role, r]);
  if (!r) return <Page title="Portal not found"><p className="empty">This stakeholder portal does not exist.</p></Page>;
  return <Page title={`${r.label} Login`}><div className="panel narrow center-text">
    <span className="eyebrow">{r.label.toUpperCase()} PORTAL</span><p className="hint">{r.desc}</p>
    <div className="code-box"><small>Auto-generated NIZAM™ ID</small><strong>{id || 'Generating…'}</strong><small>Your ID is created automatically — no typing needed.</small></div>
    <form onSubmit={e => { e.preventDefault(); setDone(true); }} style={{ textAlign: 'left' }}>
      <label className="field"><span>NIZAM™ ID</span><input readOnly value={id} /></label>
      <label className="field"><span>Password</span><input type="password" defaultValue="demo1234" required minLength={4} /></label>
      <div className="actions end"><Button variant="outline" type="button" onClick={() => { const v = nizam(r.prefix); localStorage.setItem(`taaraa-nizam-${role}`, v); setId(v); }}>Regenerate ID</Button><Button type="submit">Login Here <ArrowRight size={15} /></Button></div>
    </form>
  </div>{done && <Success title={`Welcome, ${r.label}`} description={`Signed in with ${id} (demo only).`} onClose={() => navigate({ to: '/home' })}><Button onClick={() => navigate({ to: '/home' })}>Continue</Button></Success>}</Page>;
}

const STAGES = [
  { key: 'Live', icon: Radio, note: 'Payment received and campaign pushed live by the agency.' },
  { key: 'Printing', icon: Printer, note: 'Creative sent to the print partner and printed on flex.' },
  { key: 'Logistics', icon: Truck, note: 'Printed material dispatched to the site.' },
  { key: 'Installing', icon: HardHat, note: 'Installer mounting the creative on the board.' },
  { key: 'Campaign', icon: BarChart3, note: 'Campaign running. Pick a day to see its verified photo.' },
  { key: 'Completed', icon: Check, note: 'Campaign finished and verified.' },
];

export function BrandReview() {
  const { data, changeCampaign } = useDemo();
  const brands = Array.from(new Set(data.campaigns.map(c => c.brand)));
  const [brand, setBrand] = useState('All');
  const [cid, setCid] = useState('');
  const [msg, setMsg] = useState<'' | 'rework' | 'paid'>('');
  const [payment, setPayment] = useState(false);
  const [method, setMethod] = useState('UPI');
  const [agreed, setAgreed] = useState(true);
  const [stage, setStage] = useState(4);
  const [day, setDay] = useState<number | null>(null);
  const c = data.campaigns.find(x => x.id === cid);
  const open = (id: string) => { setCid(id); setDay(null); setStage(4); };

  if (!c) {
    const list = data.campaigns.filter(x => brand === 'All' || x.brand === brand);
    return <Page title="Brand Dashboard"><section className="panel">
      <div className="panel-top"><div><span className="eyebrow">YOUR CAMPAIGNS</span><h2>Select a campaign to continue</h2></div>
        <select className="brand-filter" value={brand} onChange={e => setBrand(e.target.value)} aria-label="Filter by brand"><option>All</option>{brands.map(b => <option key={b}>{b}</option>)}</select></div>
      <div className="campaign-list">{list.map(x => {
        const stageLabel = ['Live', 'Completed'].includes(x.status) ? 'View Pipeline' : x.paid ? 'View Status' : 'Review & Pay';
        return <button type="button" className="campaign-row brand-pick" key={x.id} onClick={() => open(x.id)}><div className="campaign-row-main"><span className="avatar">{x.brand[0]}</span><div className="campaign-title"><strong>{x.name}</strong><small className="job-code">Job Code: {campaignJobCode(x)}</small><span>{x.brand} · {x.location} · {x.channel}</span></div><Status>{x.status}</Status><Status>{x.paid ? 'Payment Successful' : 'Payment Pending'}</Status><span className="campaign-money">{money(x.budget)}</span><span className="brand-pick-cta">{stageLabel} <ArrowRight size={14} /></span></div></button>;
      })}</div>{!list.length && <p className="empty">No campaigns for this brand yet.</p>}
    </section></Page>;
  }

  const net = Number(c.budget), fee = net * 0.015, sub = net + fee, gst = sub * 0.18, total = sub + gst;
  const back = <Button variant="outline" size="sm" onClick={() => setCid('')}>← All campaigns</Button>;

  if (['Live', 'Completed'].includes(c.status)) {
    const progress = c.status === 'Completed' ? 100 : (c.progress ?? 33);
    const reached = c.status === 'Completed' ? 5 : 4;
    const verified = c.status === 'Completed' ? 45 : Math.max(c.proofDay ?? 1, Math.ceil(progress * 0.45));
    const s = STAGES[stage]!;
    return <Page title="Campaign Pipeline" parent="Brand Dashboard" parentTo="/brand"><section className="panel">
      <div className="panel-top"><div><span className="eyebrow">{c.brand}</span><h2>{c.name}</h2><small className="job-code">Job Code: {campaignJobCode(c)}</small></div><div className="actions">{back}<Status>{c.status}</Status></div></div>
      <div className="chevron-pipeline">{STAGES.map((st, i) => { const Icon = st.icon; return <button type="button" key={st.key} className={`chev ${i <= reached ? 'reached' : ''} ${i === stage ? 'active' : ''}`} onClick={() => { setStage(i); setDay(null); }}><span className="chev-icon"><Icon size={18} /></span><span className="chev-text"><strong>{st.key}</strong>{i === 4 && <><small>{c.name}</small><span className="chev-bar"><i style={{ width: `${progress}%` }} /></span><small>{progress}%</small></>}</span></button>; })}</div>
      <p className="hint stage-note"><strong>{s.key}:</strong> {stage <= reached ? s.note : 'This step has not started yet.'}</p>
      {<><div className="panel-top"><h3>Campaign Days</h3><small>Total: 45 days {verified > 0 ? `· ${verified} verified` : ''}</small></div>
        <div className="calendar-demo brand-days">{Array.from({ length: 45 }, (_, i) => { const d = i + 1; const ok = d <= verified; return <button type="button" key={d} disabled={!ok} className={d === day ? 'selected' : ok ? 'filled' : ''} onClick={() => setDay(d === day ? null : d)}>{String(d).padStart(2, '0')}</button>; })}</div>
        {day && <div className="day-proof" style={{ position: 'relative', marginTop: '-150px', zIndex: 10, backgroundColor: 'var(--card)' }}><div className="panel-top"><strong>Verified photo proof · Day {day}</strong><Button variant="ghost" size="icon" aria-label="Close proof" onClick={() => setDay(null)}><X size={16} /></Button></div><img src={billboard} alt={`${c.name} billboard, day ${day}`} /><dl><dt>NIZAM™ ID</dt><dd>{c.assetIds[0] || 'CHN-OOH-001'}</dd><dt>Proof captured</dt><dd>Day {day}</dd><dt>Status</dt><dd className="ok"><ShieldCheck size={14} /> Verified</dd></dl></div>}</>}
    </section></Page>;
  }

  const awaiting = !c.paid;
  return <Page title="Review your campaign" parent="Brand Dashboard" parentTo="/brand"><div className="review-layout"><section className="panel">
    <div className="panel-top"><div className="brand-head"><span className="brand-logo">{c.brand}</span><div><h2>{c.brand}</h2><p>{c.name}</p><small className="job-code">Job Code: {campaignJobCode(c)}</small><div><Status>{awaiting ? (c.status === 'Rework requested' ? 'Rework requested' : 'Awaiting your approval') : 'Payment Successful'}</Status></div></div></div>{back}</div>
    <h3 className="section-label">Campaign summary</h3>
    <div className="summary-grid"><div><Monitor size={17} /><small>Asset selected</small><strong>{c.assetIds.length} OOH asset{c.assetIds.length === 1 ? '' : 's'}</strong></div><div><MapPin size={17} /><small>Location</small><strong>{c.location}</strong></div><div><CalendarDays size={17} /><small>Duration</small><strong>{c.start && c.end ? `${Math.max(1, Math.round((new Date(c.end).getTime() - new Date(c.start).getTime()) / 864e5) + 1)} days` : '45 days'}</strong></div></div>
    <label className="upload-zone"><Upload size={22} /><span>{c.creative || 'Upload Ad Creative'}</span><small>Upload the creative for this campaign · demo file name only</small><input type="file" accept="image/*,.pdf" onChange={e => { const f = e.target.files?.[0]; if (f) changeCampaign(c.id, { creative: f.name }); }} /></label>
  </section><aside className="panel"><h3>Price breakup</h3><div className="price-lines"><div><span>Net campaign amount</span><strong>{money(net)}</strong></div><div><span>Platform fee (1.5%)</span><strong>{money(fee)}</strong></div><div><span>Subtotal before GST</span><strong>{money(sub)}</strong></div><div><span>GST (18%)</span><strong>{money(gst)}</strong></div><div className="total"><span>Brand total payable</span><strong>{money(total)}</strong></div></div>
    {awaiting ? <><p className="hint">ⓘ Please review the campaign details before approval.</p><div className="actions brand-actions"><Button variant="outline" onClick={() => { changeCampaign(c.id, { status: 'Rework requested', reworkNote: 'Brand requested changes (demo).' }); setMsg('rework'); }}>REVERT CAMPAIGN</Button><Button onClick={() => { setAgreed(true); setPayment(true); }}>PAY NOW</Button></div></>
      : <p className="hint">Payment received. The agency can now push this campaign live — you'll see the pipeline here once it's live.</p>}
  </aside></div>
    {payment && <Modal title="SELECT PAYMENT METHOD" onClose={() => setPayment(false)}><div className="payment-total center-text">Campaign Total<strong>{money(total)}</strong></div><PaymentChoices value={method} onChange={setMethod} /><label className="check-row"><input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} />I agree to the payment terms</label><div className="actions end" style={{ marginTop: '20px' }}><Button variant="outline" onClick={() => setPayment(false)}>CANCEL</Button><Button disabled={!agreed} onClick={() => { changeCampaign(c.id, { paid: true, status: 'Approved' }); setPayment(false); setMsg('paid'); }}>PROCEED TO PAY</Button></div></Modal>}
    {msg === 'rework' && (
      <div className="modal-backdrop" onMouseDown={() => { setMsg(''); setCid(''); }}>
        <div className="modal center-text" style={{ maxWidth: '380px', padding: '30px' }} onMouseDown={e => e.stopPropagation()}>
          <div style={{ color: '#f59e0b', margin: '0 auto 16px', display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: '2px solid #fde68a', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fffbeb' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
            </div>
          </div>
          <h2 style={{ fontSize: '18px', margin: '0 0 8px', color: '#0f172a' }}>Campaign sent for rework</h2>
          <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 24px', lineHeight: '1.5' }}>Sorry, we will review and send rework for your approval.</p>
          <Button style={{ width: '100%', padding: '12px', fontSize: '14px', fontWeight: 'bold' }} onClick={() => { setMsg(''); setCid(''); }}>OKAY</Button>
        </div>
      </div>
    )}
    {msg === 'paid' && <Success title="Payment Successful" description={`${money(total)} paid via ${method} for ${c.name} · Job Code: ${campaignJobCode(c)}. The agency can now push it live.`} onClose={() => { setMsg(''); setCid(''); }}><Button onClick={() => { setMsg(''); setCid(''); }}>Back to Dashboard</Button></Success>}
  </Page>;
}
