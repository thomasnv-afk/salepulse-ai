import Stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  throw new Error('Missing STRIPE_SECRET_KEY');
}

export const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2023-10-16',
});

export const PRICING_PLANS = {
  starter: {
    name: 'Starter',
    tier: 'starter' as const,
    price: 49900, // $499/month in cents
    stripePriceId: process.env.STRIPE_STARTER_PRICE_ID || '',
    features: [
      'Up to 10 campaigns per month',
      'Basic video templates',
      'Email support',
      'Basic analytics',
    ],
  },
  pro: {
    name: 'Pro',
    tier: 'pro' as const,
    price: 99900, // $999/month in cents
    stripePriceId: process.env.STRIPE_PRO_PRICE_ID || '',
    features: [
      'Unlimited campaigns',
      'Advanced video templates',
      'Salesforce integration',
      'Advanced analytics & reporting',
      'Priority support',
    ],
  },
  enterprise: {
    name: 'Enterprise',
    tier: 'enterprise' as const,
    price: 0, // Custom pricing
    stripePriceId: '',
    features: [
      'Custom video templates',
      'Dedicated account manager',
      'White-label solution',
      'Advanced integrations',
      '24/7 phone support',
      'Custom SLA',
    ],
  },
};

export async function createCheckoutSession(
  customerId: string,
  priceId: string,
  successUrl: string,
  cancelUrl: string
) {
  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    payment_method_types: ['card'],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: 'subscription',
    success_url: successUrl,
    cancel_url: cancelUrl,
  });

  return session;
}

export async function createCustomer(email: string, name?: string) {
  const customer = await stripe.customers.create({
    email,
    name,
  });

  return customer;
}
