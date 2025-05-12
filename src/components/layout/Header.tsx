
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User, CreditCard } from "lucide-react";

export default function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  
  return (
    <header className="w-full py-4 border-b bg-white">
      <div className="container flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="font-bold text-lg md:text-xl cursor-pointer" onClick={() => navigate("/")}>
            <span className="text-enricher">RE</span>-Lead-Enricher
          </div>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          {isAuthenticated ? (
            <>
              <Button variant="link" onClick={() => navigate("/dashboard")}>Dashboard</Button>
              <Button variant="link" onClick={() => navigate("/pricing")}>Pricing</Button>
            </>
          ) : (
            <>
              <Button variant="link" onClick={() => navigate("/pricing")}>Pricing</Button>
              <Button variant="link" onClick={() => navigate("/login")}>Login</Button>
              <Button variant="default" onClick={() => navigate("/signup")}>Sign Up</Button>
            </>
          )}
        </nav>
        
        {isAuthenticated && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="ml-4">
                <User className="w-4 h-4 mr-2" />
                {user?.email?.split('@')[0]}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                <User className="w-4 h-4 mr-2" />
                Dashboard
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/billing")}>
                <CreditCard className="w-4 h-4 mr-2" />
                Billing
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout}>
                <LogOut className="w-4 h-4 mr-2" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        
        <Button variant="outline" size="icon" className="md:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </Button>
      </div>
    </header>
  );
}
