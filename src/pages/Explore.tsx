import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, MapPin, Grid, List, Users, MessageCircle } from "lucide-react";
import { destinations, type Destination } from "@/data/destinations";
import { DestinationCard } from "@/components/DestinationCard";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AIGuide } from "@/components/AIGuide";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const categories = [
  { id: "all", label: "All" },
  { id: "heritage", label: "Heritage" },
  { id: "nature", label: "Nature" },
  { id: "adventure", label: "Adventure" },
  { id: "spiritual", label: "Spiritual" },
];

export default function Explore() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredDestinations = destinations.filter((d) => {
    const matchesSearch = d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.region.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "all" || d.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Header */}
      <section className="pt-24 pb-12 lg:pt-32 lg:pb-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-3xl lg:text-5xl font-display font-bold text-foreground mb-4">
              Explore All Destinations
            </h1>
            <p className="text-muted-foreground text-lg mb-6">
              Discover Nepal's most incredible places through immersive virtual tours
            </p>
            
            {/* Connect to Local Guide Button */}
            <Button 
              variant="gold" 
              size="lg" 
              className="gap-2"
              onClick={() => {
                // TODO: Open local guide connection modal
                alert("Connect to Local Guide feature coming soon! Our verified local guides will help you experience Nepal authentically.");
              }}
            >
              <Users className="w-5 h-5" />
              Connect to Local Guide
              <MessageCircle className="w-4 h-4" />
            </Button>
          </motion.div>

          {/* Search & Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-8 space-y-4"
          >
            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search destinations..."
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-soft"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all",
                    activeCategory === category.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-card text-foreground hover:bg-muted"
                  )}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Results */}
      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Results Header */}
          <div className="flex items-center justify-between mb-8">
            <p className="text-muted-foreground">
              Showing <span className="font-medium text-foreground">{filteredDestinations.length}</span> destinations
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode("grid")}
                className={cn(
                  "p-2 rounded-lg transition-colors",
                  viewMode === "grid" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                )}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={cn(
                  "p-2 rounded-lg transition-colors",
                  viewMode === "list" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                )}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Destinations Grid */}
          {filteredDestinations.length > 0 ? (
            <div className={cn(
              "grid gap-6 lg:gap-8",
              viewMode === "grid" 
                ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
                : "grid-cols-1"
            )}>
              {filteredDestinations.map((destination, index) => (
                <DestinationCard
                  key={destination.id}
                  destination={destination}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <MapPin className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="text-xl font-display font-bold text-foreground mb-2">
                No destinations found
              </h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
      <AIGuide />
    </div>
  );
}
