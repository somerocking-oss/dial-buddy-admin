import { AdminHeader } from "@/components/AdminHeader";

const stats = [
  { label: "Total Active Listings", value: "84,291", sub: "+1,024 (24H)", subColor: "text-success" },
  { label: "Pending Verifications", value: "342", sub: "REQUIRES MANUAL AUDIT", subColor: "text-muted-foreground", valueColor: "text-primary" },
  { label: "Flagged Reviews", value: "18", sub: "CRITICAL PRIORITY", subColor: "text-destructive", highlight: true },
  { label: "Active Users", value: "12,847", sub: "NOMINAL", subColor: "text-muted-foreground" },
];

const entities = [
  { id: "#8A2-F9C", name: "Meridian Industrial Supplies", address: "482 Westheimer Pkwy, Sector 4", category: "B2B > HARDWARE", status: "Pending_Doc", statusColor: "border-warning bg-warning/10 text-warning" },
  { id: "#4C1-E2A", name: "Apex Legal Partners", address: "1900 Corporate Blvd, Suite 400", category: "SVC > LEGAL_CORP", status: "New_Entry", statusColor: "border-primary bg-primary/10 text-primary" },
  { id: "#9D3-B7B", name: "Ozone HVAC Services", address: "712 Technician Way, Zone B", category: "SVC > REPAIR_HVAC", status: "Flagged_User", statusColor: "border-destructive bg-destructive/10 text-destructive", flagged: true },
  { id: "#7F2-A1D", name: "Green Valley Organics", address: "55 Market Street, Block 12", category: "RETAIL > GROCERY", status: "New_Entry", statusColor: "border-primary bg-primary/10 text-primary" },
  { id: "#2B8-C4E", name: "TechWave Solutions", address: "303 Innovation Park, Tower C", category: "SVC > IT_CONSULT", status: "Pending_Doc", statusColor: "border-warning bg-warning/10 text-warning" },
];

const reviews = [
  {
    id: "#REV-992-A",
    time: "09:42:11 AM",
    text: '"Absolute scam. They quoted me $150 and charged my card $800 without authorization. Do not use Sector 7 Motors!"',
    entity: "Sector 7 Motors",
  },
  {
    id: "#REV-991-B",
    time: "08:15:33 AM",
    text: '"Owner was extremely rude and used abusive language when I asked about the warranty. Worst experience ever."',
    entity: "QuickFix Electronics",
  },
];

