# ER Simulator Landing Page

Marketing landing page for ER Simulator with integrated Stripe payment flows.

## Pages

| Route | Description |
|-------|-------------|
| `/` | Main landing page |
| `/pricing` | Individual subscription plans (Starter, Core, Pro) |
| `/enterprise` | Enterprise volume pricing with self-service checkout |
| `/affiliate` | Affiliate referral landing page |
| `/subscription/success` | Individual checkout success page |
| `/enterprise/success` | Enterprise checkout success page |

## Payment Integration

### Individual Subscriptions (`/pricing`)

Three subscription tiers with monthly and annual billing:

| Tier | Monthly | Annual (10% off) | Cases/Month |
|------|---------|------------------|-------------|
| Starter | $19 | $171 | 5 |
| Core | $39 | $351 | 15 |
| Pro | $79 | $711 | 30 |

**Features:**
- 30-day free trial
- Monthly/yearly toggle
- Affiliate code detection from URL params (`?ref=`, `?via=`, `?affiliate=`)
- Automatic affiliate discount application

### Enterprise Volume Pricing (`/enterprise`)

Self-service volume pricing for teams:

| Seats | Discount |
|-------|----------|
| 1-9 | Standard (0%) |
| 10-24 | 40% off |
| 25-49 | 50% off |
| 50+ | 60% off |

**Features:**
- Plan selection (Starter/Core/Pro)
- Volume tier selector
- Seat count slider (1-500)
- Dynamic pricing calculator
- Real-time API pricing fetch

### Affiliate Program (`/affiliate`)

Referral program with automatic discount application:

- **First Year:** 50% off (6 months free)
- **Renewals:** 15% off forever on annual plans

Affiliates share links like:
- `https://ersimulator.com/pricing?ref=PARTNER123`
- `https://ersimulator.com/affiliate?code=PARTNER123`

## Backend API Endpoints

All payment flows integrate with the Django backend:

```
POST /api/payments/checkout/
  - Individual subscription checkout
  - Params: tier, billing_cycle, affiliate_code

POST /api/payments/enterprise/checkout/
  - Enterprise volume checkout
  - Params: tier, quantity, customer_email, organization_name

GET /api/payments/enterprise/pricing/
  - Get enterprise pricing info
  - Query: tier, quantity

GET /api/payments/affiliate/verify/
  - Verify affiliate code
  - Query: code
```

## Environment Variables

```bash
# API base URL (defaults to production)
NEXT_PUBLIC_API_URL=https://api.ersimulator.com
```

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Tech Stack

- Next.js 16
- React 19
- Tailwind CSS
- TypeScript
