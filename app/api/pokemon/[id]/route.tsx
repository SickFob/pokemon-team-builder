import { PokemonApi } from '@/app/types'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const url: string = `https://pokeapi.co/api/v2/pokemon/${params.id}`;
  const headers: RequestInit = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  return fetch(url, headers)
    .then(async response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const result = await response.json() as Promise<PokemonApi>
      return NextResponse.json(result);
    }).catch((error) => {
      throw new Error(error);
    })
}