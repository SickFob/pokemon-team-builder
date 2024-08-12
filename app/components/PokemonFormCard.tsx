import React from 'react';
import PokemonImage from './PokemonImage';
import { Pokemon } from '../types';
import PokemonCardBadge from './PokemonCardBadge';
import StringUtils from '../utils/StringUtils';

const PokemonFormCard = ({ pokemon }: { pokemon: Pokemon }) => {
  return (
    <div className='rounded-lg border-4 border-slate-500 p-3 w-[300px] h-full text-gray-900'>
      <div className='flex flex-col gap-2'>
        <div className='self-center'>
          <PokemonImage sprite={pokemon.sprite} />
        </div>
        <h4 className='font-bold'>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h4>
        <div>{pokemon.baseExp} <span className='text-sm'>base exp</span></div>
        <div>
          <h5 className='text-sm'>
            Abilities
          </h5>
          <div className='flex flex-wrap gap-2'>
            {pokemon.abilities.map((ability: string, i: number) => <PokemonCardBadge key={i} text={StringUtils.initCap(ability)} />)}

          </div>
        </div>
        <div>
          <h5 className='text-sm'>
            Types
          </h5>
          <div className='flex flex-wrap gap-2'>
            {pokemon.types.map((type: string, i: number) => <PokemonCardBadge key={i} text={StringUtils.initCap(type)} />)}

          </div>
        </div>
      </div>
    </div>
  );
}

export default PokemonFormCard