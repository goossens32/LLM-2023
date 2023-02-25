const gridContainer = document.querySelector(".grid-container");

let figures = [];

function getFigures (){
    fetch ('./data/figures.json')
        .then (result => result.json())
        .then (data => {
            figures = data;
            renderFigures(figures);
        });
}

function renderFigures(list){
    gridContainer.innerHTML = "";
    list.forEach(item => {
        gridContainer.innerHTML += `
        <div class="card">
            <div class="favorite"><i class="fas fa-heart"></i></div>
            <div class="img"><img src="./img/${item.img}" alt=""></div>
            <div class="figure-info">
                <h4 class="figure-name">${item.name}</h4>
                <p class="description">${item.description}</p>
                <div class="price">
                    <p class="price">${item.price} €</p>
                    <button>Comprar</button>
                </div>
            </div>
        </div>
        `
    });
}
function init() {
    getFigures();
}
init()