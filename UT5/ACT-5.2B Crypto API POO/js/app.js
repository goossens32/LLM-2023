import CoinList from "./CoinList.js";
const conatiner = document.querySelector('#container');

async function getData() {
    // La API tiene límite de peticiones.
    const APIurl = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";
    try {
        // Utilizar const APIurl dentro del fetch para usar la API, de momento utilizar JSON local.
        const response = await fetch('./data/markets.json');
        const data = await response.json();
        // Dónde va a pintar los datos (container) y que datos va a pintar (data)
        const list = new CoinList(conatiner, data);
        list.render();
    } catch (error) {
        console.log(error);
    }
}

function init() {
    getData();
};
init();