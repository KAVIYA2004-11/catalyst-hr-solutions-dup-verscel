/* ═══════════════════════════════════════════════════════════════
   FIREBASE CONFIG — Replace with your Firebase project values
   Steps:
   1. console.firebase.google.com → New project → Add Web App
   2. Enable Email/Password in Authentication
   3. Paste your config below
   4. Admin users: set custom claim { role: "admin" } via Firebase Admin SDK
   ═══════════════════════════════════════════════════════════════ */
export const FIREBASE_CONFIG = {
  apiKey: "AIzaSyADXuZ1J2q5EnbH0PQCVw5rMXBpEJaD0PA",
  authDomain: "hr-catalyst.firebaseapp.com",
  projectId: "hr-catalyst",
  storageBucket: "hr-catalyst.firebasestorage.app",
  messagingSenderId: "701659757902",
  appId: "1:701659757902:web:fef8cebc0a883e8d89b21f",
  measurementId: "G-T5REEMCZCX"
};

/* ─── DESIGN TOKENS ─────────────────────────────────────────── */
export const T = {
  teal: "#00897B",
  tealDk: "#004D40",
  tealMd: "#00695C",
  tealLt: "#4DB6AC",
  tealPale: "#E0F2F1",
  tealGlow: "rgba(0,137,123,0.16)",
  dark: "#0F172A",
  dark2: "#1E293B",
  grey: "#374151",
  greyMd: "#6B7280",
  greyLt: "#9CA3AF",
  border: "#E5E7EB",
  white: "#FFFFFF",
  off: "#F8FAFC",
  amber: "#F59E0B",
  blue: "#3B82F6",
  purple: "#8B5CF6",
  green: "#10B981",
  red: "#EF4444",
};

/* ─── APPLICATION STAGES ────────────────────────────────────── */
export const STAGES = [
  "Applied",
  "Reviewing",
  "Shortlisted",
  "Interview Scheduled",
  "Selected",
  "Rejected",
];

export const STAGE_COLORS = {
  Applied: T.tealLt,
  Reviewing: T.amber,
  Shortlisted: T.blue,
  "Interview Scheduled": T.purple,
  Selected: T.green,
  Rejected: T.red,
};

/* ─── UNSPLASH PHOTO URLS ───────────────────────────────────── */
export const PHOTOS = {
  hero1: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80",
  hero2: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&q=80",
  office1: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80",
  office2: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
  office3: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80",
  office4: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80",
  team1: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&q=80",
  team2: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80",
  medical1: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
  medical2: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&q=80",
  login_bg: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=80",
};
