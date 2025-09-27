# Repository Guidelines

## Project Structure & Module Organization
- `index.html` contains all markup, copy, and translation comments; extend with semantic `<section>` blocks rather than new pages.
- `style.css` centralizes styling with section headers; reuse `.container` and layout utilities before adding new rules.
- `app.js` hosts lightweight interactions; keep helpers modular and document any external API assumptions inline.
- `assets/` stores optimized imagery; use ASCII filenames and note licenses in PRs. Legacy files in the root may be relocated during cleanup.

## Build, Test, and Development Commands
- Open `index.html` directly for quick wording reviews.
- `python -m http.server 8000` serves the site locally at `http://localhost:8000/index.html` with basic caching.
- `npx serve .` mirrors production headers; run prior to deployments or Lighthouse audits.
- Stop servers with `Ctrl+C` to free the port.

## Coding Style & Naming Conventions
- Format HTML with two-space indentation; nest attributes on-line and avoid trailing whitespace.
- In CSS, keep declarations on separate lines, group tokens under `:root`, and favor hyphenated class names like `.hero-banner`.
- JavaScript should default to `const`/`let`, prefer arrow functions for simple callbacks, and align with existing semicolon usage.
- Preserve Japanese typography, including full-width punctuation and inline glossary comments.

## Testing Guidelines
- No automated suite exists; capture manual verification notes in each PR.
- Validate layout at 320px, 768px, and 1024px widths; ensure the skip link remains visible when focused.
- After asset or performance tweaks, run `npx lighthouse http://localhost:8000/index.html --view` and archive before/after scores.
- Record any contrast adjustments or accessibility fixes inside `style.css` comments.

## Commit & Pull Request Guidelines
- Follow Conventional Commits (e.g., `feat: add growth scenario slider`, `fix: correct hero spacing`).
- PRs should summarize intent, reference the related task or issue, and attach updated screenshots for UI changes.
- List manual test steps, note localization reviewers when copy changes, and call out dependencies or follow-up work.

## Assets & Localization
- House translatable strings in `index.html`; keep alt text synchronized between Japanese content and any English guidance.
- Compress new imagery before committing, store source credits in the PR, and favor SVG or WebP when available.
- Flag any terms needing SME validation so financial tone stays consistent.
