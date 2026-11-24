# Build plan and way of working

How to build the portfolio with GitHub Copilot when you are strong in backend and new to frontend. Read "How to work" first, then go phase by phase.

## Before you start (about 20 minutes)
1. Install Node.js (current LTS, 24 or 26) with a version manager such as `fnm` or `nvm`, then enable pnpm with `corepack enable`.
2. Install VS Code and the GitHub Copilot and Copilot Chat extensions. Make sure agent mode is available in Copilot Chat.
3. Create an empty GitHub repository (for example `portfolio`) and clone it.
4. Copy this kit into the repo root: `.github/` and `docs/` (including `docs/reference/c2-offset/`). Commit it as "Add Copilot instructions and design spec".
5. In the repository settings, enable GitHub Pages with "GitHub Actions" as the source (you will use it in phase 7).

## How to work
**Vertical, small, verified.** One phase per branch and pull request. Inside a phase, ask Copilot for one thing at a time. Merge only when CI is green and you have looked at the result in the browser.

**Always give Copilot the target.** In Copilot Chat, reference the files with `#file:docs/design-spec.md` and attach the matching screenshot from `docs/reference/c2-offset/`. Say "match the screenshot" and ask it to list any differences it knows about.

**Make it prove it.** End every request with: "Run `pnpm check` and `pnpm build`, fix any failure, and tell me what you ran." Paste error messages back to Copilot word for word instead of describing them.

**Look, do not read.** You do not need to understand every line of CSS. You do need to open the page at 1440 px and at phone width (browser dev tools, device toolbar), compare with the reference, and watch for horizontal scrolling. Use the `/dev/components` page (built in phase 2) to check each component on its own.

**Ask for the why.** When Copilot makes a choice you do not understand, ask "why this instead of the simpler way?" Prefer the simpler way.

**Fix the instructions, not just the output.** If Copilot makes the same mistake twice, add one short rule to `.github/copilot-instructions.md` (or the matching file in `.github/instructions/`). Keep that file under two pages; long instruction files get ignored.

**One chat per task.** Start a new chat for each task so old context does not leak in. Use agent mode for work across several files and normal chat for questions or small tweaks.

**Own the facts.** Copilot will happily invent plausible metrics and client names. The instructions forbid it, but you are the final check. Write the real project text yourself (or give Copilot your notes) and review every number.

**Treat dependencies as risks.** Every package Copilot adds is code you now run. Check that it is the official package, that it is actively maintained, and that you actually need it. Turn on Dependabot and secret scanning in the repo settings.

**Git is your undo button.** Commit after every working step. If a change goes wrong, `git restore` or `git reset` beats trying to patch a broken state.

**Use Copilot as reviewer too.** Before merging each pull request, ask Copilot code review (or a fresh chat) to review the diff for accessibility problems, dead code and anything that departs from the spec.

## Commands the project must provide
`pnpm dev`, `pnpm build`, `pnpm check` (types + lint + format check), `pnpm test`, `pnpm e2e`.

---

## Phase 0: Repository and tooling
**Goal:** An empty Astro site with strict TypeScript, linting, formatting, tests and CI, deployable but showing a placeholder page.

**Prompt (agent mode):**
```
Read #file:.github/copilot-instructions.md and #file:docs/build-plan.md (phase 0).
Set up the project in this repo. Create a new Astro project with TypeScript in strictest mode and pnpm,
add @astrojs/mdx, @astrojs/sitemap and @astrojs/rss, ESLint (typescript-eslint, eslint-plugin-astro), Prettier
(with the Astro plugin), Vitest and Playwright with @axe-core/playwright. Add .nvmrc with the Node LTS version.
Provide the scripts: dev, build, check, test, e2e. Add .gitignore, a minimal README with the commands,
and a GitHub Actions workflow .github/workflows/ci.yml that runs install, check, test, build and e2e on every pull request.
Use the latest stable versions and check docs.astro.build for current setup steps.
Show a placeholder home page. Do not build any design yet.
Run pnpm check and pnpm build and tell me the results.
```
**Done when:** `pnpm dev` shows a page, `pnpm check`, `pnpm build`, `pnpm test` and `pnpm e2e` pass locally, CI is green on the pull request.

## Phase 1: Tokens, fonts and base layout
**Goal:** Design tokens, self-hosted fonts, global styles and the page shell (header, footer, skip link).

**Prompt:**
```
Read #file:docs/design-spec.md. Create src/styles/tokens.css with exactly the tokens in the spec,
and src/styles/base.css with a minimal reset, body styles, focus ring and the 900px breakpoint variable overrides.
Install the Archivo Black and DM Sans fonts from @fontsource (check the exact package names on npm first) and load them in BaseLayout.
Build src/layouts/BaseLayout.astro with: html lang="en", a unique title and description per page, canonical URL,
a skip-to-content link, SiteHeader and SiteFooter components exactly as in the spec, and a slot for main content.
Update the placeholder home page to use the layout. Compare with #file:docs/reference/c2-offset/index.html (header and footer only).
Run pnpm check and pnpm build.
```
**Done when:** The header and footer match the reference at 1440 px and 390 px, fonts load without a visible jump, no hex colors outside `tokens.css` (search for `#` in `.astro` and `.css` files).

## Phase 2: UI components and the kitchen-sink page
**Goal:** Every component from the spec, built in isolation with props, reviewed on one page.

