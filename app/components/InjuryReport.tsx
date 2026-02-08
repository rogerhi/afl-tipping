import React from 'react';
import { Injury } from '../types';

interface InjuryReportProps {
  injuries: Injury[];
}

export default function InjuryReport({ injuries }: InjuryReportProps) {
  const statusColors = {
    'Out': 'bg-red-500/20 text-red-400 border-red-500/30',
    'Doubtful': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    'Test': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    'Available': 'bg-green-500/20 text-green-400 border-green-500/30',
  };

  const importanceIcon = {
    'High': '🔴',
    'Medium': '🟡',
    'Low': '🔵',
  };

  return (
    <div className="p-4">
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {injuries.map((injury) => (
          <div key={injury.id} className="bg-black/20 rounded-lg p-3 border border-white/5">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <span>{importanceIcon[injury.importance]}</span>
                <span className="font-medium text-white">{injury.player}</span>
              </div>
              <span className={`px-2 py-1 rounded text-xs border ${statusColors[injury.status]}`}>
                {injury.status}
              </span>
            </div>
            <div className="text-sm text-gray-400 space-y-1">
              <p>{injury.team}</p>
              <p className="flex justify-between">
                <span>{injury.injury}</span>
                {injury.returnDate && (
                  <span className="text-yellow-400">→ {injury.returnDate}</span>
                )}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-3 border-t border-white/10 text-xs text-gray-500">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">🔴 High impact</span>
          <span className="flex items-center gap-1">🟡 Medium impact</span>
          <span className="flex items-center gap-1">🔵 Low impact</span>
        </div>
      </div>
    </div>
  );
}
