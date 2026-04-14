// ===== Day 3 — OMDB API Integration =====

const API_KEY = CONFIG.API_KEY;// 🔴 We'll hide this properly soon
const BASE_URL = "https://www.omdbapi.com/";

// DOM Elements
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const resultsContainer = document.getElementById("resultsContainer");

// ===== SEARCH TRIGGER =====
searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (query === "") return;
  searchMovies(query);
});

searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") searchBtn.click();
});

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

  } catch (error) {
    console.error("API Error:", error);
    showError();
  }
}

// ===== DISPLAY MOVIE CARDS =====
function displayResults(results) {
  resultsContainer.innerHTML = "";

  results.forEach((item) => {
    const poster =
      item.Poster !== "N/A"
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

    resultsContainer.appendChild(card);
  });
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