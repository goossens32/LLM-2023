import { Authors } from "./author.js";
// Crear clase, con export permite importar esta clase desde afuera.
export class Book {
    // Variable estática
    static stock = 10;
    // Método que inicializa el objeto posteriormente
    constructor (isbn, title, releaseYear, price, authorList){
        // Las propiedades no tienen por que llamarse igual
        this.isbn = isbn;
        this.title = title;
        this.releaseYear = releaseYear;
        this.price = price;
        this.authorList = authorList;
        // Cada vez que se ejecuta el constructor se reduce en 1 el stock
        Book.stock = Book.stock - 1;
    }
    // Atributo privado, solo se puede acceder desde dentro de la clase, por defecto son públicos
    #active = true;

    // Método (Como si fuese una función)
    priceWithTax(){
        return this.price * 1.1;
    }
    render(){
        let authors = "";
        this.authorList.forEach(author => {
            authors += author.render();
        });

        return `
       <article>
            <p style="text-align:center;">${this.isbn}</p>
            <h2>${this.title}</h2>
            <p>${this.releaseYear}</p>
            <p class="price">${this.price} €</p>
            <p>${authors}</p>
        </article>
        `
    }

    sale(){
        if (this.#active) {console.log("Está a la venta.");}
        else {console.log("No se puede vender.");}
    }

    // Método estático, no pertenece a un objeto en concreto.
    // static tax(){
    //     return "10%";
    // }
}

// Con new permite crear un nuevo objeto dentro de la clase Book
// const book1 = new Book("E2328-12OPR-5X799-K65J7", "Harry Potter", 2009, 10.99);
// const book2 = new Book("5Y648-154RT-L953X-76586", "El Hobbit", 1989, 14.99);
// const book3 = new Book("Y6LOP-34562-XDK65-LO686", "Un viaje al centro de la Tierra", 1999, 18.99);

// console.log(book1.price);
// console.log(book1.priceWithTax());
// console.log(book2.render());
// book2.sale();

// Por cada book que se cree se irá reduciendo el stock, al haber 10 y se crean 3 quedarían 7
// console.log(Book.stock);

// Herencia de clase
// class Comic extends Book{
//     constructor (isbn, title, releaseYear, price, volume){
//         // Con super haces referéncia a cuales són las propiedades heredadas de master.
//         super (isbn, title, releaseYear, price)
//         this.volume = volume;
//     }
// }

// const comic1 = new Comic ("PLD09-EJFU3-342JS-303K2", "La Patrulla X", 2022, 14.99, 1);
// console.log(comic1.priceWithTax());