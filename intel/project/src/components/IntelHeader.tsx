import React from 'react';

export function IntelHeader() {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-2 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/7/7d/Intel_logo_%282006-2020%29.svg"
            alt="Intel Logo"
            className="h-8 w-auto"
          />
          <span className="font-semibold">AI-Powered Fraud Detection</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm">Powered by Intel® AI Technologies</span>
          <div className="flex items-center space-x-1">
            <span className="px-2 py-1 bg-blue-700 rounded text-xs">CPU</span>
            <span className="px-2 py-1 bg-blue-700 rounded text-xs">GPU</span>
            <span className="px-2 py-1 bg-blue-700 rounded text-xs">NPU</span>
          </div>
        </div>
      </div>
    </div>
  );
}