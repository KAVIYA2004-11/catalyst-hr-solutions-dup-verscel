import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { T } from "../data/config";

/* ─── Button ────────────────────────────────────────────────── */
export function Btn({
  children, onClick,
  v = "primary", sz = "md",
  full = false, disabled = false,
  sx = {}, cls = "",
}) {
  const base = {
    display:       "inline-flex",
    alignItems:    "center",
    justifyContent:"center",
    gap:           8,
    fontWeight:    700,
    cursor:        disabled ? "not-allowed" : "pointer",
    opacity:       disabled ? 0.55 : 1,
    border:        "none",
    borderRadius:  10,
    transition:    "all .2s",
    fontFamily:    "inherit",
    width:         full ? "100%" : "auto",
    whiteSpace:    "nowrap",
  };
  const variants = {
    primary: { background: T.teal,    color: "#fff",   padding: sz === "sm" ? "8px 18px" : "13px 28px", fontSize: sz === "sm" ? 13 : 15 },
    outline: { background: "transparent", color: T.teal, border: `2px solid ${T.teal}`, padding: sz === "sm" ? "6px 16px" : "11px 26px", fontSize: sz === "sm" ? 13 : 15 },
    ghost:   { background: "transparent", color: T.greyMd, padding: sz === "sm" ? "6px 14px" : "10px 20px", fontSize: sz === "sm" ? 13 : 15 },
    dark:    { background: T.dark,    color: "#fff",   padding: sz === "sm" ? "8px 18px" : "13px 28px", fontSize: sz === "sm" ? 13 : 15 },
    danger:  { background: T.red,     color: "#fff",   padding: sz === "sm" ? "8px 18px" : "13px 28px", fontSize: sz === "sm" ? 13 : 15 },
  };
  return (
    <button
      onClick={!disabled ? onClick : undefined}
      className={`btn-shine ${cls}`}
      style={{ ...base, ...(variants[v] || variants.primary), ...sx }}
    >
      {children}
    </button>
  );
}

/* ─── Tag / Badge ───────────────────────────────────────────── */
export function Tag({ children, color = T.teal, sx = {} }) {
  return (
    <span style={{
      display:      "inline-block",
      padding:      "4px 12px",
      borderRadius: 20,
      fontSize:     12,
      fontWeight:   700,
      background:   `${color}18`,
      color,
      ...sx,
    }}>
      {children}
    </span>
  );
}

/* ─── Card ──────────────────────────────────────────────────── */
export function Card({ children, sx = {}, cls = "", onClick }) {
  return (
    <div
      className={`hover-card ${cls}`}
      onClick={onClick}
      style={{
        background:   T.white,
        borderRadius: 16,
        border:       `1px solid ${T.border}`,
        boxShadow:    "0 2px 12px rgba(0,0,0,.04)",
        transition:   "all .25s",
        ...sx,
      }}
    >
      {children}
    </div>
  );
}

/* ─── Spinner ───────────────────────────────────────────────── */
export function Spin({ size = 28, color = T.teal }) {
  return (
    <div style={{
      width:  size, height: size,
      border: `3px solid ${color}30`,
      borderTop: `3px solid ${color}`,
      borderRadius: "50%",
      animation: "spin .8s linear infinite",
    }} />
  );
}

/* ─── Text Field ────────────────────────────────────────────── */
export function Field({
  label, value, onChange,
  type = "text", ph = "", req = false,
  dis = false, rows, err, hint,
}) {
  const style = {
    width:       "100%",
    border:      `1.5px solid ${err ? T.red : T.border}`,
    borderRadius: 9,
    padding:     "11px 14px",
    fontSize:    14,
    fontFamily:  "inherit",
    background:  dis ? T.off : T.white,
    color:       T.dark,
    outline:     "none",
    resize:      rows ? "vertical" : undefined,
  };
  return (
    <div style={{ marginBottom: 16 }}>
      {label && (
        <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: T.greyMd, marginBottom: 5, letterSpacing: ".5px", textTransform: "uppercase" }}>
          {label}{req && <span style={{ color: T.red }}> *</span>}
        </label>
      )}
      {rows
        ? <textarea className="field" value={value} onChange={e => onChange(e.target.value)} placeholder={ph} disabled={dis} rows={rows} style={style} />
        : <input    className="field" type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={ph} disabled={dis} required={req} style={style} />
      }
      {err  && <div style={{ fontSize: 11, color: T.red,    marginTop: 4 }}>{err}</div>}
      {hint && <div style={{ fontSize: 11, color: T.greyMd, marginTop: 4 }}>{hint}</div>}
    </div>
  );
}

