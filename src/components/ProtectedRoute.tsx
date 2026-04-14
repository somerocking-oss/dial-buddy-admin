import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { session, isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center font-mono text-sm text-muted-foreground">
        <div className="flex flex-col items-center gap-2">
          <div className="animate-pulse">SYS_AUTH :: VERIFYING_SESSION...</div>
        </div>
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center font-mono text-sm text-destructive">
        <div className="flex flex-col items-center gap-4 text-center max-w-md">
          <div className="text-lg font-semibold">ACCESS_DENIED :: 403</div>
          <div className="text-muted-foreground text-xs">
            Your account does not have admin privileges.<br />
            Contact a system administrator to request access.
          </div>
          <button
            onClick={() => window.location.href = "/login"}
            className="font-mono text-xs text-primary hover:underline mt-2"
          >
            [RETURN_TO_LOGIN]
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
