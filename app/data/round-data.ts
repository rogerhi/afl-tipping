import { Game, Injury, LadderTeam, Odds } from '../types';

// Round 1, 2026
// Last updated: 02/03/2026, 6:00:07 am

export const currentRound: Game[] = [
  {
    id: "R1G1",
    homeTeam: "Melbourne Demons",
    awayTeam: "Western Bulldogs",
    venue: "MCG",
    date: "Thursday, 19 March",
    time: "7:40 PM AEDT",
    round: 1,
    homeTeamColor: "#002B5C",
    awayTeamColor: "#0047AB"
  },
  {
    id: "R1G2",
    homeTeam: "Sydney Swans",
    awayTeam: "GWS Giants",
    venue: "SCG",
    date: "Friday, 20 March",
    time: "7:40 PM AEDT",
    round: 1,
    homeTeamColor: "#BF3030",
    awayTeamColor: "#666666"
  },
  {
    id: "R1G3",
    homeTeam: "Collingwood",
    awayTeam: "Richmond",
    venue: "MCG",
    date: "Saturday, 21 March",
    time: "7:00 PM AEDT",
    round: 1,
    homeTeamColor: "#000000",
    awayTeamColor: "#FFD200"
  },
  {
    id: "R1G4",
    homeTeam: "Brisbane Lions",
    awayTeam: "Gold Coast Suns",
    venue: "Gabba",
    date: "Saturday, 21 March",
    time: "7:00 PM AEDT",
    round: 1,
    homeTeamColor: "#A30000",
    awayTeamColor: "#666666"
  },
  {
    id: "R1G5",
    homeTeam: "Geelong Cats",
    awayTeam: "Hawthorn",
    venue: "GMHBA Stadium",
    date: "Saturday, 22 March",
    time: "7:00 PM AEDT",
    round: 1,
    homeTeamColor: "#002B5C",
    awayTeamColor: "#4D2004"
  },
  {
    id: "R1G6",
    homeTeam: "Port Adelaide",
    awayTeam: "Adelaide Crows",
    venue: "Adelaide Oval",
    date: "Sunday, 22 March",
    time: "3:20 PM AEDT",
    round: 1,
    homeTeamColor: "#00B5B8",
    awayTeamColor: "#666666"
  },
  {
    id: "R1G7",
    homeTeam: "Essendon",
    awayTeam: "Carlton",
    venue: "MCG",
    date: "Sunday, 22 March",
    time: "3:20 PM AEDT",
    round: 1,
    homeTeamColor: "#CC0000",
    awayTeamColor: "#0315A1"
  },
  {
    id: "R1G8",
    homeTeam: "Fremantle",
    awayTeam: "West Coast Eagles",
    venue: "Optus Stadium",
    date: "Sunday, 22 March",
    time: "3:20 PM AEDT",
    round: 1,
    homeTeamColor: "#2A0D57",
    awayTeamColor: "#666666"
  },
  {
    id: "R1G9",
    homeTeam: "St Kilda",
    awayTeam: "North Melbourne",
    venue: "Marvel Stadium",
    date: "Sunday, 22 March",
    time: "3:20 PM AEDT",
    round: 1,
    homeTeamColor: "#ED1B2F",
    awayTeamColor: "#0039A6"
  }
];

export const injuries: Injury[] = [
  {
    id: "1",
    player: "Check Thursday 6pm",
    team: "All Teams",
    injury: "Teamsheets",
    status: "Test",
    returnDate: "Round 1",
    importance: "Medium"
  }
];

// Ladder will be updated after Round 0 results
export const ladder: LadderTeam[] = [
  // Positions will be updated with real results
];

export const oddsData: Odds[] = [
  {
    gameId: "R1G1",
    homeOdds: 1.8,
    awayOdds: 2,
    homeLine: -1,
    awayLine: 1,
    margin: 2.596706015932481,
    bookie: "Sportsbet",
    confidence: "Low"
  },
  {
    gameId: "R1G2",
    homeOdds: 1.45,
    awayOdds: 2.8,
    homeLine: -8,
    awayLine: 8,
    margin: 15.793249938070057,
    bookie: "Ladbrokes",
    confidence: "High"
  },
  {
    gameId: "R1G3",
    homeOdds: 1.45,
    awayOdds: 2.8,
    homeLine: -12,
    awayLine: 12,
    margin: 24.50793742140145,
    bookie: "TAB",
    confidence: "High"
  },
  {
    gameId: "R1G4",
    homeOdds: 1.8,
    awayOdds: 2,
    homeLine: -3,
    awayLine: 3,
    margin: 5.836994258984038,
    bookie: "Sportsbet",
    confidence: "Low"
  },
  {
    gameId: "R1G5",
    homeOdds: 1.45,
    awayOdds: 2.8,
    homeLine: -10,
    awayLine: 10,
    margin: 19.699408149892843,
    bookie: "Ladbrokes",
    confidence: "High"
  },
  {
    gameId: "R1G6",
    homeOdds: 1.45,
    awayOdds: 2.8,
    homeLine: -7,
    awayLine: 7,
    margin: 14.193992761717865,
    bookie: "TAB",
    confidence: "Medium"
  },
  {
    gameId: "R1G7",
    homeOdds: 1.45,
    awayOdds: 2.8,
    homeLine: -11,
    awayLine: 11,
    margin: 22.245192358770385,
    bookie: "Sportsbet",
    confidence: "High"
  },
  {
    gameId: "R1G8",
    homeOdds: 1.45,
    awayOdds: 2.8,
    homeLine: -11,
    awayLine: 11,
    margin: 22.350009869118857,
    bookie: "Ladbrokes",
    confidence: "High"
  },
  {
    gameId: "R1G9",
    homeOdds: 1.8,
    awayOdds: 2,
    homeLine: -3,
    awayLine: 3,
    margin: 5.645815409126222,
    bookie: "TAB",
    confidence: "Low"
  }
];
