import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { SubscriptionTier } from "@/data/subscriptionData";
import { formatPrice, convertCurrency } from "@/data/subscriptionData";

interface PricingCardProps {
  tier: SubscriptionTier;
  selectedCurrency: string;
  index: number;
  onSelect: (tierId: string) => void;
}

export function PricingCard({ tier, selectedCurrency, index, onSelect }: PricingCardProps) {
  const convertedPrice = convertCurrency(tier.priceUSD, selectedCurrency);
  const formattedPrice = formatPrice(convertedPrice, selectedCurrency);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card
        className={cn(
          "relative h-full transition-all duration-300 hover:shadow-medium",
          tier.highlighted && "border-primary shadow-lg scale-105 z-10"
        )}
      >
        {tier.badge && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <Badge className="bg-primary text-primary-foreground px-4 py-1">
              <Sparkles className="w-3 h-3 mr-1" />
              {tier.badge}
            </Badge>
          </div>
        )}

        <CardHeader className="text-center pt-8">
          <CardTitle className="text-2xl font-display">{tier.name}</CardTitle>
          <CardDescription className="text-base">{tier.description}</CardDescription>
        </CardHeader>

        <CardContent className="text-center">
          <div className="mb-6">
            <span className="text-4xl font-bold text-foreground">
              {tier.priceUSD === 0 ? "Free" : formattedPrice}
            </span>
            {tier.priceUSD > 0 && (
              <span className="text-muted-foreground ml-1">
                /{tier.priceMonthly ? "mo" : "yr"}
              </span>
            )}
          </div>

          <ul className="space-y-3 text-left">
            {tier.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-3">
                <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground">{feature}</span>
              </li>
            ))}
          </ul>
        </CardContent>

        <CardFooter className="pt-4">
          <Button
            onClick={() => onSelect(tier.id)}
            className={cn(
              "w-full",
              tier.highlighted
                ? "bg-primary hover:bg-primary/90"
                : "bg-secondary/10 text-secondary hover:bg-secondary/20"
            )}
            variant={tier.highlighted ? "default" : "outline"}
          >
            {tier.priceUSD === 0 ? "Get Started Free" : "Start 7-Day Trial"}
          </Button>
        </CardFooter>

        {tier.highlighted && (
          <div className="absolute inset-0 rounded-lg border-2 border-primary pointer-events-none" />
        )}
      </Card>
    </motion.div>
  );
}
