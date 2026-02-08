export interface Tip {
  id: string;
  round: number;
  gameId: string;
  homeTeam: string;
  awayTeam: string;
  tippedTeam: string;
  odds: number;
  confidence: 'High' | 'Medium' | 'Low';
  result: 'Win' | 'Loss' | 'Pending';
  margin?: number; // Actual game margin
  predictedMargin?: number; // Expected margin from odds
  factors: TipFactor[];
  analysis?: string; // Why the tip was made
  lesson?: string; // What went wrong (if loss)
  dateTipped: string;
}

export interface TipFactor {
  name: string;
  impact: 'Positive' | 'Negative' | 'Neutral';
  weight: number; // 1-10
  description: string;
}

export interface TippingStats {
  totalTips: number;
  wins: number;
  losses: number;
  winRate: number;
  profit: number; // If betting $10 per tip
  bestRound: number;
  worstRound: number;
  currentStreak: number;
  maxWinStreak: number;
  favouriteAccuracy: number;
  upsetAccuracy: number;
}

export interface RoundAnalysis {
  round: number;
  tips: Tip[];
  correctTips: number;
  incorrectTips: number;
  lessons: string[];
  keyMistakes: {
    game: string;
    tipped: string;
    actual: string;
    reason: string;
  }[];
}
