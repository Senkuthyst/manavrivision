import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MapPin, Clock, ArrowRight, Leaf, Users, Landmark, TrendingUp } from "lucide-react";
import type { Destination } from "@/data/destinations";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface DestinationCardProps {
  destination: Destination;
  index: number;
  featured?: boolean;
  showSustainability?: boolean;
}

const categoryColors = {
  heritage: "bg-accent/10 text-accent border-accent/30",
  nature: "bg-success/10 text-success border-success/30",
  adventure: "bg-secondary/10 text-secondary border-secondary/30",
  spiritual: "bg-primary/10 text-primary border-primary/30",
};

// Simulated sustainability scores per destination
const sustainabilityScores: Record<string, { community: number; environment: number; culture: number; economy: number }> = {
  kathmandu: { community: 85, environment: 70, culture: 95, economy: 80 },
  pokhara: { community: 80, environment: 85, culture: 85, economy: 75 },
  lumbini: { community: 90, environment: 80, culture: 100, economy: 85 },
  chitwan: { community: 75, environment: 90, culture: 80, economy: 70 },
  swayambhu: { community: 85, environment: 75, culture: 95, economy: 80 },
  bhaktapur: { community: 90, environment: 70, culture: 100, economy: 85 },
  patan: { community: 88, environment: 72, culture: 95, economy: 82 },
  bandipur: { community: 95, environment: 88, culture: 90, economy: 90 },
  annapurna: { community: 70, environment: 95, culture: 85, economy: 75 },
};

const sustainabilityConfig = {
  community: { icon: Users, label: "Community", color: "text-primary" },
  environment: { icon: Leaf, label: "Eco", color: "text-success" },
  culture: { icon: Landmark, label: "Culture", color: "text-secondary" },
  economy: { icon: TrendingUp, label: "Local Economy", color: "text-accent" },
};

export function DestinationCard({ destination, index, featured = false, showSustainability = true }: DestinationCardProps) {
  const scores = sustainabilityScores[destination.id] || { community: 80, environment: 80, culture: 80, economy: 80 };
  const avgScore = Math.round((scores.community + scores.environment + scores.culture + scores.economy) / 4);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Link
        to={`/destination/${destination.id}`}
        className={cn(
          "group block relative overflow-hidden rounded-2xl bg-card shadow-soft transition-all duration-500 hover:shadow-medium hover:-translate-y-2",
          featured && "lg:col-span-2 lg:row-span-2"
        )}
      >
        {/* Image */}
        <div className={cn(
          "relative overflow-hidden",
          featured ? "aspect-[16/9] lg:aspect-[16/10]" : "aspect-[4/3]"
        )}>
          <img
            src={destination.image}
            alt={destination.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
          
          {/* Category Badge */}
          <div className={cn(
            "absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium border backdrop-blur-sm",
            categoryColors[destination.category]
          )}>
            {destination.category.charAt(0).toUpperCase() + destination.category.slice(1)}
          </div>

          {/* 360° Badge */}
          <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-bold">
            360° VR
          </div>

          {/* Content Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-6">
            <div className="flex items-center gap-2 text-card/80 text-sm mb-2">
              <MapPin className="w-4 h-4" />
              <span>{destination.region}</span>
            </div>
            <h3 className={cn(
              "font-display font-bold text-card mb-2",
              featured ? "text-2xl lg:text-4xl" : "text-xl lg:text-2xl"
            )}>
              {destination.name}
            </h3>
            <p className={cn(
              "text-card/80 line-clamp-2",
              featured ? "text-base lg:text-lg" : "text-sm"
            )}>
              {destination.shortDescription}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 lg:p-6 flex items-center justify-between border-t border-border">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{destination.bestTimeToVisit}</span>
            </div>
            <div>
              <span className="font-medium text-foreground">{destination.altitude}</span>
            </div>
          </div>

          {/* Sustainability Indicator */}
          {showSustainability && (
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-success/10 border border-success/30">
                  <Leaf className="w-3 h-3 text-success" />
                  <span className="text-xs font-medium text-success">{avgScore}%</span>
                </div>
              </TooltipTrigger>
              <TooltipContent side="top" className="p-3">
                <p className="font-semibold mb-2">Sustainability Score</p>
                <div className="space-y-1 text-xs">
                  {Object.entries(scores).map(([key, value]) => {
                    const config = sustainabilityConfig[key as keyof typeof sustainabilityConfig];
                    const Icon = config.icon;
                    return (
                      <div key={key} className="flex items-center justify-between gap-4">
                        <span className="flex items-center gap-1">
                          <Icon className={cn("w-3 h-3", config.color)} />
                          {config.label}
                        </span>
                        <span className="font-medium">{value}%</span>
                      </div>
                    );
                  })}
                </div>
              </TooltipContent>
            </Tooltip>
          )}

          <div className="flex items-center gap-2 text-primary font-medium text-sm group-hover:gap-3 transition-all">
            <span>Explore</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
