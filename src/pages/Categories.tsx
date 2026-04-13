import { AdminHeader } from "@/components/AdminHeader";

const categories = [
  { id: "CAT-01", name: "Hardware", parent: "B2B", count: 4521, status: "Active" },
  { id: "CAT-02", name: "Legal (Corporate)", parent: "SVC", count: 1230, status: "Active" },
  { id: "CAT-03", name: "HVAC Repair", parent: "SVC", count: 892, status: "Active" },
  { id: "CAT-04", name: "Grocery", parent: "RETAIL", count: 12450, status: "Active" },
  { id: "CAT-05", name: "IT Consulting", parent: "SVC", count: 3200, status: "Active" },
  { id: "CAT-06", name: "Dental", parent: "HEALTH", count: 2100, status: "Active" },
  { id: "CAT-07", name: "Transport", parent: "SVC", count: 5600, status: "Active" },
  { id: "CAT-08", name: "Venues", parent: "EVENT", count: 890, status: "Under Review" },
  { id: "CAT-09", name: "Pet Care", parent: "SVC", count: 0, status: "New" },
];

export default function Categories() {
  return (
    <>
      <AdminHeader searchPlaceholder="SEARCH_CATEGORIES: NAME, PARENT..." />
      <div className="flex-1 overflow-y-auto p-6 lg:p-8">
        <div className="flex items-end justify-between mb-4">
          <h1 className="text-xl font-semibold uppercase tracking-tight">Category Taxonomy</h1>
          <button className="font-mono text-[10px] border border-primary text-primary px-3 py-1 hover:bg-primary/10 transition-colors">
            [ADD_CATEGORY]
          </button>
        </div>

        <div className="bg-card border border-border overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-muted border-b border-border font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                <th className="px-4 py-2 border-r border-border w-24">ID</th>
                <th className="px-4 py-2 border-r border-border w-24">Parent</th>
                <th className="px-4 py-2 border-r border-border">Category Name</th>
                <th className="px-4 py-2 border-r border-border w-28 text-right">Listings</th>
                <th className="px-4 py-2 border-r border-border w-28">Status</th>
                <th className="px-4 py-2 w-28 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {categories.map((c) => (
                <tr key={c.id} className="border-b border-border hover:bg-card/80 transition-colors">
                  <td className="px-4 py-3 border-r border-border font-mono text-xs text-muted-foreground">{c.id}</td>
                  <td className="px-4 py-3 border-r border-border font-mono text-xs text-primary">{c.parent}</td>
                  <td className="px-4 py-3 border-r border-border font-medium text-foreground">{c.name}</td>
                  <td className="px-4 py-3 border-r border-border font-mono text-xs text-right tabular-nums">{c.count.toLocaleString()}</td>
                  <td className="px-4 py-3 border-r border-border">
                    <span className={`inline-flex border px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wide ${
                      c.status === "Active" ? "border-success bg-success/10 text-success" :
                      c.status === "New" ? "border-primary bg-primary/10 text-primary" :
                      "border-warning bg-warning/10 text-warning"
                    }`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-xs space-x-2">
                    <button className="text-primary hover:text-foreground transition-colors">[EDIT]</button>
                    <button className="text-destructive hover:text-foreground transition-colors">[DEL]</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
