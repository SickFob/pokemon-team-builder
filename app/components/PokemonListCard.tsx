import React from 'react';
import PokemonCardBadge from './PokemonCardBadge';
import PokemonImage from './PokemonImage';
import Link from 'next/link';
import DeleteForm from './DeleteForm';
import { TeamListItem } from '../types';

const PokemonListCard = ({ team }: { team: TeamListItem }) => {
  return (
    <>
      <div className="block w-[600px] p-6 bg-white border border-gray-200 rounded-lg shadow">
        <div className='flex justify-between mb-2'>
          <div className='flex flex-col w-52'>
            <h5 className="text-sm font-light tracking-wide text-gray-900 ">Team</h5>
            <h4 className="text-4xl font-bold tracking-tight text-gray-900 text-ellipsis w-[350px] truncate">{team.name}</h4>
          </div>
          <div className='flex'>
            <Link key={team.id} href={`${team.id}/edit`} className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 mb-2 h-[42px]">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
              </svg>
              Edit
            </Link>
            <DeleteForm id={team.id} />
          </div>

        </div>
        <div className='flex justify-between mb-2'>
          <div>
            <h5 className="text-sm font-light tracking-wide text-gray-900">Total base exp</h5>
            <h4 className="text-lg font-bold tracking-tight text-gray-900">{team.totalBaseExp}</h4>
          </div>
        </div>
        <hr />
        <div className='flex overflow-x-auto'>
          {
            team.sprites.map((sprite: string, i: number) => <PokemonImage sprite={sprite} key={i} />)
          }
        </div>
        <hr />
        <div className='mt-2 p-2 flex overflow-x-auto'>
          {
            team.types.map((type: string, i: number) => (<PokemonCardBadge text={type} key={i} />))
          }
        </div>
      </div>
    </>
  );
}

export default PokemonListCard