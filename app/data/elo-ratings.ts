// ELO Ratings for AFL Teams
// Based on 2025 season performance and pre-season 2026 estimates
// ELO rating: 1500 = average, 1700+ = premiership contender, 1400- = rebuilding

export interface EloRating {
  team: string;
  rating: number;
  rank: number;
  lastWeek: number;
  change: number;
  category: 'Contender' | 'Finals' | 'Mid' | 'Rebuilding';
}

export const eloRatings: EloRating[] = [
  { team: 'Sydney Swans', rating: 1678, rank: 1, lastWeek: 1675, change: +3, category: 'Contender' },
  { team: 'Brisbane Lions', rating: 1645, rank: 2, lastWeek: 1645, change: 0, category: 'Contender' },
  { team: 'Western Bulldogs', rating: 1612, rank: 3, lastWeek: 1605, change: +7, category: 'Finals' },
  { team: 'Hawthorn', rating: 1598, rank: 4, lastWeek: 1600, change: -2, category: 'Finals' },
  { team: 'Port Adelaide', rating: 1595, rank: 5, lastWeek: 1590, change: +5, category: 'Finals' },
  { team: 'Melbourne', rating: 1589, rank: 6, lastWeek: 1595, change: -6, category: 'Finals' },
  { team: 'Collingwood', rating: 1582, rank: 7, lastWeek: 1580, change: +2, category: 'Finals' },
  { team: 'Geelong Cats', rating: 1565, rank: 8, lastWeek: 1575, change: -10, category: 'Mid' },
  { team: 'Carlton', rating: 1554, rank: 9, lastWeek: 1550, change: +4, category: 'Mid' },
  { team: 'GWS Giants', rating: 1548, rank: 10, lastWeek: 1555, change: -7, category: 'Mid' },
  { team: 'Gold Coast Suns', rating: 1532, rank: 11, lastWeek: 1525, change: +7, category: 'Mid' },
  { team: 'Essendon', rating: 1525, rank: 12, lastWeek: 1530, change: -5, category: 'Mid' },
  { team: 'St Kilda', rating: 1489, rank: 13, lastWeek: 1490, change: -1, category: 'Mid' },
  { team: 'Fremantle', rating: 1478, rank: 14, lastWeek: 1470, change: +8, category: 'Mid' },
  { team: 'Adelaide Crows', rating: 1465, rank: 15, lastWeek: 1468, change: -3, category: 'Rebuilding' },
  { team: 'Richmond', rating: 1445, rank: 16, lastWeek: 1450, change: -5, category: 'Rebuilding' },
  { team: 'West Coast Eagles', rating: 1412, rank: 17, lastWeek: 1410, change: +2, category: 'Rebuilding' },
  { team: 'North Melbourne', rating: 1385, rank: 18, lastWeek: 1390, change: -5, category: 'Rebuilding' },
];

// ELO Win Probability Calculator
export function calculateWinProbability(homeElo: number, awayElo: number, homeAdvantage: number = 65): { home: number; away: number } {
  // Standard ELO formula with home advantage
  const eloDiff = (homeElo + homeAdvantage) - awayElo;
  const homeProb = 1 / (1 + Math.pow(10, -eloDiff / 400));
  return {
    home: Math.round(homeProb * 100),
    away: Math.round((1 - homeProb) * 100),
  };
}

// Get team ELO rating by name
export function getTeamElo(teamName: string): number {
  const rating = eloRatings.find(e => e.team.toLowerCase().includes(teamName.toLowerCase()));
  return rating?.rating || 1500;
}

// Get ELO tier color
export function getEloTierColor(category: string): string {
  switch (category) {
    case 'Contender': return '#10B981'; // green
    case 'Finals': return '#3B82F6'; // blue
    case 'Mid': return '#F59E0B'; // amber
    case 'Rebuilding': return '#EF4444'; // red
    default: return '#6B7280'; // gray
  }
}
