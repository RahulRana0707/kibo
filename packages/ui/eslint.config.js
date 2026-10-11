import { config } from "@kibo/eslint-config/react-internal"

/** @type {import("eslint").Linter.Config} */
export default [
  ...config,
  {
    // The design system stays framework- and product-agnostic: no Next.js,
    // no imports from an app.
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            { group: ["next", "next/*"], message: "@kibo/ui must not depend on Next.js." },
            { group: ["@/*"], message: "@kibo/ui must not import from an app." },
          ],
        },
      ],
    },
  },
]
