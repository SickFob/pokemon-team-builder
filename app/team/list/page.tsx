import React, { Suspense } from 'react';
import PokemonList from '@/app/components/PokemonList';
import LoadingSpinner from '@/app/components/LoadingSpinner';
import { fetchTeams } from '@/app/actions/team';
import { unstable_cache } from 'next/cache';
import { TeamListItem } from '@/app/types';

// Caching with unstable_cache because of ORM
// const fetchCachedTeams = unstable_cache(async () => fetchTeams(), ['pokemon-list'])

const ListPage = async () => {
  const teams: TeamListItem[] = await fetchTeams();

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <PokemonList teams={teams} />
    </Suspense>
  );
}

export default ListPage