# Waqaar App UI Kit

A reusable, dependency-free visual system for responsive web apps and PWAs. It preserves the layout, colours, spacing and interaction patterns developed for Parenting Together, while leaving out all product-specific wording, data, encryption and backend code.

## Preview it

From this repository, run:

    python3 -m http.server 8080

Then open http://localhost:8080 in a browser. The demo supports mobile and desktop layouts, light and dark themes, navigation, forms, a calendar, chat, modal and toast interactions.

## Use it in another project

Copy the assets folder into the new app, then load the main stylesheet:

    <link rel="stylesheet" href="assets/ui.css">

The stylesheet automatically imports the design tokens from assets/tokens.css. Icons are reusable SVG symbols:

    <svg aria-hidden="true">
      <use href="assets/icons.svg#icon-calendar"></use>
    </svg>

Use index.html as the visual reference and starter markup. Keep only the components the new product needs.

## Included foundations

- System, light and dark colour themes
- Responsive desktop sidebar and mobile bottom navigation
- Sticky mobile-safe top bar
- Cards, metrics, hero panels and list rows
- Primary, secondary, danger and icon buttons
- Text, email, date, select and textarea controls
- Monday-first calendar with colour-coded event chips
- Fixed chat layout, message bubbles and composer
- Modal and toast patterns
- PWA manifest and simple offline cache
- Shared SVG icon sprite

## File map

| File | Purpose |
| --- | --- |
| assets/tokens.css | Colours, typography, spacing, radius and shadow variables |
| assets/ui.css | Components, layouts and responsive behaviour |
| assets/icons.svg | Reusable outline icons |
| assets/demo.js | Demo navigation, theme and interaction logic |
| index.html | Complete component gallery and starter screen |
| manifest.webmanifest | PWA metadata |
| sw.js | Basic offline asset cache |
| favicon.svg | Placeholder W brand mark |

## Rebrand checklist

1. Change the brand name and mark in index.html and favicon.svg.
2. Adjust primary and secondary colours in assets/tokens.css.
3. Keep text, background and border contrast accessible in both themes.
4. Replace demo wording and sample data before shipping.
5. Generate production PNG app icons at 192 and 512 pixels for the final PWA or app-store build.

## Visual rules

- Use the shared tokens instead of one-off colours and spacing.
- Keep all controls in a form row the same height and width.
- Keep important mobile actions above the safe-area inset.
- Use the accent colour for selection and status, not every action.
- Prefer the neutral button style for everyday actions.
- Test at narrow mobile widths and in standalone PWA mode.

This repository is intentionally plain HTML, CSS and JavaScript so its visual system can be moved into React, Vue, Svelte, native wrappers or another stack without bringing over an application framework.
