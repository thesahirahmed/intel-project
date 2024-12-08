import React from 'react';
import { Shield, AlertTriangle, Activity } from 'lucide-react';
import { TransactionList } from './TransactionList';
import { MonitoringControls } from './MonitoringControls';
import { IntelHeader } from './IntelHeader';
import { useTransactionMonitor } from '../hooks/useTransactionMonitor';

export function Dashboard() {
  const {
    transactions,
    isMonitoring,
    setIsMonitoring,
    clearTransactions
  } = useTransactionMonitor();

  const flaggedCount = transactions.filter(t => t.status === 'flagged').length;
  const rejectedCount = transactions.filter(t => t.status === 'rejected').length;

  return (
    <div className="min-h-screen bg-gray-100">
      <IntelHeader />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Fraud Detection Dashboard</h1>
            <p className="mt-1 text-sm text-gray-500">Powered by Intel® AI Technologies</p>
          </div>
          <Shield className="w-10 h-10 text-blue-600" />
        </div>

        <div className="mb-6">
          <MonitoringControls
            isMonitoring={isMonitoring}
            onToggleMonitoring={() => setIsMonitoring(!isMonitoring)}
            onClearTransactions={clearTransactions}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Activity className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Monitoring Status
                    </dt>
                    <dd className="flex items-baseline">
                      <div className={`text-2xl font-semibold ${
                        isMonitoring ? 'text-green-600' : 'text-gray-900'
                      }`}>
                        {isMonitoring ? 'Active' : 'Paused'}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <AlertTriangle className="h-6 w-6 text-yellow-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Suspicious Activity
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {flaggedCount + rejectedCount}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Shield className="h-6 w-6 text-green-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Total Transactions
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {transactions.length}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Transactions</h2>
          <TransactionList transactions={transactions} />
        </div>
      </div>
    </div>
  );
}