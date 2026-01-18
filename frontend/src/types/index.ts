// --- USER & PLAN TYPES ---

export type PlanType = 'SOLO' | 'FAMILY';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  planType: PlanType;
  familyMembers?: string[]; // Optional: only used if plan is FAMILY
  avatarUrl?: string;
}

export interface Budget {
  totalLimit: number;      // e.g., $5000/month
  currentSpend: number;    // e.g., $1200
  currency: string;        // 'USD' or 'NGN'
  lastUpdated: string;     // ISO Date string
}

// --- HEALTH TRACKING TYPES ---

export type ExerciseType = 'CARDIO' | 'WEIGHTS' | 'YOGA' | 'SPORT';

export interface HealthLog {
  id: string;
  date: string;            // '2026-01-17'
  exerciseMinutes: number;
  exerciseType: ExerciseType;
  caloriesConsumed: number; // e.g., 2400
  waterIntakeLiters: number;
  moodRating: 1 | 2 | 3 | 4 | 5; // 1 = Bad, 5 = Great
}

// --- E-COMMERCE & FINANCE TYPES ---

export type ProductCategory = 'MEDICINE' | 'SUPPLEMENT' | 'FOOD' | 'GEAR';

export interface Product {
  id: string;
  name: string;
  price: number;
  category: ProductCategory;
  description: string;
  imageUrl: string;
  inStock: boolean;
}

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  category: 'MARKETPLACE_PURCHASE' | 'EXTERNAL_EXPENSE'; 
  description: string;
  productId?: string; // Optional: Links back to Product if bought in-app
}

// --- ANALYTICS ---

export interface MonthlyReport {
  month: string;           // 'January 2026'
  totalSpent: number;
  healthScore: number;     // Calculated based on consistency
  topCategory: string;     // Where did most money go?
}