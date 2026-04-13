import { AdminHeader } from "@/components/AdminHeader";
import { useState } from "react";

const allBusinesses = [
  { id: "#8A2-F9C", name: "Meridian Industrial Supplies", address: "482 Westheimer Pkwy, Sector 4", category: "B2B > HARDWARE", phone: "+91 98765 43210", status: "Verified", rating: 4.2 },
  { id: "#4C1-E2A", name: "Apex Legal Partners", address: "1900 Corporate Blvd, Suite 400", category: "SVC > LEGAL_CORP", phone: "+91 98765 43211", status: "Pending", rating: 0 },
  { id: "#9D3-B7B", name: "Ozone HVAC Services", address: "712 Technician Way, Zone B", category: "SVC > REPAIR_HVAC", phone: "+91 98765 43212", status: "Flagged", rating: 2.1 },
  { id: "#7F2-A1D", name: "Green Valley Organics", address: "55 Market Street, Block 12", category: "RETAIL > GROCERY", phone: "+91 98765 43213", status: "Verified", rating: 4.8 },
  { id: "#2B8-C4E", name: "TechWave Solutions", address: "303 Innovation Park, Tower C", category: "SVC > IT_CONSULT", phone: "+91 98765 43214", status: "Pending", rating: 0 },
  { id: "#6A4-D3F", name: "Sunrise Dental Clinic", address: "88 Health Avenue, Floor 2", category: "HEALTH > DENTAL", phone: "+91 98765 43215", status: "Verified", rating: 4.5 },
  { id: "#1C9-E8G", name: "Metro Cab Services", address: "Plot 14, Transport Nagar", category: "SVC > TRANSPORT", phone: "+91 98765 43216", status: "Verified", rating: 3.9 },
  { id: "#5D7-F2H", name: "Royal Banquet Hall", address: "MG Road, Near City Center", category: "EVENT > VENUE", phone: "+91 98765 43217", status: "Suspended", rating: 1.2 },
];

const statusStyles: Record<string, string> = {
  Verified: "border-success bg-success/10 text-success",
  Pending: "border-primary bg-primary/10 text-primary",
  Flagged: "border-destructive bg-destructive/10 text-destructive",
  Suspended: "border-warning bg-warning/10 text-warning",
};

export default function Businesses() {
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? allBusinesses : allBusinesses.filter((b) => b.status === filter);

  return (
    <>
      <AdminHeader searchPlaceholder="SEARCH_BUSINESS: NAME, ID, PHONE..." />
      <div className="flex-1 overflow-y-auto p-6 lg:p-8">
        <div className="flex items-end justify-between mb-4">
          <h1 className="text-xl font-semibold uppercase tracking-tight">Business Directory</h1>
          <div className="flex gap-2 font-mono text-[10px]">
            {["All", "Verified", "Pending", "Flagged", "Suspended"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`border px-2 py-1 uppercase tracking-wide transition-colors ${
                  filter === f ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-card border border-border overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-muted border-b border-border font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                <th className="px-4 py-2 border-r border-border w-10 text-center">[ ]</th>
                <th className="px-4 py-2 border-r border-border w-24">ID</th>
                <th className="px-4 py-2 border-r border-border">Business Name</th>
                <th className="px-4 py-2 border-r border-border w-40">Category</th>
                <th className="px-4 py-2 border-r border-border w-36">Phone</th>
                <th className="px-4 py-2 border-r border-border w-20">Rating</th>
                <th className="px-4 py-2 border-r border-border w-28">Status</th>
                <th className="px-4 py-2 w-32 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {filtered.map((b) => (
                <tr key={b.id} className="border-b border-border hover:bg-card/80 transition-colors">
                  <td className="px-4 py-3 border-r border-border text-center">
                    <input type="checkbox" className="size-3 accent-primary" />
                  </td>
                  <td className="px-4 py-3 border-r border-border font-mono text-xs text-muted-foreground">{b.id}</td>
                  <td className="px-4 py-3 border-r border-border">
                    <div className="font-medium text-foreground">{b.name}</div>
                    <div className="font-mono text-[10px] text-muted-foreground mt-0.5">{b.address}</div>
                  </td>
                  <td className="px-4 py-3 border-r border-border font-mono text-xs text-muted-foreground">{b.category}</td>
                  <td className="px-4 py-3 border-r border-border font-mono text-xs text-muted-foreground">{b.phone}</td>
                  <td className="px-4 py-3 border-r border-border font-mono text-xs text-foreground">
                    {b.rating > 0 ? `★ ${b.rating}` : "—"}
                  </td>
                  <td className="px-4 py-3 border-r border-border">
                    <span className={`inline-flex border px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wide ${statusStyles[b.status]}`}>
                      {b.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-xs space-x-2">
                    <button className="text-primary hover:text-foreground transition-colors">[VIEW]</button>
                    <button className="text-destructive hover:text-foreground transition-colors">[DEL]</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="bg-muted border-t border-border px-4 py-2 flex items-center justify-between font-mono text-xs text-muted-foreground">
            <span>{filtered.length} records displayed</span>
            <div className="flex gap-2">
              <button className="hover:text-foreground">[EXPORT_CSV]</button>
              <button className="hover:text-foreground">[ADD_NEW]</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
