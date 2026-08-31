# HolisticVox Architecture Audit

Audit date: 2026-08-30  
Repository: `HolisticVox/holisticvox-site`  
Working branch: `holisticvox-audit-development`  
Scope: audit, map, organize, and prepare. No runtime code changes were made for this phase.

## 1. Current Architecture Summary

HolisticVox is currently a static single-page application centered on a very large root `index.html` file. The file contains the HTML page tree, CSS, JavaScript router, translation dictionary, article bodies, recipe bodies, product cards, practitioner content, forms, newsletter popup, and legal pages.

The site has Cloudflare-oriented static hosting support through `wrangler.toml`, plus physical route folders for some public URLs. Most physical route folders contain tiny redirect stubs that send visitors back into the root SPA with a `?page=` query string.

The architecture is workable for a static Cloudflare Pages deployment, but future monetization, practitioner directory, marketplace, approval workflow, and SEO expansion will become risky if all content and behavior remain embedded in one file.

## 2. Current File and Folder Structure

Tracked core files:

- `index.html`: main SPA, about 1.2 MB and 7,520 lines.
- `images/`: all referenced article, recipe, hub, and product images.
- `README.md`: documents the current static, no-build architecture.
- `robots.txt`: allows crawling and points to the sitemap.
- `sitemap.xml`: lists public URLs.
- `wrangler.toml`: Cloudflare asset deployment config.
- `_redirects`: tracked in Git, but currently deleted in the working tree before this audit.
- `library-01-*` through `library-24-*`: physical route folders, each with a small redirecting `index.html`.
- `market/`, `shop/`, `media/`, `podcast/`: physical route folders, each with a small redirecting `index.html`.

Untracked or modified files present before this audit:

- `.assetsignore` modified.
- `_redirects` deleted in the working tree.
- `index.html` modified.
- `.codex-route-backup/` untracked.
- `HolisticVox-Spanish-Text-Review.md` untracked.
- `media/` and `podcast/` untracked route folders.

These were not reverted or folded into this audit commit.

## 3. Routing Map

The app uses `.page` containers with IDs like `page-home`, `page-shop`, and `page-article1`. Navigation calls `go(id)`, which hides all `.page` elements, activates `#page-{id}`, updates the document title from `pageTitles`, and pushes a browser history state using `PAGE_SLUGS` when available.

Core route IDs observed:

- Primary pages: `home`, `about`, `start`, `holistichealing`, `wellnesshub`, `articles`, `recipes`, `shop`, `media`, `practitioners`, `book`, `contact`.
- Wellness hubs: `women`, `men`, `kids`, `pets`, `remedies`, `mindbody`, `acupuncture`, `soundhealing`, `breathwork`, `forestbathing`, `coldtherapy`, `earthing`, `efttapping`, `ayurveda`, `tcm`, `homeopathy`, `naturopathy`, `herbalism`, `antiinflammatory`, `fasting`, `gutmicrobiome`, `sleep`, `longevity`, `detox`, `massage`, `holistickids`, `holisticpregnancy`, `menopause`, `menshormones`, `elderwellness`.
- Article pages: `article1` through `article19`.
- Recipe pages: `recipe1` through `recipe6`.
- Autism pages: `autism`, `autism-nutrition`, `autism-gut`, `autism-sleep`, `autism-sensory`, `autism-magnesium`, `autism-folinic`.
- Library pages: `library-01-*` through `library-24-*`.
- Legal pages: `privacy`, `terms`, `disclosure`.

Slug behavior:

- `PAGE_SLUGS` maps major pages to cleaner URLs, for example `shop` to `/market`, `media` to `/podcast`, `women` to `/womenshealth`, and `start` to `/start-here`.
- `SLUG_ALIASES` catches some older or alternate paths, including `/shop`, `/wellness-hub`, `/women`, `/men`, `/kids-health`, `/little-ones`, `/pets-health`, `/natural-remedies`, `/media`, and `/autism-hub`.
- Page IDs without explicit slugs fall back to `/{id}`.
- Physical route folders use JavaScript redirects such as `location.replace("/?page=library-01-hormone-balance-naturally-evidence-b")`.

Broken or risky route findings:

- The sitemap lists `/article20` through `/article24`, but only `page-article1` through `page-article19` exist.
- The sitemap lists `/recipe7` and `/recipe8`, but only `page-recipe1` through `page-recipe6` exist.
- The sitemap lists `/littleones`, but there is no `page-littleones` and no alias for `/littleones`; the current valid-ish kids paths are `kids`, `/kidshealth`, `/kids-health`, and `/little-ones`.
- The sitemap lists `/pets`, but the explicit page slug is `/petshealth`; however `/pets` can still resolve through fallback because `page-pets` exists.
- `longevity-article` exists as a page ID but does not have a core slug entry.
- Navigation click targets checked during audit all pointed to existing page IDs.

