import { motion } from "framer-motion";
import { Award, Download, BookOpen, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { KnowledgePassport } from "@/components/passport/KnowledgePassport";
import { OfflineSafetyPack } from "@/components/passport/OfflineSafetyPack";
import { SustainabilityIndicators } from "@/components/passport/SustainabilityIndicators";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  demoSafetyScore,
  allBadges,
  offlinePacks,
  sustainabilityIndicators,
  culturalGuidelines,
} from "@/data/responsibleTravelData";

export default function Passport() {
  const dos = culturalGuidelines.filter((g) => g.category === "do");
  const donts = culturalGuidelines.filter((g) => g.category === "dont");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <Badge className="mb-4 bg-secondary/10 text-secondary border-secondary/30">
              <Award className="w-3 h-3 mr-1" />
              Your Travel Profile
            </Badge>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
              Knowledge <span className="text-primary">Passport</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Track your responsible travel journey, earn badges, and access offline safety resources.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Tabs defaultValue="passport" className="w-full">
            <TabsList className="grid w-full max-w-lg mx-auto grid-cols-3 mb-12">
              <TabsTrigger value="passport" className="flex items-center gap-2">
                <Award className="w-4 h-4" />
                <span className="hidden sm:inline">Passport</span>
              </TabsTrigger>
              <TabsTrigger value="offline" className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Offline Packs</span>
              </TabsTrigger>
              <TabsTrigger value="guidelines" className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                <span className="hidden sm:inline">Guidelines</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="passport">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <KnowledgePassport safetyScore={demoSafetyScore} allBadges={allBadges} />
                </div>
                <div className="space-y-6">
                  <SustainabilityIndicators
                    indicators={sustainabilityIndicators.map((s) => ({
                      category: s.category,
                      score: s.score,
                    }))}
                  />

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Upgrade to Premium</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        Unlock unlimited badges, offline packs, and advanced safety tools.
                      </p>
                      <Button asChild className="w-full">
                        <Link to="/premium">
                          View Plans
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="offline">
              <OfflineSafetyPack packs={offlinePacks} />
            </TabsContent>

            <TabsContent value="guidelines">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-display font-bold text-foreground mb-2">
                    Cultural Do's & Don'ts
                  </h2>
                  <p className="text-muted-foreground">
                    Essential guidelines for respectful travel in Nepal
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Do's */}
                  <div>
                    <h3 className="text-lg font-semibold text-success mb-4 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center text-sm">
                        ✓
                      </span>
                      Do's
                    </h3>
                    <div className="space-y-3">
                      {dos.map((guideline) => (
                        <motion.div
                          key={guideline.id}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          className="p-4 rounded-lg bg-success/5 border border-success/20"
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-2 h-2 rounded-full bg-success mt-2 flex-shrink-0" />
                            <div>
                              <h4 className="font-medium text-foreground">{guideline.title}</h4>
                              <p className="text-sm text-muted-foreground mt-1">
                                {guideline.description}
                              </p>
                              {guideline.importance === "high" && (
                                <Badge variant="outline" className="mt-2 text-xs border-success/30 text-success">
                                  Important
                                </Badge>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Don'ts */}
                  <div>
                    <h3 className="text-lg font-semibold text-destructive mb-4 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-destructive/20 flex items-center justify-center text-sm">
                        ✗
                      </span>
                      Don'ts
                    </h3>
                    <div className="space-y-3">
                      {donts.map((guideline) => (
                        <motion.div
                          key={guideline.id}
                          initial={{ opacity: 0, x: 10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          className="p-4 rounded-lg bg-destructive/5 border border-destructive/20"
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-2 h-2 rounded-full bg-destructive mt-2 flex-shrink-0" />
                            <div>
                              <h4 className="font-medium text-foreground">{guideline.title}</h4>
                              <p className="text-sm text-muted-foreground mt-1">
                                {guideline.description}
                              </p>
                              {guideline.importance === "high" && (
                                <Badge variant="outline" className="mt-2 text-xs border-destructive/30 text-destructive">
                                  Critical
                                </Badge>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  );
}
