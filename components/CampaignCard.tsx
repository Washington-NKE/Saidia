import { Target, TrendingUp } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Progress } from "./ui/progress";

interface CampaignCardProps {
    id: string;
    title: string;
    description: string;
    goalAmount: number;
    raisedAmount: number;
    imageUrl?: string | null;
    creatorGoal?: string | null;
    creatorName?: string;
}

export function CampaignCard({
    id,
    title,
    description,
    goalAmount,
    raisedAmount,
    imageUrl,
    creatorGoal,
    creatorName,
}: CampaignCardProps) {
    const progress = (raisedAmount/ goalAmount) * 100;
    const formattedGoal = new Intl.NumberFormat('en-KE', {
        style: 'currency',
        currency: 'KES',
    }).format(goalAmount);
    const formattedRaised = new Intl.NumberFormat('en-KE', {
        style: 'currency',
        currency: 'KES',
    }).format(raisedAmount);

    return (
        <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="relative h-48 w-full bg-gradient-to-br from-slate-100 to-slate-200">
                {imageUrl ? (
                    <Image 
                        src={imageUrl}
                        alt={title}
                        fill
                        className="object-cover"
                    />
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <Target className="h-16 w-16 text-slate-400" />
                    </div>
                )}
                {creatorGoal && (
                    <div className="absolute top-3 right-3 bg-blue-600 text-white text-xs px-3 py-1 rounded-full font-medium">
                        {creatorGoal}
                    </div>
                )}
            </div>

            <CardHeader>
                <h3 className="text-xl font-bold line-clamp-2 mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
                {creatorName && (
                    <p className="text-xs text-muted-foreground mt-2">by {creatorName}</p>
                )}
            </CardHeader>
            
            <CardContent className="space-y-3">
                <div className="space-y-2">
                    <Progress value={progress} className="h-2 bg-blue-600/20"  />
                    <div className="flex justify-between items-center text-sm">
                        <div className="flex items-center gap-1">
                            <TrendingUp className="h-4 w-4 text-green-600" />
                            <span className="font-semibold">{formattedRaised}</span>
                        </div>
                        <span className="text-muted-foreground">of {formattedGoal}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                        {progress.toFixed(0)}% funded
                    </p>
                </div>
            </CardContent>

            <CardFooter>
                <Link href={`/campaign/${id}`} className="w-full">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">Donate Now</Button>
                </Link>
            </CardFooter>
        </Card>
    )

}