export default function Dashboard() {
  return (
    <>
      <AdminHeader />
      <div className="flex-1 overflow-y-auto p-6 lg:p-8">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className={`bg-card border border-border p-4 ${stat.highlight ? "shadow-[inset_0_0_0_1px_hsl(var(--destructive))]" : ""}`}
            >
              <div className="font-mono text-[10px] text-muted-foreground tracking-widest uppercase mb-1">
                {stat.label}
              </div>
              <div className={`font-mono text-2xl font-medium tabular-nums ${stat.valueColor || "text-foreground"}`}>
                {stat.value}
              </div>
              <div className={`font-mono text-[10px] mt-2 ${stat.subColor}`}>{stat.sub}</div>
            </div>
          ))}
        </div>

        {/* Entity Queue */}
        <div className="mb-8">
          <div className="flex items-end justify-between mb-2">
            <h2 className="text-lg font-semibold uppercase tracking-tight text-foreground">
              Entity Classification Queue
            </h2>
            <span className="font-mono text-xs text-muted-foreground">SHOWING: 1-5 OF 342</span>
          </div>

          <div className="bg-card border border-border overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-muted border-b border-border font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  <th className="px-4 py-2 border-r border-border w-10 text-center">[ ]</th>
                  <th className="px-4 py-2 border-r border-border w-24">UUID</th>
                  <th className="px-4 py-2 border-r border-border">Entity Name &amp; Location</th>
                  <th className="px-4 py-2 border-r border-border w-48">Taxonomy Node</th>
                  <th className="px-4 py-2 border-r border-border w-32">Status</th>
                  <th className="px-4 py-2 w-24 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {entities.map((e) => (
                  <tr key={e.id} className="border-b border-border hover:bg-card/80 transition-colors">
                    <td className="px-4 py-3 border-r border-border text-center">
                      <input type="checkbox" className="size-3 accent-primary" />
                    </td>
                    <td className="px-4 py-3 border-r border-border font-mono text-xs text-muted-foreground">
                      {e.id}
                    </td>
                    <td className="px-4 py-3 border-r border-border">
                      <div className="flex items-center gap-3">
                        <div className="size-10 bg-border shrink-0" />
                        <div>
                          <div className="font-medium text-foreground leading-tight flex items-center gap-2">
                            {e.name}
                            {e.flagged && <span className="size-2 bg-destructive inline-block" />}
                          </div>
                          <div className="font-mono text-[10px] text-muted-foreground mt-0.5">{e.address}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 border-r border-border font-mono text-xs text-muted-foreground">
                      {e.category}
                    </td>
                    <td className="px-4 py-3 border-r border-border">
                      <span className={`inline-flex border px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wide ${e.statusColor}`}>
                        {e.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right font-mono text-xs">
                      <button className="text-primary hover:text-foreground transition-colors">[AUDIT]</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="bg-muted border-t border-border px-4 py-2 flex items-center gap-4 font-mono text-xs text-muted-foreground">
              <span>BATCH ACTION:</span>
              <button className="hover:text-foreground">[APPROVE]</button>
              <button className="hover:text-foreground">[REJECT]</button>
              <button className="hover:text-destructive">[DELETE]</button>
            </div>
          </div>
        </div>

        {/* Review Moderation */}
        <div className="grid grid-cols-2 gap-8">
          <div>
            <div className="flex items-end justify-between mb-2">
              <h2 className="text-lg font-semibold uppercase tracking-tight text-foreground">
                Review Moderation
              </h2>
              <span className="font-mono text-xs text-destructive">18 CRITICAL</span>
            </div>
            <div className="bg-card border border-border p-4 space-y-4">
              {reviews.map((r) => (
                <div key={r.id} className="border-b border-border pb-4 last:border-0 last:pb-0">
                  <div className="flex justify-between items-start mb-1">
                    <div className="font-mono text-xs font-semibold">TRX: {r.id}</div>
                    <div className="font-mono text-[10px] text-muted-foreground">{r.time}</div>
                  </div>
                  <div className="font-mono text-[10px] text-muted-foreground mb-2">
                    RE: {r.entity}
                  </div>
                  <p className="text-sm text-muted-foreground mb-3 border-l-2 border-destructive pl-3">
                    {r.text}
                  </p>
                  <div className="flex gap-2 font-mono text-[10px]">
                    <button className="border border-border px-2 py-1 hover:bg-muted transition-colors">
                      [QUARANTINE]
                    </button>
                    <button className="border border-border px-2 py-1 hover:bg-muted transition-colors">
                      [CLEAR]
                    </button>
                    <button className="border border-destructive bg-destructive/10 text-destructive px-2 py-1">
                      [BAN_USER]
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <div className="flex items-end justify-between mb-2">
              <h2 className="text-lg font-semibold uppercase tracking-tight text-foreground">
                System Activity Log
              </h2>
              <span className="font-mono text-xs text-muted-foreground">LAST 24H</span>
            </div>
            <div className="bg-card border border-border p-4 font-mono text-xs space-y-2">
              {[
                { time: "14:22:01", action: "ENTITY_APPROVED", target: "Green Valley Organics", user: "admin_01" },
                { time: "14:18:45", action: "REVIEW_FLAGGED", target: "Sector 7 Motors", user: "sys_auto" },
                { time: "13:55:12", action: "USER_BANNED", target: "user_#4821", user: "admin_02" },
                { time: "13:40:09", action: "CATEGORY_ADDED", target: "SVC > PET_CARE", user: "admin_01" },
                { time: "12:30:00", action: "ENTITY_REJECTED", target: "Fake Business LLC", user: "admin_01" },
                { time: "11:15:33", action: "BULK_IMPORT", target: "248 entities processed", user: "sys_auto" },
              ].map((log, i) => (
                <div key={i} className="flex items-center gap-4 py-1 border-b border-border/50 last:border-0">
                  <span className="text-muted-foreground w-16 shrink-0">{log.time}</span>
                  <span className={`w-36 shrink-0 ${log.action.includes("BANNED") || log.action.includes("REJECTED") ? "text-destructive" : log.action.includes("APPROVED") ? "text-success" : "text-primary"}`}>
                    {log.action}
                  </span>
                  <span className="text-foreground truncate">{log.target}</span>
                  <span className="text-muted-foreground ml-auto shrink-0">{log.user}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