## 4. Content and Article System

There are two overlapping article systems:

- Older article pages, `article1` through `article19`, are embedded directly in `index.html`.
- Newer library article pages, `library-01-*` through `library-24-*`, are also embedded in `index.html` and mirrored by physical redirect folders.

The article listing pages are manually assembled using repeated `.art-card` blocks with inline `onclick="go(...)"` handlers. Article pages include body copy, related article blocks, affiliate disclosure blocks, and in some cases product recommendations. There is no separate article data model, article renderer, source metadata file, or per-article SEO metadata object.

Content risks:

- Some article excerpts include visible "SUGGESTED IMAGE" text, which looks like production editorial artifact text rather than reader-facing copy.
- A large "COMPLETE CONTENT LIBRARY START" block appears after `</body>`, `</html>`, and a malformed trailing `</html` fragment. Browsers may still render parts of this because they repair malformed HTML, but validators, crawlers, and future tooling may behave unpredictably.
- Article pages are not independently server-rendered documents, so direct crawlers receive the same root metadata unless JavaScript is executed.

## 5. Translation System

The site has two translation approaches in the same file:

- A `LANG` object beginning near the bottom of `index.html` with `en` and `es` dictionaries. The audit found 266 unique `data-i18n` keys.
- Paired inline content blocks using `.en-only` and `.es-only`. The audit found 1,523 `en-only` and 1,523 `es-only` class occurrences.

`setLang(lang)` updates button state, applies translated strings, changes `html lang`, and shows a toast. The CSS hides `.es-only` when English is active and `.en-only` when Spanish is active.

Risks:

- The selected language does not appear to be persisted across page loads.
- Some translation content is dictionary-driven while long-form article content is duplicated inline.
- There is no independent translation completeness check.
- Per-language SEO is not implemented with `hreflang`, separate URLs, or translated page-level metadata.

## 6. Affiliate and Product System

The market/product system is embedded as repeated HTML product cards. The audit found:

- 61 unique Amazon short links using `amzn.to`.
- About 93 product-card class occurrences.
- About 25 `art-prod-card` occurrences.
- About 57 `prod-rec` occurrences.
- Other affiliate/partner references include Touchstone Essentials, iHerb, BioGaia, Thrive Market, Mountain Rose Herbs, Organifi, Four Sigmatic, and Fullscript. Some are described as coming soon or pending approval.

Products use local images and direct outbound links. There is no central product record format for name, category, image, affiliate network, affiliate URL, disclosure, educational notes, recommended-for tags, or precautions.

Risks:

- Product claims and affiliate links are mixed directly into editorial pages.
- Affiliate URLs cannot be audited, replaced, or disabled safely without editing HTML in many places.
- Some product buttons use anchors; others use `window.open(...)` inside buttons or cards.
- Some product recommendation CSS hides in-article recommendations for article pages, which may indicate a partial or temporary suppression layer.

## 7. Practitioner and Marketplace System

The practitioner page currently combines:

- Directory marketing copy.
- Join/apply CTA.
- A direct practitioner application form.
- A "Maya" conversational intake assistant.
- A second "Sage" practitioner flow later in the file.
- A book/session page that routes back to practitioners.

Practitioner applications are collected client-side and handed off through generated `mailto:` drafts to `holisticvoxwellness@gmail.com`. No backend, database, admin review queue, identity system, Stripe checkout, listing plan enforcement, or approval workflow exists yet.

Marketplace-related content includes:

- `shop` page exposed as `/market`.
- Affiliate product grids and filters.
- Brand store interest form.
- Sponsor/partnership intake assistant named "Sofia" on the contact page.
- Explicit affiliate disclosure and health disclaimer in the footer and legal page.

Future paid directory listings should be clearly modeled separately from editorial recommendations and practitioner vetting. Paid placement should become a field on listings, not a visual endorsement marker.

## 8. Cloudflare Deployment Findings

Current Cloudflare compatibility is mostly positive for a static SPA:

- `wrangler.toml` uses `[assets] directory = "."`.
- `not_found_handling = "single-page-application"` supports deep-link fallback.
- `README.md` states there is no build step and Cloudflare Pages deploys directly from GitHub.
- Asset paths are relative to root and image references checked during audit all exist.
- `robots.txt` is present and points to `https://holisticvox.com/sitemap.xml`.

Risks and follow-up:

