
import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import LookupInput from "@/components/lookup/LookupInput";
import LookupTable from "@/components/lookup/LookupTable";
import CreditsDisplay from "@/components/dashboard/CreditsDisplay";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // If the user is not authenticated and not loading, redirect to login
    if (!isLoading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, isLoading, navigate]);

  // If still loading or not authenticated, show loading or nothing
  if (isLoading || !isAuthenticated) {
    return null;
  }

  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="md:col-span-2">
            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Enrich a Lead</h2>
              <p className="text-gray-500 mb-4">
                Enter a domain or LinkedIn URL to find verified emails and company information.
              </p>
              <LookupInput onLookupCreated={() => setRefreshKey(prev => prev + 1)} />
            </div>
          </div>
          
          <div>
            <CreditsDisplay />
            
            {user?.creditsBalance !== undefined && user.creditsBalance < 10 && (
              <Alert variant="destructive" className="mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Low credits</AlertTitle>
                <AlertDescription>
                  You're running low on credits. Consider upgrading your plan.
                  <div className="mt-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => navigate("/pricing")}
                    >
                      View Plans
                    </Button>
                  </div>
                </AlertDescription>
              </Alert>
            )}
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <LookupTable key={refreshKey} />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
