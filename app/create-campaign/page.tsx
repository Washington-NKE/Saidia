'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Loader2, Sparkles, Target, Globe, ImageIcon, TrendingUp } from 'lucide-react';

const SDG_GOALS = [
  'No Poverty',
  'Zero Hunger',
  'Good Health and Well-being',
  'Quality Education',
  'Gender Equality',
  'Clean Water and Sanitation',
  'Affordable and Clean Energy',
  'Decent Work and Economic Growth',
  'Industry, Innovation and Infrastructure',
  'Reduced Inequalities',
  'Sustainable Cities and Communities',
  'Responsible Consumption and Production',
  'Climate Action',
  'Life Below Water',
  'Life on Land',
  'Peace, Justice and Strong Institutions',
  'Partnerships for the Goals',
];

export default function CreateCampaignPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    goalAmount: '',
    imageUrl: '',
    sdgGoal: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.goalAmount) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/campaigns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          creator_id: 'temp-user-id',
          title: formData.title,
          description: formData.description,
          goal_amount: parseFloat(formData.goalAmount),
          image_url: formData.imageUrl || null,
          sdg_goal: formData.sdgGoal || null,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Campaign created successfully!');
        router.push(`/campaign/${data.id}`);
      } else {
        toast.error(data.error || 'Failed to create campaign');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
      console.error('Campaign creation error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section with Animation */}
          <div className="mb-12 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-6 shadow-lg hover:scale-110 transition-transform duration-300">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Start Your Campaign
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Create a fundraising campaign aligned with UN Sustainable Development Goals and make a real impact
            </p>
          </div>

          {/* Stats Cards */}
          {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 animate-in fade-in slide-in-from-bottom-5 duration-700 delay-150">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Target className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">10K+</p>
                  <p className="text-xs text-gray-500">Active Campaigns</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Globe className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">195</p>
                  <p className="text-xs text-gray-500">Countries Reached</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">$2.5M</p>
                  <p className="text-xs text-gray-500">Funds Raised</p>
                </div>
              </div>
            </div>
          </div> */}

          {/* Main Form Card */}
          <Card className="border-0 shadow-xl animate-in fade-in slide-in-from-bottom-6 duration-700 delay-300 hover:shadow-2xl transition-shadow duration-300">
            <CardHeader className="space-y-1 pb-6 bg-gradient-to-br from-blue-50 to-white rounded-t-lg">
              <CardTitle className="text-2xl font-bold text-gray-900">Campaign Details</CardTitle>
              <CardDescription className="text-base">
                Tell us about your campaign and what you hope to achieve
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2 group">
                  <Label htmlFor="title" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    Campaign Title *
                    <span className="text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">✨</span>
                  </Label>
                  <Input
                    id="title"
                    placeholder="Give your campaign a clear, compelling title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    required
                    className="border-gray-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all duration-300"
                  />
                </div>

                <div className="space-y-2 group">
                  <Label htmlFor="description" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    Description *
                    <span className="text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">📝</span>
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Explain what your campaign is about, why it matters, and how the funds will be used"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    rows={8}
                    required
                    className="border-gray-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all duration-300 resize-none"
                  />
                </div>

                <div className="space-y-2 group">
                  <Label htmlFor="goalAmount" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    Fundraising Goal (KES) *
                    <span className="text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">💰</span>
                  </Label>
                  <Input
                    id="goalAmount"
                    type="number"
                    placeholder="50000"
                    value={formData.goalAmount}
                    onChange={(e) =>
                      setFormData({ ...formData, goalAmount: e.target.value })
                    }
                    min="1"
                    required
                    className="border-gray-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all duration-300"
                  />
                </div>

                <div className="space-y-2 group">
                  <Label htmlFor="sdgGoal" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    Creator Goal
                    <span className="text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">🌍</span>
                  </Label>
                  <Select
                    value={formData.sdgGoal}
                    onValueChange={(value) =>
                      setFormData({ ...formData, creatorGoal: value })
                    }
                  >
                    <SelectTrigger className="border-gray-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all duration-300">
                      <SelectValue placeholder="Select a goal (optional)" />
                    </SelectTrigger>
                    <SelectContent>
                      {SDG_GOALS.map((goal) => (
                        <SelectItem key={goal} value={goal} className="hover:bg-blue-50">
                          {goal}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 group">
                  <Label htmlFor="imageUrl" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    Image URL
                    <ImageIcon className="w-4 h-4 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Label>
                  <Input
                    id="imageUrl"
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    value={formData.imageUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, imageUrl: e.target.value })
                    }
                    className="border-gray-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all duration-300"
                  />
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Add a compelling image to make your campaign stand out
                  </p>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                    size="lg"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Create Campaign
                      </>
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.back()}
                    disabled={loading}
                    size="lg"
                    className="border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all duration-300"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Trust Indicators */}
          <div className="mt-8 text-center text-sm text-gray-500 animate-in fade-in duration-700 delay-500">
            <p className="flex items-center justify-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Secure & Trusted Platform • 256-bit Encryption
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}