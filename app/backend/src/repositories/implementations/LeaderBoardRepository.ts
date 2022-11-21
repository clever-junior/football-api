import Match from '../../database/models/Match';
import ILeaderBoardDTO from '../../useCases/LeaderBoardUseCases/home/HomeTeamLeaderBoardDTO';

export default class LeaderBoardsRepository {
  static sortLeaderBoard(leaderBoard: ILeaderBoardDTO[]) {
    const sorted = leaderBoard.sort((boardA: ILeaderBoardDTO, boardB: ILeaderBoardDTO) => {
      if (boardA.totalPoints !== boardB.totalPoints) {
        return boardB.totalPoints - boardA.totalPoints;
      }
      if (boardA.totalVictories !== boardB.totalVictories) {
        return boardB.totalVictories - boardA.totalVictories;
      }
      if (boardA.goalsBalance !== boardB.goalsBalance) {
        return boardB.goalsBalance - boardA.goalsBalance;
      }
      if (boardA.goalsFavor !== boardB.goalsFavor) {
        return boardB.goalsFavor - boardA.goalsFavor;
      }
      return boardB.goalsOwn - boardA.goalsOwn;
    });
    return sorted;
  }

  TotalGames(matches: Match[], teamId: number) {
    const totalGames = matches.reduce((acc, curr) => {
      if (curr.homeTeam === teamId || curr.awayTeam === teamId) return acc + 1;
      return acc;
    }, 0);
    return totalGames;
  }

  GoalsFavor(matches: Match[], teamId: number) {
    const totalGoals = matches.reduce((acc, curr) => {
      if (curr.homeTeam === teamId) return acc + curr.homeTeamGoals;
      if (curr.awayTeam === teamId) return acc + curr.awayTeamGoals;
      return acc;
    }, 0);
    return totalGoals;
  }

  TotalVictories(matches: Match[], teamId: number) {
    const totalVictories = matches.reduce((acc, curr) => {
      if (curr.homeTeam === teamId && curr.homeTeamGoals > curr.awayTeamGoals) return acc + 1;
      if (curr.awayTeam === teamId && curr.awayTeamGoals > curr.homeTeamGoals) return acc + 1;
      return acc;
    }, 0);
    return totalVictories;
  }

  TotalDraws(matches: Match[], teamId: number) {
    const totalDraws = matches.reduce((acc, curr) => {
      if ((curr.homeTeam === teamId || curr.awayTeam === teamId)
      && curr.homeTeamGoals === curr.awayTeamGoals) return acc + 1;
      return acc;
    }, 0);
    return totalDraws;
  }

  TotalLosses(matches: Match[], teamId: number) {
    const totalLosses = matches.reduce((acc, curr) => {
      if (curr.homeTeam === teamId && curr.homeTeamGoals < curr.awayTeamGoals) return acc + 1;
      if (curr.awayTeam === teamId && curr.awayTeamGoals < curr.homeTeamGoals) return acc + 1;
      return acc;
    }, 0);
    return totalLosses;
  }

  Points(matches: Match[], teamId: number) {
    const victories = TotalVictories(matches, teamId);
    const draws = TotalDraws(matches, teamId);
    return victories * 3 + draws;
  }

  GoalsOwn(matches: Match[], teamId: number) {
    const goalsOwn = matches.reduce((acc, curr) => {
      if (curr.homeTeam === teamId) return acc + curr.awayTeamGoals;
      if (curr.awayTeam === teamId) return acc + curr.homeTeamGoals;
      return acc;
    }, 0);
    return goalsOwn;
  }

  GoalsBalance(matches: Match[], teamId: number) {
    const goalsFavor = GoalsFavor(matches, teamId);
    const goalsOwn = GoalsOwn(matches, teamId);
    return goalsFavor - goalsOwn;
  }

  TeamEfficiency(matches: Match[], teamId: number) {
    const totalPoints = Points(matches, teamId);
    const totalGames = TotalGames(matches, teamId);
    return +((totalPoints / (totalGames * 3)) * 100).toFixed(2);
  }
}
