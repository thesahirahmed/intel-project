import type { Transaction } from '../types';

const merchants = [
  'Electronics Store', 'Restaurant', 'Online Shop', 'Travel Agency',
  'Grocery Store', 'Gas Station', 'Unknown Vendor', 'Department Store'
];

const categories = [
  'Electronics', 'Dining', 'Shopping', 'Travel',
  'Groceries', 'Automotive', 'Other', 'Retail'
];

const locations = [
  { city: 'New York', country: 'USA', latitude: 40.7128, longitude: -74.0060 },
  { city: 'London', country: 'UK', latitude: 51.5074, longitude: -0.1278 },
  { city: 'Tokyo', country: 'Japan', latitude: 35.6762, longitude: 139.6503 },
  { city: 'Moscow', country: 'Russia', latitude: 55.7558, longitude: 37.6173 },
  { city: 'Lagos', country: 'Nigeria', latitude: 6.5244, longitude: 3.3792 }
];

export function generateMockTransaction(): Transaction {
  const merchant = merchants[Math.floor(Math.random() * merchants.length)];
  const category = categories[Math.floor(Math.random() * categories.length)];
  const location = locations[Math.floor(Math.random() * locations.length)];
  const amount = Math.round(Math.random() * 2000 * 100) / 100;

  return {
    id: Math.random().toString(36).substr(2, 9),
    amount,
    timestamp: new Date(),
    merchant,
    category,
    location,
    status: 'pending',
    riskScore: 0
  };
}

// Initial mock data for testing
export const mockTransactions: Transaction[] = [
  {
    id: '1',
    amount: 299.99,
    timestamp: new Date('2024-03-10T14:30:00'),
    merchant: 'Electronics Store',
    category: 'Electronics',
    status: 'approved',
    riskScore: 20,
    location: locations[0]
  },
  {
    id: '2',
    amount: 1500.00,
    timestamp: new Date('2024-03-10T15:15:00'),
    merchant: 'Unknown Vendor',
    category: 'Other',
    status: 'flagged',
    riskScore: 85,
    location: locations[1]
  },
  {
    id: '3',
    amount: 75.50,
    timestamp: new Date('2024-03-10T16:00:00'),
    merchant: 'Restaurant',
    category: 'Dining',
    status: 'pending',
    riskScore: 35,
    location: locations[0]
  },
  {
    id: '4',
    amount: 2000.00,
    timestamp: new Date('2024-03-10T16:30:00'),
    merchant: 'Suspicious Transfer',
    category: 'Transfer',
    status: 'rejected',
    riskScore: 95,
    location: locations[3]
  }
].map(t => ({ ...t, timestamp: new Date(t.timestamp) }));