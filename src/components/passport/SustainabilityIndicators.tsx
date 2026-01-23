import { motion } from "framer-motion";
import { Leaf, Users, Landmark, TreePine, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface SustainabilityBadgeProps {
  category: "community" | "environment" | "culture" | "economy";
  score: number;
  compact?: boolean;
}

const categoryConfig = {
  community: {
    icon: Users,
    label: "Community Impact",
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/30",
  },
  environment: {
    icon: Leaf,
    label: "Eco-Friendly",
    color: "text-success",
    bg: "bg-success/10",
    border: "border-success/30",
  },
  culture: {
    icon: Landmark,
    label: "Cultural Respect",
    color: "text-secondary",
    bg: "bg-secondary/10",
    border: "border-secondary/30",
  },
  economy: {
    icon: TrendingUp,
    label: "Local Economy",
    color: "text-accent",
    bg: "bg-accent/10",
    border: "border-accent/30",
  },
};

export function SustainabilityBadge({ category, score, compact = false }: SustainabilityBadgeProps) {
  const config = categoryConfig[category];
  const Icon = config.icon;

  if (compact) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className={cn(
              "inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border",
              config.bg,
              config.border,
              config.color
            )}
          >
            <Icon className="w-3 h-3" />
            <span>{score}%</span>
          </motion.div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{config.label}: {score}%</p>
        </TooltipContent>
      </Tooltip>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "flex items-center gap-3 p-3 rounded-lg border",
        config.bg,
        config.border
      )}
    >
      <div className={cn("w-10 h-10 rounded-full flex items-center justify-center", config.bg)}>
        <Icon className={cn("w-5 h-5", config.color)} />
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">{config.label}</span>
          <span className={cn("text-sm font-bold", config.color)}>{score}%</span>
        </div>
        <div className="mt-1 h-1.5 rounded-full bg-muted overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${score}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={cn("h-full rounded-full", config.bg.replace("/10", ""))}
            style={{ backgroundColor: `hsl(var(--${category === "environment" ? "success" : category === "culture" ? "secondary" : category === "economy" ? "accent" : "primary"}))` }}
          />
        </div>
      </div>
    </motion.div>
  );
}

interface SustainabilityIndicatorsProps {
  indicators: {
    category: "community" | "environment" | "culture" | "economy";
    score: number;
  }[];
  variant?: "full" | "compact" | "inline";
}

export function SustainabilityIndicators({ indicators, variant = "full" }: SustainabilityIndicatorsProps) {
  if (variant === "inline") {
    return (
      <div className="flex flex-wrap gap-1">
        {indicators.map((indicator) => (
          <SustainabilityBadge
            key={indicator.category}
            category={indicator.category}
            score={indicator.score}
            compact
          />
        ))}
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div className="flex items-center gap-2">
        <TreePine className="w-4 h-4 text-success" />
        <div className="flex gap-1">
          {indicators.map((indicator) => (
            <SustainabilityBadge
              key={indicator.category}
              category={indicator.category}
              score={indicator.score}
              compact
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <TreePine className="w-5 h-5 text-success" />
        <h3 className="font-semibold text-foreground">Sustainability Score</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {indicators.map((indicator) => (
          <SustainabilityBadge
            key={indicator.category}
            category={indicator.category}
            score={indicator.score}
          />
        ))}
      </div>
    </div>
  );
}
