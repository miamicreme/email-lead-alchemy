
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { api } from "@/services/api";

interface LookupInputProps {
  onLookupCreated: () => void;
}

export default function LookupInput({ onLookupCreated }: LookupInputProps) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const { user, updateUser } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) {
      toast({
        variant: "destructive",
        title: "Input required",
        description: "Please enter a domain or LinkedIn URL",
      });
      return;
    }

    if (!user) {
      toast({
        variant: "destructive",
        title: "Authentication required",
        description: "Please log in to perform lookups",
      });
      return;
    }

    if (user.creditsBalance <= 0) {
      toast({
        variant: "destructive",
        title: "No credits",
        description: "You've run out of credits. Please purchase more to continue.",
      });
      return;
    }

    try {
      setLoading(true);

      // Create lookup through API
      await api.createLookup(user.id, input);

      // Deduct credit
      updateUser({ creditsBalance: user.creditsBalance - 1 });

      toast({
        title: "Lookup started",
        description: "We're enriching your data. Results will appear shortly.",
      });

      // Reset input
      setInput("");
      
      // Notify parent
      onLookupCreated();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Lookup failed",
        description: "Failed to start lookup. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex w-full items-center space-x-2">
        <div className="relative flex-grow">
          <Input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter domain or LinkedIn URL (e.g., example.com)"
            className="pr-10"
            disabled={loading}
          />
        </div>
        <Button type="submit" disabled={loading || !input.trim()}>
          {loading ? (
            <div className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Enriching
            </div>
          ) : (
            <>
              <Search className="w-4 h-4 mr-2" />
              Enrich
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
