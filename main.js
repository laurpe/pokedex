// fetch pokemon names and create grid
fetch("https://pokeapi.co/api/v2/pokemon?limit=25&offset=25")
    .then((response) => response.json())
    .then((data) => {
        data.results.forEach((item) => {
            addPokemon(item.name);
        });
    });

// fetch image link for pokemon
const getImageUrl = async (name) => {
    return await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data.sprites.other.dream_world.front_default);
        });
};

const addPokemon = (name) => {
    let url = "";
    const grid = document.querySelector("#grid");
    grid.insertAdjacentHTML(
        "beforeend",
        `<div class="card">
        <div class="img">
            <img src="${url}" alt="pokemon" />
        </div>
        <div class="title">
            ${name}
        </div>
    </div>`
    );
};