/* ─── Select ────────────────────────────────────────────────── */
export function Sel({ label, value, onChange, opts }) {
  return (
    <div style={{ marginBottom: 16 }}>
      {label && (
        <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: T.greyMd, marginBottom: 5, letterSpacing: ".5px", textTransform: "uppercase" }}>
          {label}
        </label>
      )}
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{ width: "100%", border: `1.5px solid ${T.border}`, borderRadius: 9, padding: "11px 14px", fontSize: 14, fontFamily: "inherit", background: T.white, color: T.dark, cursor: "pointer", outline: "none" }}
      >
        {opts.map(o => <option key={o.v || o} value={o.v || o}>{o.l || o}</option>)}
      </select>
    </div>
  );
}

/* ─── File Field ────────────────────────────────────────────── */
export function FileField({ label, onChange, req = false, ph = "", hint, err }) {
  const [name, setName] = useState("");
  const handle = (e) => {
    const file = e.target.files[0];
    if (file) {
      setName(file.name);
      onChange(file);
    }
  };

  return (
    <div style={{ marginBottom: 16 }}>
      {label && (
        <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: T.greyMd, marginBottom: 5, letterSpacing: ".5px", textTransform: "uppercase" }}>
          {label}{req && <span style={{ color: T.red }}> *</span>}
        </label>
      )}
      <div style={{ position: "relative" }}>
        <input 
          type="file" 
          onChange={handle} 
          style={{ position: "absolute", inset: 0, opacity: 0, cursor: "pointer", zIndex: 2 }} 
        />
        <div style={{ 
          width: "100%", 
          border: `1.5px dashed ${err ? T.red : T.border}`, 
          borderRadius: 9, 
          padding: "11px 14px", 
          fontSize: 14, 
          background: T.white, 
          color: name ? T.dark : T.greyLt,
          display: "flex",
          alignItems: "center",
          gap: 10,
          transition: "all .2s"
        }}>
          <span>{name ? "📄 " + name : ph || "Choose file..."}</span>
        </div>
      </div>
      {err  && <div style={{ fontSize: 11, color: T.red,    marginTop: 4 }}>{err}</div>}
      {hint && <div style={{ fontSize: 11, color: T.greyMd, marginTop: 4 }}>{hint}</div>}
    </div>
  );
}

/* ─── Modal ─────────────────────────────────────────────────── */
export function Modal({ open, onClose, title, children, footer, width = 560 }) {
  useEffect(() => {
    if (open) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "0px";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "0px";
    };
  }, [open]);

  if (!open) return null;

  return createPortal(
    <div
      className="modal-wrap"
      onClick={onClose}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,.55)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
        overscrollBehavior: "contain",
      }}
    >
      <div
        className="modal-box"
        onClick={e => e.stopPropagation()}
        style={{
          background: T.white,
          borderRadius: 18,
          width: "100%",
          maxWidth: width,
          maxHeight: "92vh",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          boxShadow: "0 24px 64px rgba(0,0,0,.18)",
        }}
      >
        {/* ── Sticky Header ── */}
        <div style={{
          padding: "22px 28px 18px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: `1px solid ${T.border}`,
          flexShrink: 0,
        }}>
          <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, fontFamily: "'Playfair Display',serif", color: T.dark }}>{title}</h2>
          <button
            onClick={onClose}
            style={{ background: "none", border: "none", width: 34, height: 34, borderRadius: "50%", cursor: "pointer", fontSize: 18, color: T.greyMd, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
            onMouseEnter={e => e.currentTarget.style.background = T.off}
            onMouseLeave={e => e.currentTarget.style.background = "none"}
          >✕</button>
        </div>

        {/* ── Scrollable Body ── */}
        <div style={{ padding: "24px 28px", overflowY: "auto", flex: 1 }}>
          {children}
        </div>

        {/* ── Sticky Footer (action buttons) ── */}
        {footer && (
          <div style={{
            padding: "16px 28px",
            borderTop: `1px solid ${T.border}`,
            display: "flex",
            gap: 10,
            justifyContent: "flex-end",
            flexShrink: 0,
            background: T.white,
          }}>
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}

/* ─── Toast Notifications ───────────────────────────────────── */
export function Toast({ items, rm }) {
  return (
    <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 9999, display: "flex", flexDirection: "column", gap: 10 }}>
      {items.map(t => (
        <div
          key={t.id}
          className="scale-in"
          style={{ background: T.dark2, color: "#fff", borderRadius: 10, padding: "12px 18px", display: "flex", alignItems: "center", gap: 12, minWidth: 280, maxWidth: 380, boxShadow: "0 8px 32px rgba(0,0,0,.2)", borderLeft: `3px solid ${t.type === "success" ? T.green : t.type === "error" ? T.red : T.teal}` }}
        >
          <span style={{ fontSize: 16 }}>{t.type === "success" ? "✓" : t.type === "error" ? "✕" : "ℹ"}</span>
          <span style={{ flex: 1, fontSize: 14, fontWeight: 500 }}>{t.msg}</span>
          <button onClick={() => rm(t.id)} style={{ background: "none", border: "none", color: "rgba(255,255,255,.4)", cursor: "pointer", fontSize: 16 }}>✕</button>
        </div>
      ))}
    </div>
  );
}
