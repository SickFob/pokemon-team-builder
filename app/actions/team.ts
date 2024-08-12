
"use server"
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { ErrorCode, FormState, Pokemon, Team, TeamListItem } from '../types';



/**
 *
 * @returns Returns list of teams sorted by creation date
 */
export async function fetchTeams(): Promise<TeamListItem[]> {

  try {
    const res = await prisma.team.findMany({
      select: {
        id: true,
        name: true,
        createdAt: true,
        pokemons: {
          select: {
            sprite: true,
            baseExp: true,
            types: true
          }
        },
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    if (res.length === 0) {
      return [];
    } else {
      const teams: TeamListItem[] = res.map((el) => {
        let types: string[] = [];
        let sprites: string[] = [];
        el.pokemons.forEach((el) => {
          el.types.forEach((type) => {
            if (!types.includes(type)) {
              types.push(type)
            }
          })
          sprites.push(el.sprite)
        })

        return <TeamListItem>{
          id: el.id,
          name: el.name,
          totalBaseExp: el.pokemons.reduce((a, b) => a + (b['baseExp'] || 0), 0),
          types: types,
          sprites: sprites,
          createAt: el.createdAt
        };
      })

      return teams;
    }

  } catch (error) {
    console.log("fetchTeams", error);
    return [];
  }

}

/**
 *
 * @param id
 * @returns returns the team to the corresponding id
 */
export async function getTeamById(id: number): Promise<Team> {

  try {
    const res = await prisma.team.findFirst({
      select: {
        id: true,
        name: true,
        pokemons: {
          select: {
            name: true,
            baseExp: true,
            sprite: true,
            abilities: true,
            types: true
          }
        }
      },
      where: {
        id: id
      }
    });

    return <Team>{
      id: res?.id,
      name: res?.name,
      pokemons: res?.pokemons,
    };
  } catch (error) {
    console.log("getTeamById", error);
    return <Team>{
      id: 0,
      name: '',
      pokemons: [],
    };
  }
}

/**
 *
 * @param formData
 * @returns Creates a new team
 */
export async function createTeam(prevState: any, formData: FormData) {
  const pokemons: Pokemon[] = JSON.parse(formData.get('pokemons') as string);
  try {
    const res = await prisma.team.create({
      data: {
        name: formData.get('name') as string,
        pokemons: {
          connectOrCreate: pokemons.map((pokemon) => {
            return {
              where: { name: pokemon.name },
              create: {
                name: pokemon.name,
                baseExp: pokemon.baseExp,
                abilities: pokemon.abilities,
                types: pokemon.types,
                sprite: pokemon.sprite
              },
            };
          }),
        }
      }
    });

    revalidatePath('/team/list');

    return <FormState>{
      dirty: true,
      success: true,
      errorCode: null,
      message: 'Team successfully created'
    };
  } catch (error: any) {
    console.log("error", error);
    return errorHandler(error.code);
  }
}

/**
 *
 * @param formData
 * @returns update the team with the corresponding id
 */
export async function updateTeamById(prevState: any, formData: FormData) {
  const pokemons: Pokemon[] = JSON.parse(formData.get('pokemons') as string);
  const pokemonsToDisconnect: string[] = JSON.parse(formData.get('pokemonsToDisconnect') as string);
  const name = formData.get('name') as string;
  const id = formData.get('id') as string;

  try {
    await prisma.team.update({
      data: {
        name: name,
        pokemons: {
          connectOrCreate: pokemons.map((pokemon) => {
            return {
              where: { name: pokemon.name },
              create: {
                name: pokemon.name,
                baseExp: pokemon.baseExp,
                abilities: pokemon.abilities,
                types: pokemon.types,
                sprite: pokemon.sprite
              },

            };
          }),
          disconnect: pokemonsToDisconnect.map((el) => ({
            name: el,
          })),
        }
      },
      where: {
        id: parseInt(id)
      }
    });

    // delete pokemons without team
    await deletePokemonWithoutTeam();

    revalidatePath('/team/list');

    return <FormState>{
      dirty: true,
      success: true,
      errorCode: null,
      message: 'Team successfully updated'
    };
  } catch (error: any) {
    console.log("error", error);
    return errorHandler(error.code);
  }
}

/**
 *
 * @param prevState
 * @param formData
 * @returns delete the team with the corresponding id
 */
export async function deleteTeamById(prevState: any, formData: FormData) {
  const id: number = formData.get('id') as unknown as number;
  try {
    const res = await prisma.team.delete({
      where: {
        id: parseInt(id.toString())
      }
    });

    // delete pokemons without team
    await deletePokemonWithoutTeam();

    revalidatePath('/team/list');
    return <FormState>{
      success: true,
      message: 'Team deleted sucessfully',
      dirty: true,
      errorCode: null
    };

  } catch (error: any) {
    console.log("error", error);
    return errorHandler(error.code);
  }
}

const errorHandler = (errorCode: string): FormState => {
  switch (errorCode) {
    case ErrorCode.DUPLICATE:
      return {
        dirty: true,
        success: false,
        errorCode: ErrorCode.DUPLICATE,
        message: 'The name of this team has already been taken!'
      };
    case ErrorCode.CANT_REACH:
      return {
        dirty: true,
        success: false,
        errorCode: ErrorCode.CANT_REACH,
        message: 'Database can\'t be reached, make sure the service is running.'
      };
    default:
      return {
        dirty: true,
        success: false,
        errorCode: ErrorCode.GENERAL_EXCEPTION,
        message: 'Somenthing went wrong, try again pls!'
      };
  }

}

/**
 * Delete every pokemon without relation
 */
const deletePokemonWithoutTeam = async () => {
  try {
    // delete pokemons without team
    await prisma.pokemon.deleteMany({
      where: {
        teams: {
          none: {}
        }
      }
    });

  } catch (error) {
    console.log("deletePokemonWithoutTeam", error);
  }
}