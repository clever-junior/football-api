import ICreateMatchDTO from '../useCases/MatchUseCases/create/ICreateMatchDTO';
import Match from '../database/models/Match';
import IUpdateMatchDTO from '../useCases/MatchUseCases/update/UpdateMatchDTO';

export default interface IMatchesRepository {
  readAll(): Promise<Match[]>;
  readOne(id: number | string): Promise<Match | null>;
  readByInProgress(inProgress: boolean): Promise<Match[]>;
  create(data: ICreateMatchDTO): Promise<Match>;
  updateInProgress(id: number | string): Promise<void>;
  update(data: IUpdateMatchDTO, id: number | string): Promise<void>;
}
