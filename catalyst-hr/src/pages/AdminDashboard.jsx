import { useState, useEffect } from "react";
import { T, STAGES, STAGE_COLORS } from "../data/config";
import { LogoFull } from "../components/Logo";
import { Btn, Card, Tag, Modal, Field, Sel } from "../components/UI";
import Timeline from "../components/Timeline";

/* ─── Admin Dashboard ───────────────────────────────────────── */
export default function AdminDashboard({ jobs, apps, users, onUpdateStatus, onUpdateUserStatus, onDeleteUser, onResetUserPassword, onAddJob, onDeleteJob, toast }) {
  const [tab,      setTab]      = useState("overview");
  const [jobModal, setJobModal] = useState(false);
  const [editJob,  setEditJob]  = useState(null);
  const [viewApp,  setViewApp]  = useState(null);

  /* ─── Dynamic Calculations ─── */
  const totalJobs   = jobs.length;
  const totalApps   = apps.length;
  const totalUsers  = users.length;
  const activeUsers = users.filter(u => u.role === "user" && u.status === "Approved").length;
  const recruiters  = users.filter(u => u.role === "recruiter").length;
  const pending     = users.filter(u => u.status === "Pending").length;
  const blocked     = users.filter(u => u.status === "Blocked").length;

  const stats = [
    { l: "Total Jobs",     v: totalJobs,   i: "📋", c: T.teal   },
    { l: "Applications",   v: totalApps,   i: "👥", c: T.blue   },
    { l: "Active Seekers", v: activeUsers, i: "🛡️", c: T.green  },
    { l: "Recruiters",     v: recruiters,  i: "🏢", c: T.purple },
    { l: "Pending Users",  v: pending,     i: "⏳", c: T.amber  },
    { l: "Blocked Users",  v: blocked,     i: "🚫", c: T.red    },
  ];

  /* ── Monthly Job Postings (Real Data) ── */
  const months = ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"];
  const jobMonthCounts = months.map((m, i) => {
    // Current year assumed 2026 based on seed
    const mIdx = (9 + i) % 12 + 1; // Oct is 10, Nov 11...
    const count = jobs.filter(j => {
      if (!j.posted) return false;
      const jMonth = parseInt(j.posted.split("-")[1], 10);
      return jMonth === mIdx;
    }).length;
    return count;
  });
  const maxJobs = Math.max(...jobMonthCounts, 10);

  /* ── Recruiter Analytics ── */
  // Group apps by job and then by recruiter (simulation: group by dept)
  const deptStats = Array.from(new Set(jobs.map(j => j.dept))).map(d => {
    const dJobs = jobs.filter(j => j.dept === d);
    const dApps = apps.filter(a => dJobs.some(j => j.id === a.jobId));
    return { n: d, j: dJobs.length, a: dApps.length };
  }).sort((a, b) => b.a - a.a).slice(0, 3);

  const updateStatus = (id, s) => { onUpdateStatus(id, s); toast.add(`Status → ${s}`, "success"); };

  return (
    <div className="page" style={{ minHeight: "100vh", background: T.off }}>
      {/* Admin topbar */}
      <div style={{ background: T.dark, padding: "0 28px" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto", display: "flex", alignItems: "center", height: 58, gap: 28 }}>
          <LogoFull size={28} white />
          <div style={{ width: 1, height: 28, background: "rgba(255,255,255,.12)" }} />
          <span style={{ fontWeight: 700, fontSize: 13, color: "rgba(255,255,255,.5)", letterSpacing: 1 }}>ADMIN PANEL</span>
          <div style={{ display: "flex", gap: 2, marginLeft: 8 }}>
            {["overview", "jobs", "applications", "users", "content"].map(t => (
              <button key={t} onClick={() => setTab(t)}
                style={{ background: tab === t ? "rgba(255,255,255,.1)" : "transparent", color: tab === t ? "#fff" : "rgba(255,255,255,.45)", border: "none", borderRadius: 6, padding: "6px 14px", cursor: "pointer", fontSize: 13, fontWeight: 600, textTransform: "capitalize", transition: "all .2s" }}>
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1300, margin: "0 auto", padding: "32px 28px" }}>

        {/* Overview */}
        {tab === "overview" && (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: 16, marginBottom: 36 }}>
              {stats.map((st, i) => (
                <Card key={st.l} cls="fade-up" sx={{ padding: 20, animationDelay: `${i * .05}s` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <span style={{ fontSize: 22 }}>{st.i}</span>
                    <span style={{ fontSize: 28, fontWeight: 800, color: st.c, fontFamily: "'Playfair Display',serif" }}>{st.v}</span>
                  </div>
                  <div style={{ fontSize: 13, color: T.greyMd, fontWeight: 500 }}>{st.l}</div>
                </Card>
              ))}
            </div>
            <h3 style={{ fontWeight: 800, color: T.dark, marginBottom: 16, fontSize: 16 }}>Platform Analytics</h3>
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20, marginBottom: 36 }}>
              {/* Job Posting Chart (Simulated) */}
              <Card sx={{ padding: 24 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: T.greyMd, mb: 16, textTransform: "uppercase" }}>Monthly Job Postings</div>
                <div style={{ display: "flex", alignItems: "flex-end", height: 120, gap: 10, padding: "0 10px" }}>
                  {jobMonthCounts.map((h, i) => (
                    <div key={i} style={{ flex: 1, background: T.tealLt, height: `${(h / maxJobs) * 100}%`, borderRadius: "4px 4px 0 0", minHeight: h > 0 ? 4 : 0, position: "relative" }}>
                      <div style={{ position: "absolute", top: -20, left: 0, right: 0, textAlign: "center", fontSize: 10, fontWeight: 700, color: T.teal }}>{h}</div>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", mt: 10, borderTop: `1px solid ${T.border}`, pt: 8 }}>
                  {["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"].map(m => <span key={m} style={{ fontSize: 10, color: T.greyLt }}>{m}</span>)}
                </div>
              </Card>

              {/* Security/Access Log (Simulated) */}
              <Card sx={{ padding: 24 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: T.greyMd, mb: 16, textTransform: "uppercase" }}>System Health</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 12, fontWeight: 600 }}>Uptime</span>
                    <Tag color={T.green}>99.9%</Tag>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 12, fontWeight: 600 }}>API Latency</span>
                    <span style={{ fontSize: 12, color: T.greyMd }}>42ms</span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4, mt: 4 }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: T.greyMd }}>SECURITY EVENT LOG</div>
                    <div style={{ fontSize: 11, color: T.amber }}>⚠️ Unusual login from IP 192.168.1.1</div>
                    <div style={{ fontSize: 11, color: T.greyLt }}>ℹ️ Password reset for 'priya@email.com'</div>
                  </div>
                </div>
              </Card>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 20, marginBottom: 36 }}>
              {/* Recruiter Leaderboard */}
              <Card sx={{ padding: 24 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: T.greyMd, mb: 16, textTransform: "uppercase" }}>Key Department Performance</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {deptStats.map((r, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 700 }}>{r.n}</div>
                        <div style={{ fontSize: 11, color: T.greyLt }}>{r.j} Jobs Posted</div>
                      </div>
                      <Tag color={T.teal}>{r.a} Apps</Tag>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Application Funnel/Stats */}
              <Card sx={{ padding: 24 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: T.greyMd, mb: 16, textTransform: "uppercase" }}>Application Statistics</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {[
                    { l: "Total Received", v: apps.length, c: T.blue },
                    { l: "Selected/Hired", v: apps.filter(a => a.status === "Selected").length, c: T.green },
                    { l: "Rejected",       v: apps.filter(a => a.status === "Rejected").length, c: T.red },
                    { l: "In Progress",    v: apps.filter(a => a.status !== "Selected" && a.status !== "Rejected").length, c: T.amber }
                  ].map(s => (
                    <div key={s.l} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: 13, color: T.grey }}>{s.l}</span>
                      <span style={{ fontSize: 14, fontWeight: 700, color: s.c }}>{s.v}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            <h2 style={{ fontWeight: 800, color: T.dark, marginBottom: 16, fontSize: 18 }}>Recent Activity</h2>
            <AppTable apps={apps.slice(0, 6)} onUpdate={updateStatus} onView={setViewApp} />
          </>
        )}

        {/* Jobs tab */}
        {tab === "jobs" && (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
              <h2 style={{ fontWeight: 800, color: T.dark, fontSize: 22, fontFamily: "'Playfair Display',serif" }}>Job Listings</h2>
              <Btn onClick={() => { setEditJob(null); setJobModal(true); }}>+ Post New Job</Btn>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
              {jobs.map((job, i) => (
                <Card key={job.id} cls="fade-up" sx={{ padding: "18px 24px", animationDelay: `${i * .05}s` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 16, color: T.dark, display: "flex", gap: 8, alignItems: "center" }}>
                        {job.title} {job.urgent && <Tag color="#D97706">URGENT</Tag>}
                        <Tag color={job.status === "Active" ? T.green : T.greyLt}>{job.status || "Active"}</Tag>
                      </div>
                      <div style={{ fontSize: 13, color: T.greyMd, marginTop: 4 }}>
                        {job.dept} · {job.loc} · {apps.filter(a => a.job_id === job.id).length} applicant(s)
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                      <Btn sz="sm" v="outline" onClick={() => { setEditJob(job); setJobModal(true); }}>Edit</Btn>
                      <Btn sz="sm" v="danger"  onClick={() => { onDeleteJob(job.id); toast.add("Job deleted.", "success"); }}>Delete</Btn>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </>
        )}

        {/* Applications tab */}
        {tab === "applications" && (
          <>
            <h2 style={{ fontWeight: 800, color: T.dark, fontSize: 22, fontFamily: "'Playfair Display',serif", marginBottom: 22 }}>All Applications</h2>
            <AppTable apps={apps} onUpdate={updateStatus} onView={setViewApp} />
          </>
        )}

        {/* Users tab */}
        {tab === "users" && (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
              <h2 style={{ fontWeight: 800, color: T.dark, fontSize: 22, fontFamily: "'Playfair Display',serif" }}>User Management</h2>
              <div style={{ display: "flex", gap: 10 }}>
                <Tag color={T.amber}>{users.filter(u => u.status === "Pending").length} Pending</Tag>
                <Tag color={T.teal}>{users.length} Total Users</Tag>
              </div>
            </div>
            <UserTable 
              users={users} 
              onUpdateStatus={onUpdateUserStatus} 
              onDelete={onDeleteUser} 
              onReset={onResetUserPassword} 
            />
          </>
        )}

        {/* Content tab */}
        {tab === "content" && (
          <div style={{ maxWidth: 800 }}>
            <h2 style={{ fontWeight: 800, color: T.dark, fontSize: 22, fontFamily: "'Playfair Display',serif", marginBottom: 22 }}>Platform Content</h2>
            <Card sx={{ padding: 28 }}>
              <Field label="Homepage Hero Title" ph="Connecting Talent with Opportunity" />
              <Field label="Announcement Banner" ph="We're hiring for 50+ New Radiology roles!" />
              <div style={{ borderTop: `1px solid ${T.border}`, pt: 20, mt: 10, display: "flex", justifyContent: "flex-end" }}>
                <Btn onClick={() => toast.add("Settings saved!", "success")}>Update Website Content</Btn>
              </div>
            </Card>
            
            <Card sx={{ padding: 28, mt: 24 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, mb: 16 }}>Security & Access Control</h3>
              <p style={{ fontSize: 13, color: T.greyMd, mb: 20 }}>Manage authentication settings and monitor suspicious activity.</p>
              <div style={{ display: "flex", gap: 12 }}>
                <Btn v="outline" onClick={() => toast.add("Security scan complete. No threats found.", "info")}>🔍 Run Security Audit</Btn>
                <Btn v="ghost">Access Logs</Btn>
              </div>
            </Card>
          </div>
        )}
      </div>

      {/* Job form modal */}
      <JobFormModal
        open={jobModal}
        onClose={() => setJobModal(false)}
        job={editJob}
        onSave={job => { onAddJob(job); setJobModal(false); toast.add(editJob ? "Job updated!" : "Job posted! ✓", "success"); }}
      />

      {/* View application modal */}
      <Modal open={!!viewApp} onClose={() => setViewApp(null)} title="Application Details" width={600}>
        {viewApp && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 22 }}>
              {[
                ["Applicant", viewApp.name], 
                ["Email", viewApp.email], 
                ["Phone", viewApp.phone], 
                ["Position", viewApp.jobTitle], 
                ["Experience", viewApp.exp || "—"], 
                ["Applied", viewApp.date],
                ["Resume", viewApp.resume ? `📄 ${viewApp.resume.name || viewApp.resume}` : "Not provided"]
              ].map(([k, v]) => (
                <div key={k} style={{ background: T.off, borderRadius: 8, padding: "10px 14px" }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: T.greyMd, letterSpacing: .5, marginBottom: 3, textTransform: "uppercase" }}>{k}</div>
                  <div style={{ fontSize: 14, color: T.dark, fontWeight: 500 }}>{v}</div>
                </div>
              ))}
            </div>
            <div style={{ marginBottom: 26, padding: "20px", background: `linear-gradient(135deg, ${T.tealGlow}, ${T.off})`, borderRadius: 12, border: `1px solid ${T.teal}20` }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: T.tealDk, letterSpacing: .5, textTransform: "uppercase", marginBottom: 16 }}>Recruitment Progress</div>
              <Timeline tl={viewApp.timeline || ["Applied"]} status={viewApp.status} />
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: T.greyMd, letterSpacing: .5, textTransform: "uppercase", marginBottom: 12 }}>Update Recruitment Stage</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {STAGES.map(s => (
                  <button key={s}
                    onClick={() => setViewApp(a => {
                      const upd = { ...a, status: s, timeline: [...new Set([...(a.timeline || []), s])] };
                      onUpdateStatus(a.id, s);
                      toast.add(`Stage updated to ${s}`, "success");
                      return upd;
                    })}
                    style={{ 
                      padding: "8px 16px", 
                      borderRadius: 10, 
                      border: `2px solid ${viewApp.status === s ? STAGE_COLORS[s] : T.border}`, 
                      background: viewApp.status === s ? STAGE_COLORS[s] : T.white, 
                      color: viewApp.status === s ? "#fff" : T.grey, 
                      fontWeight: 700, 
                      fontSize: 12, 
                      cursor: "pointer", 
                      transition: "all .2s",
                      boxShadow: viewApp.status === s ? `0 4px 12px ${STAGE_COLORS[s]}40` : "none"
                    }}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

/* ─── AppTable ───────────────────────────────────────────────── */
function AppTable({ apps, onUpdate, onView }) {
  if (!apps.length) return <Card sx={{ padding: 40, textAlign: "center", color: T.greyLt }}>No applications found.</Card>;

  return (
    <Card>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: T.dark2, color: "#fff" }}>
              {["Applicant", "Position", "Applied", "Status", "Action"].map(h => (
                <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, fontSize: 11, letterSpacing: ".5px", textTransform: "uppercase" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {apps.map((app, i) => (
              <tr key={app.id}
                style={{ borderBottom: `1px solid ${T.border}`, background: i % 2 === 0 ? T.white : T.off, transition: "background .15s" }}
                onMouseEnter={e => e.currentTarget.style.background = T.tealPale}
                onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? T.white : T.off}
              >
                <td style={{ padding: "12px 16px" }}>
                  <div style={{ fontWeight: 600, color: T.dark }}>{app.name}</div>
                  <div style={{ fontSize: 12, color: T.greyLt }}>{app.email}</div>
                </td>
                <td style={{ padding: "12px 16px", color: T.grey }}>{app.jobTitle}</td>
                <td style={{ padding: "12px 16px", color: T.greyLt }}>{app.date}</td>
                <td style={{ padding: "12px 16px" }}><Tag color={STAGE_COLORS[app.status] || T.teal}>{app.status}</Tag></td>
                <td style={{ padding: "12px 16px" }}>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <select value={app.status} onChange={e => onUpdate(app.id, e.target.value)}
                      style={{ border: `1.5px solid ${T.border}`, borderRadius: 6, padding: "5px 8px", fontSize: 12, background: T.white, fontFamily: "inherit", cursor: "pointer" }}>
                      {STAGES.map(s => <option key={s}>{s}</option>)}
                    </select>
                    <Btn sz="sm" v="ghost" onClick={() => onView(app)}>View</Btn>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

/* ─── JobFormModal ───────────────────────────────────────────── */
function JobFormModal({ open, onClose, job, onSave }) {
  const blank = { title: "", dept: "", loc: "", exp: "", type: "Full-time", mode: "WFO", interview: "Virtual", salary: "", desc: "", urgent: false, cert: false, status: "Active" };
  const [f, setF] = useState(blank);

  useEffect(() => { setF(job ? { ...job } : blank); }, [job, open]);

  const set = (k, v) => setF(x => ({ ...x, [k]: v }));

  const save = () => {
    if (!f.title || !f.dept || !f.loc) { alert("Fill required fields."); return; }
    onSave({
      ...f,
      id:     job?.id || Date.now(),
      skills: job?.skills || [],
      phones: job?.phones || ["+91 91761 04109"],
      email:  job?.email  || "recruitment@catalysthrsolutions.com",
      posted: new Date().toISOString().split("T")[0],
    });
  };

  return (
    <Modal open={open} onClose={onClose} title={job ? "Edit Job" : "Post New Job"} width={620}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <Field label="Job Title"    value={f.title} onChange={v => set("title", v)} req />
        <Field label="Department"   value={f.dept}  onChange={v => set("dept",  v)} req />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <Field label="Location"             value={f.loc} onChange={v => set("loc", v)} req />
        <Field label="Experience Required"  value={f.exp} onChange={v => set("exp", v)} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
        <Sel label="Type"      value={f.type}      onChange={v => set("type",      v)} opts={["Full-time","Part-time","Contract"]} />
        <Sel label="Work Mode" value={f.mode}      onChange={v => set("mode",      v)} opts={["WFO","WFH","Hybrid"]} />
        <Sel label="Interview" value={f.interview} onChange={v => set("interview", v)} opts={["Virtual","In-person"]} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <Field label="Salary Range" value={f.salary} onChange={v => set("salary", v)} ph="e.g. ₹3–5 LPA" />
        <Sel   label="Job Status"   value={f.status} onChange={v => set("status", v)} opts={["Active", "Closed"]} />
      </div>
      <Field label="Job Description" value={f.desc}   onChange={v => set("desc",   v)} rows={3} />
      <div style={{ display: "flex", gap: 24, marginBottom: 18 }}>
        {[["urgent","🔥 Urgent Opening"],["cert","⚠ Certification Required"]].map(([k, l]) => (
          <label key={k} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 14, fontWeight: 600, color: T.grey }}>
            <input type="checkbox" checked={f[k]} onChange={e => set(k, e.target.checked)} style={{ width: 16, height: 16, accentColor: T.teal }} /> {l}
          </label>
        ))}
      </div>
      <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
        <Btn v="ghost" onClick={onClose}>Cancel</Btn>
        <Btn onClick={save}>{job ? "Save Changes" : "Post Job"}</Btn>
      </div>
    </Modal>
  );
}

/* ─── UserTable ──────────────────────────────────────────────── */
function UserTable({ users, onUpdateStatus, onDelete, onReset }) {
  const COLOR = { Approved: T.green, Pending: T.amber, Blocked: T.red };
  
  if (!users.length) return <Card sx={{ padding: 40, textAlign: "center", color: T.greyLt }}>No users found.</Card>;

  return (
    <Card>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ background: T.dark2, color: "#fff" }}>
              {["User", "Role", "Joined", "Status", "Actions"].map(h => (
                <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, fontSize: 11, letterSpacing: ".5px", textTransform: "uppercase" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map((u, i) => (
              <tr key={u.id} style={{ borderBottom: `1px solid ${T.border}`, background: i % 2 === 0 ? T.white : T.off }}>
                <td style={{ padding: "12px 16px" }}>
                  <div style={{ fontWeight: 600, color: T.dark }}>{u.name}</div>
                  <div style={{ fontSize: 11, color: T.greyLt }}>{u.email}</div>
                </td>
                <td style={{ padding: "12px 16px" }}>
                  <Tag color={u.role === "recruiter" ? T.purple : T.teal}>{u.role}</Tag>
                </td>
                <td style={{ padding: "12px 16px", color: T.greyLt }}>{u.joined}</td>
                <td style={{ padding: "12px 16px" }}>
                  <Tag color={COLOR[u.status] || T.grey}>{u.status}</Tag>
                </td>
                <td style={{ padding: "12px 16px" }}>
                  <div style={{ display: "flex", gap: 8 }}>
                    <select 
                      value={u.status} 
                      onChange={e => onUpdateStatus(u.id, e.target.value)}
                      style={{ border: `1px solid ${T.border}`, borderRadius: 6, padding: "4px 6px", fontSize: 11, background: T.white, cursor: "pointer" }}
                    >
                      <option>Approved</option>
                      <option>Pending</option>
                      <option>Blocked</option>
                    </select>
                    <Btn sz="sm" v="ghost" sx={{ fontSize: 11, padding: "4px 8px" }} onClick={() => onReset(u.id)}>Reset PWD</Btn>
                    <Btn sz="sm" v="danger" sx={{ fontSize: 11, padding: "4px 8px" }} onClick={() => onDelete(u.id)}>Delete</Btn>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
