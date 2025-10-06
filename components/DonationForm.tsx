'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Smartphone, CreditCard, Loader as Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface DonationFormProps {
  campaignId: string;
  campaignTitle: string;
}

export function DonationForm({ campaignId, campaignTitle }: DonationFormProps) {
  const [paymentMethod, setPaymentMethod] = useState<'mpesa' | 'stripe'>('mpesa');
  const [amount, setAmount] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDonate = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    if (paymentMethod === 'mpesa' && !phone) {
      toast.error('Please enter your M-Pesa phone number');
      return;
    }

    setLoading(true);

    try {
      if (paymentMethod === 'mpesa') {
        const response = await fetch('/api/donation/mpesa', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            campaignId,
            amount: parseFloat(amount),
            phone,
            donorEmail: email,
            donorName: name,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          toast.success('STK push sent! Please check your phone to complete payment.');
        } else {
          toast.error(data.error || 'Failed to initiate M-Pesa payment');
        }
      } else {
        const response = await fetch('/api/donation/stripe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            campaignId,
            amount: parseFloat(amount),
            donorEmail: email,
            donorName: name,
          }),
        });

        const data = await response.json();

        if (response.ok && data.url) {
          window.location.href = data.url;
        } else {
          toast.error(data.error || 'Failed to create checkout session');
        }
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
      console.error('Donation error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Support This Campaign</CardTitle>
        <CardDescription>
          Every contribution brings us closer to our goal
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="payment-method">Payment Method</Label>
          <RadioGroup
            value={paymentMethod}
            onValueChange={(value) => setPaymentMethod(value as 'mpesa' | 'stripe')}
          >
            <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-accent">
              <RadioGroupItem value="mpesa" id="mpesa" />
              <Label htmlFor="mpesa" className="flex items-center gap-2 cursor-pointer flex-1">
                <Smartphone className="h-5 w-5" />
                M-Pesa
              </Label>
            </div>
            <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-accent">
              <RadioGroupItem value="stripe" id="stripe" />
              <Label htmlFor="stripe" className="flex items-center gap-2 cursor-pointer flex-1">
                <CreditCard className="h-5 w-5" />
                Card Payment
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label htmlFor="amount">Amount (KES)</Label>
          <Input
            id="amount"
            type="number"
            placeholder="1000"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="1"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="outline"
            onClick={() => setAmount('500')}
            type="button"
          >
            KES 500
          </Button>
          <Button
            variant="outline"
            onClick={() => setAmount('1000')}
            type="button"
          >
            KES 1,000
          </Button>
          <Button
            variant="outline"
            onClick={() => setAmount('5000')}
            type="button"
          >
            KES 5,000
          </Button>
          <Button
            variant="outline"
            onClick={() => setAmount('10000')}
            type="button"
          >
            KES 10,000
          </Button>
        </div>

        {paymentMethod === 'mpesa' && (
          <div className="space-y-2">
            <Label htmlFor="phone">M-Pesa Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="254712345678"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="name">Your Name (Optional)</Label>
          <Input
            id="name"
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email (Optional)</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <Button
          onClick={handleDonate}
          disabled={loading}
          className="w-full"
          size="lg"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            `Donate KES ${amount || '0'}`
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
