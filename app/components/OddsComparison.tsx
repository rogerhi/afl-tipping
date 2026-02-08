"use client";

import React, { useState } from 'react';
import { Game, Odds } from '../types';

interface OddsComparisonProps {
  games: Game[];
  oddsData: Odds[];
}

export default function OddsComparison({ games, oddsData }: OddsComparisonProps) {
  const [viewMode, setViewMode] = useState<'all' | 'close' | 'easy'>('all');

  const filteredGames = games.filter((game) => {
    const odds = oddsData.find((o) => o.gameId === game.id);
    if (!odds) return false;
    const margin = Math.abs(odds.homeOdds - odds.awayOdds);
    
    if (viewMode === 'close') return margin < 6;
    if (viewMode === 'easy') return margin > 15;
    return true;
  });

  const getGameCategory = (margin: number) => {
    if (margin < 6) return { label: 'Close Game', color: 'border-yellow-500/50 bg-yellow-500/5', icon: '⚡' };
    if (margin > 15) return { label: 'Safe Bet', color: 'border-green-500/50 bg-green-500/5', icon: '✓' };
    return { label: 'Medium', color: 'border-gray-500/30 bg-gray-500/5', icon: '•' };
  };

  const getConfidenceBadge = (confidence: string) => {
    switch (confidence) {
      case 'High': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default: return 'bg-red-500/20 text-red-400 border-red-500/30';
    }
  };

  return (
    <div className="space-y-4">
      {/* Filter Tabs */}
      <div className="flex gap-2 flex-wrap">
        {[
          { key: 'all', label: 'All Games', count: games.length },
          { key: 'close', label: 'Close Games', count: games.filter(g => {
            const o = oddsData.find(od => od.gameId === g.id);
            return o && Math.abs(o.homeOdds - o.awayOdds) < 6;
          }).length },
          { key: 'easy', label: 'Safe Bets', count: games.filter(g => {
            const o = oddsData.find(od => od.gameId === g.id);
            return o && Math.abs(o.homeOdds - o.awayOdds) > 15;
          }).length },
        ].map((filter) => (
          <button
            key={filter.key}
            onClick={() => setViewMode(filter.key as 'all' | 'close' | 'easy')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors border ${
              viewMode === filter.key
                ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                : 'bg-gray-800/50 text-gray-400 border-white/10 hover:bg-gray-700/50'
            }`}
          >
            {filter.label} ({filter.count})
          </button>
        ))}
      </div>

      {/* Odds Cards */}
      <div className="grid gap-3">
        {filteredGames.map((game) => {
          const odds = oddsData.find((o) => o.gameId === game.id);
          if (!odds) return null;

          const margin = Math.abs(odds.homeOdds - odds.awayOdds);
          const isHomeFavourite = odds.homeOdds < odds.awayOdds;
          const category = getGameCategory(margin);
          const favourite = isHomeFavourite ? game.homeTeam : game.awayTeam;
          const favOdds = isHomeFavourite ? odds.homeOdds : odds.awayOdds;

          return (
            <div
              key={game.id}
              className={`rounded-xl border p-4 transition-all hover:border-white/30 ${category.color}`}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{category.icon}</span>
                  <span className={`text-xs font-semibold px-2 py-1 rounded border ${category.color.replace('bg-', 'bg-opacity-20 ')}`}>
                    {category.label}
                  </span>
                </div>
                <div className="text-xs text-gray-500">
                  {game.venue} • {game.date.split(',')[0]}
                </div>
              </div>

              {/* Teams & Odds */}
              <div className="flex items-center justify-between gap-4">
                {/* Home Team */}
                <div className={`flex-1 text-center p-3 rounded-lg ${isHomeFavourite ? 'bg-green-500/10 border border-green-500/20' : 'bg-gray-700/30'}`}>
                  <div className="w-3 h-3 rounded-full mx-auto mb-2" style={{ backgroundColor: game.homeTeamColor }} />
                  <p className={`font-semibold ${isHomeFavourite ? 'text-green-400' : 'text-white'}`}>
                    {game.homeTeam.split(' ').pop()}
                  </p>
                  <p className="text-2xl font-bold mt-1">{odds.homeOdds.toFixed(2)}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {odds.homeLine > 0 ? '+' : ''}{odds.homeLine}
                  </p>
                  {isHomeFavourite && <p className="text-xs text-green-400 mt-1">★ Favourite</p>}
                </div>

                {/* VS */}
                <div className="text-center">
                  <p className="text-gray-500 font-medium">VS</p>
                  <p className="text-xs text-gray-500 mt-1">Margin</p>
                  <p className={`font-semibold ${margin < 6 ? 'text-yellow-400' : margin > 15 ? 'text-green-400' : 'text-gray-400'}`}>
                    {margin.toFixed(1)} pts
                  </p>
                </div>

                {/* Away Team */}
                <div className={`flex-1 text-center p-3 rounded-lg ${!isHomeFavourite ? 'bg-green-500/10 border border-green-500/20' : 'bg-gray-700/30'}`}>
                  <div className="w-3 h-3 rounded-full mx-auto mb-2" style={{ backgroundColor: game.awayTeamColor }} />
                  <p className={`font-semibold ${!isHomeFavourite ? 'text-green-400' : 'text-white'}`}>
                    {game.awayTeam.split(' ').pop()}
                  </p>
                  <p className="text-2xl font-bold mt-1">{odds.awayOdds.toFixed(2)}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {odds.awayLine > 0 ? '+' : ''}{odds.awayLine}
                  </p>
                  {!isHomeFavourite && <p className="text-xs text-green-400 mt-1">★ Favourite</p>}
                </div>
              </div>

              {/* Bottom Info */}
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded text-xs border ${getConfidenceBadge(odds.confidence)}`}>
                    {odds.confidence} Confidence
                  </span>
                  <span className="text-xs text-gray-500">{odds.bookie}</span>
                </div>
                <p className="text-xs text-gray-400">
                  Tip: <span className="text-green-400 font-medium">{favourite.split(' ').pop()}</span> @ {favOdds.toFixed(2)}
                </p>
              </div>

              {/* Close Game Warning */}
              {margin < 6 && (
                <div className="mt-3 p-2 bg-yellow-500/10 border border-yellow-500/20 rounded-lg text-xs text-yellow-400 text-center">
                  ⚠️ Close odds — check injuries and weather before tipping
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filteredGames.length === 0 && (
        <div className="text-center py-8 text-gray-400">
          No games match this filter
        </div>
      )}
    </div>
  );
}
