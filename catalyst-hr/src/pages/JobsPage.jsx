import { useState, useEffect } from "react";
import { T } from "../data/config";
import { Btn, Card, Tag } from "../components/UI";

export default function JobsPage({ jobs, nav }) {
  const [q, setQ]       = useState("");
  const [dept, setDept] = useState("All");
  const [loc, setLoc]   = useState("All");

  const depts    = ["All", ...new Set(jobs.map(j => j.dept))];
  const locs     = ["All", ...new Set(jobs.flatMap(j => j.loc.split(",").map(l => l.trim())))];
  
  const filtered = jobs.filter(j => {
    const s = q.toLowerCase();
    return (
      (j.title.toLowerCase().includes(s) || j.dept.toLowerCase().includes(s)) &&
      (dept === "All" || j.dept === dept) &&
      (loc  === "All" || j.loc.includes(loc))
    );
  });

  return (
    <div className="page" style={{ background: "#F8FAFC", minHeight: "100vh" }}>
      {/* Dynamic Hero Section */}
      <div style={{ 
        padding: "80px 28px 100px", 
        textAlign: "center", 
        position: "relative", 
        overflow: "hidden", 
        background: `linear-gradient(135deg, ${T.tealDk} 0%, ${T.teal} 100%)`,
        color: "#fff"
      }}>
        <div style={{ 
          position: "absolute", 
          inset: 0, 
          backgroundImage: "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.05) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.05) 0%, transparent 50%)",
          zIndex: 0 
        }} />
        
        <div className="fade-in" style={{ position: "relative", zIndex: 1, maxWidth: 800, margin: "0 auto" }}>
          <Tag color="#fff" sx={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", marginBottom: 20, padding: "6px 16px" }}>EXPLORE OPPORTUNITIES</Tag>
          <h1 style={{ 
            fontFamily: "'Playfair Display', serif", 
            fontSize: "clamp(32px, 5vw, 48px)", 
            fontWeight: 800, 
            margin: "0 0 16px",
            lineHeight: 1.2
          }}>
            Find Your Next <span style={{ color: T.tealLt }}>Career Milestone</span>
          </h1>
          <p style={{ 
            fontSize: 18, 
            color: "rgba(255,255,255,0.8)", 
            marginBottom: 40,
            fontWeight: 500
          }}>
            Curated premium opportunities across Healthcare, IT & BFSI sectors.
          </p>
          
          <div style={{ 
            maxWidth: 600, 
            margin: "0 auto", 
            position: "relative",
            background: "rgba(255,255,255,0.1)",
            backdropFilter: "blur(12px)",
            padding: "8px",
            borderRadius: 16,
            border: "1px solid rgba(255,255,255,0.2)",
            boxShadow: "0 20px 40px rgba(0,0,0,0.2)"
          }}>
            <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
              <span style={{ position: "absolute", left: 16, fontSize: 18 }}>🔍</span>
              <input 
                value={q} 
                onChange={e => setQ(e.target.value)} 
                placeholder="Search roles, skills, or departments..."
                style={{ 
                  width: "100%", 
                  padding: "16px 16px 16px 48px", 
                  borderRadius: 12, 
                  border: "none", 
                  fontSize: 16, 
                  fontFamily: "inherit", 
                  outline: "none",
                  background: "#fff",
                  color: T.dark,
                  boxShadow: "inset 0 2px 4px rgba(0,0,0,0.05)"
                }} 
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: 1200, margin: "-50px auto 0", padding: "0 28px 60px", position: "relative", zIndex: 2 }}>
        {/* Filters Header */}
        <div style={{ 
          background: "#fff", 
          borderRadius: 20, 
          padding: "24px 32px", 
          boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 20,
          marginBottom: 40,
          border: `1px solid ${T.border}`
        }}>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            {[["Department", depts, dept, setDept], ["Location", locs, loc, setLoc]].map(([lbl, opts, val, setter]) => (
              <div key={lbl} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: T.greyMd }}>{lbl}:</span>
                <select 
                  value={val} 
                  onChange={e => setter(e.target.value)}
                  style={{ 
                    border: `1.5px solid ${T.border}`, 
                    borderRadius: 10, 
                    padding: "10px 16px", 
                    fontSize: 14, 
                    background: T.off, 
                    fontFamily: "inherit", 
                    cursor: "pointer",
                    outline: "none",
                    fontWeight: 600,
                    color: T.dark
                  }}
                >
                  {opts.map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 14, fontWeight: 700, color: T.teal, background: T.tealPale, padding: "8px 16px", borderRadius: 10 }}>
            {filtered.length} Open Positions
          </div>
        </div>

        {/* Job Grid */}
        {!filtered.length ? (
          <div style={{ textAlign: "center", padding: "100px 0" }}>
            <div style={{ fontSize: 64, marginBottom: 20 }}>🔭</div>
            <h3 style={{ fontSize: 24, fontWeight: 700, color: T.dark, marginBottom: 8 }}>No matching roles found</h3>
            <p style={{ color: T.greyMd }}>Try adjusting your search terms or filters to see more opportunities.</p>
            <Btn sx={{ marginTop: 24 }} onClick={() => { setQ(""); setDept("All"); setLoc("All"); }}>Clear All Filters</Btn>
          </div>
        ) : (
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))", 
            gap: 24 
          }}>
            {filtered.map((job, i) => (
              <Card 
                key={job.id} 
                cls="fade-up" 
                sx={{ 
                  padding: 0, 
                  cursor: "pointer", 
                  animationDelay: `${i * 0.05}s`,
                  display: "flex",
                  flexDirection: "column",
                  overflow: "hidden",
                  border: `1px solid ${T.border}`,
                  "&:hover": { transform: "translateY(-8px)", boxShadow: "0 20px 40px rgba(0,137,123,0.12)" }
                }} 
                onClick={() => nav("job", job.id)}
              >
                <div style={{ padding: 24, flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                    <div style={{ background: T.tealPale, width: 48, height: 48, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>
                      {job.dept.includes("Medical") ? "🏥" : job.dept.includes("IT") ? "💻" : "💼"}
                    </div>
                    {job.urgent && <Tag color="#D97706" sx={{ background: "#FEF3C7" }}>🔥 URGENT</Tag>}
                  </div>
                  
                  <h3 style={{ fontSize: 20, fontWeight: 700, color: T.dark, marginBottom: 8, fontFamily: "'Playfair Display', serif" }}>{job.title}</h3>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: T.greyMd, marginBottom: 16 }}>
                    <span>📍 {job.loc}</span>
                    <span>•</span>
                    <span>💼 {job.exp}</span>
                  </div>
                  
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    <Tag sx={{ background: T.off, color: T.grey }}>{job.mode}</Tag>
                    <Tag sx={{ background: T.off, color: T.grey }}>{job.type}</Tag>
                  </div>
                </div>
                
                <div style={{ 
                  padding: "16px 24px", 
                  background: T.off, 
                  borderTop: `1px solid ${T.border}`,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}>
                  <div style={{ fontWeight: 700, color: T.teal, fontSize: 14 }}>{job.salary}</div>
                  <Btn sz="sm" v="ghost" sx={{ padding: "4px 0", fontWeight: 700 }}>Apply Now →</Btn>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
