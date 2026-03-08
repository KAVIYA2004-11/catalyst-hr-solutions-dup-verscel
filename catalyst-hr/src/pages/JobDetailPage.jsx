import { useState } from "react";
import { T } from "../data/config";
import { Btn, Card, Tag, Field, FileField, Spin } from "../components/UI";

export default function JobDetailPage({ job, nav, onApply, user, openAuth }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: user?.name || "", email: user?.email || "", phone: "", exp: "", cover: "", resume: "" });
  const [sub,  setSub]  = useState(false);

  if (!job) return <div style={{ padding: 80, textAlign: "center" }}>Job not found.</div>;

  const set    = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const submit = () => {
    if (!form.name || !form.email || !form.phone) { alert("Fill required fields."); return; }
    setSub(true);
    setTimeout(() => { onApply({ ...form, jobId: job.id, jobTitle: job.title }); setSub(false); setOpen(false); }, 900);
  };

  return (
    <div className="page" style={{ maxWidth: 920, margin: "0 auto", padding: "44px 28px" }}>
      <button onClick={() => nav("jobs")} style={{ background: "none", border: "none", color: T.teal, fontWeight: 700, fontSize: 14, cursor: "pointer", padding: "0 0 24px", display: "flex", alignItems: "center", gap: 6 }}>
        ← Back to Jobs
      </button>

      <Card sx={{ padding: 38, marginBottom: 20 }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 20, marginBottom: 24 }}>
          <div>
            <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap", marginBottom: 8 }}>
              <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 30, fontWeight: 800, color: T.dark, margin: 0 }}>{job.title}</h1>
              {job.urgent && <Tag color="#D97706">🔥 URGENT</Tag>}
            </div>
            <div style={{ color: T.greyMd, fontSize: 14 }}>{job.dept} · Posted {job.posted} · {job.salary}</div>
          </div>
          <Btn sz="lg" onClick={() => { if (!user) { openAuth("user"); return; } setOpen(true); }}>Apply Now →</Btn>
        </div>

        {/* Tags */}
        <div style={{ display: "flex", gap: 9, flexWrap: "wrap", marginBottom: 28 }}>
          <Tag>📍 {job.loc}</Tag>
          <Tag color={T.blue}>{job.mode}</Tag>
          <Tag color={T.green}>{job.type}</Tag>
          <Tag color={T.purple}>💼 {job.exp}</Tag>
          <Tag color={T.greyMd}>{job.interview} Interview</Tag>
          {job.cert && <Tag color="#D97706">Certification Required</Tag>}
        </div>

        <hr style={{ border: "none", borderTop: `1px solid ${T.border}`, marginBottom: 28 }} />

        <h3 style={{ fontSize: 16, fontWeight: 700, color: T.dark, marginBottom: 12 }}>About This Role</h3>
        <p style={{ color: T.grey, lineHeight: 1.85, marginBottom: 28 }}>{job.desc}</p>

        <h3 style={{ fontSize: 16, fontWeight: 700, color: T.dark, marginBottom: 12 }}>Required Skills</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 28 }}>
          {job.skills.map(s => (
            <span key={s} style={{ background: T.tealPale, color: T.tealDk, borderRadius: 8, padding: "5px 12px", fontSize: 13, fontWeight: 600 }}>{s}</span>
          ))}
        </div>

        <hr style={{ border: "none", borderTop: `1px solid ${T.border}`, marginBottom: 24 }} />

        <h3 style={{ fontSize: 16, fontWeight: 700, color: T.dark, marginBottom: 14 }}>Contact to Apply</h3>
        <div style={{ background: `linear-gradient(135deg,${T.tealPale},#E8F5E9)`, borderRadius: 12, padding: 20, fontSize: 14, color: T.grey, lineHeight: 2.2 }}>
          <div><strong>📞 Call / WhatsApp:</strong> {job.phones.join("  |  ")}</div>
          <div><strong>✉ Email:</strong> {job.email}</div>
        </div>
      </Card>

      {/* ── Apply Dialog — self-contained, no Modal dependency ── */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: "fixed", inset: 0,
            background: "rgba(0,0,0,.55)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: T.white,
              borderRadius: 18,
              width: "100%",
              maxWidth: 540,
              /* KEY: flex column with explicit height constraint */
              display: "flex",
              flexDirection: "column",
              maxHeight: "calc(100vh - 48px)",
              overflow: "hidden",
              boxShadow: "0 24px 64px rgba(0,0,0,.22)",
            }}
          >
            {/* ── HEADER (always visible) ── */}
            <div style={{
              padding: "20px 24px 16px",
              borderBottom: `1px solid ${T.border}`,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexShrink: 0,
            }}>
              <div>
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 19, fontWeight: 800, color: T.dark }}>
                  Apply — {job.title}
                </div>
                <div style={{ fontSize: 12, color: T.greyMd, marginTop: 2 }}>{job.dept} · {job.loc}</div>
              </div>
              <button
                onClick={() => setOpen(false)}
                style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: T.greyMd, width: 34, height: 34, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}
                onMouseEnter={e => e.currentTarget.style.background = T.off}
                onMouseLeave={e => e.currentTarget.style.background = "none"}
              >✕</button>
            </div>

            {/* ── BODY (scrollable) ── */}
            <div style={{ padding: "20px 24px", overflowY: "auto", flex: 1, minHeight: 0 }}>
              {/* Row 1 */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <Field label="Full Name *"  value={form.name}  onChange={v => set("name",  v)} ph="Your full name" />
                <Field label="Phone *"      value={form.phone} onChange={v => set("phone", v)} ph="+91 XXXXXXXXXX" />
              </div>
              {/* Row 2 */}
              <Field label="Email *" type="email" value={form.email} onChange={v => set("email", v)} ph="you@example.com" />
              <Field label="Years of Experience" value={form.exp} onChange={v => set("exp", v)} ph="e.g. 1.5 years" />
              <Field label="Cover Letter" value={form.cover} onChange={v => set("cover", v)} rows={3} ph="Why are you a great fit for this role?" />
              <FileField label="Resume (Optional)" onChange={v => set("resume", v)} ph="Upload PDF / Doc" hint="You may also bring it to the interview" />
            </div>

            {/* ── FOOTER (always visible) ── */}
            <div style={{
              padding: "14px 24px",
              borderTop: `1px solid ${T.border}`,
              display: "flex",
              gap: 10,
              justifyContent: "flex-end",
              flexShrink: 0,
              background: T.white,
            }}>
              <Btn v="ghost" onClick={() => setOpen(false)}>Cancel</Btn>
              <Btn onClick={submit} disabled={sub}>
                {sub ? <><Spin size={16} color="#fff" /> Submitting…</> : "Submit Application →"}
              </Btn>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
