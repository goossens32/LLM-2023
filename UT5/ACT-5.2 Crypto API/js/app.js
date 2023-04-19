const conatiner = document.querySelector('#container');

async function getData() {
    // La API tiene límite de peticiones.
    const APIurl = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";
    try {
        // Utilizar const APIurl dentro del fetch para usar la API, de momento utilizar JSON local.
        const response = await fetch('./data/markets.json');
        const data = await response.json();
        renderCoins(data);

    } catch (error) {
        console.log(error);
    }
}

function renderCoins(coins) {
    conatiner.innerHTML = `
        <div>#</div>
        <div>Name</div>
        <div>Price</div>
        <div>Price change 24h</div>
    `;
    coins.forEach((coin, index) => {
        conatiner.innerHTML += `
            <div>${index + 1}</div>
            <div class="name-img">
                <img src="${coin.image}">
                ${coin.name}
            </div>
            <div>${coin.current_price} $</div>
            <div class="${coin.price_change_24h > 0?"green":"red"}">
                ${coin.price_change_24h} $</div>
        `;
    });
}

function init() {
    getData();
};
init();