const grid = document.querySelector("#grid");

const fetchData = () => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=25&offset=0")
        .then((response) => response.json())
        .then((data) => {
            // const fetches = data.results.map((item) => {
            //     return fetch(item.url).then((response) => response.json());
            // });
            // Promise.all(fetches).then((response) => {
            //     console.log("promise all result", response);
            //     console.log(response[0].types);
            // });

            input.addEventListener("keyup", () => {
                grid.innerHTML = "";
                data.results.forEach((item) => {
                    if (item.name.includes(input.value)) {
                        addPokemon(item.name);
                    }
                });
            });

            data.results.forEach((item) => {
                addPokemon(item.name);
            });
        });
};
fetchData();

const addPokemon = async (name) => {
    // fetch data for pokemon
    let data = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then((response) => response.json())
        .then((data) => {
            return data;
        });

    let types = data.types.map((item) => item.type.name).join(", ");

    // create grid

    grid.insertAdjacentHTML(
        "beforeend",
        `<div class="card">
        <div class="img">
            <img src="${data.sprites.other.dream_world.front_default}" alt="${name}" />
        </div>
        <div class="title">
            ${name} (${types})
        </div>
    </div>`
    );
};

const input = document.querySelector("#search");
const form = document.querySelector("#search-form");

form.addEventListener("submit", (event) => {
    event.preventDefault();
});
