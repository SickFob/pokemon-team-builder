import PokemonForm from '@/app/components/PokemonForm';
import { getTeamById, updateTeamById } from '@/app/actions/team';

import { Team } from '@/app/types';

const EditPage = async ({ params }: { params: { teamId: string } }) => {
  const teamId = params.teamId;
  const id = Number(teamId);
  let team: Team | undefined;
  if (!isNaN(id)) {
    team = await getTeamById(Number(teamId));
  }

  return (
    <div>
      <PokemonForm action={updateTeamById} isEdit={true} team={team} />
    </div>
  )
}

export default EditPage