const priceSlider = document.querySelector("#price");
const priceValue = document.querySelector("#price-value");

async function fetchMovies() {
    const movies = await fetch('http://www.omdbapi.com/?apikey=a0290d49&');
    const moviesData = await response.json();
    const moviesGridEl = document.querySelector(".movies-grid");

    moviesGridEl.innerHTML = moviesData
    .map((movie) => movieHTML(movie)).join("");
    
}

fetchMovies();

function movieHTML(movie) {
    return `<div class="movie-card">
    <div class="movie-card__container">
        <h3>${movie.Title}</h3>
        <img src="${movie.Poster}" alt="Movie poster">
        <p><b>Description:</b> ${movie.Plot}</p>
        <p><b>Genre:</b> ${movie.Genre}</p>
        <p><b>Price:</b> $${movie.Price}</p>
        <button>
            View Movie
        </button>
    </div>
</div>`;
}

if (priceSlider) {
    priceSlider.addEventListener("input", function () {
        priceValue.textContent = `$${priceSlider.value}`;
    });
}

