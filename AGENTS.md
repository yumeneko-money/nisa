# Repository Guidelines

## Project Structure & Module Organization
This site is a single-page marketing experience served from the repository root. `index.html` contains all markup and localized copy; extend it with semantic sections rather than adding multiple pages unless routing is introduced. Shared styles live in `style.css`, organized with comment blocks per layout section. Image assets such as `08_...png` currently sit alongside the page; prefer future illustrations and downloads under an `assets/` directory with ASCII filenames to avoid encoding issues in tooling.

## Build, Test, and Development Commands
Open `index.html` directly for quick copy reviews. For a local server with live reload headers, run `python -m http.server 8000` and browse to `http://localhost:8000/index.html`. Alternatively, `npx serve .` mirrors production caching and is useful before deployment.

## Coding Style & Naming Conventions
Use two-space indentation for HTML and indent CSS declarations on their own lines as in the existing file. Favor descriptive, hyphenated class names (`.hero-banner`, `.cta-button`) and reuse utility classes like `.container` where possible. Keep CSS custom properties in lower-case kebab case under `:root` and group related tokens together. When editing copy, preserve full-width punctuation and Japanese typography.

## Testing Guidelines
There is no automated suite yet, so document manual checks in pull requests. Validate layout at 320px, 768px, and 1024px widths, and confirm skip-link focus is visible. Run `npx lighthouse http://localhost:8000/index.html --view` when changing performance-critical assets, and capture before/after scores. Record any accessibility contrast adjustments made in `style.css`.

## Commit & Pull Request Guidelines
Follow Conventional Commits (`feat: add comparison table`, `fix: adjust hero spacing`) to keep history searchable. Each PR should include a concise summary, linked issue or task ID, before/after screenshots for UI updates, and notes on manual verification steps. Request review from a teammate familiar with the Japanese content when updating localized copy.

## Assets & Localization
Store translatable strings in `index.html` and keep alternative text synchronized between Japanese and English comments when provided. Compress new imagery before committing and note the source license in the PR description. Maintain consistent tone with existing financial guidance and flag any terminology that needs SME validation.
