# Design spec: "Poster wall, Offset"

Source of truth: the reference pages in `docs/reference/c2-offset/` (open the `.html` files in a browser; the `.png` files are full-page screenshots at 1440 px wide). This document explains the rules behind them so they can be rebuilt as reusable components. Where this text and the reference differ, the reference wins; report the difference.

## Idea in one paragraph

Big type and flat color fields. Projects in progress are literal posters on a wall: portrait cards in primary, accent and support, slightly tilted, with a hard offset shadow. Everything is square-cornered, outlined in dark green ink, and shadowed with a solid offset (no blur). Delivered work is a typographic list with the client name set huge. Ideas are white cards. Nothing is animated.

## Design tokens

Copy into `src/styles/tokens.css`.

```css
:root {
  /* color */
  --color-paper: #eaf0e6;
  --color-ink: #0e2a1f;
  --color-primary: #175637;
  --color-accent: #f2c94c;
  --color-support: #e3a688;
  --color-mute: #4a6355;
  --color-white: #ffffff;

  /* font families (self-hosted via @fontsource) */
  --font-display: 'Archivo Black', 'Arial Black', sans-serif;
  --font-body: 'DM Sans', system-ui, sans-serif;

  /* type scale */
  --text-xs: 0.875rem; /* 14px chips, small labels */
  --text-sm: 0.9375rem; /* 15px captions, meta */
  --text-body: 1.125rem; /* 18px */
  --text-article: 1.25rem; /* 20px article paragraphs */
  --text-lede: 1.5rem; /* 24px hero paragraph, article dek */
  --text-lead: 1.875rem; /* 30px poster page intro */
  --text-h2: 2.5rem; /* 40px article headings */
  --text-h2-page: 3rem; /* 48px poster page headings */
  --text-idea-title: 2.25rem; /* 36px */
  --text-hero: clamp(5.625rem, 15.5vw, 14.375rem); /* 90 to 230px */
  --text-section: clamp(3.5rem, 8vw, 6.5rem); /* 56 to 104px */
  --text-poster-title: clamp(2.125rem, 3.9vw, 3.5rem); /* 34 to 56px */
  --text-client: clamp(2.125rem, 3.8vw, 3.375rem); /* 34 to 54px */
  --text-poster-page: clamp(4.375rem, 9vw, 8.75rem); /* 70 to 140px */
  --text-note-title: clamp(4rem, 9.4vw, 8.875rem); /* 64 to 142px */
  --text-pull: clamp(2.375rem, 4.4vw, 3.875rem); /* 38 to 62px */

  --leading-hero: 0.84;
  --leading-display: 0.92;
  --leading-heading: 1.05; /* multi-line article headings */
  --leading-body: 1.6;
  --leading-article: 1.75;
  --tracking-display: -0.025em;

  /* borders and shadows: hard offset, never blurred */
  --border: 3px solid var(--color-ink);
  --border-thin: 2px solid var(--color-ink);
  --shadow-hero: 10px 10px 0 var(--color-ink);
  --shadow-card: 8px 8px 0 var(--color-ink);
  --shadow-idea: 6px 6px 0 var(--color-ink);
  --shadow-tiny: 3px 3px 0 var(--color-ink);

  /* layout */
  --page-max: 80rem; /* 1280px */
  --page-pad: 2.5rem; /* 40px; 22px below 900px */
  --gap: 1.75rem; /* 28px grid gap */
}
```

Breakpoint: a single one, `max-width: 900px`. Below it every multi-column layout becomes one column and `--page-pad` becomes `1.375rem`. CSS variables cannot be used inside media queries, so write `900px` literally.

## Typography

- Headings, big numbers, client names, poster titles and pull quotes: `--font-display`, weight 400 (the face is already heavy), `letter-spacing: var(--tracking-display)`, `line-height: var(--leading-display)`.
- Everything else: `--font-body`. Body is 18px with `--leading-body`. Article text is 20px with `--leading-article`.
- The hero name uses `--leading-hero` and a small negative left margin (about -6px) so the big glyphs align optically with the text below.
- Never use more than these two families. Fonts are self-hosted with `@fontsource` packages; add `font-display: swap` behavior through the package CSS.

## Color use

Palette "Bosque": forest green, marigold and soft terracotta on a pale sage paper. Token names describe the role, not the hue.

