"use client";

import React, { useState } from 'react';
import { Tip, TippingStats } from '../types/tips';

interface TippingHistoryProps {
  tips: Tip[];
  stats: TippingStats;
}

export default function TippingHistory({ tips, stats }: TippingHistoryProps) {
  const [selectedTip, setSelectedTip] = useState<Tip | null>(null);
  const [filter, setFilter] = useState<'All' | 'Win' | 'Loss' | 'Pending'>('All');

  const filteredTips = filter === 'All' 
    ? tips 
    : tips.filter(t => t.result === filter);

  const getResultColor = (result: string) => {
    switch (result) {
      case 'Win': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Loss': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    }
  };

  const getConfidenceIcon = (confidence: string) => {
    switch (confidence) {
      case 'High': return '🔴';
      case 'Medium': return '🟡';
      default: return '🔵';
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gray-800/50 rounded-xl p-4 border border-white/10">
          <p className="text-2xl font-bold text-white">{stats.totalTips}</p>
          <p className="text-xs text-gray-400">Total Tips</p>
        </div>
        <div className="bg-gray-800/50 rounded-xl p-4 border border-white/10">
          <p className="text-2xl font-bold text-green-400">{stats.wins}</p>
          <p className="text-xs text-gray-400">Wins ({stats.winRate}%)</p>
        </div>
        <div className="bg-gray-800/50 rounded-xl p-4 border border-white/10">
          <p className="text-2xl font-bold text-red-400">{stats.losses}</p>
          <p className="text-xs text-gray-400">Losses</p>
        </div>
        <div className={`rounded-xl p-4 border ${stats.profit >= 0 ? 'bg-green-500/10 border-green-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
          <p className={`text-2xl font-bold ${stats.profit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {stats.profit >= 0 ? '+' : ''}${stats.profit}
          </p>
          <p className="text-xs text-gray-400">Profit ($10 bets)</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        {(['All', 'Win', 'Loss', 'Pending'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === f 
                ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' 
                : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Tips List */}
      <div className="space-y-3">
        {filteredTips.map((tip) => (
          <div
            key={tip.id}
            onClick={() => setSelectedTip(selectedTip?.id === tip.id ? null : tip)}
            className="bg-gray-800/50 rounded-xl border border-white/10 p-4 cursor-pointer hover:border-white/20 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-lg">{getConfidenceIcon(tip.confidence)}</span>
                <div>
                  <p className="font-medium text-white">
                    {tip.homeTeam} vs {tip.awayTeam}
                  </p>
                  <p className="text-sm text-gray-400">
                    Tipped: <span className={tip.tippedTeam === tip.homeTeam ? 'text-blue-400' : 'text-purple-400'}>{tip.tippedTeam}</span>
                    {' '}@ {tip.odds}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded text-sm border ${getResultColor(tip.result)}`}>
                  {tip.result}
                </span>
                {tip.result !== 'Pending' && (
                  <span className="text-sm text-gray-400">
                    {tip.result === 'Win' ? '+' : ''}{tip.margin} pts
                  </span>
                )}
              </div>
            </div>

            {/* Expanded Detail */}
            {selectedTip?.id === tip.id && (
              <div className="mt-4 pt-4 border-t border-white/10 space-y-3">
                {/* Analysis */}
                <div>
                  <p className="text-sm text-gray-400 mb-1">📝 Analysis</p>
                  <p className="text-sm text-white">{tip.analysis}</p>
                </div>

                {/* Factors */}
                <div>
                  <p className="text-sm text-gray-400 mb-2">📊 Key Factors</p>
                  <div className="space-y-1">
                    {tip.factors.map((factor, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <span className={
                          factor.impact === 'Positive' ? 'text-green-400' :
                          factor.impact === 'Negative' ? 'text-red-400' : 'text-gray-400'
                        }>
                          {factor.impact === 'Positive' ? '↑' : factor.impact === 'Negative' ? '↓' : '→'}
                        </span>
                        <span className="text-white">{factor.name}</span>
                        <span className="text-gray-500">({factor.weight}/10)</span>
                        <span className="text-gray-400 text-xs">— {factor.description}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Lesson (for losses) */}
                {tip.lesson && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                    <p className="text-sm text-red-400 mb-1">❌ Lesson Learned</p>
                    <p className="text-sm text-white">{tip.lesson}</p>
                  </div>
                )}

                {/* Comparison */}
                {tip.result !== 'Pending' && (
                  <div className="bg-black/20 rounded-lg p-3">
                    <p className="text-sm text-gray-400 mb-1">📈 Prediction vs Reality</p>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Predicted margin: ±{tip.predictedMargin} pts</span>
                      <span className={tip.result === 'Win' ? 'text-green-400' : 'text-red-400'}>
                        Actual: {tip.result === 'Win' ? '+' : ''}{tip.margin} pts
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredTips.length === 0 && (
        <div className="text-center py-8 text-gray-400">
          No {filter.toLowerCase()} tips found
        </div>
      )}
    </div>
  );
}
