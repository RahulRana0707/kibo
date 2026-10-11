import { nextJsConfig } from "@kibo/eslint-config/next-js"

// Atomic layers import only downward: templates → organisms → molecules →
// atoms → @kibo/ui. Each entry lists the layers a folder may not reach.
const layers = [
  { files: ["components/atoms/**"], above: ["molecules", "organisms", "templates"] },
  { files: ["components/molecules/**"], above: ["organisms", "templates"] },
  { files: ["components/organisms/**"], above: ["templates"] },
]

/** @type {import("eslint").Linter.Config} */
export default [
  ...nextJsConfig,
  ...layers.map(({ files, above }) => ({
    files,
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: above.map((layer) => ({
            group: [`@/components/${layer}/*`],
            message: `Components may only import from lower atomic layers, not ${layer}.`,
          })),
        },
      ],
    },
  })),
]
