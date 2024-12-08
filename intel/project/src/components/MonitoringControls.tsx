import React from 'react';
import { Play, Pause, RefreshCw } from 'lucide-react';

interface MonitoringControlsProps {
  isMonitoring: boolean;
  onToggleMonitoring: () => void;
  onClearTransactions: () => void;
}

export function MonitoringControls({
  isMonitoring,
  onToggleMonitoring,
  onClearTransactions
}: MonitoringControlsProps) {
  return (
    <div className="flex items-center space-x-4">
      <button
        onClick={onToggleMonitoring}
        className={`flex items-center px-4 py-2 rounded-md ${
          isMonitoring
            ? 'bg-red-100 text-red-700 hover:bg-red-200'
            : 'bg-green-100 text-green-700 hover:bg-green-200'
        }`}
      >
        {isMonitoring ? (
          <>
            <Pause className="w-4 h-4 mr-2" />
            Pause Monitoring
          </>
        ) : (
          <>
            <Play className="w-4 h-4 mr-2" />
            Resume Monitoring
          </>
        )}
      </button>
      <button
        onClick={onClearTransactions}
        className="flex items-center px-4 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200"
      >
        <RefreshCw className="w-4 h-4 mr-2" />
        Clear History
      </button>
    </div>
  );
}