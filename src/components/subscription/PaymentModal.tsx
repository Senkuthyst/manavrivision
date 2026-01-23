import { useState } from "react";
import { motion } from "framer-motion";
import { CreditCard, Lock, AlertTriangle, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  planName: string;
  amount: string;
  isContribution?: boolean;
}

export function PaymentModal({ isOpen, onClose, planName, amount, isContribution = false }: PaymentModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState<"form" | "success">("form");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setStep("success");
      toast.success(
        isContribution
          ? "Thank you for supporting cultural preservation!"
          : "Welcome to TravelLens Premium!"
      );
    }, 2000);
  };

  const handleClose = () => {
    setStep("form");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        {step === "form" ? (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                {isContribution ? "Make a Contribution" : "Complete Your Purchase"}
              </DialogTitle>
              <DialogDescription>
                {isContribution
                  ? `Support cultural preservation with your ${planName} contribution`
                  : `Subscribe to ${planName} for ${amount}`
                }
              </DialogDescription>
            </DialogHeader>

            <div className="my-4 p-3 rounded-lg bg-warning/10 border border-warning/30 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-warning">Sandbox Mode</p>
                <p className="text-xs text-muted-foreground">
                  This is a demo. No real charges will be made.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input
                  id="cardNumber"
                  placeholder="4242 4242 4242 4242"
                  defaultValue="4242 4242 4242 4242"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry">Expiry</Label>
                  <Input id="expiry" placeholder="MM/YY" defaultValue="12/28" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvc">CVC</Label>
                  <Input id="cvc" placeholder="123" defaultValue="123" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Name on Card</Label>
                <Input id="name" placeholder="John Doe" defaultValue="Demo User" />
              </div>

              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Lock className="w-4 h-4" />
                <span>Secured by Stripe. Your payment info is encrypted.</span>
              </div>

              <div className="flex gap-3 pt-2">
                <Button type="button" variant="outline" onClick={handleClose} className="flex-1">
                  Cancel
                </Button>
                <Button type="submit" className="flex-1" disabled={isProcessing}>
                  {isProcessing ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full"
                    />
                  ) : (
                    `Pay ${amount}`
                  )}
                </Button>
              </div>
            </form>

            <div className="flex items-center justify-center gap-4 pt-4 border-t">
              <img src="https://js.stripe.com/v3/fingerprinted/img/visa-729c05c240c4bdb47b03ac81d9945bfe.svg" alt="Visa" className="h-6" />
              <img src="https://js.stripe.com/v3/fingerprinted/img/mastercard-4d8844094130711885b5e41b28c9848f.svg" alt="Mastercard" className="h-6" />
              <img src="https://js.stripe.com/v3/fingerprinted/img/amex-a49b82f46c5cd6a96a6e418a6ca1717c.svg" alt="Amex" className="h-6" />
            </div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-6"
          >
            <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-success" />
            </div>
            <h3 className="text-xl font-display font-bold mb-2">
              {isContribution ? "Thank You!" : "Welcome to Premium!"}
            </h3>
            <p className="text-muted-foreground mb-4">
              {isContribution
                ? "Your contribution will help preserve Nepal's cultural heritage."
                : "Your Premium features are now unlocked. Enjoy exploring!"
              }
            </p>
            <Badge variant="secondary" className="mb-6">
              Demo Transaction Completed
            </Badge>
            <Button onClick={handleClose} className="w-full">
              Continue Exploring
            </Button>
          </motion.div>
        )}
      </DialogContent>
    </Dialog>
  );
}
