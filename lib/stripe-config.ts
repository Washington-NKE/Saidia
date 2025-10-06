import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-09-30.clover',
});

export async function createCheckoutSession(
    campaignId: string,
    amount:number,
    campaignTitle: string,
    donorEmail?:string
) {
    const session = await stripe.checkout.session.create({
        payment_method_types: ['card'],
        line_items: [
            {
                price_data: {
                    currency: 'kes',
                    product_data: {
                        name: `Donation to ${campaignTitle}`,
                        description: 'Saidia Crowdfunding Platform',
                    },
                    unit_amount: Math.floor(amount * 100),
                },
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: `${process.env.NEXTAUTH_URL}/campaign/${campaignId}?success=true`,
        cancel_url: `${process.env.NEXTAUTH_URL}/campaign/${campaignId}?canceled=true`,
        customer_email: donorEmail,
        metadata: {
            campaignId,
        },
    });

    return session;
}