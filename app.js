const searchInput = document.getElementById("searchInput");
const charactersContainer = document.getElementById(
  "charactersContainer"
);

const fetchPokemons = async () => {
  try {
    const response = await fetch(
      "https://pokeapi.co/api/v2/pokemon?limit=100"
    );
    const data = await response.json();
    const pokemons = await Promise.all(
      data.results.map(async (pokemon) => {
        const detailsResponse = await fetch(pokemon.url);
        const details = await detailsResponse.json();
        return {
          name: pokemon.name,
          type: details.types.map((t) => t.type.name).join(", "),
          pic: details.sprites.front_default,
        };
      })
    );
    return pokemons;
  } catch (error) {
    console.error("Pokémon verisi alınırken hata oluştu:", error);
    return [];
  }
};

const newCards = (pokemons) => {
  charactersContainer.innerHTML = "";
  pokemons.forEach((pokemon) => {
    const divCards = document.createElement("div");
    divCards.classList.add(
      "bg-gray-800",
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
      "text-center"
    );

    divCards.innerHTML = `
              <img src="${pokemon.pic}" alt="${pokemon.name}" class="w-32 h-32 mb-4">
              <h2 class="text-xl font-semibold mt-2">${pokemon.name}</h2>
              <p class="text-sm text-gray-400 mt-2">${pokemon.type}</p>
          `;

    charactersContainer.appendChild(divCards);
  });
};

const filterPokemonName = async () => {
  const pokemons = await fetchPokemons();
  const searchTerm = searchInput.value.toLowerCase();
  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm)
  );
  newCards(filteredPokemons);
};

searchInput.addEventListener("input", filterPokemonName);

(async () => {
  const pokemons = await fetchPokemons();
  newCards(pokemons);
})();