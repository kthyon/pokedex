const pokemonContainer = document.getElementById('pokemon-container');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const currentPage = document.getElementById('current-page');
let currentPokemonIndex = 1;

const typeColors = {
    fire: '#F08030',
    water: '#6890F0',
    grass: '#78C850',
    electric: '#F8D030',
    psychic: '#F85888',
    ice: '#98D8D8',
    dragon: '#7038F8',
    dark: '#705848',
    fairy: '#EE99AC',
    normal: '#A8A878',
    fighting: '#C03028',
    flying: '#A890F0',
    poison: '#A040A0',
    ground: '#E0C068',
    rock: '#B8A038',
    bug: '#A8B820',
    ghost: '#705898',
    steel: '#B8B8D0'
};


// Función para cargar un Pokémon específico
async function fetchPokemon() {
    try {
        const url = `https://pokeapi.co/api/v2/pokemon/${currentPokemonIndex}`;
        const response = await fetch(url);
        const pokemon = await response.json();
        displayPokemon(pokemon);

    } catch (error) {
        console.error("Error fetching Pokemon:", error);
    }
}

// Función para mostrar un Pokémon en el contenedor
function displayPokemon(pokemon) {
    pokemonContainer.innerHTML = '';

    const pokemonEl = document.createElement('div');
    pokemonEl.classList.add('pokemon','fade-in');

    // Agregando más información como tipos, habilidades y estadísticas
    const types = pokemon.types.map(type => type.type.name).join(', ');
    const abilities = pokemon.abilities.map(ability => ability.ability.name).join(', ');
    const stats = pokemon.stats.map(stat => `${stat.stat.name}: ${stat.base_stat}`).join(', ');
    const mainType = pokemon.types[0].type.name; // Obtiene el tipo principal del Pokémon
    const color = typeColors[mainType]; // Obtiene el color asociado al tipo principal
    pokemonEl.classList.add('pokemon');
    pokemonEl.style.backgroundColor = color; // Establece el color de fondo

    const pokeInnerHTML = `

            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" class="pokemonimg"/>  
           
            <h2 class="numero"><img src="./img/pokeball.png" width="20">${pokemon.id.toString().padStart(3, '0')}</h2>
            
         
            <h3 class="nombre" >${pokemon.name}</h3>
            <p class="tipop"><b>Tipo:</b><br>${types}</p>
            <p class="detalles"><strong>Habilidades:<br></strong> ${abilities}<br>
            <strong>Estadísticas:</strong> ${stats}</p>
    
    `;

    pokemonEl.innerHTML = pokeInnerHTML;
    pokemonContainer.appendChild(pokemonEl);
    currentPage.innerText = currentPokemonIndex;
}

// Eventos de clic para los botones de paginación
prevBtn.addEventListener('click', () => {
    if (currentPokemonIndex > 1) {
        currentPokemonIndex--;
        fetchPokemon();
    }
});

nextBtn.addEventListener('click', () => {
    currentPokemonIndex++;
    fetchPokemon();
});

// Cargar el primer Pokémon inicialmente
fetchPokemon();
