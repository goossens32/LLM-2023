import { Book } from "./book.js";

const comicContainer = document.querySelector('.comic-container');
const bookList =    [
                        new Book("E2328-12OPR-5X799-K65J7", "Harry Potter", 2009, 10.99),
                        new Book("5Y648-154RT-L953X-76586", "El Hobbit", 1989, 14.99),
                        new Book("Y6LOP-34562-XDK65-LO686", "Un viaje al centro de la Tierra", 1999, 18.99)
                    ];

bookList.forEach(book => {
    // Utiliza el método render cogido del import de Books
    comicContainer.innerHTML += book.render();
});
// comicContainer.innerHTML = `${book1.render()}`
