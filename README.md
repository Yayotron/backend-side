# Portfolio

A static Astro site. Phase 0 provides the project tools and an unstyled placeholder page.
The design and approved content will be added in later phases.

## Setup

Use the Node.js LTS major in `.nvmrc`. With nvm:

```sh
nvm install
nvm use
corepack enable
pnpm install --frozen-lockfile
pnpm exec playwright install chromium
```

`package.json` pins the pnpm version. If Corepack cannot load it, use
`npx --yes pnpm@12.23.0` in place of `pnpm`. This does not require a global pnpm install.

TypeScript is pinned to 6.0.3 because the current Astro checker and typescript-eslint
do not support TypeScript 7. Upgrade when both tools support it.
ESLint uses an `.mjs` configuration file to avoid an extra loader or an experimental flag.
The application, tests, and other executable configuration files use TypeScript.

## Commands

Run all commands from this directory, not from `copilot-kit/`.

| Command        | Purpose                                                               |
| -------------- | --------------------------------------------------------------------- |
| `pnpm dev`     | Start the local development server.                                   |
| `pnpm check`   | Check Astro and TypeScript types, lint, and formatting.               |
| `pnpm format`  | Format project files. Fixed design references are excluded.           |
| `pnpm test`    | Run Vitest tests once.                                                |
| `pnpm build`   | Create the static site in `dist/`.                                    |
| `pnpm preview` | Serve the production build locally.                                   |
| `pnpm e2e`     | Run Chromium smoke and axe accessibility tests at 1440 px and 390 px. |

Build before running browser tests:

```sh
pnpm check
pnpm test
pnpm build
pnpm e2e
```

Playwright starts and stops its own preview server on `127.0.0.1:4325`.
It does not reuse an existing server. Axe scans run with browser JavaScript enabled.
A separate test checks that the placeholder works with JavaScript disabled.

## Project rules

Read `.github/copilot-instructions.md`, `docs/build-plan.md`, and `docs/design-spec.md`.
Work on one phase at a time. Files under `docs/reference/` are fixed references.
All reference content is unverified sample content. Use visible `TODO:` placeholders
until approved content is supplied.

The original `copilot-kit/` directory is retained locally and ignored by Git.
The active instructions and references are in the root `.github/` and `docs/` directories.

## CI and deployment

`.github/workflows/ci.yml` runs install, checks, unit tests, build, and browser tests
on pull requests and pushes to `main`. No deployment workflow is included yet.

MDX and sitemap integrations are registered; RSS support is installed for Phase 5.
The sitemap integration reports a warning until a real `site` URL is set in
`astro.config.ts`. The placeholder is marked `noindex`, and its canonical URL
uses the local request origin until `site` is configured.

TODO: Connect the GitHub repository and confirm the pull request workflow passes.
In Phase 7, set the real `site` URL and repository `base` path and add GitHub Pages deployment.
Do not treat the local canonical URL as a production URL.
