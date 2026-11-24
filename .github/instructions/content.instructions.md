---
applyTo: "src/content/**,src/content.config.ts,src/lib/**"
---

# Content rules

- Content is typed. The schemas in `src/content.config.ts` are the source of truth; update the schema first, then the content, then the components.
- `projects` is one collection with a `status` field: `delivered`, `in-progress` or `idea`. Use a Zod discriminated union on `status`.
  - All projects: `title`, `summary`, `tags: string[]`, `links: { label, url }[]`.
  - `delivered`: `client { name, logo? }`, `years`, `metrics: { value, label }[]`.
  - `in-progress`: `phase`, `posterColor` (`primary` | `accent` | `support`), `targets: { label, value }[]`, `milestones: { title, status: "done" | "in-progress" | "next" }[]`, optional `diagram`.
  - `idea`: `stage` (`researching` | `refining`), `market` (short text on neighbours and what is still untested).
- `notes` collection: `title`, `date`, `summary`, `tag`, `draft` (boolean, default false), optional `project` (slug of a related project).
- Pure helpers (sorting by date, grouping by status, reading time) live in `src/lib/` and have unit tests.
- Never invent facts. Real numbers come from the owner. Where a fact is missing, write `TODO: ...` in the content and list it in your summary.
- Draft notes must not appear in the index, RSS feed, sitemap or production build.
