"use client";

import React from 'react';
import { eloRatings, getEloTierColor } from '../data/elo-ratings';

export default function EloLadder() {
  return (
    <div className="bg-gray-800/50 rounded-xl border border-white/10 overflow-hidden">
      <div className="p-4 border-b border-white/10 bg-gradient-to-r from-purple-500/20 to-transparent">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <span>📊</span> ELO Power Rankings
        </h2>
        <p className="text-xs text-gray-400 mt-1">
          Data-driven team strength ratings. 1500 = average.
        </p>
      </div>
      
      <div className="max-h-80 overflow-y-auto">
        <table className="w-full text-sm">
          <thead className="bg-black/20 text-gray-400 text-xs sticky top-0">
            <tr>
              <th className="px-3 py-2 text-left">#</th>
              <th className="px-3 py-2 text-left">Team</th>
              <th className="px-3 py-2 text-center">ELO</th>
              <th className="px-3 py-2 text-center">Wk</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {eloRatings.map((team) => (
              <tr 
                key={team.team} 
                className={`hover:bg-white/5 transition-colors ${
                  team.rank <= 8 ? 'bg-blue-500/5' : ''
                }`}
              >
                <td className="px-3 py-2 text-gray-400">
                  {team.rank}
                </td>
                <td className="px-3 py-2">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-2 h-2 rounded-full" 
                      style={{ backgroundColor: getEloTierColor(team.category) }}
                    />
                    <span className="text-white text-xs truncate">{team.team}</span>
                  </div>
                </td>
                <td className="px-3 py-2 text-center">
                  <span className={`font-bold ${
                    team.rating >= 1600 ? 'text-green-400' :
                    team.rating >= 1550 ? 'text-blue-400' :
                    team.rating >= 1500 ? 'text-yellow-400' :
                    'text-red-400'
                  }`}>
                    {team.rating}
                  </span>
                </td>
                <td className="px-3 py-2 text-center">
                  <span className={`text-xs ${
                    team.change > 0 ? 'text-green-400' :
                    team.change < 0 ? 'text-red-400' :
                    'text-gray-500'
                  }`}>
                    {team.change > 0 ? '+' : ''}{team.change}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="p-3 border-t border-white/10 text-xs text-gray-500">
        <div className="flex flex-wrap gap-3">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#10B981' }} /> 
            Contender (1600+)
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#3B82F6' }} /> 
            Finals (1550-1599)
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#F59E0B' }} /> 
            Mid (1450-1549)
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#EF4444' }} /> 
            Rebuilding (&lt;1450)
          </span>
        </div>
      </div>
    </div>
  );
}
