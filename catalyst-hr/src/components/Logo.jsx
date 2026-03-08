import LOGO_SRC from "../assets/logo";

/* ─── CatalystLogo ──────────────────────────────────────────── */
/* Icon-only logo, optionally inverted for dark backgrounds      */
export function CatalystLogo({ size = 44, white = false }) {
  return (
    <img
      src={LOGO_SRC}
      alt="Catalyst HR Solutions"
      style={{
        height: size,
        width:  "auto",
        objectFit: "contain",
        flexShrink: 0,
        filter: white ? "brightness(0) invert(1)" : "none",
        display: "block",
      }}
    />
  );
}

/* ─── LogoFull ──────────────────────────────────────────────── */
/* Full logo (icon + company text already in PNG)               */
export function LogoFull({ size = 40, white = false }) {
  return (
    <img
      src={LOGO_SRC}
      alt="Catalyst HR Solutions"
      style={{
        height: size,
        width:  "auto",
        maxWidth: 220,
        objectFit: "contain",
        flexShrink: 0,
        filter: white ? "brightness(0) invert(1)" : "none",
        display: "block",
      }}
    />
  );
}
