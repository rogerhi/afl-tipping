import React from 'react';
import { LadderTeam } from '../types';

interface LadderProps {
  teams: LadderTeam[];
}

export default function Ladder({ teams }: LadderProps) {
  return (
    <div className="max-h-96 overflow-y-auto">
      <table className="w-full text-sm">
        <thead className="bg-black/20 text-gray-400 text-xs sticky top-0">
          <tr>
            <th className="px-3 py-2 text-left">#</th>
            <th className="px-3 py-2 text-left">Team</th>
            <th className="px-3 py-2 text-center">P</th>
            <th className="px-3 py-2 text-center">W</th>
            <th className="px-3 py-2 text-center">%</th>
            <th className="px-3 py-2 text-center">Pts</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {teams.map((team, index) => (
            <tr 
              key={team.position} 
              className={`hover:bg-white/5 transition-colors ${index < 8 ? 'bg-green-500/5' : ''}`}
            >
              <td className="px-3 py-2 text-gray-400">{team.position}</td>
              <td className="px-3 py-2">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: team.color }}
                  />
                  <span className="font-medium text-white truncate">{team.team}</span>
                </div>
              </td>
              <td className="px-3 py-2 text-center text-gray-400">{team.played}</td>
              <td className="px-3 py-2 text-center text-gray-400">{team.won}</td>
              <td className="px-3 py-2 text-center text-gray-400">{team.percentage.toFixed(1)}</td>
              <td className="px-3 py-2 text-center">
                <span className={`font-semibold ${team.points > 0 ? 'text-green-400' : 'text-gray-400'}`}>
                  {team.points}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="p-3 text-xs text-gray-500 border-t border-white/10">
        <span className="text-green-400">•</span> Top 8 (finals positions)
      </div>
    </div>
  );
}
