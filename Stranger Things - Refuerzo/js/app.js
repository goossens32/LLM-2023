const similarContainer = document.querySelector(".grid-similares");

function getSeries() {
    return fetch("./data/series.json")
        .then(result => result.json())
        .then(data => {
            // El resultado se pasa a la función renderListSimilars(),
            renderListSimilars(data);
        })
        // En caso de error a la hora de conseguir el JSON muestra log
        .catch(error => {
            console.log(error);
        })
}

const renderListSimilars = (series) => {
    similarContainer.innerHTML = "";
    series.forEach( item => {
        similarContainer.innerHTML += renderCard(item);
    });
}

const renderCard = (serie) => {

    // Comprobación de si tiene temporadas o es una miniserie o no.
    let time = null;
    if (serie.miniserie) {time = "Miniserie";}
    else if(serie.episodes) {time = serie.episodes + " Episodios";}
    else {time = serie.seasons + " Temporadas"}

    // Comprobación de coincidéncia
    let matchHTML = "";
    if (serie.match > 70) {matchHTML = `<div class="coincidencia">${serie.match}% de coincidencia</div>`}

    // Comprobación estrellas
    let starsHTML = "";
    if (serie.stars){
        for(let i = 0; i < serie.stars; i ++){
            starsHTML += `<div class="star"></div>`
        }
        for(let i = serie.stars; i < 5; i ++){
            starsHTML += `<div class="star-off"></div>`
        }
        starsHTML = `<div class="score">${starsHTML}</div>`
    }

    return `
        <article class="card">
        <div class="season">${time}</div>
        <img src="./img/${serie.cover}" alt="">
        <div class="container">
        ${matchHTML}
            <div class="info-card-container">
                <div>
                    <span class="pegi age-${serie.pegi}">${serie.pegi} +</span>
                    <span class="year">${serie.release}</span>
                    </div>
                    <div>
                        <span class="material-icons btn-icon">add</span>
                    </div>
                </div>
                ${starsHTML}
                <p>${serie.description}</p>
            </div>
        </article>
    `
}

function init() {
    getSeries().then;
}
init();