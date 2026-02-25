import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { supabaseAdmin } from '@/lib/supabase';

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error: any) {
    console.error('Webhook signature verification failed:', error.message);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object as any;
        const tier = subscription.metadata?.tier || 'starter';

        // Update user subscription
        const { error } = await supabaseAdmin
          .from('subscriptions')
          .upsert([
            {
              stripe_subscription_id: subscription.id,
              user_id: subscription.metadata?.user_id,
              tier,
              status: subscription.status,
              amount_monthly: subscription.items.data[0]?.price.unit_amount,
              billing_date: new Date(subscription.billing_cycle_anchor * 1000).toISOString(),
              renewal_date: new Date(subscription.current_period_end * 1000).toISOString(),
              cancel_at_period_end: subscription.cancel_at_period_end,
            },
          ]);

        if (error) throw error;

        // Update user tier
        await supabaseAdmin
          .from('users')
          .update({ subscription_tier: tier })
          .eq('id', subscription.metadata?.user_id);

        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as any;

        // Mark subscription as canceled
        const { error } = await supabaseAdmin
          .from('subscriptions')
          .update({ status: 'canceled' })
          .eq('stripe_subscription_id', subscription.id);

        if (error) throw error;

        break;
      }

      case 'invoice.paid': {
        const invoice = event.data.object as any;
        console.log('Invoice paid:', invoice.id);
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as any;
        console.log('Invoice payment failed:', invoice.id);
        break;
      }
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Webhook processing error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
