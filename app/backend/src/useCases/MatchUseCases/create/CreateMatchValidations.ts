import TeamRepository from '../../../repositories/implementations/TeamsRepository';
import Error from '../../../errors';
import ICreateMatchDTO from './ICreateMatchDTO';

export default function createMatchValidations(data: ICreateMatchDTO) {
  const { awayTeam, homeTeam } = data;

  if (awayTeam === homeTeam) {
    Error.unprocessableEntity('It is not possible to create a match with two equal teams');
  }
}

export function validateIds(teamRepository: TeamRepository, ids: number[]) {
  ids.forEach(async (id) => {
    const team = teamRepository.readOne(id);

    if (!team) {
      Error.notFound('There is no team with such id!');
    }
  });
}
