const similarContainer = document.querySelector(".grid-similares");
let seasonsJSON = [];
let currentSeason = 1;

const getSeries = () => {
    fetch("./data/series.json")
        .then(result => result.json())
        .then(data => {
            // El resultado se pasa a la función renderListSimilars(),
            renderListSimilars(data);
        })
        // En caso de error a la hora de conseguir el JSON muestra log
        .catch(error => {
            console.log(error);
        });
}

const getSeasons = () => {
    fetch("./data/seasons-st.json")
    .then(result => result.json())
    .then(data => {
        seasonsJSON = data.seasons;
        renderSeasons(seasonsJSON);
    })
    .catch(error => {
        console.log(error);
    });
}

const renderListSimilars = (series) => {
    similarContainer.innerHTML = "";
    series.forEach( item => {
        similarContainer.innerHTML += renderCard(item);
    });
}

const renderSeasons = (seasons) =>{
    const currentSeasonStorage = localStorage.getItem("currentSeason");
    // Se recoge el valor de currentSeason desde LS si es que existe se pasa
    // a texto.
    if(currentSeasonStorage) currentSeason = parseInt(currentSeasonStorage, 10);

    const navSeasons = document.querySelector('#nav-temporada');
    navSeasons.innerHTML = "";
    // Se utiliza FOR por que consume menos recursos, no es necesario recorrer toda la
    // estructura JSON
    for (let i = 0; i < seasons.length; i++) {
        // I+1 Por que el índice de ARRAY empieza desde 0
        let numberSeason = i + 1;
        navSeasons.innerHTML += `
            <a 
                id = "season-${numberSeason}"
                onclick="renderEpisodes(${numberSeason})"
                href="#" class=${currentSeason === numberSeason? "active":""}>
                
            Temporada ${i + 1}</a>
        `
    };

    renderEpisodes(currentSeason);
}

const renderEpisodes = (numberSeason) => {
    currentSeason = numberSeason;
    localStorage.setItem("currentSeason", currentSeason);
     // Para cambiar el active del HREF cada vez que se cambie de temporada
    document.querySelector('#nav-temporada .active').classList.remove("active");
    document.querySelector(`#season-${currentSeason}`).classList.add("active");

    const episodesContainer = document.querySelector('.episodes');
   
    // Recoge los episodios del JSON que estén dentro de currentSeason
    const episodes = seasonsJSON.find(season => season.number === currentSeason).episodes;
    episodesContainer.innerHTML = "";
    episodes.forEach(e => {
        episodesContainer.innerHTML += `
        <article class="item-episode">
            <div class="number">${e.number}</div>
            <div class="play-episode">
                <img src="img/${e.image}" alt="">
                <progress value="96" max="100"> 96% </progress>
                <div class="play-episode-icon"></div>
            </div>
            <div class="desc">
                <div class="container-title">
                    <h3>${e.title}</h3>
                    <div class="duration">${e.duration} min</div>
                </div>
                <p>${e.description}</p>
            </div>
        </article>
        `
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
    getSeries();
    getSeasons();
}
init();