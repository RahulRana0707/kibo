import { cn } from "@kibo/ui/lib/utils"

/** Long-form text from MDX: articles, help pages and legal documents. */
export function Prose({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex max-w-[68ch] min-w-0 flex-col gap-4 text-body/[1.65]",
        "[&_h2]:mt-6 [&_h2]:scroll-mt-24 [&_h2]:text-title [&_h3]:mt-3 [&_h3]:scroll-mt-24 [&_h3]:text-heading",
        "[&_a]:text-link [&_a]:underline [&_a]:underline-offset-4",
        "[&_ol]:flex [&_ol]:list-decimal [&_ol]:flex-col [&_ol]:gap-3 [&_ol]:ps-5 [&_ul]:flex [&_ul]:list-disc [&_ul]:flex-col [&_ul]:gap-2 [&_ul]:ps-5",
        "[&_:not(pre)>code]:rounded-sm [&_:not(pre)>code]:bg-sunken [&_:not(pre)>code]:px-[5px] [&_:not(pre)>code]:py-px [&_:not(pre)>code]:font-mono [&_:not(pre)>code]:text-[0.875em]",
        "[&_hr]:my-4 [&_hr]:border-separator [&_strong]:font-semibold",
        className
      )}
      {...props}
    />
  )
}
