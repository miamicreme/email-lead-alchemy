
import Layout from "@/components/layout/Layout";
import PricingCard from "@/components/pricing/PricingCard";
import { PLANS } from "@/services/subscription";
import { Check, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const PricingPage = () => {
  return (
    <Layout>
      <div className="container py-12">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-3xl font-bold mb-4">Simple Pricing, Powerful Features</h1>
          <p className="text-xl text-gray-500">
            Choose the plan that fits your needs. All plans include our core enrichment features.
          </p>
        </div>
        
        <Alert className="max-w-3xl mx-auto mb-8">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Note about our pricing</AlertTitle>
          <AlertDescription>
            This is a demo application. In a real implementation, you would be redirected to Stripe to complete your purchase.
          </AlertDescription>
        </Alert>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {PLANS.map((plan, index) => (
            <PricingCard 
              key={plan.id}
              plan={plan}
              isPopular={index === 1}
            />
          ))}
        </div>
        
        <div className="mt-16 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">What's included in all plans</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center">
              <Check className="h-5 w-5 text-green-500 mr-2" />
              <span>Email verification</span>
            </div>
            <div className="flex items-center">
              <Check className="h-5 w-5 text-green-500 mr-2" />
              <span>Company data enrichment</span>
            </div>
            <div className="flex items-center">
              <Check className="h-5 w-5 text-green-500 mr-2" />
              <span>LinkedIn profile discovery</span>
            </div>
            <div className="flex items-center">
              <Check className="h-5 w-5 text-green-500 mr-2" />
              <span>Phone number lookup</span>
            </div>
            <div className="flex items-center">
              <Check className="h-5 w-5 text-green-500 mr-2" />
              <span>Data export</span>
            </div>
            <div className="flex items-center">
              <Check className="h-5 w-5 text-green-500 mr-2" />
              <span>Email support</span>
            </div>
          </div>
        </div>
        
        <div className="mt-16 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">How accurate is the data?</h3>
              <p className="text-gray-600">
                We use multiple verification sources to ensure high accuracy. Our email verification has a 95%+ success rate.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Can I upgrade or downgrade my plan?</h3>
              <p className="text-gray-600">
                Yes, you can change your plan at any time. Changes take effect at the start of your next billing cycle.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Do credits roll over?</h3>
              <p className="text-gray-600">
                No, credits reset at the beginning of each billing cycle. Make sure to use all your credits before they expire.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">What happens if I run out of credits?</h3>
              <p className="text-gray-600">
                You can purchase additional credits at any time or upgrade to a higher plan with more monthly credits.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PricingPage;
