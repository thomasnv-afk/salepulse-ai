# 🚀 SalesPulse AI — Vercel Deployment Instructions

Your code is **ready to deploy**. Here's how:

---

## **Step 1: Go to Vercel**

1. Visit: https://vercel.com/new
2. **Import Git Repository**
3. Paste: `https://github.com/thomasnv-afk/salepulse-ai`
4. Click **"Import"**

---

## **Step 2: Configure Project**

1. **Framework**: Next.js (auto-detected)
2. **Root Directory**: `.` (current)
3. Click **"Deploy"**

Vercel will build and deploy in 2-3 minutes.

---

## **Step 3: Add Environment Variables**

After deployment, go to **Project Settings → Environment Variables** and add:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key_here
STRIPE_SECRET_KEY=your_stripe_secret_key_here

RESEND_API_KEY=your_resend_api_key_here
HEYGEN_API_KEY=your_heygen_api_key_here

NEXT_PUBLIC_APP_URL=https://your-vercel-url.vercel.app
```

**Get your keys from:**
- Supabase: https://app.supabase.com/project/YOUR_PROJECT/settings/api
- Stripe: https://dashboard.stripe.com/apikeys
- Resend: https://resend.com/api-keys
- HeyGen: https://app.heygen.com/settings/api

---

## **Step 4: Redeploy**

1. Go to **Deployments**
2. Click **"Redeploy"** on the latest deployment
3. Wait 2-3 minutes

**Done!** Your SaaS is live. 🚀

---

## **Custom Domain Setup**

1. Go to **Settings → Domains**
2. Add `salepulse.ai`
3. Follow DNS instructions
4. Live in 24-48 hours

---

## **GitHub Auto-Deploy**

Now every time you push to GitHub, Vercel auto-deploys! 🎯

```bash
git push origin main
# Vercel automatically deploys in 2-3 minutes
```
