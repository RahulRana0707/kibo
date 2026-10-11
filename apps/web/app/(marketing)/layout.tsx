import { MarketingTemplate } from "@/components/templates/marketing-template"

export default function MarketingLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <MarketingTemplate>{children}</MarketingTemplate>
}
