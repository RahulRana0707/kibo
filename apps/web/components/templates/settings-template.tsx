import { SideNav, type NavLinkItem } from "@/components/molecules/tab-links"
import { PageHeader } from "@/components/organisms/data/page-header"

/**
 * Inside the App template: a sticky side nav of settings sections and
 * settings groups on the right, Danger zone last. On phones the nav sits
 * above the content.
 */
export function SettingsTemplate({
  title = "Settings",
  description,
  sections,
  children,
}: {
  title?: string
  description?: string
  sections: { label: string; items: NavLinkItem[] }[]
  children: React.ReactNode
}) {
  return (
    <>
      <PageHeader title={title} description={description} />
      <div className="flex gap-12 max-md:flex-col max-md:gap-6">
        <SideNav
          label={`${title} sections`}
          groups={sections}
          className="sticky top-24 w-55 shrink-0 self-start max-md:static max-md:w-full"
        />
        <div className="flex min-w-0 max-w-190 flex-1 flex-col gap-5">{children}</div>
      </div>
    </>
  )
}
