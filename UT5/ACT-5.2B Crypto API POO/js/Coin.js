export default class Coin{
    constructor(props){
        this.name = props.name;
        this.image = props.image;
        this.price = props.current_price;
        this.priceChange = props.price_change_24h;3
    }

    render(){
        return  `
            <div class="name-img">
                <img src="${this.image}">
                ${this.name}
            </div>
            <div>${this.price} $</div>
            <div class="${this.priceChange > 0?"green":"red"}">
                ${this.priceChange} $
            </div>
        `;
    }

}