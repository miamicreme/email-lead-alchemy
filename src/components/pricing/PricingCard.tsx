
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { Plan } from "@/services/subscription";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { subscriptionService } from "@/services/subscription";

interface PricingCardProps {
  plan: Plan;
  isPopular?: boolean;
}

export default function PricingCard({ plan, isPopular = false }: PricingCardProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const handleSubscribe = async () => {
    if (!user) {
      toast({
        title: "Login required",
        description: "Please login or create an account to subscribe",
        variant: "destructive",
      });
      return;
    }
    
    try {
      const checkoutUrl = await subscriptionService.checkout(plan.priceId);
      // In a real implementation, this would redirect to Stripe Checkout
      toast({
        title: "Redirecting to checkout",
        description: "You'll be redirected to Stripe to complete your purchase",
      });
      console.log("Checkout URL:", checkoutUrl);
    } catch (error) {
      toast({
        title: "Checkout error",
        description: "Failed to initiate checkout. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  return (
    <Card className={`w-full max-w-sm mx-auto ${isPopular ? 'border-enricher border-2' : ''}`}>
      {isPopular && (
        <div className="bg-enricher text-white text-center py-2 text-sm font-medium">
          Most Popular
        </div>
      )}
      
      <CardHeader>
        <CardTitle className="text-xl">{plan.name}</CardTitle>
        <div className="mt-2">
          <span className="text-3xl font-bold">${plan.price}</span>
          <span className="text-muted-foreground">/month</span>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {plan.features.map((feature, index) => (
            <div key={index} className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </CardContent>
      
      <CardFooter>
        <Button 
          onClick={handleSubscribe}
          className="w-full" 
          variant={isPopular ? "default" : "outline"}
        >
          Subscribe
        </Button>
      </CardFooter>
    </Card>
  );
}
