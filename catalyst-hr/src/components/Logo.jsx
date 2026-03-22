import { T } from "../data/config";

/* ─── CATALYST SYMBOL (High Fidelity Recreation) ────────────── */
export function CatalystSymbol({ size = 32, white = false }) {
  const c = white ? "#FFFFFF" : T.teal;

  return (
    <svg
      width={size} height={size} viewBox="0 0 100 100" fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block" }}
    >
      {/* The Styled Hexagonal "C" Mark */}
      <g stroke={c} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
        {/* Outer Frame */}
        <path d="M72 25 L32 25 L16 50 L32 75 L72 75" strokeWidth="8" />

        {/* Inner Parallel Line 1 */}
        <path d="M64 35 L38 35 L28 50 L38 65 L64 65" strokeWidth="5" opacity="0.8" />

        {/* Inner Detail 2 (Connecting the 'Tech' look) */}
        <path d="M56 45 L44 45 L40 50 L44 55 L56 55" strokeWidth="4" opacity="0.6" />

        {/* Top Accent Tip */}
        <path d="M78 30 L88 45" strokeWidth="7" />
        {/* Bottom Accent Tip */}
        <path d="M78 70 L88 55" strokeWidth="7" />
      </g>
    </svg>
  );
}

/* ─── FULL LOGO (Symbol + Text) ────────────────────────────── */
export function LogoFull({ size = 40, white = false, vertical = false }) {
  const textColor = white ? "#FFFFFF" : T.dark;
  const subColor = white ? "rgba(255,255,255,0.6)" : T.greyMd;
  const symbolSize = vertical ? size * 1.6 : size * 0.9;

  return (
    <div style={{
      display: "flex",
      flexDirection: vertical ? "column" : "row",
      alignItems: "center",
      gap: vertical ? 12 : 12,
      textAlign: vertical ? "center" : "left"
    }}>
      <CatalystSymbol size={symbolSize} white={white} />
      <div style={{
        display: "flex",
        flexDirection: "column",
        lineHeight: 1.05,
        marginTop: vertical ? 4 : 0
      }}>
        <span style={{
          fontSize: size * 0.48,
          fontWeight: 800,
          letterSpacing: "0.08em",
          color: textColor,
          fontFamily: "'Playfair Display', serif",
          textTransform: "uppercase"
        }}>
          Catalyst
        </span>
        <span style={{
          fontSize: size * 0.24,
          fontWeight: 600,
          letterSpacing: "0.22em",
          color: subColor,
          fontFamily: "'Inter', sans-serif",
          textTransform: "uppercase",
          marginTop: 2
        }}>
          HR Solutions
        </span>
      </div>
    </div>
  );
}

export default function Logo(props) {
  return <LogoFull {...props} />;
}
