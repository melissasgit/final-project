async function fetchMovies() {
  try {  
  const response = await fetch('http://www.omdbapi.com/?i=tt3896198&apikey=a0290d49&t=star wars');

  if (!response.ok) {
    throw new Error(`Network response was not ok`);
  }

    const moviesData = await response.json();
    const movieGridEl = document.querySelector(".movie-grid");

    if (moviesData && moviesData.Search) {
      movieGridEl.innerHTML = moviesData.Search
        .map((movie) => movieHTML(movie)).join("");
    } else {
      movieGridEl.innerHTML = "<p>No movies found.</p>";
    }
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
}

fetchMovies();

function movieHTML(movie) {
    return `<div class="movie-card">
    <div class="movie-card__container">
        <h3>${movie.Title}</h3>
        <p><b>Year:</b> ${movie.Year}</p>
            View Movie
        </button>
    </div>
</div>`;
}

