# SalesPulse AI - Detailed Setup Guide

## Step 1: Environment Setup

### Prerequisites
- Node.js 18.17 or later
- npm (comes with Node)
- Git
- A code editor (VS Code recommended)

### Check versions
```bash
node --version  # Should be v18.17+
npm --version   # Should be v9+
git --version
```

## Step 2: Clone & Install

```bash
# Clone repository
git clone <repo-url>
cd salepulse-ai

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local
```

## Step 3: Configure Supabase

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Copy your project credentials:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `Anon Key` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `Service Role Key` → `SUPABASE_SERVICE_ROLE_KEY`

4. Apply database migrations:
```bash
npm run db:push
```

## Step 4: Configure Stripe

1. Go to [stripe.com](https://stripe.com)
2. Create a new account or login
3. Get your keys from Developers → API Keys:
   - `Publishable Key` → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - `Secret Key` → `STRIPE_SECRET_KEY`

4. Create products for pricing tiers:
   - Starter ($499/month)
   - Pro ($999/month)
   - Save the Price IDs

5. Set webhook endpoint:
   - Endpoint: `https://yourdomain.com/api/webhooks/stripe`
   - Events: `customer.subscription.*`, `invoice.*`
   - Get signing secret → `STRIPE_WEBHOOK_SECRET`

## Step 5: Configure HeyGen

1. Go to [heygen.com](https://heygen.com)
2. Sign up and get API key
3. Add to .env.local: `HEYGEN_API_KEY=your_key`

## Step 6: Configure Resend

1. Go to [resend.com](https://resend.com)
2. Get your API key
3. Add to .env.local: `RESEND_API_KEY=your_key`
4. Verify your domain for sending emails

## Step 7: Local Development

```bash
# Start dev server
npm run dev

# Server runs on http://localhost:3000
```

### Test the flow:
1. Go to http://localhost:3000
2. Sign up with a test account
3. Create a campaign
4. Generate a video

## Step 8: Deployment Preparation

### Create GitHub Repository

```bash
git init
git add .
git commit -m "Initial commit: SalesPulse AI"
git remote add origin https://github.com/yourusername/salepulse-ai.git
git branch -M main
git push -u origin main
```

### Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Select your GitHub repository
4. Configure:
   - Framework: Next.js
   - Root Directory: ./
5. Add environment variables (copy from .env.local)
6. Deploy!

## Step 9: Post-Deployment

### Configure Custom Domain

1. In Vercel dashboard:
   - Settings → Domains
   - Add your domain (e.g., salepulse.ai)
   - Follow DNS instructions

### Configure Stripe for Live Mode

1. In Stripe Dashboard:
   - Switch from Test to Live mode
   - Get Live API keys
   - Update Vercel environment variables

### Setup Email Domain

1. In Resend:
   - Add your custom domain
   - Verify DNS records
   - Update NEXT_PUBLIC_APP_URL in Vercel

## Step 10: Verify Everything

### Checklist:
- [ ] Database migrations applied
- [ ] Supabase RLS policies enabled
- [ ] Stripe products created with price IDs
- [ ] HeyGen API key working
- [ ] Resend domain verified
- [ ] GitHub repository created
- [ ] Vercel deployment successful
- [ ] Custom domain resolving
- [ ] Stripe webhooks configured
- [ ] Live mode ready for payments

## Troubleshooting

### Database Connection Error
```bash
# Check Supabase connection
npm run db:push --verbose
```

### Stripe Webhook Not Working
1. Verify webhook signing secret
2. Check endpoint URL is accessible
3. Test webhook from Stripe dashboard

### Video Generation Fails
1. Verify HeyGen API key
2. Check rate limits
3. Test script format

### Email Not Sending
1. Verify Resend domain ownership
2. Check from address is correct
3. Test with Resend dashboard

## Getting Help

- Check logs: `npm run dev` shows console output
- Supabase docs: https://supabase.com/docs
- Stripe docs: https://stripe.com/docs
- Next.js docs: https://nextjs.org/docs
- Support: support@salepulse.ai

## Next Steps

1. Customize landing page
2. Create marketing website
3. Set up analytics
4. Onboard first customers
5. Monitor metrics
