const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [ type ] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json()) //acessa url, busca os detalhes em http e converte a response p/ jsom
        .then(convertPokeApiDetailToPokemon)
}

//consumir api
pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`
    
    //1ª request fetch (manipulações HTTP)
    return fetch(url)                                                //buscar a lista de pokemons (é uma response promise, um processamento assíncrono)
        .then( (response) => response.json())                        //recebe a busca http response, converte o body para json e retorna n promises 
        .then( (jsonBody) => jsonBody.results)                       //de (n) promises convertidas p/ json, selecionar apenas results
        .then( (pokemons) => pokemons.map(pokeApi.getPokemonDetail)) //mapeia/converte p/ uma lista de detalhes dos pokemons
        .then( (detailRequest) => Promise.all(detailRequest))        // espera p/ que todos as requisições terminem
        .then( (pokemonsDetails) => pokemonsDetails)                 // terminado, retorna uma lista c/ os detalhes em json

        .catch( (error) => console.error(error))
        .finally( () => console.log('Requisição concluída!'))
}



//recebendo uma lista (array de promises)
