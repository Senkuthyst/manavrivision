import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { 
  MapPin, 
  Clock, 
  Mountain, 
  ArrowLeft, 
  Globe, 
  Lightbulb, 
  Languages,
  Info,
  ChevronRight,
  Eye,
  Bookmark
} from "lucide-react";
import { getDestinationById } from "@/data/destinations";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AIGuide } from "@/components/AIGuide";
import { cn } from "@/lib/utils";

const categoryColors = {
  heritage: "bg-accent/10 text-accent",
  nature: "bg-success/10 text-success",
  adventure: "bg-secondary/10 text-secondary",
  spiritual: "bg-primary/10 text-primary",
};

export default function DestinationDetail() {
  const { id } = useParams<{ id: string }>();
  const destination = getDestinationById(id || "");

  if (!destination) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Destination not found</h1>
          <Link to="/explore" className="text-primary underline mt-4 block">
            Back to Explore
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px]">
        <div className="absolute inset-0">
          <img
            src={destination.image}
            alt={destination.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 gradient-overlay" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/60 to-transparent" />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-end pb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              to="/explore"
              className="inline-flex items-center gap-2 text-card/80 hover:text-card mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Explore
            </Link>

            <div className={cn(
              "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-4",
              categoryColors[destination.category]
            )}>
              {destination.category.charAt(0).toUpperCase() + destination.category.slice(1)}
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-card mb-4">
              {destination.name}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-card/80 mb-6">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>{destination.region}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mountain className="w-5 h-5" />
                <span>{destination.altitude}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{destination.bestTimeToVisit}</span>
              </div>
            </div>

            <div className="flex gap-4">
              <Button variant="hero" size="lg">
                <Eye className="w-5 h-5" />
                Start 360° Tour
              </Button>
              <Button variant="heroOutline" size="lg">
                <Bookmark className="w-5 h-5" />
                Save
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-card rounded-2xl p-6 lg:p-8 shadow-soft"
              >
                <h2 className="text-2xl font-display font-bold text-foreground mb-4 flex items-center gap-2">
                  <Globe className="w-6 h-6 text-primary" />
                  About {destination.name}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {destination.fullDescription}
                </p>
              </motion.div>

              {/* Highlights */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-card rounded-2xl p-6 lg:p-8 shadow-soft"
              >
                <h2 className="text-2xl font-display font-bold text-foreground mb-4 flex items-center gap-2">
                  <Lightbulb className="w-6 h-6 text-secondary" />
                  Highlights
                </h2>
                <ul className="space-y-3">
                  {destination.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <ChevronRight className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Cultural Insights */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-card rounded-2xl p-6 lg:p-8 shadow-soft"
              >
                <h2 className="text-2xl font-display font-bold text-foreground mb-4 flex items-center gap-2">
                  <Info className="w-6 h-6 text-accent" />
                  Cultural Insights
                </h2>
                <ul className="space-y-3">
                  {destination.culturalInsights.map((insight, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <ChevronRight className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{insight}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Language Snippets */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-card rounded-2xl p-6 lg:p-8 shadow-soft"
              >
                <h2 className="text-2xl font-display font-bold text-foreground mb-4 flex items-center gap-2">
                  <Languages className="w-6 h-6 text-success" />
                  Useful Phrases
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {destination.languages.map((lang, index) => (
                    <div key={index} className="p-4 rounded-xl bg-muted/50">
                      <div className="font-display font-bold text-foreground">
                        {lang.phrase}
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {lang.meaning}
                      </div>
                      <div className="text-xs text-primary mt-1">
                        Pronunciation: {lang.pronunciation}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Facts */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-card rounded-2xl p-6 shadow-soft sticky top-24"
              >
                <h3 className="text-lg font-display font-bold text-foreground mb-4">
                  Quick Facts
                </h3>
                <div className="space-y-4">
                  {destination.quickFacts.map((fact, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-border last:border-0">
                      <span className="text-muted-foreground">{fact.label}</span>
                      <span className="font-medium text-foreground">{fact.value}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-border">
                  <h4 className="font-medium text-foreground mb-3">Travel Tips</h4>
                  <ul className="space-y-2">
                    {destination.travelTips.slice(0, 3).map((tip, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <ChevronRight className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <AIGuide />
    </div>
  );
}
