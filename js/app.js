// ===== OTT Finder India — app.js =====

const API_KEY = "382f4805";
const BASE_URL = "https://www.omdbapi.com/";

// DOM Elements
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const resultsContainer = document.getElementById("resultsContainer");
const movieModal = document.getElementById("movieModal");
const modalClose = document.getElementById("modalClose");

// ===== SEARCH TRIGGER =====
searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (query === "") return;
  searchMovies(query);
});

searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") searchBtn.click();
});

// ===== CLOSE MODAL =====
modalClose.addEventListener("click", closeModal);
movieModal.addEventListener("click", (e) => {
  if (e.target === movieModal) closeModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

function closeModal() {
  movieModal.classList.add("hidden");
  document.body.style.overflow = "auto";
}

// ===== FETCH MOVIES FROM OMDB =====
async function searchMovies(query) {
  showLoading();

  try {
    const res = await fetch(
      `${BASE_URL}?s=${encodeURIComponent(query)}&apikey=${API_KEY}`
    );
    const data = await res.json();

    if (data.Response === "False") {
      showEmpty();
      return;
    }

    displayResults(data.Search);

  } catch (err) {
    console.error("Error:", err);
    showError();
  }
}

// ===== DISPLAY MOVIE CARDS =====
function displayResults(results) {
  resultsContainer.innerHTML = "";

  results.forEach((item) => {
    const poster = item.Poster !== "N/A"
      ? item.Poster
      : "https://via.placeholder.com/500x750?text=No+Image";

    const card = document.createElement("div");
    card.classList.add("movie-card");
    card.innerHTML = `
      <div class="card-poster">
        <img src="${poster}" alt="${item.Title}" loading="lazy"/>
        <span class="media-type-badge">${item.Type}</span>
      </div>
      <div class="card-info">
        <h3>${item.Title}</h3>
        <p>${item.Year}</p>
      </div>
    `;

    // Click card to open modal
    card.addEventListener("click", () => openModal(item.imdbID));
    resultsContainer.appendChild(card);
  });
}

// ===== OPEN MODAL WITH FULL DETAILS =====
async function openModal(imdbID) {
  // Show modal with loading state
  movieModal.classList.remove("hidden");
  document.body.style.overflow = "hidden";

  // Set loading state inside modal
  document.getElementById("modalTitle").textContent = "Loading...";
  document.getElementById("modalPlot").textContent = "";
  document.getElementById("modalGenre").textContent = "";
  document.getElementById("modalDirector").textContent = "";
  document.getElementById("modalCast").textContent = "";
  document.getElementById("modalRating").textContent = "";
  document.getElementById("modalYear").textContent = "";
  document.getElementById("modalRuntime").textContent = "";
  document.getElementById("modalRated").textContent = "";
  document.getElementById("modalPoster").src = "";

  try {
    const res = await fetch(
      `${BASE_URL}?i=${imdbID}&plot=full&apikey=${API_KEY}`
    );
    const movie = await res.json();

    // Fill modal with data
    document.getElementById("modalTitle").textContent = movie.Title;
    document.getElementById("modalPlot").textContent = movie.Plot;
    document.getElementById("modalGenre").textContent = movie.Genre;
    document.getElementById("modalDirector").textContent = movie.Director;
    document.getElementById("modalCast").textContent = movie.Actors;
    document.getElementById("modalRating").textContent = movie.imdbRating;
    document.getElementById("modalYear").textContent = `📅 ${movie.Year}`;
    document.getElementById("modalRuntime").textContent = `⏱️ ${movie.Runtime}`;
    document.getElementById("modalRated").textContent = `🔞 ${movie.Rated}`;
    document.getElementById("modalPoster").src = movie.Poster !== "N/A"
      ? movie.Poster
      : "https://via.placeholder.com/500x750?text=No+Image";

  } catch (err) {
    console.error("Modal error:", err);
  }
}

// ===== LOADING STATE =====
function showLoading() {
  resultsContainer.innerHTML = `
    <div class="status-msg">
      <div class="spinner"></div>
      <p>Searching...</p>
    </div>
  `;
}

// ===== EMPTY STATE =====
function showEmpty() {
  resultsContainer.innerHTML = `
    <div class="status-msg">
      <p style="font-size:2rem">🎬</p>
      <p>No results found. Try a different title.</p>
    </div>
  `;
}

// ===== ERROR STATE =====
function showError() {
  resultsContainer.innerHTML = `
    <div class="status-msg">
      <p style="font-size:2rem">⚠️</p>
      <p>Something went wrong. Please try again.</p>
    </div>
  `;
}