import { T } from "../data/config";

/* ─── Stage step definitions ────────────────────────────────── */
const STAGE_STEPS = [
  { key: "Applied",             label: "Application Submitted", Icon: IconDoc    },
  { key: "Reviewing",           label: "Under Review",          Icon: IconSearch },
  { key: "Shortlisted",         label: "Shortlisted",           Icon: IconPeople },
  { key: "Interview Scheduled", label: "Interview Stage",       Icon: IconChat   },
  { key: "Selected",            label: "Final Decision",        Icon: IconCheck  },
  { key: "Rejected",            label: "Not Selected",          Icon: IconX      },
];

/* ─── Timeline ──────────────────────────────────────────────── */
export default function Timeline({ tl, status }) {
  const isRejected = tl.includes("Rejected");
  const steps = isRejected
    ? [...STAGE_STEPS.slice(0, 4), STAGE_STEPS[5]]
    : STAGE_STEPS.slice(0, 5);

  return (
    <div style={{ overflowX: "auto", paddingBottom: 4 }}>
      <div style={{ display: "flex", alignItems: "flex-start", minWidth: 520, padding: "8px 0 4px" }}>
        {steps.map((step, i) => {
          const done     = tl.includes(step.key);
          const current  = step.key === status;
          const nextDone = i < steps.length - 1 && tl.includes(steps[i + 1].key);
          const { Icon } = step;

          return (
            <div key={step.key} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", position: "relative" }}>
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div style={{
                  position:   "absolute",
                  top:        28,
                  left:       "50%",
                  width:      "100%",
                  height:     3,
                  background: nextDone ? T.teal : "#DEE2E6",
                  transition: "background .5s ease",
                  zIndex:     0,
                  borderRadius: 2,
                }} />
              )}

              {/* Circle */}
              <div style={{
                width:        56,
                height:       56,
                borderRadius: "50%",
                background:   done ? T.teal : "#E9ECEF",
                display:      "flex",
                alignItems:   "center",
                justifyContent: "center",
                zIndex:       1,
                position:     "relative",
                transition:   "all .4s ease",
                boxShadow:    current
                  ? `0 0 0 4px ${T.tealGlow}, 0 4px 16px ${T.tealGlow}`
                  : done
                  ? `0 4px 12px rgba(0,137,123,.2)`
                  : "none",
                flexShrink: 0,
              }}>
                <Icon color={done ? "#fff" : "#ADB5BD"} />
              </div>

              {/* Label */}
              <span style={{
                fontSize:   12,
                marginTop:  10,
                color:      done ? T.dark : "#ADB5BD",
                fontWeight: current ? 700 : done ? 600 : 400,
                textAlign:  "center",
                maxWidth:   90,
                lineHeight: 1.35,
                transition: "color .3s",
              }}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── SVG Icons ─────────────────────────────────────────────── */
function IconDoc({ color = "#fff" }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}
function IconSearch({ color = "#fff" }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="11" cy="11" r="7" stroke={color} strokeWidth="2"/>
      <path d="M21 21l-4.35-4.35" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}
function IconPeople({ color = "#fff" }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <circle cx="9" cy="7" r="4" stroke={color} strokeWidth="2"/>
      <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}
function IconChat({ color = "#fff" }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function IconCheck({ color = "#fff" }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="2"/>
      <path d="M8 12l3 3 5-5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function IconX({ color = "#fff" }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="2"/>
      <path d="M15 9l-6 6M9 9l6 6" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}
