'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Target, TrendingUp, DollarSign, Calendar, Edit, Trash2, Plus, Eye, Users } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const [campaigns, setCampaigns] = useState([]);
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const campaignsRes = await fetch('/api/campaigns?creatorId=temp-user-id');
      const campaignsData = await campaignsRes.json();
      setCampaigns(campaignsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const totalRaised = campaigns.reduce((sum: number, c: any) => sum + Number(c.raised_amount), 0);
  const totalGoal = campaigns.reduce((sum: number, c: any) => sum + Number(c.goal_amount), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8 animate-in fade-in slide-in-from-bottom-3 duration-700">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Dashboard
              </h1>
              <p className="text-gray-600">
                Manage your campaigns and track your impact
              </p>
            </div>
            <Link href="/create-campaign">
              <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <Plus className="h-4 w-4 mr-2" />
                New Campaign
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-blue-600 to-blue-700 text-white animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-blue-100">Total Campaigns</CardTitle>
              <div className="h-10 w-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <Target className="h-5 w-5 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{campaigns.length}</div>
              <p className="text-xs text-blue-100 mt-1 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                Active fundraising campaigns
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-700">Total Raised</CardTitle>
              <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">
                {new Intl.NumberFormat('en-KE', {
                  style: 'currency',
                  currency: 'KES',
                }).format(totalRaised)}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Across all campaigns
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-700">Overall Progress</CardTitle>
              <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">
                {totalGoal > 0 ? ((totalRaised / totalGoal) * 100).toFixed(1) : 0}%
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Of total fundraising goals
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs Section */}
        <div className="animate-in fade-in slide-in-from-bottom-5 duration-700 delay-400">
          <Tabs defaultValue="campaigns" className="space-y-6">
            <TabsList className="bg-white border shadow-sm">
              <TabsTrigger 
                value="campaigns" 
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                <Target className="h-4 w-4 mr-2" />
                My Campaigns
              </TabsTrigger>
              <TabsTrigger 
                value="donations"
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                <Users className="h-4 w-4 mr-2" />
                Donations Received
              </TabsTrigger>
            </TabsList>

            <TabsContent value="campaigns" className="space-y-4">
              {loading ? (
                <Card className="border-0 shadow-lg">
                  <CardContent className="py-12 text-center">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent mb-4"></div>
                    <p className="text-gray-600">Loading campaigns...</p>
                  </CardContent>
                </Card>
              ) : campaigns.length === 0 ? (
                <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-white">
                  <CardContent className="py-16 text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6">
                      <Target className="h-10 w-10 text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2 text-gray-900">No campaigns yet</h3>
                    <p className="text-gray-600 mb-6 max-w-md mx-auto">
                      Create your first campaign to start raising funds and making an impact
                    </p>
                    <Link href="/create-campaign">
                      <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-300">
                        <Plus className="h-4 w-4 mr-2" />
                        Create Your First Campaign
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {campaigns.map((campaign: any, index: number) => {
                    const progress = (campaign.raised_amount / campaign.goal_amount) * 100;
                    return (
                      <Card 
                        key={campaign.id} 
                        className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2 flex-wrap">
                                <CardTitle className="text-xl">{campaign.title}</CardTitle>
                                <Badge
                                  className={
                                    campaign.status === 'active'
                                      ? 'bg-blue-600 hover:bg-blue-700'
                                      : campaign.status === 'draft'
                                      ? 'bg-gray-500'
                                      : 'bg-gray-400'
                                  }
                                >
                                  {campaign.status}
                                </Badge>
                              </div>
                              <CardDescription className="line-clamp-2 text-gray-600">
                                {campaign.description}
                              </CardDescription>
                            </div>
                            <div className="flex gap-2">
                              <Button 
                                variant="ghost" 
                                size="icon"
                                className="hover:bg-blue-50 hover:text-blue-600 transition-colors"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon"
                                className="hover:bg-red-50 hover:text-red-600 transition-colors"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="flex justify-between text-sm">
                              <span className="font-bold text-blue-600 text-lg">
                                {new Intl.NumberFormat('en-KE', {
                                  style: 'currency',
                                  currency: 'KES',
                                }).format(campaign.raised_amount)}
                              </span>
                              <span className="text-gray-500">
                                of{' '}
                                {new Intl.NumberFormat('en-KE', {
                                  style: 'currency',
                                  currency: 'KES',
                                }).format(campaign.goal_amount)}
                              </span>
                            </div>
                            <div className="relative">
                              <Progress 
                                value={progress} 
                                className="h-3 bg-blue-100"
                              />
                              <style jsx>{`
                                :global([data-state="complete"]) {
                                  background-color: rgb(37 99 235);
                                }
                              `}</style>
                            </div>
                            <div className="flex items-center justify-between text-sm text-gray-600">
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-blue-600" />
                                {new Date(campaign.created_at).toLocaleDateString()}
                              </div>
                              <span className="font-semibold text-blue-600">{progress.toFixed(0)}% funded</span>
                            </div>
                            <Link href={`/campaign/${campaign.id}`}>
                              <Button 
                                variant="outline" 
                                className="w-full border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300"
                              >
                                <Eye className="h-4 w-4 mr-2" />
                                View Campaign
                              </Button>
                            </Link>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}
            </TabsContent>

            <TabsContent value="donations">
              <Card className="border-0 shadow-lg bg-white">
                <CardHeader className="border-b bg-gradient-to-r from-blue-50 to-white">
                  <CardTitle className="text-xl">Recent Donations</CardTitle>
                  <CardDescription>
                    Donations received across all your campaigns
                  </CardDescription>
                </CardHeader>
                <CardContent className="py-16">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                      <Users className="h-8 w-8 text-blue-600" />
                    </div>
                    <p className="text-gray-600">
                      No donations yet. Share your campaigns to start receiving support!
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}