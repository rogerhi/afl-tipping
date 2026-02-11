"use client";

import React from 'react';

export default function StrategyGuide() {
  return (
    <div className="bg-gray-800/50 rounded-xl border border-white/10 p-6">
      <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-yellow-400">
        <span>🎯</span> Winning Strategy Guide
      </h3>
      
      <div className="space-y-4 text-sm text-gray-300">
        <div className="bg-black/30 rounded-lg p-4">
          <h4 className="font-bold text-white mb-2">The 80/20 Rule</h4>
          <p>80% of games are easy favourites. <span className="text-yellow-400">20% of games decide competitions</span> — focus your analysis there.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-black/20 rounded-lg p-3">
            <h4 className="font-bold text-green-400 mb-2">✓ Do This</h4>
            <ul className="space-y-1">
              <li>• Pick 2-3 upsets per round</li>
              <li>• Check Thursday 6pm teamsheets</li>
              <li>• Track WA teams at home</li>
              <li>• Ignore form in rivalry games</li>
            </ul>
          </div>
          <div className="bg-black/20 rounded-lg p-3">
            <h4 className="font-bold text-red-400 mb-2">✗ Avoid This</h4>
            <ul className="space-y-1">
              <li>• Tipping your team (emotional)</li>
              <li>• Ignoring 6-day travel breaks</li>
              <li>• Underestimating wet weather</li>
              <li>• Copying the herd</li>
            </ul>
          </div>
        </div>
        
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
          <h4 className="font-bold text-blue-400 mb-2">🔬 Key Stats</h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>West Coast home: <span className="text-green-400">62% win rate</span></div>
            <div>6-day travel: <span className="text-red-400">35% win rate</span></div>
            <div>Friday favs: <span className="text-green-400">68% win</span></div>
            <div>Wet weather: favours defence</div>
          </div>
        </div>
        
        <div className="text-xs text-gray-500">
          Full guide: <span className="text-gray-400">See WINNING_STRATEGIES.md</span>
        </div>
      </div>
    </div>
  );
}
