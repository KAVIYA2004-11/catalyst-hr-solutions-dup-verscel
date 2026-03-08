import { useState } from "react";
import { T, PHOTOS } from "../data/config";
import { Btn, Card, Tag, Field } from "../components/UI";

const CONTACT_INFO = [
  { i: "📞", l: "Phone / WhatsApp", items: ["+91 91761 04109", "+91 89395 42187", "+91 79048 47280"] },
  { i: "✉",  l: "Email Us",         items: ["recruitment@catalysthrsolutions.com"] },
  { i: "🕐", l: "Working Hours",    items: ["Monday – Saturday", "9:00 AM – 6:00 PM IST"] },
];

export default function ContactPage({ toast }) {
  const [f,    setF]    = useState({ name: "", email: "", phone: "", company: "", msg: "" });
  const [sent, setSent] = useState(false);

  const set  = (k, v)  => setF(x => ({ ...x, [k]: v }));
  const send = () => {
    if (!f.name || !f.email || !f.msg) { toast.add("Fill all required fields.", "error"); return; }
    setSent(true);
    toast.add("Message sent! We'll be in touch shortly. ✉", "success");
    setF({ name: "", email: "", phone: "", company: "", msg: "" });
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <div className="page">
      {/* Banner */}
      <div style={{ position: "relative", overflow: "hidden" }}>
        <img src={PHOTOS.office1} alt="office" style={{ width: "100%", height: 340, objectFit: "cover", display: "block" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom,rgba(0,50,43,.75),rgba(0,50,43,.9))" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
          <div>
            <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 44, fontWeight: 800, color: "#fff", margin: "0 0 10px" }}>Get In Touch</h1>
            <p style={{ color: "rgba(255,255,255,.72)", fontSize: 16 }}>We'd love to hear from you — clients and candidates welcome.</p>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 980, margin: "0 auto", padding: "64px 28px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 52 }}>
        {/* Form */}
        <div className="slide-l">
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 26, fontWeight: 800, color: T.dark, marginBottom: 26 }}>Send a Message</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <Field label="Full Name" value={f.name}    onChange={v => set("name",    v)} req />
            <Field label="Email" type="email" value={f.email} onChange={v => set("email", v)} req />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <Field label="Phone"   value={f.phone}   onChange={v => set("phone",   v)} />
            <Field label="Company" value={f.company} onChange={v => set("company", v)} />
          </div>
          <Field label="Message" value={f.msg} onChange={v => set("msg", v)} rows={5} req />
          <Btn onClick={send} sz="lg" full disabled={sent}>{sent ? "Sent ✓" : "Send Message →"}</Btn>
        </div>

        {/* Contact details */}
        <div className="slide-r">
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 26, fontWeight: 800, color: T.dark, marginBottom: 26 }}>Contact Details</h2>
          {CONTACT_INFO.map((inf, i) => (
            <Card key={inf.l} cls={`fade-up`} sx={{ marginBottom: 14, padding: 20, animationDelay: `${i * .1}s` }}>
              <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: T.tealPale, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{inf.i}</div>
                <div>
                  <div style={{ fontWeight: 700, color: T.dark, marginBottom: 5, fontSize: 14 }}>{inf.l}</div>
                  {inf.items.map(it => <div key={it} style={{ color: T.grey, fontSize: 14, lineHeight: 1.7 }}>{it}</div>)}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
