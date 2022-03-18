const grid = document.querySelector("#grid");

let pokemons = [];

const fetchData = () => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=25&offset=0")
        .then((response) => response.json())
        .then((data) => {
            const fetches = data.results.map((item) => {
                return fetch(item.url).then((response) => response.json());
            });
            Promise.all(fetches).then((response) => {
                pokemons = response;
                createGrid(pokemons);
            });
        });
};
fetchData();

const createGrid = async (data) => {
    console.log(data);
    data.forEach((item) => {
        let types = item.types.map((item) => item.type.name).join(", ");
        grid.insertAdjacentHTML(
            "beforeend",
            `<div class="card ${item.types[0].type.name}">
            <div class="bg-fill"></div>
                <div class="img">
                    <img src="${item.sprites.other.dream_world.front_default}" alt="${item.name}" />
                </div>
                <div class="title">
                    ${item.name} (${types})
                </div>
            </div>`
        );
    });
};

const input = document.querySelector("#search");
const form = document.querySelector("#search-form");

form.addEventListener("submit", (event) => {
    event.preventDefault();
});

input.addEventListener("keyup", () => {
    grid.innerHTML = "";
    list = pokemons.filter((item) => {
        return item.name.includes(input.value);
    });
    createGrid(list);
});
