# SalesPulse AI - Deployment Guide

## Phase 7: Deployment

This guide walks you through deploying SalesPulse AI to production.

## Prerequisites Checklist

✅ All source code committed to Git
✅ Environment variables configured
✅ Database schema created
✅ Supabase project set up
✅ Stripe account configured
✅ HeyGen API key obtained
✅ Resend account configured

## Step 1: Create GitHub Repository

### Option A: Using GitHub Web UI
1. Go to [github.com](https://github.com)
2. Click "+" → "New repository"
3. Name: `salepulse-ai`
4. Description: "AI-powered video prospecting for sales teams"
5. Make it Private (optional)
6. Click "Create repository"

### Option B: Using GitHub CLI
```bash
gh repo create salepulse-ai --private --source=. --remote=origin --push
```

## Step 2: Push Code to GitHub

### Manual Setup (if not using gh CLI)

```bash
cd /Users/thomas/.openclaw/workspace/agents/jimmy_saas/projects/salepulse_ai

# Add remote (replace USERNAME with your GitHub username)
git remote add origin https://github.com/USERNAME/salepulse-ai.git

# Rename branch to main
git branch -M main

# Push to GitHub
git push -u origin main
```

## Step 3: Deploy to Vercel

### Connect Vercel to GitHub

1. Go to [vercel.com/import](https://vercel.com/import)
2. Click "Import Git Repository"
3. Paste your GitHub repository URL
4. Click "Continue"

### Configure Project

1. **Framework Preset**: Next.js
2. **Root Directory**: ./ (leave empty, defaults to root)
3. **Build Command**: `npm run build` (should auto-detect)
4. **Output Directory**: `.next` (should auto-detect)

### Add Environment Variables

In Vercel Project Settings → Environment Variables, add:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxx
NEXT_PUBLIC_APP_URL=https://salepulse.ai

SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
STRIPE_SECRET_KEY=sk_live_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
RESEND_API_KEY=re_xxxxx
HEYGEN_API_KEY=your_api_key
```

**Important**: Make sure environment variables are set for:
- Production
- Preview
- Development (for local)

### Deploy

1. Click "Deploy"
2. Vercel will build and deploy your app
3. You'll get a deployment URL like `salepulse-ai.vercel.app`
4. Wait for build to complete (2-3 minutes)

## Step 4: Setup Custom Domain

### In Vercel Dashboard

1. Go to your project
2. Settings → Domains
3. Click "Add Domain"
4. Enter your domain: `salepulse.ai`
5. Follow DNS instructions for your registrar

### DNS Configuration Example (for Namecheap):

```
Type: CNAME
Name: @
Value: cname.vercel-dns.com
TTL: 3600

Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

DNS changes take 24-48 hours to propagate.

## Step 5: Configure Stripe for Live Mode

### Get Live API Keys

1. Go to [stripe.com/dashboard](https://stripe.com/dashboard)
2. Click "Activate your account" if needed
3. Switch mode from "Test" to "Live"
4. Go to Developers → API Keys
5. Copy your Live keys:
   - Publishable Key → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - Secret Key → `STRIPE_SECRET_KEY`

### Update Vercel Environment Variables

1. In Vercel: Settings → Environment Variables
2. Update both keys with Live values
3. Redeploy:
   ```bash
   git push origin main
   ```

### Setup Webhook Endpoint

1. Go to [stripe.com/webhooks](https://stripe.com/account/webhooks)
2. Click "Add endpoint"
3. **Endpoint URL**: `https://salepulse.ai/api/webhooks/stripe`
4. **Events to send**: Select these events:
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.paid`
   - `invoice.payment_failed`
5. Click "Add endpoint"
6. Copy the Signing Secret
7. Update `STRIPE_WEBHOOK_SECRET` in Vercel environment variables
8. Redeploy

## Step 6: Configure Supabase for Production

### Database Backup

1. Go to [supabase.com](https://supabase.com)
2. Select your project
3. Database → Backups
4. Enable automated daily backups

### Enable Row Level Security

All RLS policies are already configured in migrations. Verify:

1. Authentication → Policies
2. Each table should show RLS is enabled
3. Users can only access their own data

### Monitor Database

1. Go to Dashboard
2. Check database usage
3. Set up alerts for:
   - Storage exceeding 80%
   - Query performance issues

## Step 7: Configure Resend Email

### Verify Domain

1. Go to [resend.com](https://resend.com)
2. Domains → Add domain
3. Enter: `mail.salepulse.ai`
4. Follow DNS instructions

### Update Email Configuration

In your `.env.local` (and Vercel):

```
# Update sender email
NEXT_PUBLIC_FROM_EMAIL=hello@mail.salepulse.ai
```

### Test Email Sending

```bash
curl -X POST "https://api.resend.com/emails" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "from": "hello@mail.salepulse.ai",
    "to": "test@example.com",
    "subject": "Test Email",
    "html": "<p>This is a test email</p>"
  }'
```

## Step 8: Verify Deployment

### Health Checks

1. Visit `https://salepulse.ai/`
   - ✅ Landing page loads
   - ✅ Sign up button works
   - ✅ Navigation works

2. Test signup:
   - ✅ Create account
   - ✅ Verify email
   - ✅ Redirect to dashboard

3. Test payment:
   - ✅ Go to settings
   - ✅ Upgrade to Pro
   - ✅ Stripe checkout appears
   - ✅ Use test card: 4242 4242 4242 4242

4. Test video generation:
   - ✅ Create campaign
   - ✅ Click "Generate Video"
   - ✅ HeyGen API responds

5. Test analytics:
   - ✅ Dashboard shows stats
   - ✅ Analytics page loads
   - ✅ Charts display

### Monitor Logs

1. In Vercel: Analytics → Logs
2. Check for errors
3. Monitor API response times

## Step 9: Setup Monitoring & Alerts

### Vercel Monitoring

1. Settings → Alerts
2. Configure alerts for:
   - Build failures
   - High error rates
   - Performance degradation

### Uptime Monitoring (Optional)

Use a service like:
- [Uptime Robot](https://uptimerobot.com) (free tier)
- [StatusPage.io](https://www.statuspage.io)

Add monitoring URL: `https://salepulse.ai/`

## Step 10: Enable Analytics

### Vercel Analytics

1. Settings → Analytics
2. Enable Web Analytics
3. View dashboard at Analytics

### Database Analytics

1. Supabase Dashboard → Usage
2. Monitor:
   - Query count
   - Storage used
   - Concurrent connections

## Phase 8: Monetization Activation

Once everything is deployed and verified, activate monetization:

### 1. Pricing Tiers Live ✅
- Starter: $499/month
- Pro: $999/month  
- Enterprise: Custom

### 2. Stripe Payments Active ✅
- Live mode enabled
- Webhooks receiving events
- Customer subscriptions tracking

### 3. First 5 Customers
- Set up onboarding calls
- Provide training
- Collect feedback

### 4. Email Sequences
- Welcome email on signup ✅
- Weekly digest emails ✅
- Billing notifications ✅

## Troubleshooting Deployment Issues

### Build Fails on Vercel

Check build logs in Vercel dashboard:
1. Settings → Build & Development
2. Click "View Build Logs"
3. Look for errors
4. Common issues:
   - Missing environment variables
   - Node version mismatch
   - Dependency conflicts

### Database Connection Error

```bash
# Test Supabase connection
curl https://YOUR_SUPABASE_URL/rest/v1/ \
  -H "apikey: YOUR_ANON_KEY"
```

### Stripe Webhooks Not Working

1. Test webhook in Stripe dashboard:
   - Webhooks → Click endpoint
   - "Send test event"
2. Check Vercel logs for errors
3. Verify webhook signing secret is correct

### Email Not Sending

1. Verify Resend domain ownership
2. Check DNS records are correct
3. Test from Resend dashboard
4. Check spam folder

## Next Steps

✅ Phase 7: Deployment complete
→ Phase 8: Monetization activation
→ Customer onboarding & growth

## Getting Help

- Vercel Support: https://vercel.com/support
- Supabase Docs: https://supabase.com/docs
- Stripe Support: https://support.stripe.com
- Resend Help: https://resend.com/docs
- Emergency: support@salepulse.ai
