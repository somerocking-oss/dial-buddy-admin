import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AdminHeader } from "@/components/AdminHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type AppRole = "admin" | "moderator" | "user";

interface UserWithRoles {
  id: string;
  email: string;
  created_at: string;
  roles: AppRole[];
}

const ALL_ROLES: AppRole[] = ["admin", "moderator", "user"];

const roleBadgeClass: Record<AppRole, string> = {
  admin: "bg-destructive/10 text-destructive border-destructive/30",
  moderator: "bg-warning/10 text-warning border-warning/30",
  user: "bg-primary/10 text-primary border-primary/30",
};

export default function RoleManagement() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [revokeConfirm, setRevokeConfirm] = useState<{ userId: string; email: string; role: AppRole } | null>(null);

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["admin-users-roles"],
    queryFn: async () => {
      const { data, error } = await supabase.rpc("admin_list_users");
      if (error) throw error;
      return (data as unknown as UserWithRoles[]) ?? [];
    },
  });

  const assignRole = async (userId: string, role: AppRole) => {
    setActionLoading(`${userId}-${role}`);
    try {
      const { error } = await supabase.rpc("admin_assign_role", {
        _user_id: userId,
        _role: role,
      });
      if (error) throw error;
      toast({ title: "SYS_ROLE :: ASSIGNED", description: `Role '${role}' granted.` });
      queryClient.invalidateQueries({ queryKey: ["admin-users-roles"] });
    } catch (err: any) {
      toast({ title: "SYS_ROLE :: ERROR", description: err.message, variant: "destructive" });
    } finally {
      setActionLoading(null);
    }
  };

  const revokeRole = async (userId: string, role: AppRole) => {
    setActionLoading(`${userId}-${role}`);
    try {
      const { error } = await supabase.rpc("admin_revoke_role", {
        _user_id: userId,
        _role: role,
      });
      if (error) throw error;
      toast({ title: "SYS_ROLE :: REVOKED", description: `Role '${role}' removed.` });
      queryClient.invalidateQueries({ queryKey: ["admin-users-roles"] });
    } catch (err: any) {
      toast({ title: "SYS_ROLE :: ERROR", description: err.message, variant: "destructive" });
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <>
      <AdminHeader searchPlaceholder="QUERY_ROLES: EMAIL, USER_ID..." />
      <div className="flex-1 overflow-auto p-6">
        <div className="mb-4">
          <h1 className="font-sans text-xl font-semibold text-foreground">Role Management</h1>
          <p className="font-mono text-xs text-muted-foreground">SYS_RBAC :: Assign and revoke user roles</p>
        </div>
        <div className="bg-card border border-border">
          {/* Table Header */}
          <div className="grid grid-cols-[1fr_2fr_1fr_1.5fr] gap-4 px-4 py-3 border-b border-border font-mono text-xs text-muted-foreground uppercase tracking-wider">
            <span>User ID</span>
            <span>Email</span>
            <span>Current Roles</span>
            <span>Actions</span>
          </div>

          {isLoading ? (
            <div className="p-8 text-center font-mono text-sm text-muted-foreground animate-pulse">
              LOADING_USER_MATRIX...
            </div>
          ) : users.length === 0 ? (
            <div className="p-8 text-center font-mono text-sm text-muted-foreground">
              NO_USERS_FOUND
            </div>
          ) : (
            users.map((user) => (
              <div
                key={user.id}
                className="grid grid-cols-[1fr_2fr_1fr_1.5fr] gap-4 px-4 py-3 border-b border-border last:border-b-0 items-center"
              >
                {/* ID */}
                <span className="font-mono text-xs text-muted-foreground truncate" title={user.id}>
                  {user.id.slice(0, 8)}...
                </span>

                {/* Email */}
                <span className="font-mono text-sm text-foreground truncate">
                  {user.email}
                </span>

                {/* Roles */}
                <div className="flex flex-wrap gap-1">
                  {user.roles.length === 0 ? (
                    <span className="font-mono text-xs text-muted-foreground">NONE</span>
                  ) : (
                    user.roles.map((role) => (
                      <Badge
                        key={role}
                        variant="outline"
                        className={`font-mono text-[10px] uppercase ${roleBadgeClass[role]}`}
                      >
                        {role}
                      </Badge>
                    ))
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-1">
                  {ALL_ROLES.map((role) => {
                    const hasRole = user.roles.includes(role);
                    const key = `${user.id}-${role}`;
                    const loading = actionLoading === key;
                    return (
                      <Button
                        key={role}
                        size="sm"
                        variant={hasRole ? "destructive" : "outline"}
                        className="font-mono text-[10px] h-7 px-2"
                        disabled={loading}
                        onClick={() =>
                          hasRole
                            ? setRevokeConfirm({ userId: user.id, email: user.email, role })
                            : assignRole(user.id, role)
                        }
                      >
                        {loading ? "..." : hasRole ? `- ${role}` : `+ ${role}`}
                      </Button>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <AlertDialog open={!!revokeConfirm} onOpenChange={(open) => !open && setRevokeConfirm(null)}>
        <AlertDialogContent className="font-mono">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-sans">CONFIRM_REVOKE :: {revokeConfirm?.role?.toUpperCase()}</AlertDialogTitle>
            <AlertDialogDescription className="text-xs">
              Remove <span className="text-foreground font-semibold">{revokeConfirm?.role}</span> role from{" "}
              <span className="text-foreground font-semibold">{revokeConfirm?.email}</span>?
              This action can be reversed by re-assigning the role.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="font-mono text-xs">[CANCEL]</AlertDialogCancel>
            <AlertDialogAction
              className="font-mono text-xs bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => {
                if (revokeConfirm) {
                  revokeRole(revokeConfirm.userId, revokeConfirm.role);
                  setRevokeConfirm(null);
                }
              }}
            >
              [EXEC :: REVOKE]
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