- `_redirects` is tracked as `/* /index.html 200`, but it is deleted in the current working tree. If that deletion reaches production without equivalent Cloudflare SPA fallback, deep links could break.
- `wrangler.toml` and `_redirects` overlap conceptually; keep one clear Cloudflare deployment path documented.
- Physical redirect folders plus Cloudflare SPA fallback plus `PAGE_SLUGS` create three routing layers. This should be normalized carefully before adding more routes.
- There were no localhost references found in the checked files.
- No server-side environment variables are required by the current static app.

## 9. SEO Findings

Technical SEO gaps:

- Only the root document has static `<title>`, meta description, canonical, Open Graph, and Twitter card metadata.
- Client-side page title changes do not create crawlable, per-route metadata for non-JavaScript crawlers.
- No JSON-LD structured data was found.
- No `og:image` was found.
- No `hreflang` strategy exists for English/Spanish.
- Sitemap includes URLs that do not resolve to current page IDs: `/article20` through `/article24`, `/recipe7`, `/recipe8`, and `/littleones`.
- Some sitemap URL patterns differ from router slugs, for example `/natural-remedies` versus `/naturalremedies`, and `/pets` versus `/petshealth`.
- Generic URLs such as `/article1` are still present and should eventually be replaced or canonicalized to descriptive slugs.
- Library URLs are descriptive but truncated, creating awkward slugs ending in partial words or hyphens.
- Physical route folders are redirect-only pages, so they do not provide independent SEO documents.
- The malformed trailing HTML after the document close can confuse parsers and automated SEO tooling.

SEO opportunities:

- Create a page metadata registry before adding new monetization routes.
- Add structured data for Organization, WebSite, Article, BreadcrumbList, Product where appropriate, and FAQ only where content actually supports it.
- Add canonical and alternate-language planning before scaling Spanish pages.
- Avoid creating thin practitioner SEO pages until real listing inventory and editorial substance exist.

## 10. Performance Findings

Performance risks:

- `index.html` is about 1.2 MB before compression and contains the entire app, content library, product catalog, translations, and scripts.
- Total non-Git working files are about 52.28 MB.
- Several images are large for web delivery:
  - `images/article-ayurveda.jpg`: about 3.5 MB.
  - `images/autism-magnesium.jpg`: about 3.0 MB.
  - `images/article-acupuncture.jpg`: about 2.4 MB.
  - `images/autism-nutrition.jpg`: about 2.3 MB.
  - `images/article-supplements-variety.jpg`: about 2.2 MB.
  - `images/article-pets-joints.jpg`: about 1.9 MB.
  - `images/autism-gut.jpg`: about 1.6 MB.
  - `images/autism-folinic.jpg`: about 1.3 MB.
- Google Fonts and Google Analytics load from third-party origins.
- MailerLite universal script loads near the top of the document.
- CSS is inline in the root file, with additional inline styles later.
- JavaScript is inline in several separate script blocks.
- Many images do not appear to use explicit lazy-loading attributes.

Recommended performance direction:

- Do not optimize aggressively before modularization.
- First separate stable CSS, router JS, product data, and article data.
- Then introduce responsive image sizes and WebP/AVIF alternatives.
- Lazy-load offscreen article/product images after route rendering is stable.

## 11. Security and Privacy Findings

No obvious private API keys, Stripe secrets, Cloudflare credentials, or OpenAI-style secret keys were found in the audited source files.

Public integrations found:

- Google Analytics measurement ID: `G-PQFSWSBJ20`.
- MailerLite public account/form IDs.
- Public affiliate links.
- Public contact email: `holisticvoxwellness@gmail.com`.

Security and trust risks:

- User-submitted form values are inserted into generated success HTML in the newsletter popup without escaping. This is client-side and local to the user's browser, but it is still a hygiene issue.
- Forms largely rely on `mailto:` drafts, so submissions depend on the user's mail client and are not reliably captured.
- Hidden forms suggest previous or alternate static form handling, but current handlers bypass a real backend.
- Paid tiers are mentioned in intake flows before payment infrastructure exists. Keep this clearly framed as application preference, not active billing.
- Medical trust should be tightened around claims involving cancer prevention, colloidal silver, detox, immune support, and supplement dosing.

## 12. Technical Risks

Highest risks before feature expansion:

