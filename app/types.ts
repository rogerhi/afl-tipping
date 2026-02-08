export interface Game {
  id: string;
  homeTeam: string;
  awayTeam: string;
  venue: string;
  date: string;
  time: string;
  round: number;
  homeTeamColor: string;
  awayTeamColor: string;
}

export interface Injury {
  id: string;
  player: string;
  team: string;
  injury: string;
  status: 'Out' | 'Doubtful' | 'Test' | 'Available';
  returnDate?: string;
  importance: 'High' | 'Medium' | 'Low';
}

export interface LadderTeam {
  position: number;
  team: string;
  played: number;
  won: number;
  lost: number;
  drawn: number;
  points: number;
  percentage: number;
  form: string;
  color: string;
}

export interface Odds {
  gameId: string;
  homeOdds: number;
  awayOdds: number;
  homeLine: number;
  awayLine: number;
  margin: number;
  bookie: string;
  confidence: 'High' | 'Medium' | 'Low';
}

export interface TeamColors {
  [key: string]: string;
}
