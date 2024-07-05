"use client";

import React from 'react';
import { Pokemon } from '../_types/pokemontype';
import Image from "next/image";
import Link from 'next/link';

const PokemonList: React.FC = () => {
    const [pokemons, setPokemons] = React.useState<Pokemon[]>([]);
    const [isLoading, setIsLoading] = React.useState(false);

    React.useEffect(() => {
        const fetchPokemons = async () => {
            try {
                setIsLoading(true);
                const response = await fetch("/api/pokemons");
                const data = await response.json();
                setPokemons(data);
            } catch (error) {
                console.error("Error fetching pokemons:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchPokemons();
    }, []);

    return (
        <div>
            {isLoading ? (
                <div className="flex justify-center items-center h-screen">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
                    <p className="text-xl text-white">불러오는 중입니다...</p>
                </div>
            ) : (
                <div className="grid grid-cols-6 gap-6 mt-2 mx-2">
                    {pokemons.map((pokemon) => (
                        <Link
                            href={`/pokemondetail/${pokemon.id}`}
                            key={pokemon.id}
                            className="bg-black shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition duration-300 border border-white"
                        >
                            <div className="flex flex-col items-center p-4">
                                <Image
                                    src={pokemon.sprites.front_default}
                                    alt={pokemon.name}
                                    width={96}
                                    height={96}
                                />
                                <h2 className="text-lg font-bold mt-2 text-white">
                                    {pokemon.korean_name}
                                </h2>
                                <p className="text-white">도감번호: {pokemon.id}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>

    );
};

export default PokemonList;
