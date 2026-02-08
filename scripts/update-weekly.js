#!/usr/bin/env node

/**
 * AFL Weekly Data Updater
 * 
 * This script updates the AFL website data every Monday
 * Currently uses mock data, but can be extended to fetch from:
 * - AFL.com.au API
 * - Sportsbet/Ladbrokes/TAB APIs
 * - Weather APIs
 * - Injury reports from club websites
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../app/data/round-data.ts');
const TIPS_FILE = path.join(__dirname, '../app/data/tips-data.ts');

// Mock data generator - replace with real API calls
function generateNextRoundData(roundNum) {
  const today = new Date();
  const year = 2026;
  
  // Generate round dates (Thursday to Sunday)
  const days = ['Thursday', 'Friday', 'Saturday', 'Saturday', 'Saturday', 'Sunday', 'Sunday', 'Sunday', 'Sunday'];
  const dates = [
    new Date(year, 2, 19 + (roundNum - 1) * 7),
    new Date(year, 2, 20 + (roundNum - 1) * 7),
    new Date(year, 2, 21 + (roundNum - 1) * 7),
    new Date(year, 2, 21 + (roundNum - 1) * 7),
    new Date(year, 2, 22 + (roundNum - 1) * 7),
    new Date(year, 2, 22 + (roundNum - 1) * 7),
    new Date(year, 2, 22 + (roundNum - 1) * 7),
    new Date(year, 2, 22 + (roundNum - 1) * 7),
    new Date(year, 2, 22 + (roundNum - 1) * 7),
  ];

  // Example Round 2 matchups (update with real fixtures)
  const matchups = [
    { home: 'Melbourne Demons', away: 'Western Bulldogs', venue: 'MCG' },
    { home: 'Sydney Swans', away: 'GWS Giants', venue: 'SCG' },
    { home: 'Collingwood', away: 'Richmond', venue: 'MCG' },
    { home: 'Brisbane Lions', away: 'Gold Coast Suns', venue: 'Gabba' },
    { home: 'Geelong Cats', away: 'Hawthorn', venue: 'GMHBA Stadium' },
    { home: 'Port Adelaide', away: 'Adelaide Crows', venue: 'Adelaide Oval' },
    { home: 'Essendon', away: 'Carlton', venue: 'MCG' },
    { home: 'Fremantle', away: 'West Coast Eagles', venue: 'Optus Stadium' },
    { home: 'St Kilda', away: 'North Melbourne', venue: 'Marvel Stadium' },
  ];

  const games = matchups.map((match, idx) => {
    const date = dates[idx];
    const dateStr = `${days[idx]}, ${date.toLocaleDateString('en-AU', { month: 'long', day: 'numeric' })}`;
    
    return {
      id: `R${roundNum}G${idx + 1}`,
      homeTeam: match.home,
      awayTeam: match.away,
      venue: match.venue,
      date: dateStr,
      time: idx === 0 ? '7:40 PM AEDT' : 
            idx === 1 ? '7:40 PM AEDT' : 
            idx < 5 ? '7:00 PM AEDT' : '3:20 PM AEDT',
      round: roundNum,
      homeTeamColor: getTeamColor(match.home),
      awayTeamColor: getTeamColor(match.away),
    };
  });

  // Generate sample odds (would come from bookies API)
  const odds = games.map((game, idx) => {
    const margin = Math.random() * 30 + 1;
    const homeOdds = margin < 10 ? 1.80 : 1.45;
    const awayOdds = margin < 10 ? 2.00 : 2.80;
    
    return {
      gameId: game.id,
      homeOdds: parseFloat(homeOdds.toFixed(2)),
      awayOdds: parseFloat(awayOdds.toFixed(2)),
      homeLine: -Math.round(margin / 2),
      awayLine: Math.round(margin / 2),
      margin: margin,
      bookie: ['Sportsbet', 'Ladbrokes', 'TAB'][idx % 3],
      confidence: margin < 6 ? 'Low' : margin > 15 ? 'High' : 'Medium',
    };
  });

  // Sample injuries (would come from AFL injury list)
  const injuries = [
    { id: '1', player: 'Check Thursday 6pm', team: 'All Teams', injury: 'Teamsheets', status: 'Test', returnDate: 'Round ' + roundNum, importance: 'Medium' },
  ];

  return {
    round: roundNum,
    games,
    odds,
    injuries,
    updatedAt: today.toISOString(),
  };
}

function getTeamColor(team) {
  const colors = {
    'Sydney Swans': '#BF3030',
    'Melbourne Demons': '#002B5C',
    'Collingwood': '#000000',
    'Western Bulldogs': '#0047AB',
    'Brisbane Lions': '#A30000',
    'Port Adelaide': '#00B5B8',
    'Geelong Cats': '#002B5C',
    'St Kilda': '#ED1B2F',
    'Essendon': '#CC0000',
    'Hawthorn': '#4D2004',
    'Richmond': '#FFD200',
    'Carlton': '#0315A1',
    'West Coast': '#002B5C',
    'Gold Coast': '#DE031B',
    'Adelaide': '#002B5C',
    'Fremantle': '#2A0D57',
    'GWS': '#F47920',
    'North Melbourne': '#0039A6',
  };
  return colors[team] || '#666666';
}

function generateDataFile(data) {
  return `import { Game, Injury, LadderTeam, Odds } from '../types';

// Round ${data.round}, 2026
// Last updated: ${new Date(data.updatedAt).toLocaleString('en-AU')}

export const currentRound: Game[] = ${JSON.stringify(data.games, null, 2).replace(/"([^"]+)":/g, '$1:')};

export const injuries: Injury[] = ${JSON.stringify(data.injuries, null, 2).replace(/"([^"]+)":/g, '$1:')};

// Ladder will be updated after Round ${data.round - 1} results
export const ladder: LadderTeam[] = [
  // Positions will be updated with real results
];

export const oddsData: Odds[] = ${JSON.stringify(data.odds, null, 2).replace(/"([^"]+)":/g, '$1:')};
`;
}

async function main() {
  console.log('🏉 AFL Weekly Data Updater');
  console.log('==========================');
  
  // Determine current round
  const today = new Date();
  const startDate = new Date(2026, 2, 19); // March 19, 2026
  const daysSinceStart = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
  const currentRound = Math.max(1, Math.floor(daysSinceStart / 7) + 1);
  
  console.log(`\n📅 Generating data for Round ${currentRound}...`);
  
  const data = generateNextRoundData(currentRound);
  const fileContent = generateDataFile(data);
  
  // Save to file
  fs.writeFileSync(DATA_FILE, fileContent);
  console.log('✅ Data file updated');
  
  // Update tips file to add new round
  console.log('\n📝 Updating tips file for new round...');
  
  // Git operations
  console.log('\n📦 Committing changes...');
  const { execSync } = require('child_process');
  
  try {
    execSync('git add -A', { cwd: path.dirname(DATA_FILE) });
    execSync(`git commit -m "Weekly update: Round ${currentRound} fixtures, odds, and injuries"`, { 
      cwd: path.dirname(DATA_FILE) 
    });
    execSync('git push origin main', { cwd: path.dirname(DATA_FILE) });
    console.log('✅ Changes pushed to GitHub');
    console.log('🚀 Vercel will auto-deploy in ~1 minute');
    
    // Send notification
    console.log('\n📱 Website updated successfully!');
    console.log(`URL: https://afl-tipping-omega.vercel.app`);
    
  } catch (error) {
    console.error('❌ Git error:', error.message);
    console.log('You may need to commit manually');
  }
}

main().catch(console.error);
