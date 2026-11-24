# Portfolio

A static Astro site. Phase 2 adds reusable design components and a review page at
`/dev/components`. The home page still shows TODO content. Content collections
and complete pages belong to later phases.

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

## Phase 1 layout

`BaseLayout` provides the header, one `main` landmark, and the footer.
Pages put their content directly in its slot; do not add another `main`.
The optional `name` prop defaults to a visible TODO.

Archivo Black and DM Sans are served from local Fontsource packages with
`font-display: swap`. The layout preloads the three font faces used by the shell.
This lets the browser load them early without contacting a font service.

The original design tokens are unchanged. Additional tokens cover reference
spacing, font weights, and focus styles that were missing from the token list.
The only breakpoint remains `max-width: 900px`.

The name, location, email, and LinkedIn address are TODOs, not confirmed content.
The GitHub link uses the repository owner's verified handle.
Contact links to the footer until an email address is supplied.
Projects and Notes point to the planned routes; those pages belong to later phases.

## Phase 2 components

Open `http://localhost:4321/dev/components` after starting the development server.
The page shows the hero, section headings, all poster colors, both sticker styles,
chips, delivered rows, idea stages, panels, all milestone states, targets,
architecture diagrams, a budget bar, and a pull quote. The shared header and footer
are also present. The page has `noindex`; sitemap generation excludes `/dev` routes.

All personal and project facts remain visible TODOs. The Model gateway diagram
and budget values are marked as illustrative reference examples, not real results.
Sample links point to a real section on the preview page, not invented project URLs.

Components use typed props and server-rendered HTML with no client scripts.
Posters use a title link with a CSS overlay across the card. This keeps the short
link name without hiding the status, description, or diagram from assistive tools.
Diagrams use typed nodes and routed edges; each instance needs a unique `id` for its
accessible text and arrow marker. Both diagram color variants include a legend.
The budget sizes blocks from positive values, highlights the largest non-headroom
step, and provides all labels and values in its accessible name even when narrow
blocks clip visual labels, as in the reference.

Additional tokens cover values already present in the fixed references.
The mobile section-heading scale and tighter panel padding follow the reference's
mobile patch. DM Sans 500 is loaded locally for the medium-weight reference text.
The home page is deliberately unchanged until the page-building phase.

## CI and deployment

`.github/workflows/ci.yml` runs install, checks, unit tests, build, and browser tests
on pull requests and pushes to `main`. No deployment workflow is included yet.

MDX and sitemap integrations are registered; RSS support is installed for Phase 5.
The sitemap integration reports a warning until a real `site` URL is set in
`astro.config.ts`. The placeholder is marked `noindex`, and its canonical URL
uses the local request origin until `site` is configured.

The public repository is [Yayotron/backend-side](https://github.com/Yayotron/backend-side).
In Phase 7, set the real `site` URL and repository `base` path and add GitHub Pages deployment.
Do not treat the local canonical URL as a production URL.
