/** A centered label between two rules, such as "or with email". */
export function DividerText({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-3 text-caption text-muted-foreground before:h-px before:flex-1 before:bg-separator after:h-px after:flex-1 after:bg-separator">
      {children}
    </p>
  )
}
