import "server-only"

import { readdir, readFile } from "node:fs/promises"
import path from "node:path"

import GithubSlugger from "github-slugger"
import type { MDXContent } from "mdx/types"

const contentRoot = path.join(process.cwd(), "content")

export type Author = { name: string; role: string; initials: string }

export type BlogMeta = {
  title: string
  description: string
  category:
    | "Community"
    | "Moderation"
    | "Guides"
    | "Product"
    | "Creator stories"
  /** ISO date, such as 2026-10-07. */
  date: string
  readMinutes: number
  author: Author
  featured?: boolean
}

export type HelpMeta = {
  title: string
  summary: string
  /** Slug of the help category, from lib/marketing/help.ts. */
  category: string
  /** Group heading inside the category page. */
  section: string
  updated: string
  readMinutes: number
  popular?: boolean
}

export type ChangelogMeta = { title: string; date: string; week: number }

export type LegalMeta = {
  title: string
  effective: string
  updated: string
  /** One-paragraph summary shown above the document. */
  plain: string
  order: number
}

type Collection = "blog" | "help" | "changelog" | "legal"

type Entry<Meta> = {
  slug: string
  metadata: Meta
  Content: MDXContent
}

export type Heading = { id: string; title: string }

// Each import names its folder literally so the bundler can find the files.
const importers: Record<
  Collection,
  (slug: string) => Promise<{ default: MDXContent; metadata: unknown }>
> = {
  blog: (slug) => import(`@/content/blog/${slug}.mdx`),
  help: (slug) => import(`@/content/help/${slug}.mdx`),
  changelog: (slug) => import(`@/content/changelog/${slug}.mdx`),
  legal: (slug) => import(`@/content/legal/${slug}.mdx`),
}

async function listSlugs(collection: Collection) {
  const files = await readdir(path.join(contentRoot, collection))

  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""))
}

async function loadEntry<Meta>(
  collection: Collection,
  slug: string
): Promise<Entry<Meta> | null> {
  const slugs = await listSlugs(collection)

  if (!slugs.includes(slug)) {
    return null
  }

  const mod = await importers[collection](slug)

  return { slug, metadata: mod.metadata as Meta, Content: mod.default }
}

async function loadAll<Meta>(collection: Collection) {
  const slugs = await listSlugs(collection)
  const entries = await Promise.all(
    slugs.map((slug) => loadEntry<Meta>(collection, slug))
  )

  return entries.filter((entry): entry is Entry<Meta> => entry !== null)
}

/** The `##` headings of an MDX file, with the ids rehype-slug gives them. */
export async function getHeadings(
  collection: Collection,
  slug: string
): Promise<Heading[]> {
  const source = await readFile(
    path.join(contentRoot, collection, `${slug}.mdx`),
    "utf8"
  )
  const slugger = new GithubSlugger()

  return [...source.matchAll(/^## (.+)$/gm)].map((match) => {
    const title = (match[1] ?? "").trim()
    return { id: slugger.slug(title), title }
  })
}

/** The article text without MDX markup, for search. */
export async function getPlainText(collection: Collection, slug: string) {
  const source = await readFile(
    path.join(contentRoot, collection, `${slug}.mdx`),
    "utf8"
  )

  return source
    .replace(/^export const metadata[\s\S]*?\n}\n/m, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/[#*_`>]/g, "")
    .replace(/\s+/g, " ")
    .trim()
}

const byDateDesc = (
  a: { metadata: { date: string } },
  b: { metadata: { date: string } }
) => b.metadata.date.localeCompare(a.metadata.date)

export async function getBlogPosts() {
  return (await loadAll<BlogMeta>("blog")).sort(byDateDesc)
}

export function getBlogPost(slug: string) {
  return loadEntry<BlogMeta>("blog", slug)
}

export async function getHelpArticles() {
  return loadAll<HelpMeta>("help")
}

export function getHelpArticle(slug: string) {
  return loadEntry<HelpMeta>("help", slug)
}

export async function getChangelog() {
  return (await loadAll<ChangelogMeta>("changelog")).sort(byDateDesc)
}

export async function getLegalDocuments() {
  return (await loadAll<LegalMeta>("legal")).sort(
    (a, b) => a.metadata.order - b.metadata.order
  )
}

export function getLegalDocument(slug: string) {
  return loadEntry<LegalMeta>("legal", slug)
}

export function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  })
}
