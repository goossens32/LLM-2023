const gridContainer = document.querySelector('.grid-container');
const btnPrev = document.querySelector('#previous');
const btnNext = document.querySelector('#next');

window.onload = () => {
    loadMovies();
}

const loadMovies = async () => {
    const response = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=192e0b9821564f26f52949758ea3c473&language=es-ES&page=1')
    const data = await response.json();
        populateMovies(data.results);
}

const populateMovies = (data) => {
    gridContainer.innerHTML = ``;
    data.forEach(item => {
        gridContainer.innerHTML += `
        
        <div class="card">
            <div class="img"><img src="https://image.tmdb.org/t/p/w500${item.poster_path}" alt=""></div>
            <div class="title"><h1>${item.title}</h1></div>
        </div>
        `
    });
}