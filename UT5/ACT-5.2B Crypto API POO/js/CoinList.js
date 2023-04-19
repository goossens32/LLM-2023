import Coin from "./Coin.js";
export default class CoinsList {
    constructor(container, coins){
        this.container = container;
        this.coins = coins;
    }
    render(){
        this.container.innerHTML = `
        <div>#</div>
        <div>Name</div>
        <div>Price</div>
        <div>Price change 24h</div>
    `;
        this.coins.forEach((coin, index) => {
            const coinObj = new Coin(coin);
            this.container.innerHTML += ` <div>${index + 1}</div>`;
            this.container.innerHTML += coinObj.render();
        });
    }
}