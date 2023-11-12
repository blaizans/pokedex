import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PokemonDetail({ match }) {
  const [pokemonData, setPokemonData] = useState(null);

  useEffect(() => {
    const fetchPokemonData = async () => {
      if (!match.params || !match.params.id) {
        return;
      }

      const url = `https://pokeapi.co/api/v2/pokemon/${match.params.id}/`;
      try {
        const response = await axios.get(url);
        setPokemonData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchPokemonData();
  }, [match.params.id]);

  if (!pokemonData) return <div className="text-center mt-8">Loading...</div>;

  return (
    <div className="container mx-auto text-center mt-8">
      <h1 className="text-4xl font-bold mb-4 pt-20">{pokemonData.name}</h1>
      
      <div className="grid grid-cols-3">
        <div className="flex flex-col justify-center items-center">
          <p className="text-lg font-semibold">Type(s): {pokemonData.types.map((type) => type.type.name).join(', ')}</p>
          <p className="text-lg font-semibold">Height: {pokemonData.height}</p>
          <p className="text-lg font-semibold">Weight: {pokemonData.weight}</p>
        </div>{pokemonData.sprites.front_default && (
        <img
          src={pokemonData.sprites.front_default}
          alt={pokemonData.name}
          className="mx-auto mb-8 rounded-full"
          style={{ width: '200px', height: '200px' }}
        />
      )}
        <div className="flex flex-col justify-center items-center">
          <h2 className="text-lg font-semibold mb-2">Abilities:</h2>
          <ul className="text-left">
            {pokemonData.abilities.map((ability, index) => (
              <li key={index}>{ability.ability.name}</li>
            ))}
          </ul>
          <h2 className="text-lg font-semibold mt-4">Stats:</h2>
          <ul className="text-left">
            {pokemonData.stats.map((stat, index) => (
              <li key={index}>{stat.stat.name}: {stat.base_stat}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default PokemonDetail;
