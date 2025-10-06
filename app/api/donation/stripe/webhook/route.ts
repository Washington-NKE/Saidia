import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe-config';
import { supabase } from '@/lib/supabase';
import Stripe from 'stripe';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'No signature' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    console.error('Webhook signature verification failed:', error.message);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    const { data: donation } = await supabase
      .from('donations')
      .select('*, campaigns(*)')
      .eq('transaction_id', session.id)
      .maybeSingle();

    if (donation) {
      await supabase
        .from('donations')
        .update({ payment_status: 'completed' })
        .eq('id', donation.id);

      const newRaisedAmount = Number(donation.campaigns.raised_amount) + Number(donation.amount);

      await supabase
        .from('campaigns')
        .update({ raised_amount: newRaisedAmount })
        .eq('id', donation.campaign_id);

      console.log('Stripe payment completed for donation:', donation.id);
    }
  }

  return NextResponse.json({ received: true });
}
