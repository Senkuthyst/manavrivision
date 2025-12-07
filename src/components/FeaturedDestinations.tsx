import { motion } from "framer-motion";
import { destinations } from "@/data/destinations";
import { DestinationCard } from "./DestinationCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export function FeaturedDestinations() {
  const featured = destinations.slice(0, 6);

  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12 lg:mb-16"
        >
          <span className="text-secondary font-medium text-sm uppercase tracking-widest">
            Destinations
          </span>
          <h2 className="text-3xl lg:text-5xl font-display font-bold text-foreground mt-2 mb-4">
            Explore Nepal's Treasures
          </h2>
          <p className="text-muted-foreground text-lg">
            From ancient temples to towering peaks, discover the diverse beauty of Nepal 
            through immersive virtual experiences.
          </p>
        </motion.div>

        {/* Destination Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {featured.map((destination, index) => (
            <DestinationCard
              key={destination.id}
              destination={destination}
              index={index}
              featured={index === 0}
            />
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button variant="default" size="lg" asChild>
            <Link to="/explore" className="flex items-center gap-2">
              View All Destinations
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
