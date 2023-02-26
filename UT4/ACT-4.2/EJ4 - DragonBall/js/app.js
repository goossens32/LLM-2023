const gridContainer = document.querySelector('#grid-container');
const orderOptions = document.querySelector('#order-options');
const inputText = document.querySelector('#input-text');
const btnFilter = document.querySelector('#btn-filter');
const dialog = document.querySelector('#dialog');
const modal = document.querySelector('.modal');
const btnCloseDialog = document.querySelector('#btn-close')

let charactersList = [];

window.onload = async () => {
    const response = await fetch('./data/characters.json');
    charactersList = await response.json();
    // console.log(charactersList);
    renderCharacters(charactersList);

    orderOptions.addEventListener("change", characterOrder);
    btnFilter.addEventListener("click", characterFilter);
    btnCloseDialog.addEventListener("click", () => {
        dialog.close();
        modal.style.display = "none";
    })
}

const renderCharacters = (characters) => {
    gridContainer.innerHTML = "";
    characters.forEach(item => {
        // Cambiar F o M a Femenino o Masculino en HTML
        let genderText = "";
        if (item.gender === "H") {genderText = "Masculino"}
        else if (item.name === "Cell") {genderText = "Intersexo"}
        else genderText = "Femenino"

        let card = `
        <div class="card">
            <div class="img"><img src="./img/${item.image}" alt=""></div>
            <div class="character-info">
                <h3>${item.name}</h3>
                <p>Planeta: ${item.planet}</p>
                <p>Sexo: ${genderText}</p>
                <p>${item.power} <i class="fa-solid fa-bolt"></i></p>
                <div class="btn-container"><button id="more-info-btn" onclick="showCharacterInfo(${item.id})">Más información</button></div>
            </div>
        </div> 
        `
        gridContainer.innerHTML += card;
    });
}

const characterOrder = () => {
    let index = orderOptions.selectedIndex;
    let option = orderOptions.options[index];
    let orderedList = [];
    // Filtra por poder de mayor a menor
    if (option.value === '2') {
       orderedList = charactersList.sort((a, b) => b.power - a.power);
    } 
    // Filtra por nombre A-Z
    else if (option.value === '1') {
       orderedList = charactersList.sort((a, b) => {
          if (a.name > b.name) return 1;
          else if (a.name < b.name) return -1;
          else return 0;
       });
    } else {
       return;
    } 
    renderCharacters(orderedList);
};

const renderView = (n) => {
    // En onclick de button se pone (n)
    // Si n === 6 Cambia estilos de grid4 repeat(4, auto) a repeat(6, auto) en clase .grid6
    // Si está aplicado grid6 y se pulsa en onclick de (4) vuelve a grid4
    if (n == 6) {gridContainer.classList.replace("grid4", "grid6");}
    else {gridContainer.classList.replace("grid6", "grid4");}
};

const characterFilter = () => {
    // Si no se escribe nada en input renderiza charactersList, sin filtros aplicados
    if (inputText.value === "") {
       renderCharacters(charactersList);
       return;
    }
    // Filtra por nombre o por planeta | En nombre .includes así si se escribe mitad del 
    // nombre por ej lo encuentra igualmente
    const newList = charactersList.filter(e => {
       return (e.name.toUpperCase().includes(inputText.value.toUpperCase())) ||
          (e.planet.toUpperCase() === inputText.value.toUpperCase());
    });
    renderCharacters(newList);
};

const showCharacterInfo = (id) => {
    // Button en card tiene onclick con parámetro ID de json, cuando se pulsa
    // Aparece card en position fixed con la descripción del personaje
    const characterInfo = document.querySelector('#more-info');
    const character = charactersList.find(e => e.id === id);

    // Aparece div con mas información de personaje
    characterInfo.innerHTML = `
    <div class="img"><img src="./img/${character.image}" alt=""></div>
    <div class="more-info-container">
        <h1 style="margin-bottom:2rem;">${character.name}</h1>
        <div>${character.description}</div>
    </div>
    `
    dialog.show();
    // Cambia estilo de .modal de none por defecto a Block
    modal.style.display = "block";
}