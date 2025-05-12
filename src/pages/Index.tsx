
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowRight, Mail, Building, Search, Award } from "lucide-react";

const Index = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-12 md:py-24 enricher-gradient">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter text-white sm:text-5xl">
                Find Professional Emails in Seconds
              </h1>
              <p className="mx-auto max-w-[700px] text-white md:text-xl">
                Quickly enrich your leads with verified emails and company information using our powerful data enrichment tool.
              </p>
            </div>
            <div className="space-x-4">
              <Button 
                variant="secondary" 
                size="lg"
                onClick={() => navigate(isAuthenticated ? "/dashboard" : "/signup")}
              >
                {isAuthenticated ? "Go to Dashboard" : "Get 25 Free Credits"}
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="bg-transparent border-white text-white hover:bg-white/10"
                onClick={() => navigate("/pricing")}
              >
                View Pricing
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                How It Works
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                Our powerful enrichment engine makes it easy to find verified contact information.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="bg-enricher/10 p-4 rounded-full">
                <Search className="h-8 w-8 text-enricher" />
              </div>
              <h3 className="text-xl font-bold">Enter Domain or LinkedIn URL</h3>
              <p className="text-gray-500">
                Simply paste a company domain or LinkedIn URL to start the enrichment process.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="bg-enricher/10 p-4 rounded-full">
                <Building className="h-8 w-8 text-enricher" />
              </div>
              <h3 className="text-xl font-bold">Company Data Enrichment</h3>
              <p className="text-gray-500">
                Our AI analyzes company information to provide you with accurate and up-to-date data.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="bg-enricher/10 p-4 rounded-full">
                <Mail className="h-8 w-8 text-enricher" />
              </div>
              <h3 className="text-xl font-bold">Verified Email Results</h3>
              <p className="text-gray-500">
                Get verified professional email addresses and contact information in seconds.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-12 md:py-24 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <div>
                <h2 className="text-3xl font-bold tracking-tighter">
                  Why Choose RE-Lead-Enricher?
                </h2>
                <p className="mt-4 text-gray-500 md:text-lg">
                  Get the most accurate and comprehensive lead data with our powerful enrichment tool.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-enricher/10 p-2 rounded-full mr-4 mt-1">
                    <Award className="h-5 w-5 text-enricher" />
                  </div>
                  <div>
                    <h3 className="font-bold">Data Accuracy</h3>
                    <p className="text-gray-500">
                      Our multiple-source verification ensures the highest quality data.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-enricher/10 p-2 rounded-full mr-4 mt-1">
                    <Award className="h-5 w-5 text-enricher" />
                  </div>
                  <div>
                    <h3 className="font-bold">Easy to Use</h3>
                    <p className="text-gray-500">
                      Simple interface that anyone can use without technical knowledge.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-enricher/10 p-2 rounded-full mr-4 mt-1">
                    <Award className="h-5 w-5 text-enricher" />
                  </div>
                  <div>
                    <h3 className="font-bold">Affordable</h3>
                    <p className="text-gray-500">
                      Cost-effective pricing plans with no long-term commitment required.
                    </p>
                  </div>
                </div>
              </div>
              <Button onClick={() => navigate("/signup")} className="mt-4">
                Start for Free <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="rounded-lg border bg-card p-8 shadow-sm">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Try it now</h3>
                  <p className="text-gray-500">
                    Get 25 free credits when you create an account today.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-2">
                    <div className="bg-gray-100 p-4 rounded-md">
                      <span className="text-sm font-medium">Input</span>
                      <p className="font-medium">acme.com</p>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-md">
                      <span className="text-sm font-medium">Results</span>
                      <p className="font-medium">contact@acme.com</p>
                      <p className="text-sm text-gray-500">Acme Corporation</p>
                      <p className="text-sm text-gray-500">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  <Button onClick={() => navigate("/signup")} className="w-full">
                    Create Account
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Ready to Enhance Your Lead Generation?
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                Join thousands of marketers and sales professionals who trust our enrichment tool.
              </p>
            </div>
            <div className="space-x-4">
              <Button 
                size="lg" 
                onClick={() => navigate(isAuthenticated ? "/dashboard" : "/signup")}
              >
                {isAuthenticated ? "Go to Dashboard" : "Get Started for Free"}
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                onClick={() => navigate("/pricing")}
              >
                View Pricing
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
