import { Pokemon } from "../types";

/**
 * 
 * @param id 
 * @returns Returns a [Pokemon] object
 */
export async function getPokemon(): Promise<Pokemon> {

  const id: number = randomPokemonId();
  const endpoint = `http://localhost:3000/api/pokemon/${id}`;
  return fetch(endpoint)
    .then(async response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json().then((result) => {
        const pokemon: Pokemon = {
          name: result.name,
          baseExp: result.base_experience,
          sprite: result.sprites.front_default,
          abilities: result.abilities.map((e: any) => e.ability.name),
          types: result.types.map((e: any) => e.type.name)
        }
        return pokemon;
      });
    }).catch((error) => {
      throw new Error(error);
    })
}

const randomPokemonId = (): number => Math.floor(Math.random() * (1025 - 1 + 1)) + 1;