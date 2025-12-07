import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MapPin, Clock, ArrowRight } from "lucide-react";
import type { Destination } from "@/data/destinations";
import { cn } from "@/lib/utils";

interface DestinationCardProps {
  destination: Destination;
  index: number;
  featured?: boolean;
}

const categoryColors = {
  heritage: "bg-accent/10 text-accent border-accent/30",
  nature: "bg-success/10 text-success border-success/30",
  adventure: "bg-secondary/10 text-secondary border-secondary/30",
  spiritual: "bg-primary/10 text-primary border-primary/30",
};

export function DestinationCard({ destination, index, featured = false }: DestinationCardProps) {
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
          <div className="flex items-center gap-2 text-primary font-medium text-sm group-hover:gap-3 transition-all">
            <span>Explore</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
