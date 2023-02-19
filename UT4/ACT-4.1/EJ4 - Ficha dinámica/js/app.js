const filmContainer = document.querySelector("#film-container");
let films = [];

async function getFilms() {
    const response = await fetch('../EJ3 - Objetos JSON/movie.json')
    const data = await response.json();
    printFilms(data)
}

function printFilms(list){
    filmContainer.innerHTML = "";
    list.forEach(film => {
        filmContainer.innerHTML += `
        <div class="card">
        <div class="img"><img src="./img/${film.img}" alt=""></div>
        <div class="film-info">
            <h2>${film.title}</h2>
            <dl>
                <dt>Sinopsis:</dt>
                <dd>${film.synopsis}</dd>
            </dl>
            <dl>
                <dt>Género:</dt>
                <dd>${film.genre.join(", ")}</dd>
            </dl>
            <dl>
                <dt>Estreno:</dt>
                <dd>${film.premiere ? "Si" : "No"}</dd>
            </dl>
            <dl>
                <dt>Edad:</dt>
                <dd>${film.age}</dd>
            </dl>
            <dl>
                <dt>Sesiones:</dt>
                <dd class="sessions">
                    ${film.sessions.join(", ")}
                </dd>
            </dl>
        </div>
    </div>
        `
    });
}


function init() {
    getFilms();
}
init();