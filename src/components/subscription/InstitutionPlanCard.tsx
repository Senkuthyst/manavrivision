import { motion } from "framer-motion";
import { Check, Users, Building2, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { InstitutionPlan } from "@/data/subscriptionData";
import { formatPrice, convertCurrency } from "@/data/subscriptionData";

interface InstitutionPlanCardProps {
  plan: InstitutionPlan;
  selectedCurrency: string;
  index: number;
  onSelect: (planId: string) => void;
}

const planIcons = {
  classroom: GraduationCap,
  school: Building2,
  institution: Users,
};

export function InstitutionPlanCard({ plan, selectedCurrency, index, onSelect }: InstitutionPlanCardProps) {
  const Icon = planIcons[plan.id as keyof typeof planIcons] || Users;
  const convertedPrice = convertCurrency(plan.priceUSD, selectedCurrency);
  const formattedPrice = plan.priceUSD === 0 ? "Custom" : formatPrice(convertedPrice, selectedCurrency);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="h-full transition-all duration-300 hover:shadow-medium hover:border-primary/50">
        <CardHeader>
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
            <Icon className="w-6 h-6 text-primary" />
          </div>
          <CardTitle className="text-xl font-display">{plan.name}</CardTitle>
          <CardDescription>{plan.description}</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="mb-4">
            <span className="text-3xl font-bold text-foreground">{formattedPrice}</span>
            {plan.priceUSD > 0 && (
              <span className="text-muted-foreground ml-1">/month</span>
            )}
          </div>

          <div className="mb-4 p-3 rounded-lg bg-muted/50">
            <span className="text-sm font-medium text-foreground">
              {plan.seats === "unlimited" ? "Unlimited seats" : `Up to ${plan.seats} students`}
            </span>
          </div>

          <ul className="space-y-2">
            {plan.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-2">
                <Check className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground">{feature}</span>
              </li>
            ))}
          </ul>
        </CardContent>

        <CardFooter>
          <Button
            onClick={() => onSelect(plan.id)}
            variant="outline"
            className="w-full"
          >
            {plan.priceUSD === 0 ? "Contact Sales" : "Start Free Trial"}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
