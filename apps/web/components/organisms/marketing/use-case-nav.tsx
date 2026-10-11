import { Container } from "@/components/atoms/container"
import { TabLinks } from "@/components/molecules/tab-links"

const useCases = [
  { href: "/use-cases/gaming", label: "Gaming" },
  { href: "/use-cases/agencies", label: "Agencies" },
]

/** Tabs between the use-case pages. */
export function UseCaseNav({ current }: { current: string }) {
  return (
    <div className="border-b border-separator">
      <Container>
        <TabLinks
          label="Use cases"
          className="border-b-0"
          items={useCases.map((item) => ({
            ...item,
            current: item.href === current,
          }))}
        />
      </Container>
    </div>
  )
}
