import React from 'react';
import { Game, Odds } from '../types';

interface CloseGamesAlertProps {
  games: Game[];
  oddsData: Odds[];
}

export default function CloseGamesAlert({ games, oddsData }: CloseGamesAlertProps) {
  if (games.length === 0) return null;

  return (
    <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-xl border border-yellow-500/50 p-6 mb-6">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-3xl">🎯</span>
        <div>
          <h2 className="text-xl font-bold text-yellow-400">Close Games Alert</h2>
          <p className="text-sm text-gray-300">
            {games.length} game{games.length > 1 ? 's' : ''} with tight odds (&lt;6 point margin) — Deep analysis recommended
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {games.map((game) => {
          const odds = oddsData.find(o => o.gameId === game.id);
          const margin = odds ? Math.abs(odds.homeOdds - odds.awayOdds) : 0;
          
          return (
            <div key={game.id} className="bg-black/30 rounded-lg p-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-yellow-400 font-bold">⚡</span>
                <span className="font-medium">{game.homeTeam}</span>
                <span className="text-gray-500">vs</span>
                <span className="font-medium">{game.awayTeam}</span>
              </div>
              <div className="text-sm text-gray-400">
                Margin: {margin.toFixed(1)} pts • {game.date}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-4 border-t border-yellow-500/30 text-sm text-gray-300">
        <p className="flex items-start gap-2">
          <span>💡</span>
          <span>
            <strong>Strategy:</strong> For these close games, check Thursday 6pm teamsheets for late injuries, 
            review weather forecasts, and consider recent form before tipping.
          </span>
        </p>
      </div>
    </div>
  );
}
