import ICreateMatchDTO from '../useCases/MatchUseCases/create/ICreateMatchDTO';
import Match from '../database/models/Match';

export default interface IMatchesRepository {
  readAll(): Promise<Match[]>;
  readOne(id: number | string): Promise<Match | null>;
  readByInProgress(inProgress: boolean): Promise<Match[]>;
  create(data: ICreateMatchDTO): Promise<Match>;
}
