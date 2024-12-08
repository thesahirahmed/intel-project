import type { Transaction } from '../types';
import { analyzeTransactionWithAI } from './intelAI';

interface RiskFactor {
  weight: number;
  check: (transaction: Transaction) => number;
}

const riskFactors: RiskFactor[] = [
  {
    weight: 0.3,
    check: (t) => t.amount > 1000 ? 100 : t.amount > 500 ? 50 : 0
  },
  {
    weight: 0.2,
    check: (t) => {
      const hoursSinceLastTransaction = 0;
      return hoursSinceLastTransaction < 1 ? 100 : 0;
    }
  },
  {
    weight: 0.5,
    check: (t) => {
      const suspiciousCountries = ['Russia', 'Nigeria', 'North Korea'];
      return suspiciousCountries.includes(t.location.country) ? 100 : 0;
    }
  }
];

export async function analyzeTransaction(transaction: Transaction): Promise<Transaction> {
  // Combine traditional risk analysis with AI insights
  const traditionalRiskScore = calculateTraditionalRiskScore(transaction);
  const aiRiskScore = await analyzeTransactionWithAI(transaction);
  
  // Weight the scores (70% AI, 30% traditional)
  const finalRiskScore = Math.round(aiRiskScore * 0.7 + traditionalRiskScore * 0.3);
  
  return {
    ...transaction,
    riskScore: finalRiskScore,
    status: determineTransactionStatus(finalRiskScore)
  };
}

function calculateTraditionalRiskScore(transaction: Transaction): number {
  const weightedScores = riskFactors.map(factor => 
    factor.weight * factor.check(transaction)
  );
  
  return Math.min(100, Math.round(
    weightedScores.reduce((sum, score) => sum + score, 0)
  ));
}

function determineTransactionStatus(riskScore: number): Transaction['status'] {
  if (riskScore >= 80) return 'rejected';
  if (riskScore >= 60) return 'flagged';
  if (riskScore >= 40) return 'pending';
  return 'approved';
}