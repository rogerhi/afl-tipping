import { Tip, TippingStats, RoundAnalysis } from '../types/tips';

// Tips for Round 1 - ready to be filled in
export const tipsReadyToEnter: Partial<Tip>[] = [
  {
    id: 'tip-r1-1',
    round: 1,
    gameId: 'R1G1',
    homeTeam: 'Sydney Swans',
    awayTeam: 'Melbourne Demons',
    tippedTeam: '',
    odds: 1.85,
    confidence: 'Medium',
    result: 'Pending',
    factors: [
      { name: 'Home ground advantage', impact: 'Positive', weight: 7, description: 'SCG is stronghold' },
      { name: 'Melbourne injuries', impact: 'Positive', weight: 6, description: 'Petracca out, Gawn test' },
    ],
    analysis: '',
    dateTipped: '',
  },
  {
    id: 'tip-r1-2',
    round: 1,
    gameId: 'R1G2',
    homeTeam: 'Collingwood',
    awayTeam: 'Western Bulldogs',
    tippedTeam: '',
    odds: 1.65,
    confidence: 'Medium',
    result: 'Pending',
    factors: [
      { name: 'MCG home ground', impact: 'Positive', weight: 7, description: 'Collingwood fortress' },
      { name: 'Darcy Moore injury', impact: 'Negative', weight: 8, description: 'Key defender doubtful' },
    ],
    analysis: '',
    dateTipped: '',
  },
  {
    id: 'tip-r1-3',
    round: 1,
    gameId: 'R1G3',
    homeTeam: 'Brisbane Lions',
    awayTeam: 'Port Adelaide Power',
    tippedTeam: '',
    odds: 1.45,
    confidence: 'High',
    result: 'Pending',
    factors: [
      { name: 'Gabba fortress', impact: 'Positive', weight: 9, description: 'Brisbane nearly unbeatable at home' },
      { name: 'Port travel', impact: 'Positive', weight: 6, description: 'Long trip from Adelaide' },
    ],
    analysis: '',
    dateTipped: '',
  },
  {
    id: 'tip-r1-4',
    round: 1,
    gameId: 'R1G4',
    homeTeam: 'Geelong Cats',
    awayTeam: 'St Kilda Saints',
    tippedTeam: '',
    odds: 1.55,
    confidence: 'Medium',
    result: 'Pending',
    factors: [
      { name: 'GMHBA advantage', impact: 'Positive', weight: 7, description: 'Geelong home ground' },
      { name: 'Tom Hawkins out', impact: 'Negative', weight: 9, description: 'Key forward, main target' },
    ],
    analysis: '',
    dateTipped: '',
  },
  {
    id: 'tip-r1-5',
    round: 1,
    gameId: 'R1G5',
    homeTeam: 'Essendon Bombers',
    awayTeam: 'Hawthorn Hawks',
    tippedTeam: '',
    odds: 1.90,
    confidence: 'Low',
    result: 'Pending',
    factors: [
      { name: 'Close odds', impact: 'Neutral', weight: 5, description: 'Coin flip game' },
      { name: 'Zach Merrett test', impact: 'Neutral', weight: 5, description: 'If out, big loss for Essendon' },
    ],
    analysis: '',
    dateTipped: '',
  },
];

// Empty history - waiting for real tips
export const tippingHistory: Tip[] = [];

// Reset stats
export const tippingStats: TippingStats = {
  totalTips: 0,
  wins: 0,
  losses: 0,
  winRate: 0,
  profit: 0,
  bestRound: 0,
  worstRound: 0,
  currentStreak: 0,
  maxWinStreak: 0,
  favouriteAccuracy: 0,
  upsetAccuracy: 0,
};

// Empty round analyses
export const roundAnalyses: RoundAnalysis[] = [];

// Current tips waiting to be entered
export const currentTips: Partial<Tip>[] = tipsReadyToEnter;
