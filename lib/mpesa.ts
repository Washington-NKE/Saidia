import axios from 'axios';

const MPESA_BASE_URL = 'https://sandbox.safaricom.co.ke';

export async function getMpesaAccessToken(): Promise<string> {
    const auth = Buffer.from(
        `${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`
    ).toString('base64');

    const response = await axios.get(`${MPESA_BASE_URL}/oauth/v1/generate?grant_type=client_credentials`,
        {
            headers: {
                Authorization: `Basic ${auth}`,
            },
        }
    );

    return response.data.access_token;
}

export async function intiateStkPush(
    phone: string,
    amount: number,
    accountReference: string,
    transactionDesc: string
) {
    const accessToken = await getMpesaAccessToken();
    const timestamp = new Date().toISOString().replace(/[-:T.]/g, '')
    .slice(0, 14);

    const shortcode = process.env.MPESA_SHORTCODE!;
    const passkey = process.env.MPESA_PASSKEY!;
    const password = Buffer.from(`${shortcode}${passkey}${timestamp}`).toString('base64');

    const cleanPhone = phone.replace(/\D/g, '');
    const formattedPhone = cleanPhone.startsWith('254') ? cleanPhone : `254${cleanPhone.slice(-9)}`;

    const payload = {
        BusinessShortCode: shortcode,
        Password: password,
        Timestamp: timestamp,
        TransactionType: 'CustomerPayBillOnline',
        Amount: Math.floor(amount),
        PartyA: formattedPhone,
        PartyB: shortcode,
        PhoneNumber: formattedPhone,
        CallBackURL: process.env.MPESA_CALLBACK_URL,
        AccountReference: accountReference,
        TransactionDesc: transactionDesc,
    };

    const response = await axios.post(
        `${MPESA_BASE_URL}/mpesa/stkpush/v1/processrequest`,
        payload,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        }
    );

    return response.data;
}