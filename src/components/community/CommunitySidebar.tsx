import { motion } from "framer-motion";
import { Star, Award, Trophy, Leaf, TrendingUp, Heart, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { hiddenGems, topContributors } from "@/data/communityData";

export function CommunitySidebar() {
  return (
    <div className="space-y-6">
      {/* Hidden Gems */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-card rounded-2xl p-5 shadow-soft border border-border/50"
      >
        <h3 className="text-lg font-display font-bold text-foreground mb-4 flex items-center gap-2">
          <Star className="w-5 h-5 text-secondary" />
          Community Hidden Gems
        </h3>
        <div className="space-y-3">
          {hiddenGems.map((gem, index) => (
            <motion.div
              key={gem.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{gem.icon}</span>
                <div>
                  <h4 className="font-medium text-foreground text-sm">{gem.name}</h4>
                  <p className="text-xs text-muted-foreground">{gem.location}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 text-secondary">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span className="text-sm font-semibold">{gem.rating}</span>
                </div>
                <p className="text-[10px] text-muted-foreground">{gem.votes} votes</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Top Contributors */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-card rounded-2xl p-5 shadow-soft border border-border/50"
      >
        <h3 className="text-lg font-display font-bold text-foreground mb-4 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-accent" />
          Top Contributors
        </h3>
        <div className="space-y-3">
          {topContributors.map((contributor, index) => (
            <motion.div
              key={contributor.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-3"
            >
              <div className="relative">
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold",
                  index === 0
                    ? "bg-gradient-to-br from-secondary to-secondary/60 text-secondary-foreground"
                    : index === 1
                    ? "bg-gradient-to-br from-muted-foreground/60 to-muted-foreground/30 text-background"
                    : index === 2
                    ? "bg-gradient-to-br from-amber-700 to-amber-600 text-white"
                    : "bg-muted text-foreground"
                )}>
                  {contributor.avatar}
                </div>
                {contributor.isCulturallyVerified && (
                  <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-success flex items-center justify-center border-2 border-card">
                    <CheckCircle2 className="w-2.5 h-2.5 text-success-foreground" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-foreground text-sm truncate">{contributor.name}</h4>
                <div className="flex items-center gap-2">
                  <p className="text-xs text-muted-foreground">{contributor.posts} posts</p>
                  {index < 3 && (
                    <Badge variant="outline" className="text-[9px] px-1.5 py-0 h-4">
                      {contributor.badge}
                    </Badge>
                  )}
                </div>
              </div>
              {index === 0 && (
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-secondary/20">
                  <span className="text-xs">👑</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Stats Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-5 border border-primary/20"
      >
        <h3 className="text-lg font-display font-bold text-foreground mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          Community Stats
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">2.4K</div>
            <p className="text-xs text-muted-foreground">Active Members</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-secondary">8.7K</div>
            <p className="text-xs text-muted-foreground">Posts Shared</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-accent">156</div>
            <p className="text-xs text-muted-foreground">Hidden Gems</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-success">89%</div>
            <p className="text-xs text-muted-foreground">Verified Posts</p>
          </div>
        </div>
      </motion.div>

      {/* Responsible Tourism */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-success/10 rounded-2xl p-5 border border-success/20"
      >
        <h3 className="text-lg font-display font-bold text-success mb-2 flex items-center gap-2">
          <Leaf className="w-5 h-5" />
          Responsible Sharing
        </h3>
        <p className="text-sm text-success/80 leading-relaxed">
          Every post with a "What I Learned" reflection helps preserve Nepal's cultural heritage. 
          Share knowledge, not just photos. 🙏
        </p>
        <div className="mt-3 flex items-center gap-2 text-xs text-success/70">
          <Heart className="w-4 h-4" />
          <span>1,234 cultural insights shared this month</span>
        </div>
      </motion.div>
    </div>
  );
}
