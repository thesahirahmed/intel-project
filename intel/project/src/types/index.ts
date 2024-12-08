export interface Transaction {
  id: string;
  amount: number;
  timestamp: Date;
  merchant: string;
  category: string;
  status: 'approved' | 'pending' | 'flagged' | 'rejected';
  riskScore: number;
  location: {
    latitude: number;
    longitude: number;
    city: string;
    country: string;
  };
}

export interface AlertConfig {
  threshold: number;
  enabled: boolean;
}