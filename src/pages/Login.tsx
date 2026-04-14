import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;
    
    setIsLoading(true);
    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: { emailRedirectTo: window.location.origin },
        });
        if (error) throw error;
        toast({
          title: "SYS_AUTH :: SIGNUP_OK",
          description: "Check your email for verification link.",
        });
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });
        if (error) throw error;
        navigate("/", { replace: true });
      }
    } catch (error: any) {
      toast({
        title: "SYS_AUTH :: ERROR",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 font-mono text-center">
          <div className="text-xs text-muted-foreground tracking-widest uppercase mb-2">
            SYS_AUTH // SECURE_ENTRY
          </div>
          <h1 className="text-2xl font-semibold font-sans text-foreground">
            JD_Admin Panel
          </h1>
          <div className="text-xs text-muted-foreground mt-1">
            {isSignUp ? "CREATE_NEW_ACCOUNT" : "AUTHENTICATE_TO_CONTINUE"}
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-card border border-border p-6">
          <div className="font-mono text-xs text-muted-foreground mb-4 pb-2 border-b border-border">
            {isSignUp ? "> REGISTER_NEW_OPERATOR" : "> OPERATOR_LOGIN"}
          </div>

          <form onSubmit={handleAuth} className="space-y-4">
            <div>
              <label className="font-mono text-xs text-muted-foreground block mb-1">
                EMAIL_ID
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="operator@domain.com"
                className="font-mono text-sm"
                required
              />
            </div>

            <div>
              <label className="font-mono text-xs text-muted-foreground block mb-1">
                PASS_KEY
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="font-mono text-sm"
                minLength={6}
                required
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full font-mono text-sm"
            >
              {isLoading
                ? "PROCESSING..."
                : isSignUp
                ? "EXEC :: CREATE_ACCOUNT"
                : "EXEC :: AUTHENTICATE"}
            </Button>
          </form>

          <div className="mt-4 pt-4 border-t border-border text-center">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="font-mono text-xs text-primary hover:underline"
            >
              {isSignUp
                ? "> SWITCH_TO :: LOGIN"
                : "> SWITCH_TO :: REGISTER"}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 text-center font-mono text-xs text-muted-foreground">
          SECURE_CHANNEL :: TLS_1.3
        </div>
      </div>
    </div>
  );
}
