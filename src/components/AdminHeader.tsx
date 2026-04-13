interface AdminHeaderProps {
  searchPlaceholder?: string;
}

export function AdminHeader({ searchPlaceholder = "QUERY_ENTITIES: ID, NAME, PHONE..." }: AdminHeaderProps) {
  return (
    <header className="h-14 bg-card border-b border-border flex items-center justify-between px-6 shrink-0">
      <div className="flex items-center gap-4 w-full max-w-2xl">
        <span className="font-mono text-muted-foreground text-sm">&gt;</span>
        <input
          type="text"
          placeholder={searchPlaceholder}
          className="w-full bg-transparent border-none font-mono text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-0"
        />
      </div>
      <div className="flex items-center gap-6 font-mono text-xs text-muted-foreground shrink-0">
        <span>OP_MODE: BATCH</span>
        <div className="size-8 bg-border flex items-center justify-center font-bold text-foreground">
          AD
        </div>
      </div>
    </header>
  );
}
