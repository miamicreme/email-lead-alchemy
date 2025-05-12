
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, Package, AlertCircle, ArrowRight, ExternalLink } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { subscriptionService } from "@/services/subscription";
import { useToast } from "@/components/ui/use-toast";

const BillingPage = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    // If the user is not authenticated and not loading, redirect to login
    if (!isLoading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, isLoading, navigate]);
  
  const handleManageSubscription = async () => {
    try {
      setLoading(true);
      const portalUrl = await subscriptionService.customerPortal();
      toast({
        title: "Redirecting to customer portal",
        description: "You'll be redirected to manage your subscription",
      });
      console.log("Customer portal URL:", portalUrl);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to open customer portal. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  // If still loading or not authenticated, show loading or nothing
  if (isLoading || !isAuthenticated) {
    return null;
  }
  
  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-6">Billing & Subscription</h1>
        
        <div className="grid grid-cols-1 gap-6 max-w-3xl">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Demo Mode</AlertTitle>
            <AlertDescription>
              This is a demo application. In a real implementation, subscription management would be handled through Stripe.
            </AlertDescription>
          </Alert>
          
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Package className="h-5 w-5 text-enricher" />
                <CardTitle>Your Plan</CardTitle>
              </div>
              <CardDescription>
                Manage your subscription and billing information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">Current Plan</h3>
                  <p className="text-2xl font-bold">
                    {user?.role === 'paid' ? 'Pro' : 'Free Trial'}
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium">Credits</h3>
                  <p className="text-2xl font-bold">{user?.creditsBalance}</p>
                  <p className="text-sm text-muted-foreground">
                    {user?.role === 'paid' 
                      ? 'Credits refresh monthly on your billing date' 
                      : 'Free trial credits'}
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-start gap-4">
              <Button onClick={handleManageSubscription} disabled={loading}>
                {loading ? (
                  <>Loading...</>
                ) : (
                  <>
                    <CreditCard className="mr-2 h-4 w-4" />
                    Manage Subscription
                  </>
                )}
              </Button>
              <p className="text-sm text-muted-foreground">
                Need more credits? <a onClick={() => navigate("/pricing")} className="text-enricher hover:underline cursor-pointer">View our pricing plans</a>
              </p>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-enricher" />
                <CardTitle>Payment Method</CardTitle>
              </div>
              <CardDescription>
                Manage your payment information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-16 bg-gray-200 rounded flex items-center justify-center">
                    <span className="font-medium text-gray-600">VISA</span>
                  </div>
                  <div>
                    <p className="font-medium">Visa ending in 4242</p>
                    <p className="text-sm text-muted-foreground">Expires 12/2025</p>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  Update
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <ExternalLink className="h-5 w-5 text-enricher" />
                <CardTitle>Billing History</CardTitle>
              </div>
              <CardDescription>
                View your recent invoices and payment history
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="flex items-center justify-between p-4 border-b">
                  <div>
                    <p className="font-medium">April 2025</p>
                    <p className="text-sm text-muted-foreground">Pro Plan - Monthly</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">$39.00</p>
                    <p className="text-sm text-green-600">Paid</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4">
                  <div>
                    <p className="font-medium">March 2025</p>
                    <p className="text-sm text-muted-foreground">Pro Plan - Monthly</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">$39.00</p>
                    <p className="text-sm text-green-600">Paid</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="link" className="pl-0">
                View all invoices <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default BillingPage;
