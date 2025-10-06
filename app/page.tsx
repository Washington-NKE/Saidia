import { CampaignCard } from "@/components/CampaignCard";
import { Button } from "@/components/ui/button";
import { Sparkles, Target, TrendingUp, Users } from "lucide-react";
import Link from "next/link";

type Campaign = {
    id: string;
    title: string;
    description: string;
    goalAmount: number;
    raisedAmount: number;
    imageUrl?: string | null;
    creatorGoal?: string | null;
    creatorName?: string;
}

async function getCampaigns() {
  const data =  [
  {
    id: "1",
    title: "Help Joyce Beat Breast Cancer",
    description:
      "Joyce, a mother of two from Nyeri, is undergoing chemotherapy and needs support for her medical bills and transport costs.",
    goal_amount: 500000,
    raised_amount: 325000,
    image_url: "https://images.unsplash.com/photo-1584467735871-8c81b02ac7b0",
    creator_goal: "Raise funds for treatment and recovery support.",
    creator_name: "Mary Wanjiku",
  },
  {
    id: "2",
    title: "Empower Street Kids Through Education",
    description:
      "We aim to provide school supplies, uniforms, and meals for 50 street-connected children in Nairobi.",
    goal_amount: 300000,
    raised_amount: 95000,
    image_url: "https://images.unsplash.com/photo-1519455953755-af066f52f1ea",
    creator_goal: "Give every child a fair chance to learn.",
    creator_name: "Brian Mwangi",
  },
  {
    id: "3",
    title: "Clean Water for Turkana",
    description:
      "Help us drill a borehole to provide clean drinking water to families in drought-affected Turkana region.",
    goal_amount: 800000,
    raised_amount: 510000,
    image_url: "https://images.unsplash.com/photo-1603575448366-2395b0e0a6c5",
    creator_goal: "Build sustainable access to clean water.",
    creator_name: "Hope Initiative Kenya",
  },
  {
    id: "4",
    title: "Support Small Farmers After Floods",
    description:
      "Recent floods destroyed crops and livestock in Kisumu. We’re raising funds to help farmers recover and replant.",
    goal_amount: 400000,
    raised_amount: 180000,
    image_url: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6",
    creator_goal: "Enable affected farmers to rebuild their livelihoods.",
    creator_name: "AgriAid Foundation",
  },
  {
    id: "5",
    title: "Sponsor a Tech Girl",
    description:
      "Help 20 young girls from low-income families learn coding, robotics, and digital skills to secure a better future.",
    goal_amount: 250000,
    raised_amount: 132000,
    image_url: "https://images.unsplash.com/photo-1596495577886-d920f1fb7238",
    creator_goal: "Bridge the tech gender gap in Kenya.",
    creator_name: "Grace Njeri",
  },
];
  return data || [];
}

export default async function Home() {
  const rawCampaigns = await getCampaigns();
  const campaigns: Campaign[] = rawCampaigns.map(c => ({
    id: c.id,
    title: c.title,
    description: c.description,
    goalAmount: c.goal_amount,
    raisedAmount: c.raised_amount,
    imageUrl: c.image_url,
    creatorGoal: c.creator_goal,
    creatorName: c.creator_name,
  }));

  return (
    <div>
      <section className="bg-gradient-to-br from-blue-50 via-white to-slate-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
              <Sparkles className="h-4 w-4" />
              Aligned with UN Sustainable Development Goals
            </div>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Make a Difference Through{' '}
              <span className="text-blue-600">Crowdfunding</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Support meaningful campaigns that contribute to a sustainable future.
              Every donation touches a life.
            </p>
            <div className="flex gap-4 justify-center pt-4">
              <Link href="/create-campaign">
                <Button size="lg" className="text-lg px-8 bg-blue-600 hover:bg-blue-700">
                  Start a Campaign
                </Button>
              </Link>
              <Link href="#campaigns" >
                <Button size="lg" variant="outline" className="text-lg px-8">
                  Browse Campaigns
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 border-y bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center space-y-3">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full">
                <Target className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold">Impactful Campaigns</h3>
              <p className="text-muted-foreground">Every campaign is there to change a life and make an impact.</p>
            </div>
            <div className="text-center space-y-3">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold">Community Driven</h3>
              <p className="text-muted-foreground">
                Built by communities, for communities across Kenya
              </p>
            </div>
            <div className="text-center space-y-3">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full">
                <TrendingUp className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold">Transparent Tracking</h3>
              <p className="text-muted-foreground">Track every shilling and see the real-time impact of your donation</p>
            </div>
          </div>
        </div>
      </section>

      <section id="campaigns" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Active Campaign</h2>
            <p className="text-xl text-muted-foreground">Support these amazing initiatives making a difference</p>
          </div>

          {campaigns.length === 0 ? (
            <div className="text-center py-16">
              <Target className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-2">No active campaigns yet.</h3>
              <p className="text-muted-foreground mb-6">
                Be the first to create a campaign and make a difference!
              </p>
              <Link href="/create-campaign">
                <Button size="lg">
                  Start a Campaign
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {campaigns.map((campaign: Campaign) => (
                <CampaignCard
                  key={campaign.id}
                  id={campaign.id}
                  title={campaign.title}
                description={campaign.description}
                goalAmount={campaign.goalAmount}
                raisedAmount={campaign.raisedAmount}
                imageUrl={campaign.imageUrl}
                creatorGoal={campaign.creatorGoal}
                creatorName={campaign.creatorName}
              />
            ))
          }
        </div>
          )}
        </div>
      </section>
    </div>
  );
}
