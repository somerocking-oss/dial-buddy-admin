import { AdminHeader } from "@/components/AdminHeader";

const users = [
  { id: "USR-001", name: "Rajesh Kumar", email: "rajesh@example.com", joined: "2024-01-15", listings: 3, reviews: 12, status: "Active" },
  { id: "USR-002", name: "Priya Sharma", email: "priya@example.com", joined: "2024-02-20", listings: 0, reviews: 45, status: "Active" },
  { id: "USR-003", name: "Anonymous_4821", email: "anon@tempmail.com", joined: "2025-04-01", listings: 0, reviews: 8, status: "Flagged" },
  { id: "USR-004", name: "Amit Patel", email: "amit@business.com", joined: "2023-11-10", listings: 12, reviews: 2, status: "Active" },
  { id: "USR-005", name: "Bot_Farm_Suspect", email: "multi@fake.com", joined: "2025-04-10", listings: 0, reviews: 200, status: "Banned" },
  { id: "USR-006", name: "Sneha Reddy", email: "sneha@example.com", joined: "2024-06-05", listings: 1, reviews: 22, status: "Active" },
];

const statusStyles: Record<string, string> = {
  Active: "border-success bg-success/10 text-success",
  Flagged: "border-warning bg-warning/10 text-warning",
  Banned: "border-destructive bg-destructive/10 text-destructive",
};

export default function Users() {
  return (
    <>
      <AdminHeader searchPlaceholder="SEARCH_USERS: NAME, EMAIL, ID..." />
      <div className="flex-1 overflow-y-auto p-6 lg:p-8">
        <div className="flex items-end justify-between mb-4">
          <h1 className="text-xl font-semibold uppercase tracking-tight">User Matrix</h1>
          <span className="font-mono text-xs text-muted-foreground">{users.length} RECORDS</span>
        </div>

        <div className="bg-card border border-border overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-muted border-b border-border font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                <th className="px-4 py-2 border-r border-border w-24">ID</th>
                <th className="px-4 py-2 border-r border-border">Name</th>
                <th className="px-4 py-2 border-r border-border">Email</th>
                <th className="px-4 py-2 border-r border-border w-28">Joined</th>
                <th className="px-4 py-2 border-r border-border w-20 text-center">Listings</th>
                <th className="px-4 py-2 border-r border-border w-20 text-center">Reviews</th>
                <th className="px-4 py-2 border-r border-border w-24">Status</th>
                <th className="px-4 py-2 w-28 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {users.map((u) => (
                <tr key={u.id} className="border-b border-border hover:bg-card/80 transition-colors">
                  <td className="px-4 py-3 border-r border-border font-mono text-xs text-muted-foreground">{u.id}</td>
                  <td className="px-4 py-3 border-r border-border font-medium text-foreground">{u.name}</td>
                  <td className="px-4 py-3 border-r border-border font-mono text-xs text-muted-foreground">{u.email}</td>
                  <td className="px-4 py-3 border-r border-border font-mono text-xs text-muted-foreground">{u.joined}</td>
                  <td className="px-4 py-3 border-r border-border font-mono text-xs text-center tabular-nums">{u.listings}</td>
                  <td className="px-4 py-3 border-r border-border font-mono text-xs text-center tabular-nums">{u.reviews}</td>
                  <td className="px-4 py-3 border-r border-border">
                    <span className={`inline-flex border px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wide ${statusStyles[u.status]}`}>
                      {u.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-xs space-x-2">
                    <button className="text-primary hover:text-foreground transition-colors">[VIEW]</button>
                    <button className="text-destructive hover:text-foreground transition-colors">[BAN]</button>
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
