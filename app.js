async function fetchPokemons() {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100");
    const data = await response.json();
    return data.results;
}
async function getPokemonDetails(pokemonUrl) {
    const response = await fetch(pokemonUrl);
    const data = await response.json();
    return {
        name: data.name,
        pic: data.sprites.front_default,
        type: data.types[0].type.name
    };
}

const characterContainer = document.getElementById("characterContainer");
const searchInput = document.getElementById("searchInput");
const divInput = document.getElementById("divInput");

const newCards = (pokemons) => {
    characterContainer.innerHTML=""
    pokemons.forEach((pokemon) => {
        const divCards=document.createElement("div")
        divCards.classList.add( "bg-gray-800",
            "w-60",
            "m-2",
            "p-4",
            "rounded-lg",
            "shadow-lg",
            "transition",
            "duration-300",
            "hover:scale-105",
            "flex",
            "flex-col",
            "items-center",
            "text-center")
            


    })

}
