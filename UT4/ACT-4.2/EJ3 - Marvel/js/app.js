const gridContainer = document.querySelector('.grid-container');
const priceMin = document.querySelector('#min-value');
const priceMax = document.querySelector('#max-value');
const filterBtn = document.querySelector('#filter-btn');

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
    favorites();
}

function favorites(){
    const favButton = document.querySelectorAll('.fa-heart');
    favButton.forEach(button => {
        button.addEventListener("click", function(){
            this.classList.toggle("on");
        })
    });
}

function filterFigures(){
    const selectOrder = document.getElementById("order-filter");
    let orderValue = selectOrder.value
    // console.log(orderValue);
    let list = figures
    .filter(item => (item.price >= priceMin.value && item.price <= priceMax.value))
    .sort((a, b) => {
        // Ordena de A-Z si value de option en select == 1
        if (a.name > b.name && orderValue == 1) return 1;
        // Ordena de Z-A si value de option en select == 2
        if (a.name < b.name && orderValue == 2) return -1;
        return 0;
    })
    if (list.length === 0) alert("No hay figuras que coincidan con el filtro")
    // Si no encuentra ninguna figura devuelve Alert
    
    else renderFigures(list)
    //console.log(list);
}

function init() {
    getFigures();
    filterBtn.addEventListener("click", filterFigures)
}
init()