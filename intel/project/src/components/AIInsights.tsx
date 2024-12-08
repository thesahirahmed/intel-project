import React from 'react';
import { Brain, Cpu, Zap } from 'lucide-react';
import type { Transaction } from '../types';

interface AIInsightsProps {
  transaction: Transaction;
}

export function AIInsights({ transaction }: AIInsightsProps) {
  return (
    <div className="mt-4 p-4 bg-blue-50 rounded-lg">
      <div className="flex items-center space-x-2 mb-3">
        <Brain className="w-5 h-5 text-blue-600" />
        <h3 className="text-sm font-medium text-blue-900">Intel® AI Insights</h3>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center space-x-2">
          <Cpu className="w-4 h-4 text-blue-500" />
          <div>
            <p className="text-xs text-blue-700">Hardware Acceleration</p>
            <p className="text-sm font-medium">Intel® Neural Engine</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Zap className="w-4 h-4 text-blue-500" />
          <div>
            <p className="text-xs text-blue-700">Processing Time</p>
            <p className="text-sm font-medium">&lt; 50ms</p>
          </div>
        </div>
      </div>

      <div className="mt-3 text-sm text-blue-700">
        <p>AI-powered risk analysis suggests this transaction is
          <span className={`font-medium ${
            transaction.riskScore > 70 ? 'text-red-600' :
            transaction.riskScore > 40 ? 'text-yellow-600' :
            'text-green-600'
          }`}> {getRiskLabel(transaction.riskScore)}</span>
        </p>
      </div>
    </div>
  );
}

function getRiskLabel(score: number): string {
  if (score > 70) return 'High Risk';
  if (score > 40) return 'Medium Risk';
  return 'Low Risk';
}