| Token             | Hex     | Colour          | Role                                                            |
| ----------------- | ------- | --------------- | --------------------------------------------------------------- |
| `--color-paper`   | #eaf0e6 | pale sage       | page background                                                 |
| `--color-ink`     | #0e2a1f | very dark green | text, borders, shadows                                          |
| `--color-primary` | #175637 | forest green    | main brand block, poster 1, pull quotes                         |
| `--color-accent`  | #f2c94c | marigold        | text on primary, poster 2, stage tags, "In progress", note band |
| `--color-support` | #e3a688 | soft terracotta | poster 3 ("Latest note"), "Done", budget headroom               |
| `--color-mute`    | #4a6355 | muted green     | secondary text                                                  |

Verified contrast (WCAG): ink/paper 13.2, mute/paper 5.65, accent on primary 5.46, ink/accent 9.66, ink/support 7.36, primary/paper 7.47.

- Page background `--color-paper`, text `--color-ink`, secondary text `--color-mute`.
- Posters: primary (text accent), accent (text ink), support (text ink). Diagram strokes use `currentColor`.
- Highlights: accent for "In progress" and idea stage tags; support for "Done".
- Do not add colors. Every text and background pairing in the reference passes WCAG AA for normal text; keep it that way when you make changes.

## Components

| Component        | What it is                                                                                                                                                    | Key rules                                                                                                                                                                                                                                                                                                            |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `SiteHeader`     | Name on the left (bold, body font), nav on the right: Projects, Notes, Contact                                                                                | No background, no border. 22px vertical padding. Nav links bold with 30px gaps.                                                                                                                                                                                                                                      |
| `SiteFooter`     | One bold line: name, city, email, GitHub, LinkedIn                                                                                                            | 100px top margin, 50px bottom.                                                                                                                                                                                                                                                                                       |
| `Hero`           | Name in two lines ("Víctor / Mars") at `--text-hero`, one paragraph (`--text-lede`, weight 500, line height 1.35, max 21em), and a primary block on the right | Block: 33% width, top 20px, right 24px, height 88% of the hero, primary fill, `--border`, `--shadow-hero`, content bottom-left in accent display type (clamp 28 to 52px) with a small body-font caption. Hero clips overflow.                                                                                        |
| `SectionHeading` | Giant section title plus a small bold caption beside it (for example "6 projects")                                                                            | Title `--text-section`; caption `--color-mute`, bold, baseline aligned.                                                                                                                                                                                                                                              |
| `Sticker`        | Small status stamp on a poster ("Prototype", "Latest note")                                                                                                   | `--border-thin` in the poster's text color, 2px 10px padding, bold 14px, rotated 4deg, absolutely placed top-right.                                                                                                                                                                                                  |
| `Poster`         | Portrait card, aspect ratio 3/4, 26px padding                                                                                                                 | `--border`, `--shadow-card`. Color variant primary, accent or support. Title (`--text-poster-title`), optional diagram or visual in the middle, short description at the bottom (bold 15px). In a wall, odd posters rotate -1.2deg and even posters 1deg. A title link covers the card through a CSS pseudo-element. |
| `ClientRow`      | One delivered project                                                                                                                                         | Three columns: client name and years / project title (bold), description, chips and links / metrics (bold, stacked). Row padding 26px 0, bottom border 2px ink; the list has a 4px ink top border. Columns: `minmax(220px,1.1fr) 1.6fr 1fr`, gap 32px.                                                               |
| `Chip`           | Tag                                                                                                                                                           | White fill, `--border-thin`, 14px, square, padding 1px 9px.                                                                                                                                                                                                                                                          |
| `IdeaCard`       | Idea                                                                                                                                                          | White fill, `--border`, `--shadow-idea`, 24px padding. Accent `Chip`-like stage tag on top, title at `--text-idea-title`, pitch, then a smaller bold muted market note. Three columns, gap 28px.                                                                                                                     |
| `Panel`          | White box around a diagram or table                                                                                                                           | `--border`, `--shadow-card`, 26px padding.                                                                                                                                                                                                                                                                           |
| `MilestoneList`  | Rows with a status pill at the right                                                                                                                          | Pill: bold 14px, `--border-thin`, `--shadow-tiny`. Done = support, In progress = accent, Next = paper.                                                                                                                                                                                                               |
| `TargetList`     | Two-column label/value rows                                                                                                                                   | 3px ink top border, 1px ink row borders, label bold.                                                                                                                                                                                                                                                                 |
| `BudgetBar`      | Latency budget as stacked blocks                                                                                                                              | Height 84px, `--border`, `--shadow-idea`; blocks sized by value; value label bottom-left; legend beneath at 12px bold. Primary blocks, accent for the largest step, support for headroom.                                                                                                                            |
| `ArchDiagram`    | Inline SVG architecture diagram from typed data                                                                                                               | Boxes with 2.4px stroke, square corners, one accent box filled accent (or `currentColor` on posters). Text 15px bold body font. Provide `<title>` and a text alternative.                                                                                                                                            |
| `PullQuote`      | Large quote in an article                                                                                                                                     | `--text-pull`, display font, primary, max width 12em.                                                                                                                                                                                                                                                                |

