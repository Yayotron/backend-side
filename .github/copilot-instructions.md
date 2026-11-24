# Portfolio website: instructions for Copilot

Personal portfolio of Víctor Mars Mindiola, a backend and cloud architect. English-language static site with four things: delivered projects, in-progress projects (shown as posters), ideas, and a blog called "Notes".

The owner is a backend engineer, not a frontend developer. Prefer simple, boring solutions. When you make a non-obvious frontend choice, explain it in one or two plain sentences.

## Sources of truth

- Visual design: `docs/design-spec.md` and the reference pages in `docs/reference/c2-offset/` (HTML plus PNG screenshots). Match them closely at 1440 px and 390 px wide.
- Plan: `docs/build-plan.md`. Work on one phase at a time. Do not start the next phase unless asked.
- If this file, the spec and the request disagree, stop and ask. Do not guess.

## Stack (do not add or swap anything without asking)

- Astro (latest stable major) with TypeScript in strict mode, pnpm, Node LTS from `.nvmrc`.
- Astro APIs change between majors. Check https://docs.astro.build before writing config, content collections or routing code. Do not rely on memory of older versions.
- Content: Astro content collections validated with Zod, written as Markdown or MDX in `src/content/`.
- Styling: plain CSS with custom properties (design tokens). Component styles are scoped inside `.astro` files. No Tailwind, no CSS-in-JS, no UI kit, no icon library.
- No client-side JavaScript by default. Add a script only when a feature needs it, keep it small and typed.
- Tests: Vitest for pure functions. Playwright with `@axe-core/playwright` for smoke, accessibility and screenshot tests.
- Lint and format: ESLint (typescript-eslint, eslint-plugin-astro) and Prettier.

## Commands

- `pnpm dev`: local server. `pnpm build`: production build.
- `pnpm check`: type check, lint and format check. `pnpm test`: unit tests. `pnpm e2e`: Playwright tests.
- Before saying a task is done, run `pnpm check` and `pnpm build`. If something fails, fix the cause. Never disable, skip or loosen a check to make it pass.

## Structure

```
.github/        instructions, workflows
docs/           design-spec.md, build-plan.md, reference/c2-offset/
public/         favicon, default social image, client logos
src/
  components/   ui/ (small pieces), sections/ (page parts), diagrams/
  content/      projects/*.mdx, notes/*.mdx
  content.config.ts
  layouts/      BaseLayout.astro, NoteLayout.astro
  lib/          pure functions with *.test.ts next to them
  pages/        index, projects/, notes/, rss.xml.ts, 404, dev/components
  styles/       tokens.css, base.css
tests/e2e/      *.spec.ts
```

## Code rules

- TypeScript: no `any`. No non-null `!` without a comment saying why. Use `import type` for types. Explicit return types on exported functions. Named exports, except where Astro requires default.
- Components: one per file, props declared as `interface Props`. Semantic HTML first (`header`, `main`, `nav`, `article`, `section`, `footer`, `ul`, `table`). Data shaping happens in `src/lib/`, not in templates.
- CSS: use `var(--token)` for every color, size, border and shadow. No hex values outside `src/styles/tokens.css`. Mobile layout first, one breakpoint at 900 px unless the spec says otherwise.
- Accessibility is required: one `h1` per page, visible focus ring, sufficient contrast, `alt` text on meaningful images, labels on every link that is not self-explanatory, no information carried by color alone.
- Dependencies: ask before adding one. Prefer the platform and Astro built-ins. When a package is needed, say what it does and why, and check that its name is the official one.
- Git: small commits with clear messages, one branch per phase, never commit secrets or `.env`.

## Never

- Never invent metrics, clients, dates, links, quotes or project facts. Use a visible `TODO:` placeholder and tell the owner what is missing.
- Never use gradients, blur, soft or blurred shadows, rounded corners, emoji, stock photos or colors outside the tokens. The look is flat color, square corners and hard offset shadows.
- Never rewrite or "improve" the design. If you think the design has a problem, say so and wait.
- Never edit files under `docs/reference/`. They are fixed references.

## Definition of done for any task

1. Behaves as described and matches the reference.
2. `pnpm check` and `pnpm build` pass.
3. New logic has a test. New pages have a Playwright smoke test.
4. Short summary of what changed, in plain language, plus anything you were unsure about.
