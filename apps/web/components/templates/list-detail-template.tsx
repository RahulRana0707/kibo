/**
 * Viewers, mod log, knowledge, members: page header, filter bar (or bulk
 * bar), data table and pagination, with a side sheet for one record. The
 * URL holds the open record so it can be shared or reloaded; the sheet is
 * passed in already wired to it.
 */
export function ListDetailTemplate({
  header,
  filters,
  table,
  pagination,
  detail,
}: {
  header: React.ReactNode
  filters?: React.ReactNode
  table: React.ReactNode
  pagination?: React.ReactNode
  /** A Sheet that opens from the end edge (a bottom sheet on phones). */
  detail?: React.ReactNode
}) {
  return (
    <>
      {header}
      <div className="flex flex-col gap-4">
        {filters}
        {table}
        {pagination}
      </div>
      {detail}
    </>
  )
}
