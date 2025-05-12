
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { CircleDollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function CreditsDisplay() {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
              <CircleDollarSign className="h-6 w-6 text-enricher" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Available Credits</p>
              <h3 className="text-2xl font-bold">{user?.creditsBalance ?? 0}</h3>
            </div>
          </div>
          <Button variant="outline" onClick={() => navigate("/pricing")}>
            Get More
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
