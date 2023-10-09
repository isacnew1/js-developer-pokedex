const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 1
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `<div class="detail">
                <span class="name">${pokemon.name}</span>
                <span class="number">#${pokemon.number}</span>
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">

                    

            </div>  
            
            <div class="about">
                <span>About</span>            
                <span class="caracters">Base Stats</span>
                <span class="caracters">Evolution</span>  
                <span class="caracters">Moves</span>

                <div class="label">
                    <span class="description"> Abilities</span>

                    <ol class="abilities">
                        ${pokemon.abilities.map((ability) => `<li>${ability}</li>`).join('')}
                    </ol>
                <div>

                

            
            </div>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit )

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})