**Prompt:**
```
Read #file:docs/design-spec.md (Components section) and #file:.github/instructions/components.instructions.md.
Build these components in src/components with typed Props: Hero, SectionHeading, Sticker, Poster, Chip,
ClientRow, IdeaCard, Panel, MilestoneList, TargetList, BudgetBar, ArchDiagram, PullQuote.
ArchDiagram takes typed nodes and edges and renders inline SVG; reproduce the Model gateway diagram from
#file:docs/reference/c2-offset/project-model-gateway.html as the example.
Create src/pages/dev/components.astro that shows every component in every variant with sample props
(primary, accent and support posters; all milestone states; etc.). Exclude /dev from the sitemap and add noindex.
Use the reference screenshots to match the look.
Run pnpm check and pnpm build.
```
**Done when:** `/dev/components` shows each component and each matches its look in the reference. Check at phone width: no horizontal scroll.

## Phase 3: Content model and sample content
**Goal:** Typed content collections and real-shaped sample content, with helpers and tests.

**Prompt:**
```
Read #file:.github/instructions/content.instructions.md. Create src/content.config.ts with the projects
(discriminated union on status) and notes collections using Zod, following that file exactly.
Move the sample content from #file:docs/reference/c2-offset/projects.html and the note page into MDX files in
src/content/projects and src/content/notes. Mark every number or fact that is sample content with a TODO comment
in the frontmatter so I can replace it later.
Write src/lib/projects.ts and src/lib/notes.ts with helpers to group projects by status, sort notes newest first,
exclude drafts in production and compute reading time. Add Vitest tests for each helper.
Run pnpm check, pnpm test and pnpm build.
```
**Done when:** Invalid frontmatter fails the build with a clear message (try breaking a field on purpose), tests pass.

## Phase 4: Pages
**Goal:** Home, projects, project detail (all three statuses), 404.

**Prompt:**
```
Read #file:docs/design-spec.md (Pages section). Build src/pages/index.astro, projects/index.astro,
projects/[slug].astro and 404.astro using the components and helpers. The project detail page renders
in-progress, idea and delivered layouts depending on status.
Match #file:docs/reference/c2-offset/index.html, projects.html and project-model-gateway.html and the screenshots.
Add a Playwright smoke test per page (loads, one h1, no axe violations) at 1440 and 390 px widths.
Run pnpm check, pnpm build and pnpm e2e.
```
**Done when:** Each page matches its screenshot closely at both widths, all tests pass.

## Phase 5: Notes (blog)
**Goal:** The blog: index, note pages, RSS, code blocks and figures.

**Prompt:**
```
Build src/pages/notes/index.astro, notes/[slug].astro with NoteLayout, and src/pages/rss.xml.ts.
Follow the Notes sections of #file:docs/design-spec.md and match #file:docs/reference/c2-offset/note-latency-budget.html.
Use Astro's built-in code highlighting for code blocks and style them as in the spec. Support PullQuote and BudgetBar
inside MDX. Reading time and date come from the helpers. Drafts must not appear in the index, RSS or sitemap.
Add a Playwright test for the index and one note page. Run pnpm check, pnpm build and pnpm e2e.
```
**Done when:** A new MDX file in `src/content/notes/` appears on the index and in the feed; a file with `draft: true` does not.

## Phase 6: Quality pass
**Goal:** Accessibility, responsive polish, SEO, performance, visual regression.

**Prompt:**
```
Do a quality pass over the whole site against #file:docs/design-spec.md (Accessibility and quality bars).
1) Run the axe tests on every page and fix real violations (do not exclude rules).
2) Check widths 360, 390, 768, 1024, 1440 and 1920 for horizontal scroll or overlaps and fix them.
3) Add Open Graph and Twitter meta tags, a default social image in public/, JSON-LD "Person" data on the home page,
   and make sure the sitemap and robots.txt are right.
4) Add Playwright screenshot tests for the four main pages at 1440 and 390 px with a small diff tolerance;
   explain how to update the baselines when I change the design on purpose.
5) Run Lighthouse in CI or locally and report the scores. Fix anything below the targets in the spec.
Run pnpm check, pnpm build and pnpm e2e.
```
**Done when:** Targets in the spec are met, screenshot tests pass, and you have looked at each page on a real phone.

## Phase 7: Deploy and real content
**Goal:** Live site and your real projects and posts.

**Prompt:**
```
Add .github/workflows/deploy.yml that builds the site and deploys to GitHub Pages on push to main using the official
Astro GitHub Action (check the current docs). Set `site` and `base` in astro.config.ts correctly for my repository,
and explain in the README how to add a custom domain later. List every TODO left in src/content so I can replace them.
```
**Then you:** replace sample content with real projects, real metrics (only ones you can stand behind), real logos (with permission), real links; write your first notes.

---

## Prompts for later changes
- Add a project: "Add an in-progress project to src/content/projects following the schema. Here are my notes: ... Do not invent facts; mark anything missing as TODO."
- Add a note: "Create a draft note from this outline: ... Match the style of the existing notes. Do not add numbers I did not provide."
- Tweak the design: "In the Poster component, make the title 10% smaller on screens under 900px. Check it against the spec and run the screenshot tests."
- When something looks wrong: attach a screenshot and say what you expected, what you see, and the viewport width.

## Checklist before you publish
- [ ] Every `TODO:` is gone or deliberate.
- [ ] Every number, client name and link is real and yours to publish.
- [ ] Client logos are used with permission.
- [ ] No employer-confidential details (architecture, account counts, internal tool names) beyond what you are allowed to share.
- [ ] `pnpm check`, `pnpm build`, `pnpm test` and `pnpm e2e` pass in CI.
- [ ] Looked at all pages on a phone.
