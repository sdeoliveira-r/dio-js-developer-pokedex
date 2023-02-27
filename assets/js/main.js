//=========== manipulações HTML ===========//

const pokemonList =  document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151;
const limit = 10;
let offset = 0;

//requisições http
//converte uma lista de objetos 'pokemons' em html

    // função transformadora
    // const newList = pokemons.map((pokemon) => convertPokemonToLi(pokemon))
    // juntar elementos e converter a lista p/ string c/ separador vazio
    // const newHtml = newList.join('')
    // pokemonList.innerHTML += newHtml
    //
    //otimização da função acima
    //pokemonList.innerHTML += pokemons.map(convertPokemonToLi).join('')

function convertPokemonToLi(pokemon) {
    return `

        <li class="pokemon  ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.photo}" 
                    alt="${pokemon.name}">
            </div>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit

    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        //remover botão
        loadMoreButton.parentElement.removeChild(loadMoreButton)
       
    } else {
    loadPokemonItens(offset, limit)
    }
})

    
