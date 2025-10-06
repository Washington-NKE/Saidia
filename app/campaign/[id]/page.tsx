//import { supabase } from '@/lib/supabase';
import { DonationForm } from '@/components/DonationForm';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Target, TrendingUp, User } from 'lucide-react';
import { notFound } from 'next/navigation';
import Image from 'next/image';

async function getCampaign(id: string) {
  // const { data } = await supabase
  //   .from('campaigns')
  //   .select('*, profiles!campaigns_creator_id_fkey(full_name, email)')
  //   .eq('id', id)
  //   .maybeSingle();

    const data = {
      id: '1',
      title: 'Help Build a School in Rural Kenya',
      description: 'We are raising funds to build a school in a rural area of Kenya where access to education is limited. Your support will help provide quality education to children in need.',
      goal_amount: 1000000,
      raised_amount: 450000,
      image_url: 'https://images.unsplash.com/photo-1584467735871-8c81b02ac7b0',
      creator_goal: 'Quality Education',
      status: 'Active',
      created_at: '2024-01-15T10:00:00Z',
      creator_goal: 'Give every child a fair chance to learn.',
      creator_name: 'Mary Wanjiku',
    };

  return data;
}

async function getDonations(campaignId: string) {
  // const { data } = await supabase
  //   .from('donations')
  //   .select('*')
  //   .eq('campaign_id', campaignId)
  //   .eq('payment_status', 'completed')
  //   .order('created_at', { ascending: false })
  //   .limit(10);

    const data = [
      {
        id: '1',
        donor_name: 'Washington Mwangi',
        amount: 5000,
        created_at: '2024-01-01T12:00:00Z',
      },
      {
        id: '2',
        donor_name: 'Risper Njoki',
        amount: 3000,
        created_at: '2024-02-01T12:00:00Z',
      },
      {
        id: '3',
        donor_name: 'Ann Wangechi',
        amount: 2000,
        created_at: '2024-03-01T12:00:00Z',
      },
    ];

  return data || [];
}

export default async function CampaignPage({
  params,
}: {
  params: { id: string };
}) {
  const campaign = await getCampaign(params.id);

  if (!campaign) {
    notFound();
  }

  const donations = await getDonations(params.id);

  const progress = (campaign.raised_amount / campaign.goal_amount) * 100;
  const formattedGoal = new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
  }).format(campaign.goal_amount);
  const formattedRaised = new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
  }).format(campaign.raised_amount);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="relative h-[400px] w-full bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg overflow-hidden">
            {campaign.image_url ? (
              <Image
                src={campaign.image_url}
                alt={campaign.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <Target className="h-24 w-24 text-slate-400" />
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              {campaign.creator_goal && (
                <Badge className="bg-blue-600">{campaign.creator_goal}</Badge>
              )}
              <Badge variant="outline">{campaign.status}</Badge>
            </div>

            <h1 className="text-4xl font-bold">{campaign.title}</h1>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>by {campaign.profiles?.full_name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>
                  {new Date(campaign.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>
            </div>

            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-baseline">
                    <div>
                      <p className="text-3xl font-bold">{formattedRaised}</p>
                      <p className="text-sm text-muted-foreground">
                        raised of {formattedGoal} goal
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">{donations.length}</p>
                      <p className="text-sm text-muted-foreground">donations</p>
                    </div>
                  </div>
                  <Progress value={progress} className="h-3" />
                  <p className="text-sm text-muted-foreground">
                    {progress.toFixed(1)}% of goal reached
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="prose max-w-none">
              <h2 className="text-2xl font-bold mb-4">About This Campaign</h2>
              <p className="whitespace-pre-wrap text-muted-foreground leading-relaxed">
                {campaign.description}
              </p>
            </div>
          </div>

          {donations.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Recent Donations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {donations.map((donation: any) => (
                    <div
                      key={donation.id}
                      className="flex items-center justify-between py-3 border-b last:border-0"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>
                            {donation.donor_name
                              ? donation.donor_name.charAt(0).toUpperCase()
                              : 'A'}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">
                            {donation.donor_name || 'Anonymous'}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(donation.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-600">
                          {new Intl.NumberFormat('en-KE', {
                            style: 'currency',
                            currency: 'KES',
                          }).format(donation.amount)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <DonationForm
              campaignId={campaign.id}
              campaignTitle={campaign.title}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
