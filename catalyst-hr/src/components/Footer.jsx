import { useState } from "react";
import { T } from "../data/config";
import { LogoFull } from "./Logo";

const NAV_PAGES = ["home", "jobs", "about", "contact"];
const CANDIDATE_LINKS = [
  ["Browse Jobs",      "jobs"   ],
  ["My Applications",  "myapps" ],
  ["About Us",         "about"  ],
  ["Contact Us",       "contact"],
];

export default function Footer({ nav, onAdminAccess }) {
  const [secretCount, setSecretCount] = useState(0);

  // Secret admin access: click copyright text 5 times
  const handleSecretClick = () => {
    const next = secretCount + 1;
    setSecretCount(next);
    if (next >= 5) { setSecretCount(0); onAdminAccess(); }
  };

  const linkStyle = {
    display:    "block",
    background: "none",
    border:     "none",
    color:      "rgba(255,255,255,.45)",
    cursor:     "pointer",
    padding:    "4px 0",
    fontSize:   14,
    textTransform: "capitalize",
    transition: "color .2s",
  };

  return (
    <footer style={{ background: T.dark, color: "#fff", padding: "56px 28px 24px" }}>
      <div style={{ maxWidth: 1240, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 40, marginBottom: 44 }}>

          {/* Brand */}
          <div>
            <div style={{ marginBottom: 16 }}><LogoFull size={36} white /></div>
            <p style={{ color: "rgba(255,255,255,.45)", fontSize: 13, lineHeight: 1.8 }}>
              Bridging talent gaps across Healthcare RCM, IT, Banking &amp; Non-IT domains across India.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <div style={{ fontWeight: 700, fontSize: 11, letterSpacing: 2, color: T.tealLt, marginBottom: 16, textTransform: "uppercase" }}>Navigation</div>
            {NAV_PAGES.map(p => (
              <button key={p} onClick={() => nav(p)} style={linkStyle}
                onMouseEnter={e => e.currentTarget.style.color = "#fff"}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,.45)"}
              >{p}</button>
            ))}
          </div>

          {/* Contact */}
          <div>
            <div style={{ fontWeight: 700, fontSize: 11, letterSpacing: 2, color: T.tealLt, marginBottom: 16, textTransform: "uppercase" }}>Contact</div>
            <div style={{ color: "rgba(255,255,255,.45)", fontSize: 13, lineHeight: 2.2 }}>
              <div>📞 +91 91761 04109</div>
              <div>📞 +91 89395 42187</div>
              <div>📞 +91 79048 47280</div>
              <div>✉ recruitment@catalysthrsolutions.com</div>
            </div>
          </div>

          {/* For Candidates */}
          <div>
            <div style={{ fontWeight: 700, fontSize: 11, letterSpacing: 2, color: T.tealLt, marginBottom: 16, textTransform: "uppercase" }}>For Candidates</div>
            {CANDIDATE_LINKS.map(([l, p]) => (
              <button key={l} onClick={() => nav(p)} style={linkStyle}
                onMouseEnter={e => e.currentTarget.style.color = "#fff"}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,.45)"}
              >{l}</button>
            ))}
          </div>
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,.07)", paddingTop: 18, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
          <div style={{ color: "rgba(255,255,255,.25)", fontSize: 12, cursor: "default", userSelect: "none" }}>
            © {new Date().getFullYear()} Catalyst HR Solutions. All rights reserved.
          </div>
          <div style={{ color: "rgba(255,255,255,.25)", fontSize: 12 }}>Bridging Talent. Building Futures.</div>
        </div>
      </div>
    </footer>
  );
}
