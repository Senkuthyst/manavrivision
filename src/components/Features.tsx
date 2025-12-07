import { motion } from "framer-motion";
import { 
  Globe, 
  MessageCircle, 
  GraduationCap, 
  Camera,
  Users,
  Sparkles
} from "lucide-react";

const features = [
  {
    icon: Globe,
    title: "360° Immersive Tours",
    description: "Experience Nepal's wonders through stunning panoramic views and VR-ready walkthroughs.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: MessageCircle,
    title: "AI Local Guide",
    description: "Chat with our AI guide to learn about culture, food, history, and hidden gems of each location.",
    color: "bg-secondary/10 text-secondary",
  },
  {
    icon: GraduationCap,
    title: "Educational Modules",
    description: "Learn through micro-lessons, quizzes, and cultural insights embedded in your exploration.",
    color: "bg-success/10 text-success",
  },
  {
    icon: Camera,
    title: "AR Experience",
    description: "Overlay cultural facts and interactive guides on real-world views using your camera.",
    color: "bg-accent/10 text-accent",
  },
  {
    icon: Users,
    title: "Community Features",
    description: "Share your experiences, upload photos, and discover hidden attractions from fellow travelers.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Sparkles,
    title: "Interactive Hotspots",
    description: "Click on points of interest to unlock rich content, stories, and local traditions.",
    color: "bg-secondary/10 text-secondary",
  },
];

export function Features() {
  return (
    <section className="py-20 lg:py-32 bg-muted/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12 lg:mb-16"
        >
          <span className="text-secondary font-medium text-sm uppercase tracking-widest">
            Features
          </span>
          <h2 className="text-3xl lg:text-5xl font-display font-bold text-foreground mt-2 mb-4">
            More Than Just Tourism
          </h2>
          <p className="text-muted-foreground text-lg">
            TravelLens combines cutting-edge technology with rich educational content 
            to create an unforgettable virtual journey.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group p-6 lg:p-8 rounded-2xl bg-card shadow-soft hover:shadow-medium transition-all duration-300"
              >
                <div className={`w-14 h-14 rounded-xl ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-display font-bold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
