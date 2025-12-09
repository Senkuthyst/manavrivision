import { Hero } from "@/components/Hero";
import { FeaturedDestinations } from "@/components/FeaturedDestinations";
import { Features } from "@/components/Features";
import { VRExperience } from "@/components/VRExperience";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AIGuide } from "@/components/AIGuide";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <FeaturedDestinations />
      <VRExperience />
      <Features />
      <Footer />
      <AIGuide />
    </div>
  );
};

export default Index;
