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

export function TotalGames(matches: Match[], teamId: number) {
  const totalGames = matches.reduce((acc, curr) => {
    if (curr.homeTeam === teamId || curr.awayTeam === teamId) return acc + 1;
    return acc;
  }, 0);
  return totalGames;
}

export function GoalsFavor(matches: Match[], teamId: number) {
  const totalGoals = matches.reduce((acc, curr) => {
    if (curr.homeTeam === teamId) return acc + curr.homeTeamGoals;
    if (curr.awayTeam === teamId) return acc + curr.awayTeamGoals;
    return acc;
  }, 0);
  return totalGoals;
}

export function TotalVictories(matches: Match[], teamId: number) {
  const totalVictories = matches.reduce((acc, curr) => {
    if (curr.homeTeam === teamId && curr.homeTeamGoals > curr.awayTeamGoals) return acc + 1;
    if (curr.awayTeam === teamId && curr.awayTeamGoals > curr.homeTeamGoals) return acc + 1;
    return acc;
  }, 0);
  return totalVictories;
}

export function TotalDraws(matches: Match[], teamId: number) {
  const totalDraws = matches.reduce((acc, curr) => {
    if ((curr.homeTeam === teamId || curr.awayTeam === teamId)
    && curr.homeTeamGoals === curr.awayTeamGoals) return acc + 1;
    return acc;
  }, 0);
  return totalDraws;
}

export function TotalLosses(matches: Match[], teamId: number) {
  const totalLosses = matches.reduce((acc, curr) => {
    if (curr.homeTeam === teamId && curr.homeTeamGoals < curr.awayTeamGoals) return acc + 1;
    if (curr.awayTeam === teamId && curr.awayTeamGoals < curr.homeTeamGoals) return acc + 1;
    return acc;
  }, 0);
  return totalLosses;
}

export function Points(matches: Match[], teamId: number) {
  const victories = TotalVictories(matches, teamId);
  const draws = TotalDraws(matches, teamId);
  return victories * 3 + draws;
}

export function GoalsOwn(matches: Match[], teamId: number) {
  const goalsOwn = matches.reduce((acc, curr) => {
    if (curr.homeTeam === teamId) return acc + curr.awayTeamGoals;
    if (curr.awayTeam === teamId) return acc + curr.homeTeamGoals;
    return acc;
  }, 0);
  return goalsOwn;
}

export function GoalsBalance(matches: Match[], teamId: number) {
  const goalsFavor = GoalsFavor(matches, teamId);
  const goalsOwn = GoalsOwn(matches, teamId);
  return goalsFavor - goalsOwn;
}

export function TeamEfficiency(matches: Match[], teamId: number) {
  const totalPoints = Points(matches, teamId);
  const totalGames = TotalGames(matches, teamId);
  return +((totalPoints / (totalGames * 3)) * 100).toFixed(2);
}

export default function generateLeaderBoard(matches: Match[], teams: Team[]) {
  const leaderBoard = teams.map(({ id, teamName }) => {
    const teamLeaderBoard = {
      name: teamName,
      totalPoints: Points(matches, id),
      totalGames: TotalGames(matches, id),
      totalVictories: TotalVictories(matches, id),
      totalDraws: TotalDraws(matches, id),
      totalLosses: TotalLosses(matches, id),
      goalsFavor: GoalsFavor(matches, id),
      goalsOwn: GoalsOwn(matches, id),
      goalsBalance: GoalsBalance(matches, id),
      efficiency: TeamEfficiency(matches, id),
    };
    return teamLeaderBoard;
  });
  return sortLeaderBoard(leaderBoard);
}

function generateTeamLeaderBoard(matches: Match[], teamId: number, teamName: string) {
  const leaderBoard = {
    name: teamName,
    totalPoints: Points(matches, teamId),
    totalGames: TotalGames(matches, teamId),
    totalVictories: TotalVictories(matches, teamId),
    totalDraws: TotalDraws(matches, teamId),
    totalLosses: TotalLosses(matches, teamId),
    goalsFavor: GoalsFavor(matches, teamId),
    goalsOwn: GoalsOwn(matches, teamId),
    goalsBalance: GoalsBalance(matches, teamId),
    efficiency: TeamEfficiency(matches, teamId),
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
