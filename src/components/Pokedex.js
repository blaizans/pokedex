import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Pokedex() {
  const [pokemonList, setPokemonList] = useState([]);
  const [nextUrl, setNextUrl] = useState("");
  const [prevUrl, setPrevUrl] = useState("");

  const fetchPokemonData = async (url) => {
    try {
      const response = await axios.get(url);
      const results = response.data.results;

      const pokemonDetails = await Promise.all(
        results.map(async (pokemon) => {
          const detailsResponse = await axios.get(pokemon.url);
          return detailsResponse.data;
        })
      );

      setPokemonList(pokemonDetails);
      setNextUrl(response.data.next);
      setPrevUrl(response.data.previous);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchPokemonData("https://pokeapi.co/api/v2/pokemon/?limit=12");
  }, []);

  const handleNext = () => {
    fetchPokemonData(nextUrl);
  };

  const handlePrev = () => {
    fetchPokemonData(prevUrl);
  };

  return (
    <div className="container mx-auto text-center mt-8">
      <h1 className="text-4xl font-bold mb-8">Pokédex</h1>

      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {pokemonList.map((pokemon, index) => (
          <Link to={`/about/${pokemon.id}`} key={index}>
            <li className="border p-4 rounded-lg hover:bg-gray-100 transition duration-300 ease-in-out">
              <div className="grid grid-cols-1 md:grid-cols-2">
                {pokemon.sprites.front_default && (
                  <img
                    src={pokemon.sprites.front_default}
                    alt={pokemon.name}
                    className="mx-auto mb-4"
                  />
                )}
<p className="text-lg font-semibold pt-5 whitespace-pre-line">{`#${pokemon.id} \n ${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}`}</p>
              </div>
            </li>
          </Link>
        ))}
      </ul>
      <div className="mt-8 mb-8">
        {prevUrl && (
          <button
            className="text-2xl font-semibold mr-4 px-4 py-2 bg-blue-500 text-white rounded"
            onClick={handlePrev}
          >
            &lt;---
          </button>
        )}
        {nextUrl && (
          <button
            className="text-2xl font-semibold px-4 py-2 bg-blue-500 text-white rounded"
            onClick={handleNext}
          >
            ---&gt;
          </button>
        )}
      </div>
    </div>
  );
}

export default Pokedex;
