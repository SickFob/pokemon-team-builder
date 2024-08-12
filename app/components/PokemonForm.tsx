'use client';

import React, { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import { ErrorCode, FormState, Pokemon, Team } from '../types';
import ButtonLoadingSpinner from './ButtonLoadingSpinner';
import CustomToast from './CustomToast';
import PokemonFormCard from './PokemonFormCard';
import { getPokemon } from '../services/pokemon';

interface PokemonFormProps {
  action: any,
  isEdit: boolean,
  team?: Team
}

const initialFormState: FormState = {
  dirty: false,
  success: false,
  errorCode: null,
  message: ''
}

export async function getRandomPokemon() {
  const pokemon: Pokemon = await getPokemon();
  return pokemon;
}

const PokemonForm = ({ action, isEdit, team }: PokemonFormProps) => {
  const [formState, formAction] = useFormState(action, initialFormState);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [name, setName] = useState<string>('');
  const [id, setId] = useState<number>();
  const [pokemonsToDisconnect, setPokemonToDisconnect] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [pokemonApiError, setPokemonApiError] = useState(false);

  useEffect(() => {
    if (team?.id && !formState.dirty) {
      setId(team?.id);
      setName(team?.name);
      setPokemons(team?.pokemons);
    }

    if (formState.dirty) {
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 2000);
      if (formState.success === true) {
        if (!isEdit) {
          setName('');
          setPokemons([]);
        }
        setPokemonToDisconnect([]);
      }
    }

  }, [formState]);

  const handleCatchEmAllClick = async () => {
    try {
      setLoading(true);
      const pokemon: Pokemon = await getRandomPokemon();
      setPokemons(prevPokemons => ([...prevPokemons, pokemon]));
    } catch (error) {
      console.log('Error getting data', error);
      setPokemonApiError(true);
      setTimeout(() => {
        setPokemonApiError(false);
      }, 2000);
    } finally {
      setLoading(false);
    }
  }

  const handleNameChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setName(e.target.value);
  }

  const removePokemon = (index: number) => {
    const pokemonToRemove = pokemons.at(index)?.name;
    if (pokemonToRemove) {
      setPokemonToDisconnect(prevPokemons => ([...prevPokemons, pokemonToRemove]));
    }
    pokemons.splice(index, 1);
    setPokemons([...pokemons]);
  }

  return (
    <>
      {
        pokemonApiError && (
          <CustomToast type='danger' message="Can't reach pokemon service" />
        )
      }
      {
        showToast && (
          <CustomToast type={formState?.success ? 'success' : 'danger'} message={formState?.message} />
        )
      }

      <form action={formAction}>
        <div className="flex flex-col gap-5">
          <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Team name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="i.e. Team Rocket"
              onChange={handleNameChange}
            />
            {
              name.length > 20 && (
                <div className="ms-3 text-sm font-normal text-red-500">Team name shouldn't exceed 20 characters</div>
              )
            }
            {
              formState.errorCode === ErrorCode.DUPLICATE && (
                <div className="ms-3 text-sm font-normal text-red-500">{formState?.message}</div>
              )
            }
            <input type="hidden" name="id" defaultValue={id} />
            <input type="hidden" name="pokemons" defaultValue={JSON.stringify(pokemons)} />
            <input type="hidden" name="pokemonsToDisconnect" defaultValue={JSON.stringify(pokemonsToDisconnect)} />
          </div>
          <div>
            <ButtonLoadingSpinner type='button' text="Gotta Catch 'Em All" disabled={pokemons.length > 5 || loading} onClickCallback={handleCatchEmAllClick} loading={loading} />
            {
              pokemons.length > 5 && (
                <div className='text-sm text-red-500 pt-2'>Team can have maximum 6 pokemon</div>
              )
            }
            {
              isEdit && pokemons.length === 0 && (
                <div className='text-sm text-red-500 pt-2'>Team must have at least 1 pokemon</div>
              )
            }
            <div className='flex gap-5 p-5 overflow-x-auto min-h-[372px]'>
              {
                pokemons?.map((pokemon: Pokemon, i: number) => (
                  <div key={i} className='relative'>
                    <button onClick={() => removePokemon(i)} type="button" className='rounded-full bg-red-500 absolute -top-2 -right-2 p-1 shadow-lg'>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4 text-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                      </svg>
                    </button>
                    <PokemonFormCard pokemon={pokemon} />
                  </div>
                ))
              }
            </div>
          </div>
          <div>
            <ButtonLoadingSpinner type='submit' text='Save' disabled={pokemons.length === 0 || (name === '' || name === undefined) || name.length > 20} />
          </div>
        </div>
      </form >
    </>
  );
}

export default PokemonForm