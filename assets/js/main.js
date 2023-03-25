let pokemonList = document.querySelector('#pokemon-list')


window.addEventListener('scroll', lazyLoad)

function lazyLoad()
{
    if (window.scrollY+617+60 >= document.body.scrollHeight){
        window.removeEventListener('scroll', lazyLoad)
        cards()
    }
}

const cards = getPokemonsCards()

function getPokemonsCards(){
    let offset = 0
    let limit = 36
    const qntdMax = 151
    function play(){
        pokeApi.getPokemons(offset, limit)
            .then(pokemonDetails => pokemonDetails.map(detail => convertPokeApiToPokemon(detail)))
            .then((pokemons = []) => {
                pokemonList.innerHTML += pokemons.map(pokemon => convertPokemonToLi(pokemon)).join('')
                offset += limit
                if (offset+limit > qntdMax)
                {
                    if (offset == qntdMax){
                        console.log("Chegou no limite")
                    }
                    else {
                        limit = qntdMax - offset
                        window.addEventListener('scroll', lazyLoad)
                    }
                }
                else {window.addEventListener('scroll', lazyLoad)}
                
            })
    }
    return play
}

cards()

function convertPokeApiToPokemon(pokemonDetail){
    const pokemon = new Pokemon()
    pokemon.name = pokemonDetail.name
    pokemon.number = pokemonDetail.id
    pokemon.photo = pokemonDetail.sprites.other.dream_world.front_default
    const types = pokemonDetail.types.map(item => item.type.name)
    const [type] = types
    pokemon.types = types
    pokemon.type = type
    return pokemon
}

function convertPokemonToLi(pokemon){
    return `
    <li class="pokemon ${pokemon.type}">
        <span class="number">#${pokemon.number}</span>
        <span class="name">${pokemon.name}</span>

        <div class="detail">
            <ol class="types">${pokemon.types.map(item => `<li class="type ${item}">${item}</li>`).join('')}</ol>

            <div class="img-container"><img class="poke-img" src=${pokemon.photo}
                alt=${pokemon.name}></div>
        </div>
    </li>
    `
}