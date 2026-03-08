import { useState, useEffect, useRef } from "react";
import { T, FIREBASE_CONFIG, PHOTOS } from "../data/config";
import { initFB } from "../utils/firebase";
import { LogoFull } from "../components/Logo";
import { Btn, Field, Spin } from "../components/UI";

/* Admin emails that are auto-granted the admin role */
const ADMIN_EMAILS = [
  "admin.secure@catalysthr.solutions",
  "admin@catalysthrsolutions.com",
];

export default function AuthPage({ mode, onBack, onLogin, toast }) {
  const isAdmin = mode === "admin";
  const [tab, setTab]     = useState("signin");
  const [form, setForm]   = useState({ name: "", email: "", password: "", confirm: "" });
  const [loading, setLoading] = useState(false);
  const [errs, setErrs]   = useState({});
  const [fb, setFb]       = useState(null);
  const [showPhone, setShowPhone] = useState(false);
  const [phone, setPhone] = useState("");
  const [otp, setOtp]     = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [vId, setVId]     = useState(null);
  const pRef              = useRef(null);

  /* ── Initialize Firebase ── */
  useEffect(() => {
    initFB().then(f => setFb(f)).catch(() => {});
  }, []);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const validate = () => {
    const e = {};
    if (!form.email)                             e.email    = "Email required";
    else if (!/\S+@\S+\.\S+/.test(form.email))  e.email    = "Invalid email";
    if (!form.password)                          e.password = "Password required";
    else if (form.password.length < 6)           e.password = "Min 6 characters";
    if (tab === "signup" && !isAdmin) {
      if (!form.name)                            e.name    = "Name required";
      if (form.confirm !== form.password)        e.confirm = "Passwords don't match";
    }
    setErrs(e);
    return !Object.keys(e).length;
  };

  /* ── Email / Password auth via Firebase ── */
  const handle = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      if (fb) {
        if (tab === "signin") {
          const cred  = await fb.signInWithEmailAndPassword(fb.auth, form.email, form.password);
          const token = await cred.user.getIdTokenResult();

          // Auto-assign admin role for known admin emails
          let role = token.claims.role || "user";
          if (ADMIN_EMAILS.includes(form.email.toLowerCase())) role = "admin";

          if (isAdmin && role !== "admin") throw new Error("You are not authorized as admin.");
          const u = { name: cred.user.displayName || form.email.split("@")[0], email: cred.user.email, role, uid: cred.user.uid };
          onLogin(u, cred.user.accessToken);
          toast.add("Welcome back! 👋", "success");
        } else {
          const cred = await fb.createUserWithEmailAndPassword(fb.auth, form.email, form.password);
          const u = { name: form.name, email: cred.user.email, role: "user", uid: cred.user.uid };
          onLogin(u, cred.user.accessToken);
          toast.add("Account created! Welcome to Catalyst HR. 🎉", "success");
        }
      } else {
        // Demo fallback (no Firebase)
        await new Promise(r => setTimeout(r, 900));
        const role = ADMIN_EMAILS.includes(form.email.toLowerCase()) ? "admin" : "user";
        if (isAdmin && role !== "admin") throw new Error("Not authorized as admin.");
        onLogin({ name: form.name || form.email.split("@")[0], email: form.email, role }, null);
        toast.add(tab === "signin" ? "Welcome back!" : "Account created!", "success");
      }
    } catch (err) {
      toast.add(err.message, "error");
      setErrs(e => ({ ...e, general: err.message }));
    } finally {
      setLoading(false);
    }
  };

  /* ── Google Sign-in ── */
  const handleGoogle = async () => {
    if (!fb) return toast.add("Firebase not configured", "error");
    setLoading(true);
    try {
      const cred = await fb.signInWithPopup(fb.auth, fb.googleProvider);
      const role = ADMIN_EMAILS.includes(cred.user.email?.toLowerCase()) ? "admin" : "user";
      onLogin({ name: cred.user.displayName, email: cred.user.email, role, uid: cred.user.uid }, cred.user.accessToken);
      toast.add("Welcome back!", "success");
    } catch (err) {
      toast.add(err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  /* ── Phone OTP ── */
  const handlePhone = async () => {
    if (!fb) return toast.add("Firebase not configured", "error");
    if (!phone) return setErrs({ phone: "Required" });
    setLoading(true);
    try {
      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new fb.RecaptchaVerifier(fb.auth, "recaptcha-container", { size: "invisible" });
      }
      const confirmation = await fb.signInWithPhoneNumber(fb.auth, phone, window.recaptchaVerifier);
      setVId(confirmation);
      setOtpSent(true);
      toast.add("OTP sent to your phone", "success");
    } catch (err) {
      toast.add(err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) return;
    setLoading(true);
    try {
      const res = await vId.confirm(otp);
      onLogin({ name: "User", email: res.user.phoneNumber, role: "user", uid: res.user.uid }, res.user.accessToken);
      toast.add("Welcome back!", "success");
    } catch (err) {
      toast.add(err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div ref={pRef} style={{ minHeight: "100vh", display: "flex", overflow: "hidden" }}>
      {/* LEFT — Photo + brand */}
      <div style={{ flex: "1 1 44%", position: "relative", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 48, overflow: "hidden", minHeight: "100vh" }}>
        <img src={PHOTOS.login_bg} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }} />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, rgba(0,60,50,.92) 0%, rgba(0,40,36,.6) 50%, rgba(0,0,0,.2) 100%)`, zIndex: 1 }} />
        <div style={{ position: "relative", zIndex: 2 }}>
          <LogoFull size={46} white />
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, fontWeight: 700, color: "#fff", margin: "28px 0 12px", lineHeight: 1.25 }}>
            {isAdmin ? "Administration Portal" : "Your Career Starts Here"}
          </h2>
          <p style={{ color: "rgba(255,255,255,.72)", fontSize: 15, lineHeight: 1.75, maxWidth: 320 }}>
            {isAdmin
              ? "Manage job postings, review applicants, and drive strategic hiring decisions."
              : "Discover curated openings in Healthcare RCM, IT, Banking & more."}
          </p>
          <div style={{ marginTop: 28, display: "flex", gap: 10, flexWrap: "wrap" }}>
            {(isAdmin
              ? ["Manage Job Listings", "Review Applications", "User Management", "Analytics"]
              : ["Real-time Tracking", "Curated Openings", "One-click Apply"]
            ).map(f => (
              <span key={f} style={{ background: "rgba(255,255,255,.12)", border: "1px solid rgba(255,255,255,.2)", color: "rgba(255,255,255,.85)", borderRadius: 20, padding: "5px 14px", fontSize: 12, fontWeight: 600 }}>{f}</span>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT — Form */}
      <div style={{ flex: "1 1 56%", display: "flex", alignItems: "center", justifyContent: "center", padding: "48px 40px", background: T.white, overflowY: "auto" }}>
        <div className="slide-r" style={{ width: "100%", maxWidth: 400 }}>
          <button onClick={onBack} style={{ background: "none", border: "none", color: T.greyMd, cursor: "pointer", fontSize: 13, fontWeight: 600, marginBottom: 28, display: "flex", alignItems: "center", gap: 6 }}>
            ← Back to site
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: isAdmin ? T.dark : `linear-gradient(135deg,${T.teal},${T.tealLt})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>
              {isAdmin ? "⚙" : "🚀"}
            </div>
            <div>
              <div style={{ fontSize: 18, fontWeight: 700, color: T.dark }}>{isAdmin ? "Admin Access" : "Catalyst HR Portal"}</div>
              <div style={{ fontSize: 12, color: T.greyMd }}>{isAdmin ? "Restricted — Admin Only" : "Powered by Firebase"}</div>
            </div>
          </div>

          {!isAdmin && (
            <div style={{ display: "flex", background: T.off, borderRadius: 10, padding: 4, marginBottom: 28 }}>
              {["signin", "signup"].map(t => (
                <button key={t} onClick={() => { setTab(t); setErrs({}); }}
                  style={{ flex: 1, padding: "8px 0", border: "none", borderRadius: 8, cursor: "pointer", fontFamily: "inherit", fontSize: 13, fontWeight: 600, transition: "all .22s", background: tab === t ? T.white : "transparent", color: tab === t ? T.dark : T.greyMd, boxShadow: tab === t ? "0 2px 8px rgba(0,0,0,.07)" : "none" }}>
                  {t === "signin" ? "Sign In" : "Create Account"}
                </button>
              ))}
            </div>
          )}

          <h2 style={{ fontSize: 24, fontWeight: 700, color: T.dark, marginBottom: 22, fontFamily: "'Playfair Display',serif" }}>
            {isAdmin ? "Admin Sign In" : tab === "signin" ? "Welcome Back" : "Join Catalyst HR"}
          </h2>

          {errs.general && (
            <div style={{ background: "#FEE2E2", border: "1px solid #FECACA", borderRadius: 8, padding: "10px 14px", marginBottom: 14, fontSize: 13, color: T.red }}>⚠ {errs.general}</div>
          )}

          {tab === "signup" && !isAdmin && (
            <Field label="Full Name" value={form.name} onChange={v => set("name", v)} req ph="Your full name" err={errs.name} />
          )}
          <Field label="Email Address" type="email" value={form.email} onChange={v => set("email", v)} req ph={isAdmin ? "admin.secure@catalysthr.solutions" : "you@example.com"} err={errs.email} />
          <Field label="Password" type="password" value={form.password} onChange={v => set("password", v)} req ph="••••••••" hint={tab === "signup" ? "Minimum 6 characters" : ""} err={errs.password} />
          {tab === "signup" && !isAdmin && (
            <Field label="Confirm Password" type="password" value={form.confirm} onChange={v => set("confirm", v)} req ph="••••••••" err={errs.confirm} />
          )}

          <Btn onClick={handle} full disabled={loading} sx={{ marginTop: 4 }}>
            {loading
              ? <><Spin size={18} color="#fff" /> Processing…</>
              : isAdmin ? "Sign In as Admin →" : tab === "signin" ? "Sign In →" : "Create Account →"
            }
          </Btn>

          {!isAdmin && tab === "signin" && (
            <>
              <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "24px 0" }}>
                <div style={{ flex: 1, height: 1, background: T.border }} />
                <span style={{ fontSize: 12, color: T.greyLt, fontWeight: 600 }}>OR CONTINUE WITH</span>
                <div style={{ flex: 1, height: 1, background: T.border }} />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <button onClick={handleGoogle} disabled={loading}
                  style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, width: "100%", padding: "12px", borderRadius: 10, border: `1.5px solid ${T.border}`, background: T.white, cursor: "pointer", fontSize: 14, fontWeight: 600, color: T.dark, transition: "all .2s" }}>
                  <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="" style={{ width: 18 }} />
                  Sign in with Google
                </button>

                {!showPhone ? (
                  <button onClick={() => setShowPhone(true)} disabled={loading}
                    style={{ background: "none", border: "none", color: T.teal, fontSize: 13, fontWeight: 700, cursor: "pointer", marginTop: 8 }}>
                    Sign in with Phone Number
                  </button>
                ) : (
                  <div className="fade-in" style={{ marginTop: 8 }}>
                    {!otpSent ? (
                      <div style={{ display: "flex", gap: 8 }}>
                        <div style={{ flex: 1 }}>
                          <Field ph="+91XXXXXXXXXX" value={phone} onChange={setPhone} />
                        </div>
                        <Btn sz="sm" onClick={handlePhone} disabled={loading}>Send OTP</Btn>
                      </div>
                    ) : (
                      <div style={{ display: "flex", gap: 8 }}>
                        <div style={{ flex: 1 }}>
                          <Field ph="Enter 6-digit OTP" value={otp} onChange={setOtp} />
                        </div>
                        <Btn sz="sm" onClick={handleVerifyOtp} disabled={loading}>Verify</Btn>
                      </div>
                    )}
                    <div id="recaptcha-container"></div>
                  </div>
                )}
              </div>
            </>
          )}

          {!isAdmin && (
            <p style={{ textAlign: "center", fontSize: 13, color: T.greyMd, marginTop: 18 }}>
              {tab === "signin" ? "No account? " : "Have an account? "}
              <button onClick={() => { setTab(tab === "signin" ? "signup" : "signin"); setErrs({}); setShowPhone(false); }}
                style={{ background: "none", border: "none", color: T.teal, fontWeight: 700, cursor: "pointer" }}>
                {tab === "signin" ? "Create one →" : "Sign in"}
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
