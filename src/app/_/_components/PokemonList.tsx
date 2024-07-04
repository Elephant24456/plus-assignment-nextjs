'use client';

import React from 'react';
import axios from 'axios';
import { Pokemon } from '../_types/pokemontype';
import Image from "next/image";

const PokemonList: React.FC = () => {
    const [pokemons, setPokemons] = React.useState<Pokemon[]>([]);

    React.useEffect(() => {
        const fetchPokemons = async () => {
            try {
                console.log(window);
                const response = await axios.get<{ Pokemon: Pokemon[] }>('/api/pokemons');
                setPokemons(response.data.Pokemon ?? []);
            } catch (error) {
                console.error('Error fetching Pokemon data:', error);
            }
        };
        fetchPokemons();
    }, []);

    return (
        <div>
            <h1>Pokemon List</h1>
            <ul>
                {pokemons.map((pokemon) => (
                    <li key={pokemon.id}>
                        <Image src={pokemon.sprites.front_default} alt={pokemon.name} />
                        <h2>{pokemon.name} ({pokemon.korean_name})</h2>
                        <p>Height: {pokemon.height}</p>
                        <p>Weight: {pokemon.weight}</p>
                        <p>Types: {pokemon.types.map((type) => type.type.korean_name).join(', ')}</p>
                        <p>Abilities: {pokemon.abilities.map((ability) => ability.ability.korean_name).join(', ')}</p>
                        <p>Moves: {pokemon.moves.map((move) => move.move.korean_name).join(', ')}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PokemonList;
