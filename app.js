const searchInput = document.getElementById("searchInput");
const charactersContainer = document.getElementById("charactersContainer");
const favoritesPanel = document.getElementById("favoritesPanel");
const favoritesList = document.getElementById("favoritesList");

const favorites = [];
const fetchPokemons = async () => {
  try {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100");
    const data = await response.json();
    console.log("Pokémon verisi:", data);
    const pokemons = await Promise.all(data.results.map(async (pokemon) => {
      const detailsResponse = await fetch(pokemon.url);
      const details = await detailsResponse.json();
      return {
        name: pokemon.name,
        type: details.types.map((t) => t.type.name).join(", "),
        pic: details.sprites.front_default,
      };
    }));
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
    "bg-gray-800", "w-60", "m-2", "p-4", "rounded-lg", "shadow-lg", "transition", "duration-300", "hover:scale-105", "flex", "flex-col", "items-center", "text-center", "cursor-pointer")

    divCards.innerHTML = `
      <img src="${pokemon.pic}" alt="${pokemon.name}" class="w-32 h-32 mb-4">
      <h2 class="text-xl font-semibold mt-2">${pokemon.name}</h2>
      <p class="text-sm text-gray-400 mt-2">${pokemon.type}</p>
      <button class="favorite-btn text-red-500 mt-2" onclick="toggleFavorite('${pokemon.name}', this, '${pokemon.pic}')">
        &#9829; Add Favorite
      </button>
      <div id="fav-icon-${pokemon.name}" class="favorite-icon hidden text-red-500 mt-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" d="M3.172 4.828a4 4 0 015.656 0L10 6.343l1.172-1.515a4 4 0 015.656 5.656L10 15.657l-6.828-6.828a4 4 0 010-5.656z" clip-rule="evenodd"/>
        </svg>
      </div>
    `;

    charactersContainer.appendChild(divCards);
  });
};

// Filter and list Pokémon
const filterPokemonName = async () => {
  const pokemons = await fetchPokemons();
  const searchTerm = searchInput.value.toLowerCase();
  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm)
  );
  newCards(filteredPokemons);
};

const toggleFavorite = (pokemonName, button, pokemonPic) => {
  const index = favorites.findIndex((fav) => fav.name === pokemonName);

  if (index === -1) {
    // Favorite
    favorites.push({ name: pokemonName, pic: pokemonPic });
    button.classList.add("text-red-700");
    button.innerHTML = "Remove Favorites";
    document
      .getElementById(`fav-icon-${pokemonName}`)
      .classList.remove("hidden");
    showNotification(`${pokemonName} Add Favorite!`);
    updateFavoritesList();
  } else {
    favorites.splice(index, 1);
    button.classList.remove("text-red-700");
    button.innerHTML = "Add Favorite";
    document.getElementById(`fav-icon-${pokemonName}`).classList.add("hidden");
    showNotification(`${pokemonName} "Remove Favorites!`);
    updateFavoritesList();
  }
};

// Show notification when adding a favorite Pokémon
const showNotification = (message) => {
  const notification = document.createElement("div");
  notification.classList.add("fixed", "top-0", "right-0", "bg-green-500", "text-white", "p-4", "rounded-l-md", "shadow-lg", "animate-slide-in", "transition-all", "duration-500");
  
  notification.innerText = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 3000);
};

const updateFavoritesList = () => {
  favoritesList.innerHTML = "";
  favorites.forEach((pokemon) => {
    const divFavorite = document.createElement("div");
    divFavorite.classList.add("bg-gray-800", "m-2", "p-4", "rounded-lg", "shadow-lg", "flex", "flex-col", "items-center", "text-center", "w-40");

    divFavorite.innerHTML = `
      <img src="${pokemon.pic}" alt="${pokemon.name}" class="w-24 h-24 mb-2">
      <h3 class="text-sm font-semibold">${pokemon.name}</h3>
    `;

    favoritesList.appendChild(divFavorite);
  });
};

(async () => {
  const pokemons = await fetchPokemons();
  newCards(pokemons);
})();
searchInput.addEventListener("input", filterPokemonName);
