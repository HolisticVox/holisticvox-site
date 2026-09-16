# Stripe Go/No-Go

Current status: NO-GO.

## Current Decision

Stripe checkout is not active on the website. Phase 2B only prepares a public-safe configuration field for a future hosted Stripe Payment Link.

## Required Before Activation

- Owner explicitly says: "Activate Stripe for HolisticVox."
- A real hosted Stripe Payment Link is created in the Stripe Dashboard.
- The payout bank account is configured directly inside Stripe, not in the website repository.
- Practitioner offer copy is reviewed for price consistency and non-endorsement language.
- Refund, cancellation, and listing-review expectations are visible before checkout.
- Preview deployment is manually reviewed before merge to `main`.

## Configuration Field

When ready, add only the hosted public payment URL here:

- `data/revenue.js`
- `HV_REVENUE.featuredPractitioner.stripePaymentLink`
- `HV_REVENUE.featuredPractitioner.status`

Do not add API keys, webhook secrets, customer records, or bank information to this repository.
