import Match from '../../../database/models/Match';
import Team from '../../../database/models/Team';
import ILeaderBoardDTO from './HomeTeamLeaderBoardDTO';

function sortLeaderBoard(lb: ILeaderBoardDTO[]) {
  const sorted = lb.sort((a: ILeaderBoardDTO, b: ILeaderBoardDTO) => {
    if (a.totalPoints !== b.totalPoints) return b.totalPoints - a.totalPoints;
    if (a.totalVictories !== b.totalVictories) return b.totalVictories - a.totalVictories;
    if (a.goalsBalance !== b.goalsBalance) return b.goalsBalance - a.goalsBalance;
    if (a.goalsFavor !== b.goalsFavor) return b.goalsFavor - a.goalsFavor;
    return b.goalsOwn - a.goalsOwn;
  });
  return sorted;
}

export function calculateTotalGames(matches: Match[], teamId: number) {
  const totalGames = matches.reduce((acc, curr) => {
    if (curr.homeTeam === teamId || curr.awayTeam === teamId) return acc + 1;
    return acc;
  }, 0);
  return totalGames;
}

export function calculateGoalsFavor(matches: Match[], teamId: number) {
  const totalGoals = matches.reduce((acc, curr) => {
    if (curr.homeTeam === teamId) return acc + curr.homeTeamGoals;
    if (curr.awayTeam === teamId) return acc + curr.awayTeamGoals;
    return acc;
  }, 0);
  return totalGoals;
}

export function calculateTotalVictories(matches: Match[], teamId: number) {
  const totalVictories = matches.reduce((acc, curr) => {
    if (curr.homeTeam === teamId && curr.homeTeamGoals > curr.awayTeamGoals) return acc + 1;
    if (curr.awayTeam === teamId && curr.awayTeamGoals > curr.homeTeamGoals) return acc + 1;
    return acc;
  }, 0);
  return totalVictories;
}

export function calculateTotalDraws(matches: Match[], teamId: number) {
  const totalDraws = matches.reduce((acc, curr) => {
    if ((curr.homeTeam === teamId || curr.awayTeam === teamId)
    && curr.homeTeamGoals === curr.awayTeamGoals) return acc + 1;
    return acc;
  }, 0);
  return totalDraws;
}

export function calculateTotalLosses(matches: Match[], teamId: number) {
  const totalLosses = matches.reduce((acc, curr) => {
    if (curr.homeTeam === teamId && curr.homeTeamGoals < curr.awayTeamGoals) return acc + 1;
    if (curr.awayTeam === teamId && curr.awayTeamGoals < curr.homeTeamGoals) return acc + 1;
    return acc;
  }, 0);
  return totalLosses;
}

export function calculatePoints(matches: Match[], teamId: number) {
  const victories = calculateTotalVictories(matches, teamId);
  const draws = calculateTotalDraws(matches, teamId);
  return victories * 3 + draws;
}

export function calculateGoalsOwn(matches: Match[], teamId: number) {
  const goalsOwn = matches.reduce((acc, curr) => {
    if (curr.homeTeam === teamId) return acc + curr.awayTeamGoals;
    if (curr.awayTeam === teamId) return acc + curr.homeTeamGoals;
    return acc;
  }, 0);
  return goalsOwn;
}

export function calculateGoalsBalance(matches: Match[], teamId: number) {
  const goalsFavor = calculateGoalsFavor(matches, teamId);
  const goalsOwn = calculateGoalsOwn(matches, teamId);
  return goalsFavor - goalsOwn;
}

export function calculateTeamEfficiency(matches: Match[], teamId: number) {
  const totalPoints = calculatePoints(matches, teamId);
  const totalGames = calculateTotalGames(matches, teamId);
  return +((totalPoints / (totalGames * 3)) * 100).toFixed(2);
}

export default function generateLeaderBoard(matches: Match[], teams: Team[]) {
  const leaderBoard = teams.map(({ id, teamName }) => {
    const teamLeaderBoard = {
      name: teamName,
      totalPoints: calculatePoints(matches, id),
      totalGames: calculateTotalGames(matches, id),
      totalVictories: calculateTotalVictories(matches, id),
      totalDraws: calculateTotalDraws(matches, id),
      totalLosses: calculateTotalLosses(matches, id),
      goalsFavor: calculateGoalsFavor(matches, id),
      goalsOwn: calculateGoalsOwn(matches, id),
      goalsBalance: calculateGoalsBalance(matches, id),
      efficiency: calculateTeamEfficiency(matches, id),
    };
    return teamLeaderBoard;
  });
  return sortLeaderBoard(leaderBoard);
}

function generateTeamLeaderBoard(matches: Match[], teamId: number, teamName: string) {
  const leaderBoard = {
    name: teamName,
    totalPoints: calculatePoints(matches, teamId),
    totalGames: calculateTotalGames(matches, teamId),
    totalVictories: calculateTotalVictories(matches, teamId),
    totalDraws: calculateTotalDraws(matches, teamId),
    totalLosses: calculateTotalLosses(matches, teamId),
    goalsFavor: calculateGoalsFavor(matches, teamId),
    goalsOwn: calculateGoalsOwn(matches, teamId),
    goalsBalance: calculateGoalsBalance(matches, teamId),
    efficiency: calculateTeamEfficiency(matches, teamId),
  };
  return leaderBoard;
}

export function generateHomeLeaderBoard(matches: Match[], teams: Team[]): ILeaderBoardDTO[] {
  const homeLeaderBoard = teams.map(({ id, teamName }) => {
    const filtered = matches.filter((match) => match.homeTeam === id);
    return generateTeamLeaderBoard(filtered, id, teamName);
  });
  return sortLeaderBoard(homeLeaderBoard);
}
