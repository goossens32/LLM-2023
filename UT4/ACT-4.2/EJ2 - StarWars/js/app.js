// Contants amb les referencies als elements HTML
const listTag = document.querySelector('#figures-list');
const priceTag = document.querySelector('#filter-price');
const priceMinTag = document.querySelector('#filter-min-price');
const btnFiltrarTag = document.getElementById("btn-filter");

let figuresList = [];

/*
La función espera a recoger los datos del JSON antes de seguir con el código
async function getFigures(){
    const response = await fetch('./data/star-wars-figures.json')
    const data = await response.json();
    printFigures(data)
}
*/

// Petició asíncona per recuperar les figures
function getFigures() {
    fetch('./data/star-wars-figures.json')
        .then(res => res.json())
        .then(data => {
            figuresList = data;
            printFigures(figuresList);
    });
}

// Crea les cards HTML de cada figura 
function printFigures(listJSON) {
    listTag.innerHTML = "";

    listJSON.forEach(figure => {
        listTag.innerHTML += `
        <article class="card">
            <img src="./img/${figure.photo}" alt="">
            <h3>${figure.name}</h3>
            <span>${figure.price} €</span>
            <div class="favorite">
                <i class="fas fa-heart"></i>
            </div>
        </article>
        `    
    });
    setFavourites();
}

// Intercanvia el icone de favorit
function setFavourites() {
    // Crea constante All para clase de font awesome
    const favoriteIcon = document.querySelectorAll('.fa-heart');
        // Por cada icono añade función on click
        favoriteIcon.forEach(icon => {
            icon.addEventListener("click", function(){
                // Si la clase ".ON" no está activada la activará, si está ya activada la eliminará.
                // En este caso "on" cambia de color el corazón de FontAwesome cada vez que se haga click en el.
                this.classList.toggle("on");
            });
        });
}

// TODO: Filtra les figures per preu i les ordena
function filterFigures() {
    // list = Array JSON con fetch
    let list = figuresList
        // Con .filter las condiciones y devuelve un nuevo Array con JSON.
        .filter(e => (e.price >= priceMinTag.value && e.price <= priceTag.value))
        // Ordenar. Si alfabeticamente a > que b . a se pondrá a la izquierda
        // Hará esta función con todos los objetos del Array filtrado
        .sort((a, b) => {
            // Ordena de major a menor pel nom
            if (a.name > b.name) return 1;
            if (a.name < b.name) return -1;
            return 0;
        });
        // Si el resultado del filtro no obtiene ninguna figura aparece mensaje.
        if (list.length === 0) listTag.innerHTML = "No hay figuras que coincidan con el filtro";
        // Vuelve a "pintar" la lista de figuras pero esta vez filtrado.
        else printFigures(list)
}

/*
// Filtre amb programació funcional
function filterFigures() {
    let list =[];
    for (let figure of figuresList){
        // El valor de la figura debe estar entre el mínimo y el máximo especificado
        if (figure.price>=priceMinTag.value && figure.price<=priceTag.value ){
            list.push(figure);
        }
    }
    if (list.length == 0) {
        listTag.innerHTML = "No hay figuras que coincidan con el filtro";
    } else {
        printFigures(list);
    }
}
*/

// Funció inicial de càrrega de la página
function init() {
    getFigures();
    btnFiltrarTag.addEventListener("click", filterFigures);
}
init();