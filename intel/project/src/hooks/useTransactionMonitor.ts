import { useState, useEffect } from 'react';
import type { Transaction } from '../types';
import { analyzeTransaction } from '../utils/riskAnalysis';
import { generateMockTransaction, mockTransactions } from '../utils/mockData';

export function useTransactionMonitor() {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [isMonitoring, setIsMonitoring] = useState(true);

  useEffect(() => {
    if (!isMonitoring) return;

    const interval = setInterval(async () => {
      const newTransaction = generateMockTransaction();
      const analyzedTransaction = await analyzeTransaction(newTransaction);
      
      setTransactions(prev => [analyzedTransaction, ...prev].slice(0, 100));
    }, 5000); // Generate new transaction every 5 seconds

    return () => clearInterval(interval);
  }, [isMonitoring]);

  return {
    transactions,
    isMonitoring,
    setIsMonitoring,
    clearTransactions: () => setTransactions([])
  };
}