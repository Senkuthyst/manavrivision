import { motion } from "framer-motion";
import { Heart, Landmark, Palette, Users, TreePine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { ContributionOption } from "@/data/subscriptionData";
import { formatPrice, convertCurrency } from "@/data/subscriptionData";

interface ContributionCardProps {
  option: ContributionOption;
  selectedCurrency: string;
  index: number;
  onContribute: (optionId: string) => void;
}

const iconMap = {
  Landmark,
  Palette,
  Users,
  TreePine,
};

export function ContributionCard({ option, selectedCurrency, index, onContribute }: ContributionCardProps) {
  const Icon = iconMap[option.icon as keyof typeof iconMap] || Heart;
  const convertedPrice = convertCurrency(option.amountUSD, selectedCurrency);
  const formattedPrice = formatPrice(convertedPrice, selectedCurrency);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <Card className="h-full transition-all duration-300 hover:shadow-soft hover:border-secondary/50 group">
        <CardHeader className="pb-3">
          <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center mb-3 group-hover:bg-secondary/20 transition-colors">
            <Icon className="w-5 h-5 text-secondary" />
          </div>
          <CardTitle className="text-lg">{option.name}</CardTitle>
          <CardDescription className="text-sm">{option.description}</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="p-3 rounded-lg bg-muted/50 border border-border/50">
            <p className="text-xs text-muted-foreground mb-1">Your impact:</p>
            <p className="text-sm font-medium text-foreground">{option.impact}</p>
          </div>

          <Button
            onClick={() => onContribute(option.id)}
            variant="outline"
            className="w-full group-hover:bg-secondary/10 group-hover:border-secondary/50"
          >
            <Heart className="w-4 h-4 mr-2" />
            Contribute {formattedPrice}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
