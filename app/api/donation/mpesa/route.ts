import { NextRequest, NextResponse } from 'next/server';
import { initiateStkPush } from '@/lib/mpesa';
import { prisma } from '@/lib/prisma';


export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { campaignId, amount, phone, donorName, donorEmail } = body;

    if (!campaignId || !amount || !phone) {
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
          payment_method: 'mpesa',
          payment_status: 'pending',
          phone_number: phone,
          donor_name: donorName,
          donor_email: donorEmail,
        },
      ])
      .select()
      .single();

    if (donationError) {
      return NextResponse.json({ error: donationError.message }, { status: 500 });
    }

    const stkResponse = await initiateStkPush(
      phone,
      amount,
      `SAIDIA-${donation.id.slice(0, 8)}`,
      `Donation to ${campaign.title}`
    );

    if (stkResponse.ResponseCode === '0') {
      await prisma
        .donations
        .update({
          where: { id: donation.id },
          data: { transaction_id: stkResponse.CheckoutRequestID }
        });

      return NextResponse.json({
        success: true,
        message: 'STK push sent. Please check your phone.',
        checkoutRequestId: stkResponse.CheckoutRequestID,
        donationId: donation.id,
      });
    } else {
      await prisma
        .donations
        .update({
          where: { id: donation.id },
          data: { payment_status: 'failed' }
        });

      return NextResponse.json(
        { error: 'Failed to initiate payment' },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('M-Pesa error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to process payment' },
      { status: 500 }
    );
  }
}
