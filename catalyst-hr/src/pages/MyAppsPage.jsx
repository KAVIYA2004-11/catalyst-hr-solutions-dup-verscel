import { T, STAGES, STAGE_COLORS } from "../data/config";
import Timeline from "../components/Timeline";

export default function MyAppsPage({ apps, user }) {
  const mine = user ? apps.filter(a => a.email === user.email) : [];

  return (
    <div className="page" style={{ background: T.off, minHeight: "80vh", padding: "48px 0" }}>
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 28px" }}>

        {/* Page header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
          <div>
            <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 30, fontWeight: 800, color: T.dark, margin: 0 }}>
              My Job Applications
            </h1>
            <p style={{ color: T.greyMd, marginTop: 6, fontSize: 14 }}>
              Your progress is updated live by our recruitment team.
            </p>
          </div>
          {mine.length > 0 && (
            <div style={{ background: T.white, border: `1.5px solid ${T.border}`, borderRadius: 10, padding: "10px 20px", fontSize: 14, fontWeight: 700, color: T.dark }}>
              {mine.length} Total
            </div>
          )}
        </div>

        {/* States */}
        {!user ? (
          <div style={{ background: T.white, borderRadius: 16, border: `1px solid ${T.border}`, padding: "60px 40px", textAlign: "center" }}>
            <div style={{ fontSize: 52, marginBottom: 16 }}>🔐</div>
            <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 8, color: T.dark }}>Sign in to view your applications</div>
            <div style={{ color: T.greyMd }}>Create a free account to track your recruitment progress.</div>
          </div>
        ) : !mine.length ? (
          <div style={{ background: T.white, borderRadius: 16, border: `1px solid ${T.border}`, padding: "60px 40px", textAlign: "center" }}>
            <div style={{ fontSize: 52, marginBottom: 16 }}>📋</div>
            <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 8, color: T.dark }}>No applications yet</div>
            <div style={{ color: T.greyMd }}>Browse open positions and apply to get started.</div>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {mine.map((app, i) => (
              <div key={app.id} className="fade-up"
                style={{ animationDelay: `${i * .08}s`, background: T.white, borderRadius: 16, border: `1px solid ${T.border}`, overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,.04)" }}>

                {/* Card header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 28px", borderBottom: `1px solid ${T.border}`, flexWrap: "wrap", gap: 12 }}>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 18, color: T.dark, fontFamily: "'Playfair Display',serif" }}>{app.jobTitle}</div>
                    <div style={{ fontSize: 13, color: T.greyMd, marginTop: 3 }}>
                      Applied on {new Date(app.date).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}
                    </div>
                  </div>
                  {/* Status badge */}
                  <div style={{
                    background: app.status === "Rejected" ? "#FEE2E2" : T.teal,
                    color:      app.status === "Rejected" ? T.red : "#fff",
                    borderRadius: 8, padding: "7px 18px", fontSize: 13, fontWeight: 700,
                  }}>
                    {app.status}
                  </div>
                </div>

                {/* Progress Bar — terminal statuses always 100% */}
                {(() => {
                  const terminal = app.status === "Selected" || app.status === "Rejected";
                  const pct = terminal ? 100 : Math.round(((STAGES.indexOf(app.status) + 1) / STAGES.length) * 100);
                  const color = STAGE_COLORS[app.status] || T.teal;
                  return (
                    <div style={{ padding: "0 28px", marginBottom: 16 }}>
                      <div style={{ height: 8, width: "100%", background: T.off, borderRadius: 10, overflow: "hidden", border: `1px solid ${T.border}` }}>
                        <div style={{
                          height: "100%",
                          width: `${pct}%`,
                          background: color,
                          transition: "width .7s cubic-bezier(0.34, 1.56, 0.64, 1)",
                          boxShadow: `0 0 8px ${color}60`,
                        }} />
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 7 }}>
                        <span style={{ fontSize: 11, fontWeight: 700, color: T.greyMd, textTransform: "uppercase", letterSpacing: ".5px" }}>Progress</span>
                        <span style={{ fontSize: 12, fontWeight: 800, color }}>{pct}% Complete</span>
                      </div>
                      {/* Terminal status message */}
                      {terminal && (
                        <div style={{
                          marginTop: 14,
                          padding: "14px 18px",
                          borderRadius: 10,
                          background: app.status === "Selected" ? "#D1FAE518" : "#FEE2E218",
                          border: `1.5px solid ${color}40`,
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                        }}>
                          <span style={{ fontSize: 22 }}>{app.status === "Selected" ? "🎉" : "📋"}</span>
                          <div>
                            <div style={{ fontWeight: 700, fontSize: 13, color }}>
                              {app.status === "Selected" ? "Congratulations! You've been selected." : "Application not progressed at this time."}
                            </div>
                            <div style={{ fontSize: 12, color: T.greyMd, marginTop: 2 }}>
                              {app.status === "Selected"
                                ? "Our team will reach out with next steps. Check your email for details."
                                : "Thank you for your interest. You'll receive a confirmation email. We encourage you to apply again."}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })()}

                {/* Timeline */}
                <div style={{ padding: "0 28px 32px" }}>
                  <div style={{ fontWeight: 700, fontSize: 13, color: T.dark, marginBottom: 24 }}>Detailed Timeline</div>
                  <Timeline tl={app.timeline || ["Applied"]} status={app.status} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
