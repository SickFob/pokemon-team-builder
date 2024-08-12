// Pokemon api types
export interface PokemonApi {
  name: string,
  base_experience: number,
  sprites: PokemonSprites
  abilities: PokemonAbility[],
  types: PokemonType[],

}

interface PokemonSprites {
  front_default: string
}

interface PokemonAbility {
  ability: NamedAPIResource
}

interface PokemonType {
  type: NamedAPIResource
}

interface NamedAPIResource {
  name: string
}
// end of Pokemon api types

export interface TeamListItem {
  id: number,
  name: string,
  totalBaseExp: number,
  types: string[],
  sprites: string[],
  createAt: Date
}

export interface Team {
  id: number,
  name: string,
  pokemons: Pokemon[]
}

export interface Pokemon {
  name: string,
  baseExp: number,
  sprite: string,
  abilities: string[],
  types: string[]
}

export interface FormState {
  dirty: boolean,
  success: boolean,
  errorCode: ErrorCode | null,
  message: string,
}

export enum ErrorCode {
  CANT_REACH = 'P1001',
  DUPLICATE = 'P2002',
  GENERAL_EXCEPTION = ''
}