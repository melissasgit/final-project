const searchForm = document.querySelector("#search-form");

if (searchForm) {
    searchForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const input = document.querySelector("#search-input") 
            || document.querySelector("#movie-search");

        const searchTerm = input.value.trim();

        if (!searchTerm) {
            return;
        }

        if (window.location.pathname.includes("index.html") || window.location.pathname === "/") {
            window.location.href = `movies.html?search=${encodeURIComponent(searchTerm)}`;
        } 

        else {
            window.location.href = `movies.html?search=${encodeURIComponent(searchTerm)}`;
        }
    });
}

async function fetchMovies() {

    const movieGridEl = document.querySelector(".movie-grid");

    if (!movieGridEl) {
        return;
    }

    const params = new URLSearchParams(window.location.search);
    const searchTerm = params.get("search");

    if (!searchTerm) {
        movieGridEl.innerHTML = "<p>Search for a movie to get started.</p>";
        return;
    }

    try {

        movieGridEl.innerHTML = `
            <div class="loading">
                <i class="fa-solid fa-film"></i>
                <p>Loading movies...</p>
            </div>
        `;
        
        const response = await fetch(
            `https://www.omdbapi.com/?apikey=a0290d49&s=${encodeURIComponent(searchTerm)}`
        );
        
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        
        const moviesData = await response.json();
        await delay(1000);

        if (moviesData.Response === "True") {

            const movies = moviesData.Search;

            displayMovies(movies);

            const sortFilter = document.querySelector("#sort-filter");

            if (sortFilter) {

                sortFilter.addEventListener("change", function () {

                    const sortedMovies = [...movies];

                    if (sortFilter.value === "newest") {

                        sortedMovies.sort(function (a, b) {
                            return Number(b.Year) - Number(a.Year);
                        });

                    } else if (sortFilter.value === "oldest") {

                        sortedMovies.sort(function (a, b) {
                            return Number(a.Year) - Number(b.Year);
                        });
                    }

                    displayMovies(sortedMovies);

                });
            }

        } else {

            movieGridEl.innerHTML = "<p>No movies found.</p>";

        }

    } catch (error) {

        console.error("Error fetching movies:", error);

        movieGridEl.innerHTML =
            "<p>Something went wrong. Please try again.</p>";

    }
}

function displayMovies(movies) {

    const movieGridEl = document.querySelector(".movie-grid");

    movieGridEl.innerHTML = movies
        .map(movie => movieHTML(movie))
        .join("");
}

function movieHTML(movie) {

    return `
        <div class="movie-card">

            <div class="movie-card__container">

                <h3>${movie.Title}</h3>

                <p><b>Year:</b> ${movie.Year}</p>

                <img 
                    src="${movie.Poster !== "N/A" ? movie.Poster : ""}" 
                    alt="${movie.Title} poster"
                >

                <button>
                    View Movie
                </button>

            </div>

        </div>
    `;
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

fetchMovies()