import { cn } from "@kibo/ui/lib/utils"

/**
 * Long-form text from MDX: help articles, blog posts, changelog and legal
 * pages. One wrapper styles every element; authors never pick sizes.
 */
export function Prose({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex max-w-[68ch] min-w-0 flex-col gap-4 text-body/[1.65]",
        "[&_h2]:mt-6 [&_h2]:scroll-mt-24 [&_h2]:text-title [&_h3]:mt-3 [&_h3]:scroll-mt-24 [&_h3]:text-heading",
        "[&_a]:text-link [&_a]:underline [&_a]:decoration-1 [&_a]:underline-offset-3 [&_a:hover]:decoration-2",
        "[&_ol]:flex [&_ol]:list-decimal [&_ol]:flex-col [&_ol]:gap-2 [&_ol]:ps-6 [&_ul]:flex [&_ul]:list-disc [&_ul]:flex-col [&_ul]:gap-2 [&_ul]:ps-6 [&_li]:marker:text-muted-foreground",
        "[&_:not(pre)>code]:rounded-sm [&_:not(pre)>code]:bg-sunken [&_:not(pre)>code]:px-[5px] [&_:not(pre)>code]:py-px [&_:not(pre)>code]:font-mono [&_:not(pre)>code]:text-[0.875em]",
        "[&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:bg-sunken [&_pre]:p-4 [&_pre]:font-mono [&_pre]:text-[0.8125rem]/[1.6]",
        "[&_blockquote]:border-s-[3px] [&_blockquote]:border-primary-border [&_blockquote]:ps-4 [&_blockquote]:text-[1.125rem] [&_blockquote]:text-muted-foreground",
        "[&_figure]:flex [&_figure]:flex-col [&_figure]:gap-2 [&_figcaption]:text-caption [&_figcaption]:text-muted-foreground [&_img]:rounded-lg [&_img]:image-outline",
        "[&_table]:block [&_table]:max-w-full [&_table]:overflow-x-auto [&_table]:text-[0.9375rem] [&_td]:border-b [&_td]:border-separator [&_td]:px-3 [&_td]:py-2.5 [&_th]:border-b [&_th]:border-separator [&_th]:px-3 [&_th]:py-2.5 [&_th]:text-start [&_th]:text-overline [&_th]:text-muted-foreground [&_th]:uppercase",
        "[&_hr]:my-4 [&_hr]:border-separator [&_strong]:font-semibold",
        className
      )}
      {...props}
    />
  )
}
