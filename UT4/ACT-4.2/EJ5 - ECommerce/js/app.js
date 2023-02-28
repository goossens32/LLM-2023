const gridContainer = document.querySelector('.grid-container');

let shirtList = [];
let cart = [];

const init = async () => {
    const response = await fetch('./data/tshirts.json');
    shirtList = await response.json();
    renderShirts(shirtList)
};
init();

const renderShirts = (shirts) => {
    gridContainer.innerHTML = "";

    shirts.forEach(item => {
        let card = `
        <div class="card">
            <div class="img"><img src="./img/${item.image}" alt=""></div>
            <div class="shirt-info">
                <h3>${item.name}</h3>
                <div class="colors">
                    ${getColors(item.colors)}
                </div>
                <p>${item.price} €</p>
                <div class="button"><button>Comprar</button></div>
            </div>
        </div> 
        `
        gridContainer.innerHTML += card;
    });
};

const getColors = (colorArray) => {
    let colorsHTML = "";
    colorArray.forEach(color => {
        colorsHTML += `<div style="background-color:${color}; border: 1px solid rgba(128, 128, 128, 0.404);"></div>`
        // Debug -> console.log(color);
    });
    return colorsHTML;
}