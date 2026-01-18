// src/data/mockData.ts
import { type UserProfile, type  Budget, type  Transaction, type  MonthlyReport, type  Product } from '../types';

// --- 1. User & Budget Data ---
export const CURRENT_USER: UserProfile = {
  id: 'u1',
  name: 'Ismail Kewa',
  email: 'ismail@carecost.app',
  planType: 'FAMILY',
  familyMembers: ['Ruqayya', 'Dauda'],
  avatarUrl: '/api/placeholder/150/150',
};

export const USER_BUDGET: Budget = {
  totalLimit: 5000, 
  currentSpend: 3240, 
  currency: 'USD',
  lastUpdated: '2026-01-17',
};

export const MONTHLY_STATS: MonthlyReport = {
  month: 'January 2026',
  totalSpent: 3240,
  healthScore: 78,
  topCategory: 'Supplements',
};

// --- 2. Transactions Data ---
export const RECENT_TRANSACTIONS: Transaction[] = [
  {
    id: 't1',
    date: '2026-01-16',
    amount: 120.50,
    category: 'MARKETPLACE_PURCHASE',
    description: 'Whey Protein & Vitamins',
    productId: 'prod_01',
  },
  {
    id: 't2',
    date: '2026-01-14',
    amount: 55.00,
    category: 'EXTERNAL_EXPENSE',
    description: 'Pharmacy Co-pay',
  },
  {
    id: 't3',
    date: '2026-01-10',
    amount: 200.00,
    category: 'MARKETPLACE_PURCHASE',
    description: 'Yoga Mat & Blocks',
  },
  {
    id: 't4',
    date: '2026-01-05',
    amount: 450.00,
    category: 'EXTERNAL_EXPENSE',
    description: 'Quarterly Checkup',
  },
];

// --- 3. Products Data ---
export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Whey Protein Isolate',
    price: 59.99,
    category: 'SUPPLEMENT',
    description: 'High-quality protein for muscle recovery.',
    imageUrl: 'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?auto=format&fit=crop&q=80&w=400',
    inStock: true,
  },
  {
    id: 'p2',
    name: 'Daily Multivitamin',
    price: 24.50,
    category: 'MEDICINE',
    description: 'Complete daily nutrition support.',
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=400',
    inStock: true,
  },
  {
    id: 'p3',
    name: 'Organic Quinoa Bowl',
    price: 12.99,
    category: 'FOOD',
    description: 'Healthy pre-made meal for lunch.',
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=400',
    inStock: true,
  },
  {
    id: 'p4',
    name: 'Yoga Mat Premium',
    price: 45.00,
    category: 'GEAR',
    description: 'Non-slip surface for perfect stability.',
    imageUrl: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&q=80&w=400',
    inStock: true,
  },
  {
    id: 'p5',
    name: 'Omega-3 Fish Oil',
    price: 18.75,
    category: 'SUPPLEMENT',
    description: 'Heart health essential.',
    imageUrl: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&q=80&w=400',
    inStock: true,
  },
  {
    id: 'p6',
    name: 'Resistance Bands',
    price: 15.99,
    category: 'GEAR',
    description: 'Set of 3 bands for home workouts.',
    imageUrl: 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?auto=format&fit=crop&q=80&w=400',
    inStock: true,
  },
];