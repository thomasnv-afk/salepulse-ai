# SalesPulse AI

AI-powered video prospecting for sales teams. Generate personalized video messages in seconds to increase reply rates and close more deals.

## Features

✨ **AI Video Generation** - Generate personalized videos with AI avatars
📊 **Advanced Analytics** - Track views, clicks, replies, and conversions
🔗 **CRM Integration** - Seamless Salesforce integration
💳 **Stripe Payments** - Easy subscription management
📧 **Email Automation** - Welcome emails and weekly digests
🚀 **Scalable Infrastructure** - Built on Supabase & Vercel

## Tech Stack

- **Frontend**: Next.js 14, React, Tailwind CSS, TypeScript
- **Backend**: Next.js API Routes, Node.js
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Payments**: Stripe
- **Video Generation**: HeyGen API
- **Email**: Resend
- **Hosting**: Vercel

## Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account
- Stripe account
- HeyGen API key
- Resend API key

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/salepulse-ai.git
cd salepulse-ai
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Update `.env.local` with your keys:
```
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
STRIPE_SECRET_KEY=your_key
STRIPE_PUBLISHABLE_KEY=your_key
HEYGEN_API_KEY=your_key
RESEND_API_KEY=your_key
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Setup

The database migrations are in `supabase/migrations/`. They're automatically applied when you deploy to Supabase.

To apply locally:
```bash
npm run db:push
```

## Deployment

### Vercel Deployment

1. Push to GitHub:
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. Connect to Vercel:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Select your GitHub repository
   - Add environment variables
   - Deploy

3. Set up custom domain in Vercel

### Database Deployment

Supabase is automatically hosted. Just connect your project to your Supabase instance.

## Pricing Plans

- **Starter** - $499/month
  - Up to 10 campaigns/month
  - Basic templates
  - Email support

- **Pro** - $999/month
  - Unlimited campaigns
  - Advanced templates
  - Salesforce integration
  - Priority support

- **Enterprise** - Custom pricing
  - Custom templates
  - Dedicated support
  - White-label solution

## API Endpoints

### Campaigns
- `GET /api/campaigns` - List campaigns
- `POST /api/campaigns` - Create campaign
- `GET /api/campaigns/[id]` - Get campaign
- `PUT /api/campaigns/[id]` - Update campaign
- `DELETE /api/campaigns/[id]` - Delete campaign

### Videos
- `POST /api/videos/generate` - Generate video
- `GET /api/videos/[id]/status` - Get video status

### Analytics
- `GET /api/analytics/[campaign_id]` - Get campaign analytics

### Webhooks
- `POST /api/webhooks/stripe` - Stripe webhook
- `POST /api/webhooks/heygen` - HeyGen webhook

## Development

### Project Structure

```
salepulse_ai/
├── app/              # Next.js app directory
├── components/       # React components
├── lib/             # Utility functions & integrations
├── types/           # TypeScript types
├── public/          # Static assets
├── supabase/        # Database migrations
└── package.json     # Dependencies
```

### Running Tests

```bash
npm test
```

### Building

```bash
npm run build
npm start
```

## Contributing

Contributions welcome! Please fork and submit a pull request.

## License

MIT

## Support

For help, email support@salepulse.ai or visit our docs at docs.salepulse.ai
