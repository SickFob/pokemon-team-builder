import React from 'react';

const PokemonCardBadge = ({ text }: { text: string }) => {
  return (
    <span className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded text-nowrap">{text}</span>
  );
}

export default PokemonCardBadge