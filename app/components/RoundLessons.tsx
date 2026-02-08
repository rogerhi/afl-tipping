import React from 'react';
import { RoundAnalysis } from '../types/tips';

interface RoundAnalysisProps {
  analyses: RoundAnalysis[];
}

export default function RoundLessons({ analyses }: RoundAnalysisProps) {
  if (analyses.length === 0) return null;

  return (
    <div className="space-y-6">
      {analyses.map((analysis) => (
        <div key={analysis.round} className="bg-gray-800/50 rounded-xl border border-white/10 overflow-hidden">
          <div className="p-4 border-b border-white/10 bg-gradient-to-r from-purple-500/20 to-transparent">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <span>📊</span> Round {analysis.round} Analysis
              </h3>
              <div className="flex items-center gap-4 text-sm">
                <span className="text-green-400">✓ {analysis.correctTips}</span>
                <span className="text-red-400">✗ {analysis.incorrectTips}</span>
                <span className="text-gray-400">
                  {Math.round((analysis.correctTips / (analysis.correctTips + analysis.incorrectTips)) * 100)}% accuracy
                </span>
              </div>
            </div>
          </div>

          <div className="p-4 space-y-4">
            {/* Key Mistakes */}
            {analysis.keyMistakes.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-red-400 mb-3 flex items-center gap-2">
                  <span>❌</span> Key Mistakes & Analysis
                </h4>
                <div className="space-y-3">
                  {analysis.keyMistakes.map((mistake, idx) => (
                    <div key={idx} className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-medium text-white">{mistake.game}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm mb-2">
                        <div>
                          <span className="text-gray-500">Tipped:</span>
                          <span className="text-red-400 ml-2">{mistake.tipped}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Actual:</span>
                          <span className="text-green-400 ml-2">{mistake.actual}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-300">
                        <span className="text-yellow-400">Why it went wrong:</span> {mistake.reason}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Lessons Learned */}
            {analysis.lessons.length > 0 && (
              <div className="pt-4 border-t border-white/10">
                <h4 className="text-sm font-semibold text-yellow-400 mb-3 flex items-center gap-2">
                  <span>💡</span> Lessons for Future Rounds
                </h4>
                <ul className="space-y-2">
                  {analysis.lessons.map((lesson, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-300">
                      <span className="text-yellow-400">→</span>
                      {lesson}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Pattern Analysis */}
            <div className="pt-4 border-t border-white/10">
              <h4 className="text-sm font-semibold text-blue-400 mb-3 flex items-center gap-2">
                <span>🔍</span> Pattern Detection
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div className="bg-black/20 rounded-lg p-3">
                  <p className="text-gray-400 mb-1">What worked:</p>
                  <ul className="space-y-1 text-gray-300">
                    {analysis.correctTips > 0 ? (
                      <li>✓ Following injury reports</li>
                    ) : (
                      <li className="text-gray-500">No clear patterns yet</li>
                    )}
                  </ul>
                </div>
                <div className="bg-black/20 rounded-lg p-3">
                  <p className="text-gray-400 mb-1">What to avoid:</p>
                  <ul className="space-y-1 text-gray-300">
                    {analysis.keyMistakes.some(m => m.reason.includes('injury')) && (
                      <li>✗ Ignoring key player injuries</li>
                    )}
                    {analysis.keyMistakes.some(m => m.reason.includes('weather')) && (
                      <li>✗ Not checking weather conditions</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
