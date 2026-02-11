"use client";

import React from 'react';
import { Game, Odds } from '../types';

interface CloseGamesAlertProps {
  games: Game[];
  oddsData: Odds[];
}

export default function CloseGamesAlert({ games, oddsData }: CloseGamesAlertProps) {
  if (games.length === 0) {
    return (
      <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl border border-green-500/50 p-4 md:p-6">
        <div className="flex items-center gap-3">
          <span className="text-2xl md:text-3xl">✅</span>
          <div>
            <h2 className="text-lg md:text-xl font-bold text-green-400">No Close Games This Week</h2>
            <p className="text-xs md:text-sm text-gray-300">
              All games have clear favourites. Follow the odds and you&apos;ll likely get 7+ tips right.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-red-500/20 via-yellow-500/20 to-red-500/20 rounded-xl border-2 border-red-500/50 p-4 md:p-6 mb-4 md:mb-6 shadow-lg shadow-red-500/10">
      {/* Mobile-friendly header */}
      <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3 mb-4">
        <span className="text-3xl md:text-4xl animate-pulse">🎯</span>
        <div>
          <h2 className="text-lg md:text-2xl font-bold text-yellow-400 leading-tight">
            THE 20% THAT DECIDES YOUR TIPPING COMP
          </h2>
          <p className="text-xs md:text-sm text-gray-300 mt-1">
            <span className="font-bold text-yellow-400">80/20 Rule:</span> Winners are decided by these <span className="text-red-400 font-bold">{games.length} close game{games.length > 1 ? 's' : ''}</span>.
          </p>
        </div>
      </div>

      {/* Mobile-optimized games list */}
      <div className="bg-black/40 rounded-lg p-3 md:p-4 mb-4">
        <h3 className="text-sm md:text-lg font-bold text-red-400 mb-2 flex items-center gap-2">
          ⚡ MUST-ANALYZE GAMES
        </h3>
        <div className="space-y-2 md:space-y-3">
          {games.map((game) => {
            const odds = oddsData.find(o => o.gameId === game.id);
            const margin = odds ? Math.abs(odds.homeOdds - odds.awayOdds) : 0;
            const isVeryClose = margin < 3;
            
            return (
              <div key={game.id} className={`rounded-lg p-2 md:p-3 border ${isVeryClose ? 'bg-red-500/20 border-red-500/50' : 'bg-yellow-500/10 border-yellow-500/30'}`}>
                {/* Mobile-first layout */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    {isVeryClose && <span className="text-xl md:text-2xl">🔥</span>}
                    <div className="flex flex-wrap items-center gap-1">
                      <span className="font-bold text-white text-sm md:text-base">{game.homeTeam.split(' ')[0]}</span>
                      <span className="text-gray-500 mx-1">vs</span>
                      <span className="font-bold text-white text-sm md:text-base">{game.awayTeam.split(' ')[0]}</span>
                    </div>
                  </div>
                  <div className={`text-xs md:text-sm font-bold ${isVeryClose ? 'text-red-400' : 'text-yellow-400'}`}>
                    {isVeryClose ? '⚠️ TOSS-UP' : 'CLOSE CALL'}
                  </div>
                </div>
                
                {/* Mobile-friendly details */}
                <div className="text-xs text-gray-400 mt-2 flex flex-col sm:flex-row sm:items-center gap-1 sm: gap-4">
                  <span>Margin: {margin.toFixed(1)} pts</span>
                  <span className="hidden sm:inline">•</span>
                  <span>📍 {game.venue.split(' ')[0]}</span>
                  <span className="hidden sm:inline">•</span>
                  <span>📅 {game.date}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile-responsive grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3 text-xs md:text-sm">
        <div className="bg-black/30 rounded-lg p-2 md:p-3 border border-white/10">
          <p className="text-yellow-400 font-bold mb-1">🔍 CHECK NOW:</p>
          <ul className="text-gray-300 space-y-1">
            <li>• Injury reports (Thu 6pm)</li>
            <li>• Weather forecast</li>
            <li>• Recent form (last 3 games)</li>
          </ul>
        </div>
        <div className="bg-black/30 rounded-lg p-2 md:p-3 border border-white/10">
          <p className="text-yellow-400 font-bold mb-1">🎯 KEY FACTORS:</p>
          <ul className="text-gray-300 space-y-1">
            <li>• Home ground advantage</li>
            <li>• Travel & rest days</li>
            <li>• Head-to-head history</li>
          </ul>
        </div>
        <div className="bg-black/30 rounded-lg p-2 md:p-3 border border-white/10 sm:col-span-2 lg:col-span-1">
          <p className="text-red-400 font-bold mb-1">💡 WINNING TIP:</p>
          <p className="text-gray-300 text-xs md:text-xs">
            Picking 1-2 of these right puts you ahead of 80% of tippers who play it safe.
          </p>
        </div>
      </div>
    </div>
  );
}
