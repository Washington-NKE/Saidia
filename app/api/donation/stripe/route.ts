import { NextRequest, NextResponse } from 'next/server';
import { createCheckoutSession } from '@/lib/stripe-config';
import { prisma } from '@/lib/prisma';


export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { campaignId, amount, donorEmail, donorName } = body;

    if (!campaignId || !amount) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const { data: campaign } = await prisma
      .campaigns
      .findUnique({
        where: { id: campaignId },
        select: { title: true }
      });

    if (!campaign) {
      return NextResponse.json({ error: 'Campaign not found' }, { status: 404 });
    }

    const { data: donation, error: donationError } = await prisma
      .donations
      .create({
        data: {
          campaign_id: campaignId,
          amount,
          payment_method: 'stripe',
          payment_status: 'pending',
          donor_email: donorEmail,
          donor_name: donorName,
        },
      });

    if (donationError) {
      return NextResponse.json({ error: donationError.message }, { status: 500 });
    }

    const session = await createCheckoutSession(
      campaignId,
      amount,
      campaign.title,
      donorEmail
    );

    await prisma
      .donations
      .update({
        where: { id: donation.id },
        data: { transaction_id: session.id }
      });

    return NextResponse.json({
      sessionId: session.id,
      url: session.url,
      donationId: donation.id,
    });
  } catch (error: any) {
    console.error('Stripe error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
