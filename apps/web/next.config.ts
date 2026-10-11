import createMDX from "@next/mdx"
import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  transpilePackages: ["@kibo/ui"],
  pageExtensions: ["ts", "tsx", "md", "mdx"],
}

const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-gfm"],
    rehypePlugins: ["rehype-slug"],
  },
})

export default withMDX(nextConfig)
