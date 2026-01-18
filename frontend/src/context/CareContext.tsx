/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { type UserProfile, type Budget, type Transaction, type MonthlyReport } from '../types';
import { 
  CURRENT_USER, 
  USER_BUDGET, 
  RECENT_TRANSACTIONS, 
  MONTHLY_STATS 
} from '../data/mockData';

// 1. Define the Shape of our Context (What data/functions are available?)
interface CareContextType {
  user: UserProfile;
  budget: Budget;
  transactions: Transaction[];
  stats: MonthlyReport;
  // Actions (The "Backend" functions)
  addTransaction: (tx: Transaction) => void;
  updateBudgetLimit: (amount: number, type: 'SOLO' | 'FAMILY') => void;
  updateHealthScore: (points: number) => void;
}

// 2. Create the Context
const CareContext = createContext<CareContextType | undefined>(undefined);

// 3. Create the Provider Component
export const CareProvider = ({ children }: { children: ReactNode }) => {
  // Initialize State: Try to get from LocalStorage, otherwise use Mock Data
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('care_user');
    return saved ? JSON.parse(saved) : CURRENT_USER;
  });

  const [budget, setBudget] = useState<Budget>(() => {
    const saved = localStorage.getItem('care_budget');
    return saved ? JSON.parse(saved) : USER_BUDGET;
  });

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('care_transactions');
    return saved ? JSON.parse(saved) : RECENT_TRANSACTIONS;
  });

  const [stats, setStats] = useState<MonthlyReport>(() => {
    const saved = localStorage.getItem('care_stats');
    return saved ? JSON.parse(saved) : MONTHLY_STATS;
  });

  // 4. The "Auto-Save" Effect (Sync to LocalStorage whenever state changes)
  useEffect(() => {
    localStorage.setItem('care_user', JSON.stringify(user));
    localStorage.setItem('care_budget', JSON.stringify(budget));
    localStorage.setItem('care_transactions', JSON.stringify(transactions));
    localStorage.setItem('care_stats', JSON.stringify(stats));
  }, [user, budget, transactions, stats]);

  // --- ACTIONS ---

  const addTransaction = (tx: Transaction) => {
    setTransactions(prev => [tx, ...prev]); // Add new tx to top of list
    
    // Update Budget Spent automatically
    setBudget(prev => ({
      ...prev,
      currentSpend: prev.currentSpend + tx.amount,
      lastUpdated: new Date().toISOString().split('T')[0]
    }));
  };

  const updateBudgetLimit = (amount: number, type: 'SOLO' | 'FAMILY') => {
    setBudget(prev => ({ ...prev, totalLimit: amount }));
    setUser(prev => ({ ...prev, planType: type }));
  };

  const updateHealthScore = (points: number) => {
    setStats(prev => ({ ...prev, healthScore: points }));
  };

  return (
    <CareContext.Provider value={{ 
      user, 
      budget, 
      transactions, 
      stats, 
      addTransaction, 
      updateBudgetLimit,
      updateHealthScore
    }}>
      {children}
    </CareContext.Provider>
  );
};

// 5. Custom Hook for easy access
export const useCareContext = () => {
  const context = useContext(CareContext);
  if (context === undefined) {
    throw new Error('useCareContext must be used within a CareProvider');
  }
  return context;
};