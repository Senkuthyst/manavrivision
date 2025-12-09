import { motion } from "framer-motion";
import { Glasses, Play, Rotate3D, MapPin, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-nepal.jpg";

const vrFeatures = [
  {
    icon: Rotate3D,
    title: "360° Views",
    description: "Full panoramic exploration",
  },
  {
    icon: MapPin,
    title: "Hotspot Navigation",
    description: "Click to discover locations",
  },
  {
    icon: Sparkles,
    title: "Interactive Overlays",
    description: "Educational content on-demand",
  },
];

export function VRExperience() {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-background to-muted/30 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent">
              <Glasses className="w-4 h-4" />
              <span className="text-sm font-medium">VR Experience</span>
            </div>

            <h2 className="text-3xl lg:text-5xl font-display font-bold text-foreground">
              Immersive Virtual Reality
              <span className="text-gradient block mt-1">Exploration</span>
            </h2>

            <p className="text-muted-foreground text-lg leading-relaxed">
              Step into Nepal's most breathtaking locations with our fully interactive 
              VR experience. Navigate through ancient temples, explore mountain trails, 
              and discover hidden cultural treasures—all from your device.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              {vrFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="p-4 rounded-xl bg-card shadow-soft"
                  >
                    <div className="w-10 h-10 rounded-lg bg-accent/10 text-accent flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="font-display font-bold text-foreground text-sm mb-1">
                      {feature.title}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {feature.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button variant="default" size="lg" asChild>
                <Link to="/explore" className="flex items-center gap-2">
                  <Glasses className="w-5 h-5" />
                  Explore in VR
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/learn" className="flex items-center gap-2">
                  <Play className="w-5 h-5" />
                  Watch Demo
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* VR Preview */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-medium aspect-[4/3]">
              <img
                src={heroImage}
                alt="VR Experience Preview"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
              
              {/* VR Overlay Effect */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-20 h-20 rounded-full gradient-gold shadow-glow flex items-center justify-center mb-4 mx-auto"
                  >
                    <Play className="w-8 h-8 text-primary-foreground ml-1" />
                  </motion.button>
                  <p className="text-card font-display font-bold text-lg">
                    Start VR Tour
                  </p>
                </motion.div>
              </div>

              {/* Corner Labels */}
              <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-card/90 backdrop-blur-sm text-xs font-bold text-foreground">
                360° VR Ready
              </div>
              <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-accent/90 text-xs font-bold text-accent-foreground">
                Interactive
              </div>

              {/* Hotspot Indicators */}
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-1/4 left-1/4 w-4 h-4 rounded-full bg-secondary border-2 border-card shadow-lg cursor-pointer"
              />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                className="absolute top-1/3 right-1/3 w-4 h-4 rounded-full bg-primary border-2 border-card shadow-lg cursor-pointer"
              />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                className="absolute bottom-1/3 right-1/4 w-4 h-4 rounded-full bg-accent border-2 border-card shadow-lg cursor-pointer"
              />
            </div>

            {/* Floating Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
              className="absolute -bottom-6 left-4 right-4 p-4 rounded-xl bg-card shadow-medium flex justify-around"
            >
              <div className="text-center">
                <div className="text-xl font-display font-bold text-primary">9+</div>
                <div className="text-xs text-muted-foreground">VR Tours</div>
              </div>
              <div className="w-px bg-border" />
              <div className="text-center">
                <div className="text-xl font-display font-bold text-secondary">50+</div>
                <div className="text-xs text-muted-foreground">Hotspots</div>
              </div>
              <div className="w-px bg-border" />
              <div className="text-center">
                <div className="text-xl font-display font-bold text-accent">HD</div>
                <div className="text-xs text-muted-foreground">Quality</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
