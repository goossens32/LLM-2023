const bookContainer = document.querySelector('.book-container');
const input = document.querySelector('#input');

let bookList = [];

const init = async () => {
    const response = await fetch('./data/books.json');
    bookList = await response.json();
    renderBooks(bookList);
    input.addEventListener("keyup", function(){
        if (this.value.length >= 3) {
            let titleSearch = this.value.toLowerCase();
            let result = bookList.filter(
                (book) => {
                    let title = book.title.toLowerCase();
                    return title.indexOf(titleSearch) > -1;
                }
            );
            renderBooks(result);
        }
        else if (this.value.length == 0){
            renderBooks(bookList);
        }
    });
}
init();

const renderBooks = (book) => {
    bookContainer.innerHTML = "";
    book.forEach(e => {
        bookContainer.innerHTML += `
        <div class="book">
            <div class="title">${e.title}</div>
            <div class="author">${e.author}</div>
            <div class="year">${e.year}</div>
            <div class="price">${e.price} €</div>
        </div>
        `
    });
}

const searchBooks = () => {
    
}