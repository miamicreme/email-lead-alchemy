
// API interface for our enrichment services
import { toast } from "@/components/ui/use-toast";

// Types
export interface Lookup {
  id: string;
  userId: string;
  input: string;
  verifiedEmail?: string;
  phone?: string;
  linkedin?: string;
  clearbitJson?: Record<string, any>;
  hunterJson?: Record<string, any>;
  status: 'processing' | 'done' | 'failed' | 'rate_limit';
  cost: number;
  createdAt: Date;
}

// Mock data for lookups
const mockLookupData: Record<string, Lookup[]> = {};

// Generate a unique ID
const generateId = () => Math.random().toString(36).substring(2, 15);

// Mock API service
export const api = {
  // Create a new lookup
  createLookup: async (
    userId: string, 
    input: string
  ): Promise<Lookup> => {
    await new Promise(resolve => setTimeout(resolve, 200)); // Simulate network delay
    
    const lookup: Lookup = {
      id: generateId(),
      userId,
      input,
      status: 'processing',
      cost: 0,
      createdAt: new Date()
    };
    
    if (!mockLookupData[userId]) {
      mockLookupData[userId] = [];
    }
    
    // Check for duplicates
    const duplicate = mockLookupData[userId].find(l => 
      l.input === input && l.status === 'done'
    );
    
    if (duplicate) {
      return duplicate;
    }
    
    // Add to mock data
    mockLookupData[userId].push(lookup);
    
    // Simulate API enrichment
    setTimeout(() => {
      api.processLookup(lookup.id, userId);  // Using api instead of this
    }, 2000);
    
    return lookup;
  },
  
  // Process a lookup (simulating server-side function)
  processLookup: async (lookupId: string, userId: string): Promise<void> => {
    const userLookups = mockLookupData[userId] || [];
    const lookupIndex = userLookups.findIndex(l => l.id === lookupId);
    
    if (lookupIndex === -1) return;
    
    const lookup = userLookups[lookupIndex];
    const input = lookup.input.toLowerCase();
    
    // Extract domain from input
    let domain = '';
    if (input.includes('linkedin.com')) {
      domain = 'company-from-linkedin.com'; // In a real app, would use regex
    } else if (input.includes('.')) {
      domain = input.includes('http') 
        ? new URL(input).hostname 
        : input.trim();
    }
    
    if (!domain) {
      // Failed to get domain
      userLookups[lookupIndex] = {
        ...lookup,
        status: 'failed',
        cost: 0
      };
      return;
    }
    
    // Generate mock data based on domain
    const companyName = domain.split('.')[0].charAt(0).toUpperCase() + domain.split('.')[0].slice(1);
    const mockData = {
      name: companyName,
      domain: domain,
      description: `${companyName} is a leading provider of innovative solutions.`,
      location: 'New York, NY',
      employees: Math.floor(Math.random() * 1000) + 10,
      email: `contact@${domain}`,
      phone: `+1 (${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`
    };
    
    // 10% chance of failure
    if (Math.random() < 0.1) {
      userLookups[lookupIndex] = {
        ...lookup,
        status: 'failed',
        cost: 0
      };
      return;
    }
    
    // Update lookup
    userLookups[lookupIndex] = {
      ...lookup,
      verifiedEmail: mockData.email,
      phone: mockData.phone,
      linkedin: input.includes('linkedin.com') ? input : `https://linkedin.com/company/${mockData.name.toLowerCase()}`,
      clearbitJson: { 
        name: mockData.name,
        domain: mockData.domain,
        description: mockData.description,
        location: mockData.location,
        metrics: { employees: mockData.employees }
      },
      hunterJson: {
        data: {
          domain: mockData.domain,
          disposable: false,
          webmail: false,
          pattern: '{first}',
          organization: mockData.name,
          emails: [
            {
              value: mockData.email,
              type: 'generic',
              confidence: 80,
              sources: []
            }
          ]
        }
      },
      status: 'done',
      cost: 1
    };
  },
  
  // Get lookups for a user
  getLookups: async (userId: string): Promise<Lookup[]> => {
    await new Promise(resolve => setTimeout(resolve, 300)); // Simulate network delay
    return mockLookupData[userId] || [];
  }
};
