
// Subscription plans and management
export interface Plan {
  id: string;
  name: string;
  creditsPerMonth: number;
  price: number;
  features: string[];
  priceId: string; // Stripe price ID
}

export const PLANS: Plan[] = [
  {
    id: 'starter',
    name: 'Starter',
    creditsPerMonth: 200,
    price: 19,
    features: [
      '200 enrichments per month',
      'Email verification',
      'Company data enrichment',
      'Email support'
    ],
    priceId: 'price_starter_1234' // Mock Stripe price ID
  },
  {
    id: 'pro',
    name: 'Pro',
    creditsPerMonth: 500,
    price: 39,
    features: [
      '500 enrichments per month',
      'Email verification',
      'Company data enrichment',
      'Bulk CSV upload',
      'Priority support'
    ],
    priceId: 'price_pro_5678' // Mock Stripe price ID
  }
];

// Subscription service
export const subscriptionService = {
  // Mock checkout function (to be replaced with Stripe integration)
  checkout: async (priceId: string): Promise<string> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // In a real app, this would create a Stripe checkout session and return the URL
    return `https://checkout.stripe.com/pay/${priceId}`;
  },
  
  // Mock customer portal function
  customerPortal: async (): Promise<string> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // In a real app, this would create a Stripe customer portal session
    return 'https://billing.stripe.com/portal/customer';
  }
};
