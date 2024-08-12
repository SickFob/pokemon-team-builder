import { createTeam } from "@/app/actions/team";
import PokemonForm from "@/app/components/PokemonForm";


const CreatePage = () => {
  return (
    <div>
      <PokemonForm action={createTeam} isEdit={false} />
    </div>
  );
}

export default CreatePage