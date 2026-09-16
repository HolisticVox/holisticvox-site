# HolisticVox

Source files for the HolisticVox website — a bilingual (EN/ES) natural health and wellness site with a curated product marketplace, articles, recipes, and a practitioner directory.

## Structure
- `index.html` — static single-page app shell and existing embedded page/content markup
- `css/site.css` — extracted site styles, preserving the previous inline CSS
- `js/router.js` — client-side route activation, history, metadata, navigation UI, and market filters
- `js/i18n.js` — English/Spanish translation dictionary and language switching
- `js/forms.js` — static form, intake, newsletter, and popup behavior
- `data/routes.js` — central route registry for canonical paths, aliases, titles, sitemap inclusion, and page type
- `data/articles.js` — initial article metadata structure; article bodies remain in `index.html`
- `data/products.js` — initial product/affiliate schema with representative migrated records
- `data/revenue.js` — public-safe revenue configuration for the future practitioner Stripe Payment Link
- `images/` — all product, article, and recipe photos referenced by `index.html`
- `scripts/audit-routes.ps1` — lightweight consistency check for routes, sitemap, physical route folders, and image references

## Revenue Configuration
Phase 2B prepares the Founding Featured Practitioner Listing at `$29/month`, but checkout remains disabled until the owner explicitly approves activation.

To activate later, create a hosted Stripe Payment Link in the Stripe Dashboard and add only the public hosted URL to `HV_REVENUE.featuredPractitioner.stripePaymentLink` in `data/revenue.js`, then change `HV_REVENUE.featuredPractitioner.status` to `active`.

Never commit Stripe secret keys, webhook secrets, customer records, bank information, or private practitioner data to this repository.

## Deployment
This site is a static site — no build step required. It is compatible with Cloudflare Pages SPA fallback through `wrangler.toml` (`not_found_handling = "single-page-application"`) and `_redirects` (`/* /index.html 200`). Any push to the `main` branch may trigger production deployment, so stabilization work should be merged only after preview testing and explicit approval.
