import { AdminHeader } from "@/components/AdminHeader";

const reviews = [
  { id: "#REV-992", entity: "Sector 7 Motors", user: "anon_4821", time: "09:42 AM", rating: 1, text: "Absolute scam. They quoted me $150 and charged my card $800 without authorization.", reason: "Fraud allegation", severity: "Critical" },
  { id: "#REV-991", entity: "QuickFix Electronics", user: "raj_kumar22", time: "08:15 AM", rating: 1, text: "Owner was extremely rude and used abusive language when I asked about the warranty.", reason: "Abusive language", severity: "High" },
  { id: "#REV-990", entity: "Green Valley Organics", user: "foodie_love", time: "07:30 AM", rating: 2, text: "Found insects in the packaged food. Very unhygienic conditions. Health hazard!", reason: "Health concern", severity: "Critical" },
  { id: "#REV-989", entity: "Sunrise Dental Clinic", user: "smile_seeker", time: "Yesterday", rating: 5, text: "Best best best best best best. 5 stars. Recommend to everyone!!!", reason: "Spam / bot pattern", severity: "Low" },
  { id: "#REV-988", entity: "Metro Cab Services", user: "traveler_x", time: "Yesterday", rating: 1, text: "Driver took a completely different route and charged 3x the normal fare. Possible fake meter.", reason: "Price gouging", severity: "Medium" },
];

const severityColors: Record<string, string> = {
  Critical: "border-destructive bg-destructive/10 text-destructive",
  High: "border-warning bg-warning/10 text-warning",
  Medium: "border-primary bg-primary/10 text-primary",
  Low: "border-border text-muted-foreground",
};

export default function Reviews() {
  return (
    <>
      <AdminHeader searchPlaceholder="SEARCH_REVIEWS: ENTITY, USER, KEYWORD..." />
      <div className="flex-1 overflow-y-auto p-6 lg:p-8">
        <div className="flex items-end justify-between mb-4">
          <div>
            <h1 className="text-xl font-semibold uppercase tracking-tight">Review Moderation Queue</h1>
            <p className="font-mono text-xs text-muted-foreground mt-1">
              {reviews.length} reviews pending moderation
            </p>
          </div>
          <div className="flex gap-2 font-mono text-[10px]">
            <button className="border border-border px-2 py-1 hover:bg-muted transition-colors">[BULK_APPROVE]</button>
            <button className="border border-destructive text-destructive px-2 py-1 hover:bg-destructive/10 transition-colors">[BULK_REJECT]</button>
          </div>
        </div>

        <div className="space-y-3">
          {reviews.map((r) => (
            <div key={r.id} className="bg-card border border-border p-5 flex gap-6 hover:border-primary/30 transition-colors">
              <div className="shrink-0 flex flex-col items-center gap-1">
                <div className="font-mono text-2xl font-medium text-foreground tabular-nums">{r.rating}</div>
                <div className="font-mono text-[10px] text-muted-foreground">★ STAR</div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <span className="font-mono text-xs text-muted-foreground">{r.id}</span>
                    <span className="mx-2 text-border">|</span>
                    <span className="font-mono text-xs text-muted-foreground">{r.time}</span>
                  </div>
                  <span className={`inline-flex border px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wide ${severityColors[r.severity]}`}>
                    {r.severity}
                  </span>
                </div>

                <div className="text-sm font-medium text-foreground mb-1">{r.entity}</div>
                <div className="font-mono text-[10px] text-muted-foreground mb-2">BY: {r.user}</div>

                <p className="text-sm text-muted-foreground border-l-2 border-destructive pl-3 mb-3">
                  "{r.text}"
                </p>

                <div className="font-mono text-[10px] text-muted-foreground">
                  FLAG_REASON: <span className="text-foreground">{r.reason}</span>
                </div>
              </div>

              <div className="shrink-0 flex flex-col gap-2 font-mono text-[10px]">
                <button className="border border-border px-3 py-1.5 hover:bg-muted transition-colors text-left">[APPROVE]</button>
                <button className="border border-border px-3 py-1.5 hover:bg-muted transition-colors text-left">[QUARANTINE]</button>
                <button className="border border-destructive bg-destructive/10 text-destructive px-3 py-1.5 text-left">[DELETE]</button>
                <button className="border border-destructive text-destructive px-3 py-1.5 text-left">[BAN_USER]</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
