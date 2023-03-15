const gridContainer = document.querySelector('.grid-container');
const cartContainer = document.querySelector('.cart-items');
const cartTotalContainer = document.querySelector('.cart-total');
const darkModeBtn = document.querySelector('#dark-mode');

let shirtList = [];
let cart = [];

const init = async () => {
    // Init
    // GET a JSON de las camisetas
    const response = await fetch('./data/tshirts.json');
    shirtList = await response.json();
    // Cuando tenga el JSON ejecuta renderShirts
    renderShirts(shirtList);
    // Si se encuentra algún item del carrito en localStorage los carga
    loadCartLS();
    // Aplica función a icono para cambiar de modo claro a oscuro
    darkModeBtn.addEventListener("click", changeDarkMode)
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
                <div class="button" onclick="addItem(${item.id})"><button>Comprar</button></div>
            </div>
        </div> 
        `
        gridContainer.innerHTML += card;
    });
};

const getColors = (colorArray) => {
    let colorsHTML = "";
    // Crea un ARRAY del JSON tshirts.colors
    colorArray.forEach(color => {
        // Por cada item de ARRAY pinta un DIV con background color
        // EJ [azul, rojo, negro] --> Pintará 3 DIV's con el background-color de cada valor
        colorsHTML += `<div style="background-color:${color}; border: 1px solid rgba(128, 128, 128, 0.404); border-radius:50%;"></div>`
        // Debug -> console.log(color);
    });
    // Debug -> console.log(colorArray);
    return colorsHTML;
};

const renderCart = () => {
    cartContainer.innerHTML = "";
    cart.forEach(item => {
        cartContainer.innerHTML += `
        <div class="cart-e">
            <h4>${item.name}</h4>
            <p>${item.price} €</p>
            <p>${item.quantity}</p>
            <button id="btn-delete" class="delete-element" onclick="deleteCartItem(${item.id})"><i class="fa-solid fa-xmark"></i></button>
        </div>
        `
    });

    let total = cart.reduce((total, addProduct) => total += (addProduct.price * addProduct.quantity), 0);
    cartContainer.innerHTML += `
        <div class="cart-total">
            <div>Total compra:</div>
            <div>${total} €</div>
        </div>
    `
}

const addItem = (idItem) => {
    // Añade al carrito los elementos del JSON que coincidan con el
    // id que estará en el onlcick del botón en renderShirts()
    let shirt = shirtList.find(item => item.id == idItem);
    let addProduct = {
        "id": shirt.id,
        "name": shirt.name,
        "price": shirt.price,
        "quantity": 1
    };

    if (cart.some (item => item.id == idItem)){
    cart = cart.map ( e => {
        
        if (e.id != e.idItem) return e;
        // Si ya se encuentra item en cart añade el mismo sumando a unidad 
        // siempre y cuando haya stock disponible
        if (shirt.stock > e.quantity){
            e.quantity++;
        }
        // En caso de no haber Stock no agregará item a cart y aparecerá alert!!
        else {alert("Sin stock disponible")}
        return e;
    });
    }
    else {cart.push(addProduct);}
    
    // Guarda en localStorage el contenido del carrito
    localStorage.setItem("cart", JSON.stringify(cart));

    renderCart();
};

const deleteCartItem = (idItem) => {
    cart = cart.filter(e => e.id != idItem);
    localStorage.setItem("cart", JSON.stringify(cart))

    renderCart();
}

const loadCartLS = () => {
    if (localStorage.getItem("cart")) {
        cart = JSON.parse (localStorage.getItem("cart"));
        console.table(cart);
    }
    else {cart = [];}
    renderCart();
}










const changeDarkMode = () => {
    if (darkModeBtn.classList.contains("fa-sun")) darkModeBtn.classList.replace("fa-sun", "fa-moon");
    else darkModeBtn.classList.replace("fa-moon", "fa-sun");

    const domElements = document.querySelectorAll('body, .card');
    domElements.forEach(e => {
        e.classList.toggle("dark");
    })
}

const renderView = (n) => {
    if (n === 6) {gridContainer.classList.replace("grid4", "grid6");}
    else {gridContainer.classList.replace("grid6", "grid4");}
}
