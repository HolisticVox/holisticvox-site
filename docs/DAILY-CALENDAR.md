# HolisticVox Phase 2B Daily Calendar

Status key: TODO, IN PROGRESS, DONE, BLOCKED, CARRIED FORWARD.

## Phase 2B Starting Point

- Status: IN PROGRESS
- Branch: `codex/holisticvox-revenue-foundation-2026-09`
- Source branch: `origin/main` at `98f7cf781347e023f561b6ddc507f6a2aeea5dec`
- Baseline audit: `powershell -ExecutionPolicy Bypass -File scripts\audit-routes.ps1`
- Baseline result: PASS, 102 pages/routes/sitemap entries, no missing referenced images

## Week 1: Trust Foundation and Brand Consistency

### Monday, September 21, 2026

- DONE: Create Phase 2B implementation branch.
- DONE: Run baseline route audit before edits.
- DONE: Identify homepage counters, precious-metal claims, and outdated practitioner pricing.
- IN PROGRESS: Replace numeric proof counters with qualitative trust statements.
- IN PROGRESS: Normalize practitioner launch offer to Founding Featured Practitioner Listing at $29/month.
- IN PROGRESS: Keep checkout disabled until a real hosted Stripe Payment Link is approved and inserted.

### Tuesday, September 22, 2026

- TODO: Review homepage and high-visibility pages for remaining risky health claims.
- TODO: Confirm legal links are easy to find on desktop and mobile.
- TODO: Check MailerLite forms on desktop and mobile.

### Wednesday, September 23, 2026

- TODO: Implement any approved trust-copy cleanup from Tuesday.
- TODO: Re-run route audit and browser smoke test.
- TODO: Prepare PR notes with risks and manual review steps.

## Readiness Rules

- Stripe stays OFF until HolisticVox explicitly approves activation.
- The public repository must never contain Stripe secret keys, customer data, or bank details.
- Paid practitioner placement must not imply medical endorsement, credential approval, or guaranteed clients.
- Affiliate URLs stay unchanged unless the owner provides a verified replacement.