## Pages

**Home (`/`)**: Header, Hero, "In progress" wall of three posters (two in-progress projects and the latest note, support, with a "Latest note" sticker), "Delivered" list of `ClientRow`s, footer.

**Projects (`/projects`)**: "In progress" wall, "Delivered" list, "Ideas" grid (3 columns). Section order is fixed. The ideas caption reads "Not built yet".

**Project detail, in progress (`/projects/[slug]`)**: Two columns, 5fr / 7fr, no gap, full viewport height minimum. Left: solid primary panel with 40px padding, a tilted sticker (top-left, rotated -3deg), the project title at `--text-poster-page` in accent (hyphenate manually with hyphens only if the word does not fit), and the one-line pitch at the bottom. Right (56px left padding): a 30px intro paragraph, a `Panel` with the diagram, then "Targets", "Milestones", "Built with" (`Chip`s) and "Notes" (related notes, ruled list). Headings at `--text-h2-page`. Targets are goals, not measurements; label them as such when the content says so.

**Idea detail (`/projects/[slug]` with status idea)**: Same two-column layout with a accent left panel (ink text). Right column: pitch as the intro, "Problem", "Market and neighbours", "What is still untested", "Next step". Content comes from the MDX body.

**Delivered detail (optional, same route)**: Single column, `max-width` 40em, client name large, metrics list, body, links.

**Notes index (`/notes`)**: Title "Notes" at `--text-section`; ruled list (4px ink top border). Each row: title (bold, 19px), summary, tag, date. Latest note first. No drafts.

**Note (`/notes/[slug]`)**: Accent band with 3px ink top and bottom borders containing a meta line (tag, date, reading time) and the title at `--text-note-title` (max 9.5em). Below: two columns 3fr / 2fr with 70px gap. Left: dek (26px, weight 500), then article text (20px, `--leading-article`, max 34em), headings at `--text-h2` with `--leading-heading`, `BudgetBar` or other figures, `PullQuote`. Right: "More notes" ruled list. Code blocks: ink background, paper text, square corners, `--shadow-idea`.

**404**: Giant "404" at `--text-hero`, one sentence, link home.

## Responsive behavior

- At 900px and below: all grids go to one column; `ClientRow` stacks; posters become full-width and keep their 3/4 ratio but cap at 28rem; the hero block moves below the name as a normal block (no absolute positioning); the split project page stacks with the primary panel on top at natural height.
- Check 360px, 390px, 768px, 1024px, 1440px and 1920px. No horizontal scroll at any width.

## Accessibility and quality bars

- One `h1` per page. Landmarks: `header`, `nav`, `main`, `footer`. A "Skip to content" link first in the DOM.
- Focus ring: 3px solid primary with 3px offset; on primary or ink backgrounds use accent.
- Posters use an article with a title link whose clickable area covers the card. The link's accessible name is the project title; `aria-describedby` connects its description. Keep the other card content outside the link so status text and diagrams remain accessible without making the link name long. This markup replaces the reference's wrapping anchor; the visual design stays the same.
- Rotated elements are decorative only; text must stay readable and must not cause horizontal overflow.
- Diagrams and the budget bar need text alternatives.
- Targets: Lighthouse accessibility 100, no axe violations, Largest Contentful Paint under 2.5 s on a mid-range phone profile, no layout shift from fonts.

## What this design never does

Gradients, blur, soft shadows, rounded corners, emoji, stock photography, icon fonts, animations, parallax, carousels, dark mode (for now), or any color outside the tokens.
