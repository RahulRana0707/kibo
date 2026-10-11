import { CheckIcon } from "lucide-react"

import { comparison, plans } from "@/lib/marketing/plans"

function Cell({ value }: { value: boolean | string }) {
  if (value === true) {
    return (
      <CheckIcon
        role="img"
        aria-label="Included"
        className="mx-auto size-4 text-success-text"
      />
    )
  }

  if (value === false) {
    return (
      <span className="text-muted-foreground">
        <span aria-hidden="true">—</span>
        <span className="sr-only">Not included</span>
      </span>
    )
  }

  return <span className="tabular">{value}</span>
}

/** Every plan feature side by side. Scrolls inside its box on narrow screens. */
export function ComparisonTable() {
  return (
    <div className="min-w-0 overflow-hidden rounded-xl border border-transparent bg-raised shadow-border">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-body-sm">
          <thead>
            <tr>
              <th
                scope="col"
                className="w-2/5 border-b border-separator px-3 py-2.5 text-start text-overline text-muted-foreground uppercase"
              >
                Feature
              </th>
              {plans.map((plan) => (
                <th
                  key={plan.code}
                  scope="col"
                  className="border-b border-separator px-3 py-2.5 text-center text-overline text-muted-foreground uppercase"
                >
                  {plan.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {comparison.map((group) => [
              <tr key={group.group}>
                <th
                  scope="colgroup"
                  colSpan={4}
                  className="border-b border-separator bg-surface px-3 py-3 text-start text-overline text-muted-foreground uppercase"
                >
                  {group.group}
                </th>
              </tr>,
              ...group.rows.map((row) => (
                <tr key={`${group.group}-${row.feature}`}>
                  <th
                    scope="row"
                    className="border-b border-separator p-3 text-start font-normal"
                  >
                    {row.feature}
                  </th>
                  {row.values.map((value, index) => (
                    <td
                      key={index}
                      className="border-b border-separator p-3 text-center"
                    >
                      <Cell value={value} />
                    </td>
                  ))}
                </tr>
              )),
            ])}
          </tbody>
        </table>
      </div>
    </div>
  )
}
