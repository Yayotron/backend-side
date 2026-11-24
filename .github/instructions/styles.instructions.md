---
applyTo: '**/*.css,**/*.astro'
---

# Styling rules

- Read `docs/design-spec.md` before changing styles. Tokens live in `src/styles/tokens.css`.
- Use only `var(--...)` tokens for color, font, border, shadow and layout width. A hex value outside `tokens.css` is a bug.
- Shape language: square corners (no `border-radius`), 3px ink borders on posters, panels and idea cards, hard offset shadows (no blur radius), flat color fills.
- Headings use `--font-display` with `--tracking-display` and `--leading-display`. Body text uses `--font-body`.
- Fluid type uses the `clamp()` tokens from the spec. Do not invent new font sizes: add a token first and explain why.
- Keep line length near 34em for article text and 36em for ledes.
- Every interactive element needs a visible `:focus-visible` style (3px primary outline, 3px offset; accent on primary or dark green backgrounds).
- Use the one breakpoint, `max-width: 900px`, for the single-column layout. Avoid horizontal scrolling at 360 px wide.
- Prefer scoped styles in the component. Put only truly global rules in `base.css`.
- Respect `prefers-reduced-motion`. The design has no animation; do not add any unless asked.
