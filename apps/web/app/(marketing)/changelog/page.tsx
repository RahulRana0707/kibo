import type { Metadata } from "next"
import Link from "next/link"

import { buttonVariants } from "@kibo/ui/components/button"

import { Container } from "@/components/atoms/container"
import { Heading, Lede } from "@/components/atoms/typography"
import { formatDate, getChangelog } from "@/lib/content"

export const metadata: Metadata = {
  title: "Changelog",
  description: "New features, improvements and fixes, newest first.",
}

export default async function ChangelogPage() {
  const releases = await getChangelog()

  return (
    <>
      <section className="pt-18 pb-6">
        <Container className="flex flex-col gap-4">
          <Heading as="h1">Changelog</Heading>
          <Lede>New features, improvements and fixes, newest first.</Lede>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/blog#newsletter"
              className={buttonVariants({ variant: "secondary", size: "sm" })}
            >
              Subscribe by email
            </Link>
          </div>
        </Container>
      </section>
      <section className="pb-24">
        <Container>
          {releases.map(({ slug, metadata: release, Content }) => (
            <article
              key={slug}
              className="flex flex-wrap gap-12 border-t border-separator py-12"
            >
              <div className="flex flex-[0_1_200px] flex-col gap-1.5">
                <time dateTime={release.date} className="font-semibold">
                  {formatDate(release.date)}
                </time>
                <span className="text-caption text-muted-foreground">
                  Week {release.week}
                </span>
              </div>
              <div className="flex min-w-0 flex-[1_1_520px] flex-col gap-5">
                <h2 className="text-title">{release.title}</h2>
                <Content />
              </div>
            </article>
          ))}
        </Container>
      </section>
    </>
  )
}
