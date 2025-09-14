# Copilot Instructions for HCW Website

## Project Overview

- This is a static, multi-page healthcare information website.
- All pages share a consistent design, with global styles in `Global.css` and page-specific styles in separate CSS files.
- The main HTML files are: `index.html`, `about.html`, `goals.html`, `targets.html`, and `Contacts.html`.
- Images are stored in the `images/` directory.

## Key Patterns & Conventions

- **Global Styles:** Use `Global.css` for shared layout, typography, and color themes (including dark mode). Page-specific styles go in their respective CSS files.
- **Navigation:** The navigation bar is duplicated across all pages for consistency. Update all HTML files if you change navigation structure.
- **Dark Mode:**
  - Dark mode is toggled by adding/removing the `dark-mode` class on the `<body>` element.
  - The toggle button uses the `.nav-toggle` class and is handled via JavaScript (see `script.js`).
  - Ensure all new components support both light and dark backgrounds.
- **Hero Sections:** Each page features a hero section with a blurred background image and overlay for readability. Use CSS `filter: blur()` and overlays for this effect.
- **Responsiveness:** Use semantic HTML and CSS media queries for mobile support. Avoid fixed widths; prefer flexbox or grid layouts.
- **Accessibility:** Use semantic tags (`<nav>`, `<main>`, `<footer>`, headings) and ensure sufficient color contrast.

## Developer Workflow

- No build step: open any `.html` file directly in a browser to view changes.
- No JavaScript frameworks or package managers are used.
- To add a new page:
  1. Copy an existing HTML file as a template.
  2. Add a new CSS file if needed.
  3. Update navigation links in all HTML files.
- To update global styles, edit `Global.css`.
- To update dark mode logic, edit `script.js` and ensure CSS selectors in `Global.css` are correct.

## Examples

- To add a new navigation link, update the `<nav>` in every HTML file.
- To support dark mode for a new component, add `.dark-mode .your-class { ... }` rules in `Global.css`.

## Key Files

- `assets/index.html`, `assets/about.html`, etc.: Main HTML pages
- `assets/Global.css`: Global styles (including dark mode)
- `assets/script.js`: Handles dark mode toggle and other JS behaviors
- `images/`: All image assets

## Limitations

- No backend or dynamic content; all data is static.
- No automated tests or build scripts.

---

For any major UI or navigation changes, ensure consistency across all HTML files and test in both light and dark modes.
