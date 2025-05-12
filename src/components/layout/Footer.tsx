
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t py-8 mt-auto">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">
              <span className="text-enricher">RE</span>-Lead-Enricher
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Find and verify professional email addresses in seconds with our powerful email enrichment tool.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a 
                  onClick={() => navigate("/")} 
                  className="text-gray-600 hover:text-enricher cursor-pointer"
                >
                  Home
                </a>
              </li>
              <li>
                <a 
                  onClick={() => navigate("/dashboard")} 
                  className="text-gray-600 hover:text-enricher cursor-pointer"
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a 
                  onClick={() => navigate("/pricing")} 
                  className="text-gray-600 hover:text-enricher cursor-pointer"
                >
                  Pricing
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a className="text-gray-600 hover:text-enricher cursor-pointer">
                  Terms of Service
                </a>
              </li>
              <li>
                <a className="text-gray-600 hover:text-enricher cursor-pointer">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-6 text-center text-sm text-gray-600">
          <p>© {currentYear} RE-Lead-Enricher. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
