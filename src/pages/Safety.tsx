import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, AlertTriangle, Phone, MapPin, Building2, Download, Plane } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AIGuide } from "@/components/AIGuide";
import { SafetyMap } from "@/components/safety/SafetyMap";
import { EmergencyHotlines } from "@/components/safety/EmergencyHotlines";
import { AlertSystem } from "@/components/safety/AlertSystem";
import { RiskAssessmentCard } from "@/components/safety/RiskAssessment";
import { EvacuationPlanning } from "@/components/safety/EvacuationPlanning";
import { EmbassySupport } from "@/components/safety/EmbassySupport";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { type SafetyZone } from "@/data/safetyData";

const Safety = () => {
  const [selectedZone, setSelectedZone] = useState<SafetyZone | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <Badge variant="secondary" className="mb-4">
              <Shield className="w-3 h-3 mr-1" />
              Safety Intelligence
            </Badge>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Travel with <span className="text-gradient">Confidence</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              Real-time safety information, emergency contacts, and crisis preparedness tools 
              designed to keep you informed and protected throughout your Nepal journey.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button size="lg">
                <Download className="w-4 h-4 mr-2" />
                Download Offline Pack
              </Button>
              <Button variant="outline" size="lg">
                <Phone className="w-4 h-4 mr-2" />
                Emergency Contacts
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="overview" className="space-y-8">
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4">
              <TabsTrigger value="overview" className="flex items-center gap-1">
                <Shield className="w-4 h-4" />
                <span className="hidden sm:inline">Overview</span>
              </TabsTrigger>
              <TabsTrigger value="alerts" className="flex items-center gap-1">
                <AlertTriangle className="w-4 h-4" />
                <span className="hidden sm:inline">Alerts</span>
              </TabsTrigger>
              <TabsTrigger value="evacuation" className="flex items-center gap-1">
                <Plane className="w-4 h-4" />
                <span className="hidden sm:inline">Evacuation</span>
              </TabsTrigger>
              <TabsTrigger value="embassy" className="flex items-center gap-1">
                <Building2 className="w-4 h-4" />
                <span className="hidden sm:inline">Embassy</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-8">
              <div className="grid lg:grid-cols-2 gap-8">
                <SafetyMap 
                  onZoneSelect={setSelectedZone}
                  selectedZoneId={selectedZone?.id}
                />
                <RiskAssessmentCard destinationId={selectedZone?.id || 'kathmandu'} />
              </div>
              <EmergencyHotlines />
            </TabsContent>

            <TabsContent value="alerts" className="space-y-8">
              <div className="grid lg:grid-cols-2 gap-8">
                <AlertSystem />
                <RiskAssessmentCard destinationId="kathmandu" />
              </div>
            </TabsContent>

            <TabsContent value="evacuation">
              <EvacuationPlanning />
            </TabsContent>

            <TabsContent value="embassy">
              <EmbassySupport />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
      <AIGuide />
    </div>
  );
};

export default Safety;
