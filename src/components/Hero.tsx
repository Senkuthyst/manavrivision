import { motion } from "framer-motion";
import { ChevronDown, Play, Compass, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-nepal.jpg";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Majestic Himalayan mountains at sunrise"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 gradient-overlay" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/40 to-transparent" />
      </div>

      {/* Animated Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-secondary/60 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [null, -100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/10 backdrop-blur-sm border border-card/20"
            >
              <Sparkles className="w-4 h-4 text-secondary" />
              <span className="text-sm font-medium text-card">
                Immersive Virtual Tourism Experience
              </span>
            </motion.div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-display font-bold text-card leading-tight">
              Discover Nepal
              <br />
              <span className="text-gradient">Like Never Before</span>
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl text-card/80 max-w-2xl leading-relaxed">
              Explore ancient temples, majestic Himalayas, and hidden gems through 
              immersive 360° experiences, AI-powered local guides, and educational 
              adventures that bring Nepal's rich culture to life.
            </p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <Button variant="hero" size="xl" asChild>
                <Link to="/explore" className="flex items-center gap-2">
                  <Compass className="w-5 h-5" />
                  Start Exploring
                </Link>
              </Button>
              <Button variant="heroOutline" size="xl" asChild>
                <Link to="/learn" className="flex items-center gap-2">
                  <Play className="w-5 h-5" />
                  Watch Demo
                </Link>
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-8 pt-8 border-t border-card/20 mt-8"
            >
              {[
                { value: "9+", label: "Destinations" },
                { value: "360°", label: "VR Ready" },
                { value: "AI", label: "Local Guides" },
                { value: "Free", label: "To Explore" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl sm:text-3xl font-display font-bold text-secondary">
                    {stat.value}
                  </div>
                  <div className="text-sm text-card/70">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-card/60"
        >
          <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  );
}
