import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Building2, Heart, Shield, AlertTriangle } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { PricingCard } from "@/components/subscription/PricingCard";
import { InstitutionPlanCard } from "@/components/subscription/InstitutionPlanCard";
import { CurrencySelector } from "@/components/subscription/CurrencySelector";
import { ContributionCard } from "@/components/subscription/ContributionCard";
import { PaymentModal } from "@/components/subscription/PaymentModal";
import {
  subscriptionTiers,
  institutionPlans,
  contributionOptions,
  formatPrice,
  convertCurrency,
} from "@/data/subscriptionData";

export default function Premium() {
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [paymentModal, setPaymentModal] = useState<{
    isOpen: boolean;
    planName: string;
    amount: string;
    isContribution: boolean;
  }>({
    isOpen: false,
    planName: "",
    amount: "",
    isContribution: false,
  });

  const handleSelectPlan = (tierId: string) => {
    const tier = subscriptionTiers.find((t) => t.id === tierId);
    if (!tier) return;

    if (tier.priceUSD === 0) {
      // Free plan - just redirect or show success
      return;
    }

    const convertedPrice = convertCurrency(tier.priceUSD, selectedCurrency);
    setPaymentModal({
      isOpen: true,
      planName: tier.name,
      amount: formatPrice(convertedPrice, selectedCurrency),
      isContribution: false,
    });
  };

  const handleSelectInstitution = (planId: string) => {
    const plan = institutionPlans.find((p) => p.id === planId);
    if (!plan) return;

    if (plan.priceUSD === 0) {
      // Custom pricing - show contact form
      return;
    }

    const convertedPrice = convertCurrency(plan.priceUSD, selectedCurrency);
    setPaymentModal({
      isOpen: true,
      planName: plan.name,
      amount: formatPrice(convertedPrice, selectedCurrency),
      isContribution: false,
    });
  };

  const handleContribute = (optionId: string) => {
    const option = contributionOptions.find((o) => o.id === optionId);
    if (!option) return;

    const convertedPrice = convertCurrency(option.amountUSD, selectedCurrency);
    setPaymentModal({
      isOpen: true,
      planName: option.name,
      amount: formatPrice(convertedPrice, selectedCurrency),
      isContribution: true,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge className="mb-4 bg-secondary/10 text-secondary border-secondary/30">
              <AlertTriangle className="w-3 h-3 mr-1" />
              Sandbox / MVP Stage
            </Badge>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
              Unlock the Full <span className="text-primary">TravelLens</span> Experience
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Access premium learning modules, immersive VR experiences, AI-powered guidance,
              and complete safety intelligence tools.
            </p>

            <div className="flex justify-center mb-8">
              <CurrencySelector value={selectedCurrency} onChange={setSelectedCurrency} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Tabs */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Tabs defaultValue="individual" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12">
              <TabsTrigger value="individual" className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Individual
              </TabsTrigger>
              <TabsTrigger value="institution" className="flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                Institutions
              </TabsTrigger>
            </TabsList>

            <TabsContent value="individual">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                {subscriptionTiers.map((tier, index) => (
                  <PricingCard
                    key={tier.id}
                    tier={tier}
                    selectedCurrency={selectedCurrency}
                    index={index}
                    onSelect={handleSelectPlan}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="institution">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                {institutionPlans.map((plan, index) => (
                  <InstitutionPlanCard
                    key={plan.id}
                    plan={plan}
                    selectedCurrency={selectedCurrency}
                    index={index}
                    onSelect={handleSelectInstitution}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Features Included */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-foreground mb-4">
              What's Included in Premium
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything you need to explore Nepal responsibly and safely
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: "🎓",
                title: "50+ Learning Modules",
                description: "Deep cultural insights, history, and local knowledge",
              },
              {
                icon: "🥽",
                title: "Unlimited VR Experiences",
                description: "360° panoramic tours of all destinations",
              },
              {
                icon: "🤖",
                title: "AI Local Guide",
                description: "Intelligent conversations about Nepal travel",
              },
              {
                icon: "🛡️",
                title: "Safety Intelligence",
                description: "Real-time alerts, evacuation planning, embassy contacts",
              },
              {
                icon: "📴",
                title: "Offline Safety Packs",
                description: "Download emergency info for low-connectivity areas",
              },
              {
                icon: "🏆",
                title: "Knowledge Passport",
                description: "Track achievements and earn responsibility badges",
              },
              {
                icon: "🗺️",
                title: "Smart Trip Planning",
                description: "Personalized itineraries and recommendations",
              },
              {
                icon: "👥",
                title: "Priority Community",
                description: "Connect with verified responsible travelers",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="p-6 rounded-xl bg-card border border-border"
              >
                <div className="text-3xl mb-3">{feature.icon}</div>
                <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cultural Preservation Contributions */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-secondary/10 text-secondary border-secondary/30">
              <Heart className="w-3 h-3 mr-1" />
              Optional Contribution
            </Badge>
            <h2 className="text-3xl font-display font-bold text-foreground mb-4">
              Support Cultural Preservation
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Help preserve Nepal's heritage, support local artisans, and protect ecosystems.
              100% of contributions go directly to community initiatives.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contributionOptions.map((option, index) => (
              <ContributionCard
                key={option.id}
                option={option}
                selectedCurrency={selectedCurrency}
                index={index}
                onContribute={handleContribute}
              />
            ))}
          </div>

          <div className="mt-8 p-4 rounded-lg bg-muted/50 border border-border text-center">
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Shield className="w-4 h-4" />
              <span>Transparent giving. Track your impact in your Knowledge Passport.</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-display font-bold text-foreground text-center mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            {[
              {
                q: "Can I try Premium features before subscribing?",
                a: "Yes! Every plan comes with a 7-day free trial. Cancel anytime during the trial and you won't be charged.",
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept all major credit and debit cards (Visa, MasterCard, American Express) with automatic currency conversion.",
              },
              {
                q: "Is my payment information secure?",
                a: "Absolutely. All payments are processed through Stripe, a PCI Level 1 certified payment processor. We never store your card details.",
              },
              {
                q: "Can I switch between plans?",
                a: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately with prorated billing.",
              },
              {
                q: "Do contributions go to real initiatives?",
                a: "Yes. We partner with verified local organizations in Nepal. You can track the impact of community contributions in your profile.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="p-6 rounded-xl bg-card border border-border"
              >
                <h3 className="font-semibold text-foreground mb-2">{faq.q}</h3>
                <p className="text-muted-foreground text-sm">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      <PaymentModal
        isOpen={paymentModal.isOpen}
        onClose={() => setPaymentModal({ ...paymentModal, isOpen: false })}
        planName={paymentModal.planName}
        amount={paymentModal.amount}
        isContribution={paymentModal.isContribution}
      />
    </div>
  );
}
