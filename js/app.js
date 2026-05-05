// ===== OTT Finder India — app.js =====

const API_KEY = "382f4805";
const BASE_URL = "https://www.omdbapi.com/";
const RAPID_API_KEY = "your_rapidapi_key_here";

// DOM Elements
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const resultsContainer = document.getElementById("resultsContainer");
const movieModal = document.getElementById("movieModal");
const modalClose = document.getElementById("modalClose");

// Current movie open in modal
let currentMovie = null;

// ===== SEARCH TRIGGER =====
searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (query === "") return;
  showHome();
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

// ===== SHOW HOME =====
function showHome() {
  document.getElementById("watchlistSection").classList.add("hidden");
  document.querySelector(".results-section").classList.remove("hidden");
  document.querySelector(".hero").classList.remove("hidden");
}

// ===== SHOW WATCHLIST =====
function showWatchlist() {
  document.querySelector(".hero").classList.add("hidden");
  document.querySelector(".results-section").classList.add("hidden");
  document.getElementById("watchlistSection").classList.remove("hidden");
  renderWatchlist();
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

    card.addEventListener("click", () => openModal(item.imdbID));
    resultsContainer.appendChild(card);
  });
}

// ===== OPEN MODAL =====
async function openModal(imdbID) {
  movieModal.classList.remove("hidden");
  document.body.style.overflow = "hidden";

  // Reset modal
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
  document.getElementById("modalOTT").innerHTML =
    `<span style="color:#888">Checking platforms...</span>`;

  try {
    const res = await fetch(
      `${BASE_URL}?i=${imdbID}&plot=full&apikey=${API_KEY}`
    );
    const movie = await res.json();

    // Save current movie globally
    currentMovie = {
      imdbID: movie.imdbID,
      Title: movie.Title,
      Year: movie.Year,
      Poster: movie.Poster,
      Type: movie.Type,
    };

    // Fill modal
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

    // Update watchlist button
    updateWatchlistBtn(movie.imdbID);

    // Fetch OTT
    fetchOTT(imdbID);

  } catch (err) {
    console.error("Modal error:", err);
  }
}

// ===== OTT AVAILABILITY =====
async function fetchOTT(imdbID) {
  const ottContainer = document.getElementById("modalOTT");
  ottContainer.innerHTML = `<span style="color:#888">Checking platforms...</span>`;

  try {
    const res = await fetch(
      `https://streaming-availability.p.rapidapi.com/shows/${imdbID}?country=in`,
      {
        headers: {
          "x-rapidapi-key": RAPID_API_KEY,
          "x-rapidapi-host": "streaming-availability.p.rapidapi.com"
        }
      }
    );

    const data = await res.json();
    const indiaStreaming = data?.streamingOptions?.in;

    if (!indiaStreaming || indiaStreaming.length === 0) {
      ottContainer.innerHTML =
        `<span class="ott-coming">Not available on Indian OTT platforms</span>`;
      return;
    }

    ottContainer.innerHTML = "";
    indiaStreaming.forEach((option) => {
      const badge = document.createElement("div");
      badge.classList.add("ott-badge");

      const serviceColors = {
        netflix: "#e50914",
        prime: "#00a8e0",
        hotstar: "#1f80e0",
        jiocinema: "#8b2fc9",
        sonyliv: "#e8181c",
        zee5: "#7b2d8b",
      };

      const serviceName = option.service?.id || "unknown";
      const color = serviceColors[serviceName] || "#444";
      const type = option.type || "subscription";
      const price = option.price?.formatted || "";

      badge.style.borderColor = color;
      badge.innerHTML = `
        <span class="ott-name" style="color:${color}">
          ${option.service?.name || serviceName}
        </span>
        <span class="ott-type">${type} ${price}</span>
      `;

      ottContainer.appendChild(badge);
    });

  } catch (err) {
    console.error("OTT Error:", err);
    ottContainer.innerHTML =
      `<span class="ott-coming">Could not fetch OTT data</span>`;
  }
}

// ===========================
// WATCHLIST FUNCTIONS
// ===========================

function getWatchlist() {
  return JSON.parse(localStorage.getItem("ottWatchlist") || "[]");
}

function saveWatchlist(list) {
  localStorage.setItem("ottWatchlist", JSON.stringify(list));
}

function isInWatchlist(imdbID) {
  return getWatchlist().some((m) => m.imdbID === imdbID);
}

function toggleWatchlist() {
  if (!currentMovie) return;

  let list = getWatchlist();

  if (isInWatchlist(currentMovie.imdbID)) {
    // Remove from watchlist
    list = list.filter((m) => m.imdbID !== currentMovie.imdbID);
    saveWatchlist(list);
  } else {
    // Add to watchlist
    list.push(currentMovie);
    saveWatchlist(list);
  }

  updateWatchlistBtn(currentMovie.imdbID);
}

function updateWatchlistBtn(imdbID) {
  const btn = document.getElementById("watchlistBtn");
  if (!btn) return;

  if (isInWatchlist(imdbID)) {
    btn.textContent = "💔 Remove from Watchlist";
    btn.classList.add("added");
  } else {
    btn.textContent = "❤️ Add to Watchlist";
    btn.classList.remove("added");
  }
}

function renderWatchlist() {
  const container = document.getElementById("watchlistContainer");
  const list = getWatchlist();

  if (list.length === 0) {
    container.innerHTML = `
      <div class="empty-watchlist">
        <p>🎬</p>
        <p>Your watchlist is empty!</p>
        <p style="font-size:0.85rem; margin-top:8px">
          Search for movies and click ❤️ to save them
        </p>
      </div>
    `;
    return;
  }

  container.innerHTML = "";

  list.forEach((item) => {
    const poster = item.Poster !== "N/A"
      ? item.Poster
      : "https://via.placeholder.com/500x750?text=No+Image";

    const card = document.createElement("div");
    card.classList.add("movie-card");
    card.innerHTML = `
      <div class="card-poster">
        <img src="${poster}" alt="${item.Title}" loading="lazy"/>
        <span class="media-type-badge">${item.Type || "movie"}</span>
      </div>
      <div class="card-info">
        <h3>${item.Title}</h3>
        <p>${item.Year}</p>
      </div>
    `;

    card.addEventListener("click", () => openModal(item.imdbID));
    container.appendChild(card);
  });
}

// ===== STATUS MESSAGES =====
function showLoading() {
  resultsContainer.innerHTML = `
    <div class="status-msg">
      <div class="spinner"></div>
      <p>Searching...</p>
    </div>
  `;
}

function showEmpty() {
  resultsContainer.innerHTML = `
    <div class="status-msg">
      <p style="font-size:2rem">🎬</p>
      <p>No results found. Try a different title.</p>
    </div>
  `;
}

function showError() {
  resultsContainer.innerHTML = `
    <div class="status-msg">
      <p style="font-size:2rem">⚠️</p>
      <p>Something went wrong. Please try again.</p>
    </div>
  `;
}