- Single massive `index.html` makes routing, SEO, content review, affiliate compliance, and translation QA hard to control.
- Malformed document ending and appended content after `</html>` create parser and maintenance risk.
- Multiple route systems can diverge: `PAGE_SLUGS`, `SLUG_ALIASES`, physical redirect folders, sitemap, and Cloudflare fallback.
- Sitemap currently contains routes that appear broken.
- Product and affiliate data is repeated in markup instead of centrally governed.
- Practitioner application logic appears duplicated across Maya, Sage, and direct form flows.
- Editorial, affiliate, sponsor, and paid directory concepts are present but not yet separated by data model or policy layer.
- Existing uncommitted changes in the working tree should be resolved before implementation work.

## 13. Recommended Modularization

Safe candidates to extract first, without redesigning:

- `css/site.css`: move current inline CSS as-is.
- `js/router.js`: move `PAGE_SLUGS`, `SLUG_ALIASES`, `go`, `navTo`, popstate handling, DOMContentLoaded routing, and back-button helper logic.
- `js/i18n.js`: move `LANG`, `T`, `setLang`, and `applyTranslations`.
- `js/forms.js`: move contact, feedback, brand interest, practitioner form, and newsletter popup handlers.
- `js/market.js`: move shop filters and product rendering helpers once product data exists.
- `data/products.js` or `data/products.json`: central product and affiliate records.
- `data/articles.js` or `data/articles.json`: article metadata, slugs, categories, images, summaries, read time, language status, and disclosure flags.
- `data/practitioners.js` or `data/practitioners.json`: temporary static practitioner directory records until a backend exists.
- `data/routes.js`: canonical route registry used to generate router maps and sitemap.
- `components/`: only after data extraction, create small render helpers for nav, cards, products, articles, and practitioner listings.

Do not extract long-form article bodies all at once. Start with metadata and route registry, then migrate one content family at a time after tests or route checks exist.

## 14. Recommended Future Folder Structure

Proposed structure:

```text
/
  index.html
  robots.txt
  sitemap.xml
  wrangler.toml
  _redirects
  css/
    site.css
  js/
    app.js
    router.js
    i18n.js
    forms.js
    market.js
    analytics.js
  data/
    routes.json
    articles.json
    recipes.json
    products.json
    practitioners.json
    translations.en.json
    translations.es.json
  components/
    nav.js
    article-card.js
    product-card.js
    practitioner-card.js
  images/
  functions/
    README.md
```

Notes:

- `functions/` should remain empty or documented until Cloudflare Functions are truly needed.
- Stripe, directory approvals, and sponsor workflows should not be added until data boundaries and disclosure rules are clear.
- Keep existing route folders during migration until redirects and Cloudflare fallback are verified.

## 15. Safe Implementation Sequence

Recommended Phase 2 plan:

1. Resolve the current dirty working tree intentionally, especially the deleted `_redirects` and modified `index.html`.
2. Add a route audit script that compares `page-*` IDs, `PAGE_SLUGS`, aliases, physical route folders, and `sitemap.xml`.
3. Fix sitemap mismatches and decide canonical URLs for `/kidshealth`, `/littleones`, `/pets`, `/petshealth`, `/naturalremedies`, and `/natural-remedies`.
4. Repair malformed trailing HTML so all page content lives inside one valid document.
5. Extract CSS to `css/site.css` with no visual redesign.
6. Extract router constants and functions to `js/router.js`, preserving current behavior.
7. Extract translation dictionary and language functions to `js/i18n.js`; add a translation completeness check.
8. Create a route metadata registry and generate or validate sitemap entries from it.
9. Create product data records for the current affiliate catalog without changing URLs.
10. Render product cards from data only after the record shape is reviewed.
11. Consolidate practitioner intake paths into one static-safe application flow.
12. Add structured editorial, affiliate, advertisement, and paid-listing disclosure fields before launching monetization.
13. Optimize images in a separate pass after routes and content are stable.
14. Prepare future `/join/`, `/partners/`, `/practitioners/`, and `/market/` expansion from the route registry rather than ad hoc page IDs.

## Phase 2 Implementation Proposal

Phase 2 should be a conservative stabilization phase, not a redesign.

Deliverables:

- A valid HTML shell with no content after `</html>`.
- A route registry that becomes the source of truth for router paths and sitemap checks.
- Externalized CSS and router/i18n/form JavaScript files loaded by `index.html`.
- A technical SEO cleanup PR that removes broken sitemap URLs and adds missing canonical metadata strategy.
- A product data schema draft with all current affiliate URLs preserved but centrally auditable.
- A practitioner listing/application schema draft that separates editorial vetting, paid placement, application status, and public profile data.

Acceptance checks:

- All existing visible pages still render.
- Existing public URLs continue to work or redirect intentionally.
- No article/library folders are deleted.
- No affiliate URLs are changed unless separately verified.
- No payment, paid directory, or sponsor activation is introduced.
- No secrets are added.
