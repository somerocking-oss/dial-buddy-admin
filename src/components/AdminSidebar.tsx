import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const navItems = [
  { label: "Dashboard", path: "/", shortcut: "D" },
  { label: "Businesses", path: "/businesses", shortcut: "B" },
  { label: "Reviews", path: "/reviews", shortcut: "R" },
  { label: "Users", path: "/users", shortcut: "U" },
  { label: "Categories", path: "/categories", shortcut: "C" },
  { label: "Roles", path: "/roles", shortcut: "A" },
];

export function AdminSidebar() {
  const location = useLocation();
  const { user, signOut } = useAuth();

  return (
    <aside className="w-64 bg-sidebar text-sidebar-foreground flex flex-col shrink-0">
      <div className="h-14 flex items-center px-4 border-b border-sidebar-border bg-sidebar-hover">
        <span className="font-mono text-sm tracking-widest font-semibold uppercase text-sidebar-muted">
          JD_Admin // v1.0
        </span>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 font-mono text-xs">
        <div className="px-4 mb-2 text-sidebar-muted tracking-widest uppercase">
          Core Functions
        </div>
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`flex items-center px-4 py-2 border-l-2 transition-colors ${
                isActive
                  ? "border-sidebar-active bg-sidebar-hover text-sidebar-foreground"
                  : "border-transparent text-sidebar-muted hover:bg-sidebar-hover hover:text-sidebar-foreground"
              }`}
            >
              <span className="w-6 text-sidebar-muted">[{item.shortcut}]</span>
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      <div className="p-4 border-t border-sidebar-border font-mono text-xs text-sidebar-muted">
        <div className="mb-2 truncate">{user?.email}</div>
        Status: <span className="text-success">ONLINE</span>
        <button
          onClick={signOut}
          className="mt-2 block text-destructive hover:underline"
        >
          [LOGOUT]
        </button>
      </div>
    </aside>
  );
}
