import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';


export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('M-Pesa callback received:', JSON.stringify(body, null, 2));

    const { Body } = body;
    if (!Body || !Body.stkCallback) {
      return NextResponse.json({ ResultCode: 1, ResultDesc: 'Invalid callback' });
    }

    const { stkCallback } = Body;
    const { CheckoutRequestID, ResultCode, ResultDesc } = stkCallback;

    const { data: donation } = await prisma
      .donations
      .findUnique({
        where: { transaction_id: CheckoutRequestID },
        include: { campaigns: true }
      });

    if (!donation) {
      console.error('Donation not found for CheckoutRequestID:', CheckoutRequestID);
      return NextResponse.json({ ResultCode: 1, ResultDesc: 'Donation not found' });
    }

    if (ResultCode === 0) {
      const { error: updateDonationError } = await prisma
        .donations
        .update({
          where: { id: donation.id },
          data: { payment_status: 'completed' }
        });

      if (updateDonationError) {
        console.error('Error updating donation:', updateDonationError);
      }

      const newRaisedAmount = Number(donation.campaigns.raised_amount) + Number(donation.amount);

      const { error: updateCampaignError } = await prisma
        .campaigns
        .update({
          where: { id: donation.campaign_id },
          data: { raised_amount: newRaisedAmount }
        });

      if (updateCampaignError) {
        console.error('Error updating campaign:', updateCampaignError);
      }

      console.log('Payment completed successfully for donation:', donation.id);
    } else {
      await prisma
        .donations
        .update({
          where: { id: donation.id },
          data: { payment_status: 'failed' }
        });

      console.log('Payment failed for donation:', donation.id, ResultDesc);
    }

    return NextResponse.json({ ResultCode: 0, ResultDesc: 'Success' });
  } catch (error) {
    console.error('Callback processing error:', error);
    return NextResponse.json({ ResultCode: 1, ResultDesc: 'Internal error' });
  }
}
