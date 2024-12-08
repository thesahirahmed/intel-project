import React from 'react';
import { AlertCircle, CheckCircle, Clock, XCircle } from 'lucide-react';
import type { Transaction } from '../types';
import { AIInsights } from './AIInsights';

interface TransactionListProps {
  transactions: Transaction[];
}

const statusIcons = {
  approved: <CheckCircle className="w-5 h-5 text-green-500" />,
  pending: <Clock className="w-5 h-5 text-yellow-500" />,
  flagged: <AlertCircle className="w-5 h-5 text-orange-500" />,
  rejected: <XCircle className="w-5 h-5 text-red-500" />
};

export function TransactionList({ transactions }: TransactionListProps) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="divide-y divide-gray-200">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="p-4 hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {statusIcons[transaction.status]}
                <div>
                  <p className="text-sm font-medium text-gray-900">{transaction.merchant}</p>
                  <p className="text-sm text-gray-500">{transaction.category}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  ${transaction.amount.toFixed(2)}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(transaction.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
            <div className="mt-2">
              <div className="flex items-center">
                <div className="text-sm text-gray-500">
                  Risk Score: 
                  <span className={`ml-1 font-medium ${
                    transaction.riskScore > 70 ? 'text-red-600' :
                    transaction.riskScore > 40 ? 'text-yellow-600' :
                    'text-green-600'
                  }`}>
                    {transaction.riskScore}%
                  </span>
                </div>
                <span className="mx-2">•</span>
                <div className="text-sm text-gray-500">
                  {transaction.location.city}, {transaction.location.country}
                </div>
              </div>
            </div>
            <AIInsights transaction={transaction} />
          </div>
        ))}
      </div>
    </div>
  );
}