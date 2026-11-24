---
applyTo: 'src/components/**,src/layouts/**,src/pages/**'
---

# Component and page rules

- Component names follow the spec: `Poster`, `Sticker`, `Chip`, `Panel`, `ClientRow`, `IdeaCard`, `SectionHeading`, `BudgetBar`, `ArchDiagram`, `Hero`, `SiteHeader`, `SiteFooter`.
- Declare `interface Props` and give optional props defaults in the destructuring. No `any`.
- Components render; they do not fetch or reshape data. Pages call helpers from `src/lib/` and pass plain props down.
- Use semantic elements. A poster that links to a project is an `<a>` wrapping its content, with a clear accessible name.
- `ArchDiagram` renders inline SVG from typed data (`nodes` and `edges`), uses `currentColor` and tokens, and has a `<title>` and a text alternative.
- Every page sets a unique `<title>`, a meta description and a canonical URL through `BaseLayout`.
- Add each new component to the `/dev/components` kitchen-sink page so it can be reviewed in isolation.
- Every new page gets a Playwright smoke test (loads, has one `h1`, no axe violations).
