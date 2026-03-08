import { T, PHOTOS } from "../data/config";
import { Card, Tag } from "../components/UI";

const VALUES = [
  { i: "🎯", t: "Result-Oriented", d: "Success measured by quality placements, not promises." },
  { i: "💎", t: "Quality-Focused", d: "Every candidate vetted to precisely match client needs." },
  { i: "🤝", t: "Integrity",       d: "Transparent, honest relationships with all stakeholders." },
  { i: "🚀", t: "Excellence",      d: "Continuous improvement in people and processes." },
];

export default function AboutPage() {
  return (
    <div className="page">
      {/* Hero */}
      <div style={{ position: "relative", overflow: "hidden" }}>
        <img src={PHOTOS.hero2} alt="team" style={{ width: "100%", height: 420, objectFit: "cover", display: "block" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(0,50,43,.9) 0%, rgba(0,50,43,.65) 50%, rgba(0,0,0,.3) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", padding: "0 28px" }}>
          <div style={{ maxWidth: 580 }}>
            <Tag color="rgba(255,255,255,.9)" sx={{ background: "rgba(255,255,255,.14)", border: "1px solid rgba(255,255,255,.25)", marginBottom: 14 }}>ABOUT US</Tag>
            <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(30px,5vw,52px)", fontWeight: 800, color: "#fff", margin: "0 0 14px", lineHeight: 1.15 }}>Catalyst HR Solutions</h1>
            <p style={{ color: "rgba(255,255,255,.78)", fontSize: 17, lineHeight: 1.75 }}>Bridging the talent gap across Healthcare RCM, IT, Banking &amp; Non-IT domains for over a decade.</p>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "72px 28px" }}>

        {/* Mission */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, marginBottom: 80, alignItems: "center" }}>
          <div className="slide-l">
            <Tag color={T.teal}>OUR MISSION</Tag>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 34, fontWeight: 800, color: T.dark, margin: "16px 0 18px", lineHeight: 1.2 }}>
              Quality Recruitment,<br />Lasting Partnerships
            </h2>
            <p style={{ color: T.grey, lineHeight: 1.85, fontSize: 15, marginBottom: 16 }}>
              Catalyst HR Solutions was founded with a singular vision — to deliver quality-focused, result-oriented recruitment solutions that genuinely bridge the talent gap in specialized domains.
            </p>
            <p style={{ color: T.grey, lineHeight: 1.85, fontSize: 15 }}>
              With deep expertise in Healthcare RCM, IT, Banking, and Non-IT sectors, we've built lasting partnerships with leading organizations across India.
            </p>
          </div>
          <div className="slide-r" style={{ borderRadius: 18, overflow: "hidden", height: 320 }}>
            <img src={PHOTOS.office3} alt="office" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        </div>

        {/* Leadership */}
        <div style={{ marginBottom: 80 }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <Tag color={T.teal}>LEADERSHIP</Tag>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 34, fontWeight: 800, color: T.dark, margin: "14px 0 0" }}>The Visionary Behind Catalyst</h2>
          </div>
          <Card cls="fade-up" sx={{ maxWidth: 800, margin: "0 auto", padding: 40, borderLeft: `5px solid ${T.teal}`, background: `linear-gradient(135deg,#fff 75%,${T.tealPale})` }}>
            <div style={{ display: "flex", gap: 28, alignItems: "flex-start", flexWrap: "wrap" }}>
              <div style={{ width: 108, height: 108, borderRadius: 18, overflow: "hidden", flexShrink: 0, boxShadow: `0 8px 28px ${T.tealGlow}` }}>
                <img src={PHOTOS.team2} alt="CEO" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 800, fontSize: 22, color: T.dark, marginBottom: 4, fontFamily: "'Playfair Display',serif" }}>Mr. Venkadesh N</div>
                <div style={{ color: T.teal, fontWeight: 700, marginBottom: 16, fontSize: 14, letterSpacing: ".5px" }}>Founder & Chief Executive Officer</div>
                <p style={{ color: T.grey, lineHeight: 1.85, margin: "0 0 14px", fontSize: 15 }}>
                  With over 10 years of experience in healthcare recruitment and revenue cycle management hiring, Mr. Venkadesh N brings deep industry expertise and strategic leadership to Catalyst HR Solutions. Driven by a vision to deliver quality-focused recruitment solutions, he established the company to bridge the talent gap in RCM (Medical Coding, AR Calling, and Medical Billing), IT, Non-IT, and banking domains.
                </p>
                <p style={{ color: T.grey, lineHeight: 1.85, margin: 0, fontSize: 15 }}>
                  His strong understanding of client requirements, market dynamics, and candidate capabilities has enabled lasting partnerships across the healthcare sector. Under his leadership, the company grows with a commitment to professionalism, integrity, and excellence in talent acquisition.
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Values */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <Tag color={T.teal}>OUR VALUES</Tag>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 34, fontWeight: 800, color: T.dark, margin: "14px 0 0" }}>What Drives Us</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 20 }}>
          {VALUES.map((v, i) => (
            <Card key={v.t} cls={`hover-card fade-up`} sx={{ padding: 28, textAlign: "center", animationDelay: `${i * .08}s` }}>
              <div style={{ width: 56, height: 56, borderRadius: 16, background: T.tealPale, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, margin: "0 auto 16px" }}>{v.i}</div>
              <div style={{ fontWeight: 700, color: T.dark, marginBottom: 7 }}>{v.t}</div>
              <div style={{ fontSize: 13, color: T.greyMd, lineHeight: 1.7 }}>{v.d}</div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
