import React from 'react';

interface PokemonImageProps {
  sprite: string,
  width?: number,
  height?: number
}

const PokemonImage = ({ sprite, width = 100, height = 100 }: PokemonImageProps) => {
  return (
    <img
      src={sprite}
      alt="Pokemon's picture"
      width={width}
      height={height}
    />
  );
}

export default PokemonImage