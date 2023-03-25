const pokeApi = {}

pokeApi.getPokemons = (offset, limit) => {
    url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    return fetch(url)
        .then(response => response.json())
        .then(data => data.results)
        .then(pokemons => pokemons.map(pokemon => pokemon.url))
        .then(urlList => urlList.map(url => fetch(url).then(response => response.json())))
        .then(data => Promise.all(data))
        .then(data => data)
        .catch(err => console.log(err))
}