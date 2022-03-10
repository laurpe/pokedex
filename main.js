// fetch pokemon names and create grid
fetch("https://pokeapi.co/api/v2/pokemon?limit=25&offset=25")
    .then((response) => response.json())
    .then((data) => {
        data.results.forEach((item) => {
            addPokemon(item.name);
        });
    });

const addPokemon = async (name) => {
    // fetch image for pokemon
    let url = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then((response) => response.json())
        .then((data) => {
            return data.sprites.other.dream_world.front_default;
        });
    // create grid
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
