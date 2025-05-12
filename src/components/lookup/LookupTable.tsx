
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { api, Lookup } from "@/services/api";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { 
  ExternalLink, 
  Mail, 
  Phone, 
  Linkedin, 
  Building, 
  AlertCircle, 
  RefreshCw,
  Loader2
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function LookupTable() {
  const [lookups, setLookups] = useState<Lookup[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { user } = useAuth();

  const fetchLookups = async () => {
    if (!user) return;
    
    try {
      if (refreshing) setRefreshing(true);
      else setIsLoading(true);
      
      const data = await api.getLookups(user.id);
      setLookups(data.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ));
    } catch (error) {
      console.error("Failed to fetch lookups:", error);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchLookups();
    
    // Set up polling for processing lookups
    const interval = setInterval(() => {
      const hasProcessingLookups = lookups.some(l => l.status === 'processing');
      if (hasProcessingLookups) {
        fetchLookups();
      }
    }, 2000);
    
    return () => clearInterval(interval);
  }, [user]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchLookups();
  };

  const renderStatusBadge = (status: string) => {
    switch (status) {
      case 'processing':
        return <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">Processing</Badge>;
      case 'done':
        return <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">Done</Badge>;
      case 'failed':
        return <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">Failed</Badge>;
      case 'rate_limit':
        return <Badge variant="outline" className="bg-orange-50 text-orange-600 border-orange-200">Rate Limited</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (isLoading) {
    return (
      <div className="w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Recent Lookups</h3>
          <Button variant="outline" size="sm" disabled>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Input</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array(3).fill(0).map((_, i) => (
                <TableRow key={i}>
                  <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-40" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-16" /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }

  if (lookups.length === 0) {
    return (
      <div className="w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Recent Lookups</h3>
          <Button variant="outline" size="sm" onClick={handleRefresh} disabled={refreshing}>
            {refreshing ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <RefreshCw className="h-4 w-4 mr-2" />}
            Refresh
          </Button>
        </div>
        <div className="rounded-md border p-8 text-center">
          <AlertCircle className="h-12 w-12 mx-auto mb-3 text-gray-400" />
          <h3 className="text-lg font-medium mb-1">No lookups yet</h3>
          <p className="text-muted-foreground">
            Enter a domain or LinkedIn URL above to enrich your first lead.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Recent Lookups</h3>
        <Button variant="outline" size="sm" onClick={handleRefresh} disabled={refreshing}>
          {refreshing ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <RefreshCw className="h-4 w-4 mr-2" />}
          Refresh
        </Button>
      </div>
      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Input</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {lookups.map((lookup) => {
              const companyData = lookup.clearbitJson;
              const companyName = companyData?.name || lookup.input.split('.')[0];
              
              return (
                <TableRow key={lookup.id}>
                  <TableCell className="font-medium max-w-[200px] truncate">
                    {lookup.input}
                  </TableCell>
                  <TableCell>
                    {lookup.status === 'processing' ? (
                      <div className="flex items-center">
                        <Loader2 className="h-4 w-4 mr-2 animate-spin text-blue-500" />
                        <span className="text-muted-foreground">Processing</span>
                      </div>
                    ) : lookup.verifiedEmail ? (
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-2 text-green-500" />
                        {lookup.verifiedEmail}
                      </div>
                    ) : lookup.status === 'failed' ? (
                      <div className="flex items-center">
                        <AlertCircle className="h-4 w-4 mr-2 text-red-500" />
                        <span className="text-muted-foreground">Not found</span>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <AlertCircle className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-muted-foreground">None</span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    {lookup.phone ? (
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2 text-blue-500" />
                        {lookup.phone}
                      </div>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {companyData ? (
                      <div className="flex items-center">
                        <Building className="h-4 w-4 mr-2 text-purple-500" />
                        <span className="mr-2">{companyName}</span>
                        {lookup.linkedin && (
                          <a href={lookup.linkedin} target="_blank" rel="noopener noreferrer">
                            <Linkedin className="h-4 w-4 text-blue-600" />
                          </a>
                        )}
                      </div>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell>{renderStatusBadge(lookup.status)}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
