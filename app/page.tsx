import React from 'react';
import GameCard from './components/GameCard';
import InjuryReport from './components/InjuryReport';
import Ladder from './components/Ladder';
import OddsComparison from './components/OddsComparison';
import CloseGamesAlert from './components/CloseGamesAlert';
import TippingHistory from './components/TippingHistory';
import RoundLessons from './components/RoundLessons';
import StrategyGuide from './components/StrategyGuide';
import EloRatings from './components/EloRatings';
import { currentRound, injuries, ladder, oddsData } from './data/round-data';
import { tippingHistory, tippingStats, roundAnalyses } from './data/tips-data';

export default function Home() {
  // Find TOP 2 closest games (show only the 2 tightest matchups)
  const closeGames = currentRound
    .map(game => {
      const gameOdds = oddsData.find(o => o.gameId === game.id);
      const margin = gameOdds ? Math.abs(gameOdds.homeOdds - gameOdds.awayOdds) : 999;
      return { game, margin };
    })
    .sort((a, b) => a.margin - b.margin) // Sort by closeness
    .slice(0, 2) // Take only top 2
    .filter(item => item.margin < 8) // Only show if margin is reasonably close
    .map(item => item.game);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <header className="bg-black/50 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-2xl">
                🏉
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                  AFL Footy Tipping
                </h1>
                <p className="text-xs text-gray-400">Round 1, 2026 Season</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <span className="text-gray-400">Last updated: {new Date().toLocaleDateString('en-AU')}</span>
              <button className="px-4 py-2 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 border border-yellow-500/30 rounded-lg transition-colors">
                Refresh Data
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Close Games Alert */}
        <CloseGamesAlert games={closeGames} oddsData={oddsData} />

        {/* Main Grid - Mobile responsive */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8 mt-6 md:mt-8">
          {/* This Week's Games - Full width on mobile */}
          <div className="lg:col-span-2 space-y-4 md:space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
                <span className="text-xl sm:text-2xl">📅</span>
                This Week's Games
              </h2>
              <span className="text-xs sm:text-sm text-gray-400">{currentRound.length} matches</span>
            </div>
            
            <div className="grid gap-4">
              {currentRound.map((game) => (
                <GameCard 
                  key={game.id} 
                  game={game} 
                  odds={oddsData.find(o => o.gameId === game.id)}
                />
              ))}
            </div>

            {/* Odds Comparison */}
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-2xl">💰</span>
                Bookies Odds Comparison
              </h2>
              <OddsComparison games={currentRound} oddsData={oddsData} />
            </div>

            {/* Tipping History */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <span className="text-2xl">📈</span>
                Tipping History & Performance
              </h2>
              <TippingHistory tips={tippingHistory} stats={tippingStats} />
            </div>

            {/* Round Analysis */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <span className="text-2xl">🎓</span>
                Lessons & Mistake Analysis
              </h2>
              <RoundLessons analyses={roundAnalyses} />
            </div>
          </div>

          {/* Sidebar - Ladder & Injuries */}
          <div className="space-y-6">
            {/* ELO Ratings */}
            <EloRatings />

            {/* Ladder */}
            <div className="bg-gray-800/50 rounded-xl border border-white/10 overflow-hidden">
              <div className="p-4 border-b border-white/10 bg-gradient-to-r from-blue-500/20 to-transparent">
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <span>🏆</span> AFL Ladder
                </h2>
              </div>
              <Ladder teams={ladder} />
            </div>

            {/* Injury Report */}
            <div className="bg-gray-800/50 rounded-xl border border-white/10 overflow-hidden">
              <div className="p-4 border-b border-white/10 bg-gradient-to-r from-red-500/20 to-transparent">
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <span>🚑</span> Injury Report
                </h2>
              </div>
              <InjuryReport injuries={injuries} />
            </div>

            {/* Strategy Guide */}
            <StrategyGuide />

            {/* Quick Tips */}
            <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-xl border border-yellow-500/20 p-6">
              <h3 className="text-lg font-bold mb-3 text-yellow-400">💡 Tipping Strategy</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400">•</span>
                  Default to favourites for clear-cut games (margin &gt;15 pts)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400">•</span>
                  Focus analysis on close games (margin &lt;6 pts)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400">•</span>
                  Check Thursday 6pm teamsheets for late changes
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400">•</span>
                  Weather favours defensive teams
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
