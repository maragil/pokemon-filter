const pokemonList = document.querySelector('#pokemonList');
const headerBtn = document.querySelectorAll('.btn-header');
let URL = "https://pokeapi.co/api/v2/pokemon/";

for (let i = 1; i <= 500; i++) {
    fetch(URL + i)
        .then((response) => response.json())
        .then(data => showPokemon(data))
}

function showPokemon(data) {

    // let types = data.types.map(eachType => eachType.type.name);
    // console.log(types)

    let types = data.types.map((eachType) =>
        `<p class="type ${eachType.type.name}">${eachType.type.name}</p>`);
        types = types.join('');

    //Completar id con 0 (#001, #015)
    let pokeId = data.id.toString();
    if(pokeId.length === 1) {
        pokeId = '00' + pokeId; //si es = 1 le agrega dos 0 al comienzo
    } else if (pokeId.length === 2) {
        pokeId = '0' + pokeId; //si es = 2 le agrega un 0 al comienzo
    }

    const createPokeCard = document.createElement('div');
    createPokeCard.classList.add('pokemon');
    createPokeCard.innerHTML = `
    <div class="pokemon-img">
        <img src="${data.sprites.other['official-artwork'].front_default}" alt=${data.name}>
    </div>
    <div class="pokemon-info">
        <div class="container-name">
            <p class="pokemon-id">#${pokeId}</p>
            <h2 class="pokemon-name">${data.name}</h2>
        </div>
        <div class="pokemon-types">
            ${types}
        </div>
        <div class="pokemon-stats">
            <p class="stat">${data.height}m</p>
            <p class="stat">${data.weight}Kg</p>
        </div>
    </div>`;
    pokemonList.append(createPokeCard);
}

//img src="${data.sprites.other['official-artwork'].front_default} --> usa los corchetes para poder acceder a la propiedad dentro del objeto.

//let types --> con un map trae el array q hay dentro de types con los tipos q puede ser cada pokemon, para acceder a cada una de esas propiedades y sacar el type.name de cada uno de ellos (types.type.name)

//types = types.join(''); --> agrupa todos los elementos del array en un string.

//let pokeId = data.id.toString() --> convierte un nº a string para poder saber q longitud tiene, xq con números no se puede hacer.


//Agregar evento a cada botón del header:
headerBtn.forEach(eachBtn => eachBtn.addEventListener('click', (ev) => {
    const idBtn = ev.currentTarget.id;

    pokemonList.innerHTML = '';

    for (let i = 1; i <= 151; i++) {
        fetch(URL + i)
            .then((response) => response.json())
            .then(data => {

                if(idBtn === 'see-all'){
                    showPokemon(data);
                } else {
                    const types = data.types.map(eachType => eachType.type.name);
                if(types.some(eachType => eachType.includes(idBtn))) {
                    showPokemon(data);
                }
                }
            })
    }
}))

//const types = data.types.map(eachType => eachType.type.name) --> trae los nombres de los tipos. Guarda por cada pokemon en types un array con los tipo q tiene cada uno.

// if(types.some(eachType => eachType.includes(idBtn)))  showPokemon(data) --> busca si en el array de los tipos de pokemon que se va trayendo, se incluye el id del botón q se pulsa. Si sucede, q muestre los pokemons con su data.

//pokemonList.innerHTML = ''; --> vaciar el innerHTML.

//if(idBtn === 'see-all'){showPokemon(data); --> si el id del btn es = a see-all, entonces se muestran todos los pokemon --> showPokemon(data), sino q busque los tipos y haga el if de types.