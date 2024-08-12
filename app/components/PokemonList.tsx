'use client'

import React, { useEffect, useState } from 'react';
import { TeamListItem } from '../types';
import PokemonListCard from './PokemonListCard';
import Select, { MultiValue } from 'react-select'
import StringUtils from '../utils/StringUtils';

export interface FilterOptions {
  value: string,
  label: string
}
const PokemonList = ({ teams }: { teams: TeamListItem[] }) => {
  const [teamsState, setTeamsState] = useState<TeamListItem[]>([]);
  const [optionsState, setOptions] = useState<FilterOptions[]>([]);

  useEffect(() => {
    setTeamsState(teams);
    retrievTeamsTypes();
  }, [teams]);


  const filterTeamsByTypes = (data: MultiValue<any>) => {
    if (data.length === 0) {
      setTeamsState(teams);
    } else {
      const filteredTeam = teams.filter((team) => data.some((el: { value: string; }) => team.types.includes(el.value)));
      setTeamsState(filteredTeam);
    }
  }

  const retrievTeamsTypes = () => {
    const options: FilterOptions[] = [];
    teams.forEach(team => {
      team.types.forEach((type) => {
        if (!options.some(e => e.value === type)) {
          options.push(
            {
              value: type,
              label: StringUtils.initCap(type)
            }
          )
        }
      })
    });

    setOptions(options);
  }

  return (
    <div className="mt-5 flex flex-col gap-5">
      <Select
        isMulti
        options={optionsState}
        onChange={(data) => filterTeamsByTypes(data)}
        isDisabled={optionsState.length === 0}
        styles={{
          option: provided => ({
            ...provided,
            color: 'black'
          }),
          control: provided => ({
            ...provided,
            color: 'black'
          }),
          singleValue: provided => ({
            ...provided,
            color: 'black'
          })
        }}
        closeMenuOnSelect={false}
      />
      {
        teamsState.length > 0
          ? teamsState.map((team: TeamListItem, index: number) => <PokemonListCard key={index} team={team} />)
          : <h2>No teams available</h2>
      }
    </div>
  );
}

export default PokemonList