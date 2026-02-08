import React from 'react';
import { Game, Odds } from '../types';

interface GameCardProps {
  game: Game;
  odds?: Odds;
}

export default function GameCard({ game, odds }: GameCardProps) {
  const isCloseGame = odds ? Math.abs(odds.homeOdds - odds.awayOdds) < 6 : false;
  const favorite = odds ? (odds.homeOdds < odds.awayOdds ? game.homeTeam : game.awayTeam) : null;
  const margin = odds ? Math.abs(odds.homeOdds - odds.awayOdds) : 0;

  return (
    <div className={`bg-gray-800/50 rounded-xl border ${isCloseGame ? 'border-yellow-500/50 shadow-lg shadow-yellow-500/10' : 'border-white/10'} overflow-hidden hover:border-white/20 transition-colors`}>
      <div className="p-4">
        {/* Header with date/time */}
        <div className="flex justify-between items-center mb-3 text-xs text-gray-400">
          <span>{game.date} • {game.time}</span>
          <span className="text-gray-500">{game.venue}</span>
        </div>

        {/* Teams */}
        <div className="flex items-center justify-between">
          {/* Home Team */}
          <div className="flex-1 flex items-center gap-3">
            <div 
              className="w-4 h-4 rounded-full" 
              style={{ backgroundColor: game.homeTeamColor }}
            />
            <div className="text-left">
              <p className={`font-semibold ${favorite === game.homeTeam ? 'text-green-400' : 'text-white'}`}>
                {game.homeTeam}
              </p>
              {odds && (
                <p className="text-sm text-gray-400">
                  {odds.homeOdds} ({odds.homeLine > 0 ? '+' : ''}{odds.homeLine})
                </p>
              )}
            </div>
          </div>

          {/* VS */}
          <div className="px-4 text-gray-500 font-medium text-sm">VS</div>

          {/* Away Team */}
          <div className="flex-1 flex items-center gap-3 justify-end">
            <div className="text-right">
              <p className={`font-semibold ${favorite === game.awayTeam ? 'text-green-400' : 'text-white'}`}>
                {game.awayTeam}
              </p>
              {odds && (
                <p className="text-sm text-gray-400">
                  {odds.awayOdds} ({odds.awayLine > 0 ? '+' : ''}{odds.awayLine})
                </p>
              )}
            </div>
            <div 
              className="w-4 h-4 rounded-full" 
              style={{ backgroundColor: game.awayTeamColor }}
            />
          </div>
        </div>

        {/* Close game indicator */}
        {isCloseGame && (
          <div className="mt-3 pt-3 border-t border-white/10">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-yellow-400">⚠️</span>
              <span className="text-yellow-400 font-medium">Close Game</span>
              <span className="text-gray-400">• Margin: {margin.toFixed(1)} pts • Analysis needed</span>
            </div>
          </div>
        )}

        {/* Bookie source */}
        {odds && (
          <div className="mt-2 flex justify-end">
            <span className="text-xs text-gray-500">{odds.bookie}</span>
          </div>
        )}
      </div>
    </div>
  );
}
