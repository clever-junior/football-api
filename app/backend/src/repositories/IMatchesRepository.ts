import Match from '../database/models/Match';

export default interface IMatchesRepository {
  readAll(): Promise<Match[]>;
  readByInProgress(inProgress: boolean): Promise<Match[]>;
}
