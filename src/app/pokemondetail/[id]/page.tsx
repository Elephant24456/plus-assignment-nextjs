// import React from "react";
// import { fetchPokemonData } from "@/pokemonapi/pokemon"
// import Link from "next/link";
// import Image from "next/image";
// import { Pokemon } from "@/app/_/_types/pokemontype"; // 이 부분 추가

// const PokemonDetail = async ({ params }: { params: { id: string } }) => {
//     const pokemon: Pokemon = await fetchPokemonData(params.id); // 타입 지정

//     return (
//         <div>
//             <h1>{pokemon.name} ({pokemon.korean_name})</h1>
//             <Image src={pokemon.sprites.front_default} alt={pokemon.name} width={200} height={200} />
//             <p>Height: {pokemon.height}m</p>
//             <p>Weight: {pokemon.weight}kg</p>
//             <h2>Types</h2>
//             <ul>
//                 {pokemon.types.map((type, index) => (
//                     <li key={index}>{type.type.name} ({type.type.korean_name})</li>
//                 ))}
//             </ul>
//             <h2>Abilities</h2>
//             <ul>
//                 {pokemon.abilities.map((ability, index) => (
//                     <li key={index}>{ability.ability.name} ({ability.ability.korean_name})</li>
//                 ))}
//             </ul>
//             <h2>Moves</h2>
//             <ul>
//                 {pokemon.moves.map((move, index) => (
//                     <li key={index}>{move.move.name} ({move.move.korean_name})</li>
//                 ))}
//             </ul>
//         </div>
//     );
// }

// export default PokemonDetail;
import React from "react";
import { fetchPokemonData } from "@/pokemonapi/pokemon"
import Link from "next/link";
import Image from "next/image";

const PokemonDetail = async ({ params }: { params: { id: string } }) => {
    const pokemon = await fetchPokemonData(params.id);

    return (
        <div className="pokemon-details max-w-xl mx-auto shadow-lg overflow-hidden">
            <div className="bg-gray-100 text-gray-800 text-center p-4">
                <h2 className="text-2xl font-bold">{pokemon.korean_name}</h2>
                <p>No. {pokemon.id.toString().padStart(3, "0")}</p>
            </div>
            <div className="p-4 text-white flex flex-col justify-start items-center">
                <Image src={pokemon.sprites.front_default} alt={pokemon.korean_name} className="mx-auto" width={96} height={96} />
                <p className="text-center text-xl my-2">이름: {pokemon.korean_name}</p>
                <div className="flex gap-2">
                    <p className="text-center">키: {pokemon.height / 10} m</p>
                    <p className="text-center">몸무게: {pokemon.weight / 10} kg</p>
                </div>
                <div className="text-center my-2">
                    <p className="font-bold mb-5">기술</p>
                    <div className="flex flex-wrap gap-2 items-center text-center justify-center">
                        {pokemon.moves?.map((move: any) => (
                            <div key={move.move.name} className="text-white">
                                {move.move.korean_name}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="text-center mt-4">
                    <Link href="/" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors duration-300">
                        뒤로 가기
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default PokemonDetail;