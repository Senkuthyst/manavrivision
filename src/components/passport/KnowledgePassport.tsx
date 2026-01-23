import { motion } from "framer-motion";
import { Award, Shield, Compass, Leaf, Trophy, Star, Lock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { SafetyScore, Badge as BadgeType } from "@/data/responsibleTravelData";
import { getScoreLevelColor } from "@/data/responsibleTravelData";

interface KnowledgePassportProps {
  safetyScore: SafetyScore;
  allBadges: BadgeType[];
}

const iconMap = {
  Award,
  Shield,
  Compass,
  Leaf,
  Trophy,
  Star,
  Download: Compass,
  Glasses: Compass,
  Users: Compass,
  Landmark: Compass,
};

const levelLabels = {
  beginner: "Novice Explorer",
  aware: "Aware Traveler",
  responsible: "Responsible Traveler",
  ambassador: "Travel Ambassador",
};

const levelColors = {
  beginner: "from-muted to-muted-foreground/50",
  aware: "from-primary/50 to-primary",
  responsible: "from-success/50 to-success",
  ambassador: "from-secondary/50 to-secondary",
};

export function KnowledgePassport({ safetyScore, allBadges }: KnowledgePassportProps) {
  const earnedBadgeIds = safetyScore.badges.map((b) => b.id);

  return (
    <div className="space-y-6">
      {/* Overall Score Card */}
      <Card className="overflow-hidden">
        <div className={cn("h-2 bg-gradient-to-r", levelColors[safetyScore.level])} />
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-display">Knowledge Passport</CardTitle>
            <Badge variant="outline" className={cn("font-semibold", getScoreLevelColor(safetyScore.level))}>
              {levelLabels[safetyScore.level]}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-6">
            {/* Score Circle */}
            <div className="flex-shrink-0 flex flex-col items-center">
              <div className="relative w-32 h-32">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="text-muted"
                  />
                  <motion.circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    strokeLinecap="round"
                    className="text-primary"
                    initial={{ strokeDasharray: "0 352" }}
                    animate={{
                      strokeDasharray: `${(safetyScore.overallScore / 100) * 352} 352`,
                    }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-foreground">{safetyScore.overallScore}</span>
                  <span className="text-xs text-muted-foreground">Safety Score</span>
                </div>
              </div>
            </div>

            {/* Score Breakdown */}
            <div className="flex-1 space-y-4">
              {[
                { label: "Cultural Awareness", value: safetyScore.culturalAwareness, icon: Compass },
                { label: "Quiz Completion", value: safetyScore.quizCompletion, icon: Trophy },
                { label: "Safety Readiness", value: safetyScore.safetyReadiness, icon: Shield },
                { label: "Environmental Respect", value: safetyScore.environmentalRespect, icon: Leaf },
              ].map((item) => (
                <div key={item.label} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <item.icon className="w-4 h-4 text-muted-foreground" />
                      <span className="text-foreground">{item.label}</span>
                    </div>
                    <span className="font-medium text-foreground">{item.value}%</span>
                  </div>
                  <Progress value={item.value} className="h-2" />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Badges Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-display flex items-center gap-2">
            <Award className="w-5 h-5 text-secondary" />
            Achievement Badges
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {allBadges.map((badge) => {
              const isEarned = earnedBadgeIds.includes(badge.id);
              const Icon = iconMap[badge.icon as keyof typeof iconMap] || Award;
              const earnedBadge = safetyScore.badges.find((b) => b.id === badge.id);

              return (
                <motion.div
                  key={badge.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  className={cn(
                    "relative flex flex-col items-center p-4 rounded-xl border transition-all",
                    isEarned
                      ? "bg-secondary/10 border-secondary/30"
                      : "bg-muted/30 border-border opacity-60"
                  )}
                >
                  {!isEarned && (
                    <div className="absolute top-2 right-2">
                      <Lock className="w-3 h-3 text-muted-foreground" />
                    </div>
                  )}
                  <div
                    className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center mb-2",
                      isEarned ? "bg-secondary/20" : "bg-muted"
                    )}
                  >
                    <Icon
                      className={cn(
                        "w-6 h-6",
                        isEarned ? "text-secondary" : "text-muted-foreground"
                      )}
                    />
                  </div>
                  <span
                    className={cn(
                      "text-xs font-medium text-center",
                      isEarned ? "text-foreground" : "text-muted-foreground"
                    )}
                  >
                    {badge.name}
                  </span>
                  {earnedBadge?.earnedAt && (
                    <span className="text-[10px] text-muted-foreground mt-1">
                      {new Date(earnedBadge.earnedAt).toLocaleDateString()}
                    </span>
                  )}
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
              <Star className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-1">Level Up Your Score</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Complete more quizzes and explore safety resources to reach "Responsible Traveler" status.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="text-xs">Complete 2 more quizzes</Badge>
                <Badge variant="outline" className="text-xs">Download offline pack</Badge>
                <Badge variant="outline" className="text-xs">Review embassy contacts</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
