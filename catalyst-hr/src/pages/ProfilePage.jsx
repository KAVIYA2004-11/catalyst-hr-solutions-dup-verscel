import { useState } from "react";
import { T } from "../data/config";
import { Btn, Card, Field } from "../components/UI";

export default function ProfilePage({ user, onUpdateProfile, toast }) {
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    bio: user?.bio || "",
  });
  const [loading, setLoading] = useState(false);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSave = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(r => setTimeout(r, 800));
      onUpdateProfile(form);
      toast.add("Profile updated successfully!", "success");
    } catch (err) {
      toast.add("Failed to update profile", "error");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div style={{ padding: 80, textAlign: "center" }}>
        <div style={{ fontSize: 48, marginBottom: 20 }}>👤</div>
        <h2 style={{ color: T.dark }}>Please sign in to view your profile</h2>
      </div>
    );
  }

  return (
    <div className="page" style={{ background: T.off, minHeight: "90vh", padding: "60px 28px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 800, color: T.dark, marginBottom: 32 }}>
          Your Profile
        </h1>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 32, alignItems: "start" }}>
          {/* Left: Avatar Card */}
          <Card sx={{ padding: 32, textAlign: "center" }}>
            <div style={{ 
              width: 120, 
              height: 120, 
              borderRadius: "50%", 
              background: `linear-gradient(135deg, ${T.teal}, ${T.tealLt})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 48,
              color: "#fff",
              margin: "0 auto 20px",
              boxShadow: "0 10px 20px rgba(0,137,123,0.2)"
            }}>
              {form.name ? form.name[0].toUpperCase() : "U"}
            </div>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: T.dark, margin: "0 0 8px" }}>{form.name}</h2>
            <p style={{ color: T.greyMd, fontSize: 14, margin: 0 }}>{user.role === "admin" ? "Administrator" : "Candidate"}</p>
            
            <div style={{ marginTop: 24, paddingTop: 24, borderTop: `1px solid ${T.border}` }}>
              <div style={{ fontSize: 12, color: T.greyLt, fontWeight: 600, textTransform: "uppercase", marginBottom: 12 }}>Member Since</div>
              <div style={{ fontSize: 14, color: T.dark, fontWeight: 700 }}>March 2026</div>
            </div>
          </Card>

          {/* Right: Info Card */}
          <Card sx={{ padding: 32 }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: T.dark, marginBottom: 24, display: "flex", alignItems: "center", gap: 10 }}>
              <span>Personal Information</span>
            </h3>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              <Field label="Full Name" value={form.name} onChange={v => set("name", v)} ph="e.g. John Doe" />
              <Field label="Email Address" value={form.email} onChange={v => set("email", v)} ph="john@example.com" dis />
            </div>

            <Field label="Phone Number" value={form.phone} onChange={v => set("phone", v)} ph="+91 98765 43210" />
            <Field label="Professional Bio" value={form.bio} onChange={v => set("bio", v)} ph="Tell us about yourself..." rows={4} />

            <div style={{ marginTop: 12, display: "flex", justifyContent: "flex-end" }}>
              <Btn onClick={handleSave} disabled={loading} full={false}>
                {loading ? "Saving..." : "Save Changes"}
              </Btn>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
