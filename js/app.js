// ===== OTT Finder India — Complete Final Version =====

const API_KEY = "382f4805";
const BASE_URL = "https://www.omdbapi.com/";

// =============================================
// OTT DATABASE
// =============================================
const OTT_DATA = {
  // BOLLYWOOD
  "tt12844910": [{ name: "Prime Video", type: "Subscription", color: "#00a8e0" }],  // Pathaan
  "tt8178634":  [{ name: "Netflix", type: "Subscription", color: "#e50914" }],      // Jawan
  "tt13320662": [{ name: "Netflix", type: "Subscription", color: "#e50914" }],      // Animal
  "tt14539740": [{ name: "Netflix", type: "Subscription", color: "#e50914" }],      // Dunki
  "tt15097216": [{ name: "Netflix", type: "Subscription", color: "#e50914" }],      // 12th Fail
  "tt21974166": [{ name: "Prime Video", type: "Subscription", color: "#00a8e0" }],  // Stree 2
  "tt10726060": [{ name: "Netflix", type: "Subscription", color: "#e50914" }],      // Brahmastra
  "tt11086928": [{ name: "Netflix", type: "Subscription", color: "#e50914" }],      // Gangubai
  "tt9395470":  [{ name: "Netflix", type: "Subscription", color: "#e50914" }],      // Gehraiyaan
  "tt10890240": [{ name: "Prime Video", type: "Subscription", color: "#00a8e0" }],  // Shershaah
  "tt8864596":  [{ name: "Netflix", type: "Subscription", color: "#e50914" }],      // Ludo
  "tt6264654":  [{ name: "Prime Video", type: "Subscription", color: "#00a8e0" }],  // KGF 2
  "tt8009428":  [{ name: "Netflix", type: "Subscription", color: "#e50914" }],      // RRR
  "tt10740954": [{ name: "Netflix", type: "Subscription", color: "#e50914" }],      // Pushpa
  "tt15291282": [{ name: "Prime Video", type: "Subscription", color: "#00a8e0" }],  // Pushpa 2
  "tt6304162":  [{ name: "Netflix", type: "Subscription", color: "#e50914" }],      // Baahubali 2
  "tt4849842":  [{ name: "Netflix", type: "Subscription", color: "#e50914" }],      // Baahubali 1
  "tt7016504":  [{ name: "Prime Video", type: "Subscription", color: "#00a8e0" }],  // Andhadhun
  "tt7131622":  [{ name: "Prime Video", type: "Subscription", color: "#00a8e0" }],  // Sanju
  "tt9636678":  [{ name: "Netflix", type: "Subscription", color: "#e50914" }],      // The White Tiger
  "tt10168618": [{ name: "Netflix", type: "Subscription", color: "#e50914" }],      // Dhamaka
  "tt11126994": [{ name: "Prime Video", type: "Subscription", color: "#00a8e0" }],  // Sardar Udham
  // INDIAN SERIES
  "tt6468322":  [{ name: "Prime Video", type: "Subscription", color: "#00a8e0" }],  // Mirzapur
  "tt9647524":  [{ name: "Prime Video", type: "Subscription", color: "#00a8e0" }],  // Mirzapur S3
  "tt8004518":  [{ name: "Netflix", type: "Subscription", color: "#e50914" }],      // Sacred Games
  "tt10166622": [{ name: "SonyLIV", type: "Subscription", color: "#e8181c" }],     // Scam 1992
  "tt9198364":  [{ name: "Prime Video", type: "Subscription", color: "#00a8e0" }],  // The Family Man
  "tt11057644": [{ name: "SonyLIV", type: "Subscription", color: "#e8181c" }],     // Maharani
  "tt9813792":  [{ name: "Netflix", type: "Subscription", color: "#e50914" }],      // Delhi Crime
  "tt8679146":  [{ name: "Prime Video", type: "Subscription", color: "#00a8e0" }],  // Panchayat
  "tt9218972":  [{ name: "Hotstar", type: "Subscription", color: "#1f80e0" }],      // Special Ops
  "tt11444852": [{ name: "SonyLIV", type: "Subscription", color: "#e8181c" }],     // Rocket Boys
  "tt9671886":  [{ name: "Netflix", type: "Subscription", color: "#e50914" }],      // Kota Factory
  "tt9030308":  [{ name: "Netflix", type: "Subscription", color: "#e50914" }],      // Jamtara
  // HOLLYWOOD MOVIES
  "tt1375666":  [{ name: "JioCinema", type: "Free", color: "#8b2fc9" }],            // Inception
  "tt0468569":  [{ name: "JioCinema", type: "Free", color: "#8b2fc9" }],            // The Dark Knight
  "tt0816692":  [{ name: "Prime Video", type: "Subscription", color: "#00a8e0" }],  // Interstellar
  "tt4154796":  [{ name: "Hotstar", type: "Subscription", color: "#1f80e0" }],      // Avengers Endgame
  "tt4154756":  [{ name: "Hotstar", type: "Subscription", color: "#1f80e0" }],      // Infinity War
  "tt1745960":  [{ name: "Netflix", type: "Subscription", color: "#e50914" }],      // Top Gun Maverick
  "tt1877830":  [{ name: "Hotstar", type: "Subscription", color: "#1f80e0" }],      // The Batman
  "tt1630029":  [{ name: "Hotstar", type: "Subscription", color: "#1f80e0" }],      // Avatar 2
  "tt15398776": [{ name: "Prime Video", type: "Subscription", color: "#00a8e0" }],  // Oppenheimer
  "tt1517268":  [{ name: "Prime Video", type: "Subscription", color: "#00a8e0" }],  // Barbie
  "tt9362722":  [{ name: "Netflix", type: "Subscription", color: "#e50914" }],      // Spider-Man NWH
  "tt9376612":  [{ name: "Hotstar", type: "Subscription", color: "#1f80e0" }],      // Shang Chi
  "tt9114286":  [{ name: "Hotstar", type: "Subscription", color: "#1f80e0" }],      // Black Panther 2
  "tt6791350":  [{ name: "Hotstar", type: "Subscription", color: "#1f80e0" }],      // Guardians 3
  "tt0111161":  [{ name: "Netflix", type: "Subscription", color: "#e50914" }],      // Shawshank
  "tt0110912":  [{ name: "Netflix", type: "Subscription", color: "#e50914" }],      // Pulp Fiction
  "tt0133093":  [{ name: "Netflix", type: "Subscription", color: "#e50914" }],      // The Matrix
  "tt0109830":  [{ name: "Netflix", type: "Subscription", color: "#e50914" }],      // Forrest Gump
  "tt0120737":  [{ name: "Prime Video", type: "Subscription", color: "#00a8e0" }],  // LOTR 1
  // HOLLYWOOD SERIES
  "tt0903747":  [{ name: "Netflix", type: "Subscription", color: "#e50914" }],      // Breaking Bad
  "tt0944947":  [{ name: "Hotstar", type: "Subscription", color: "#1f80e0" }],      // Game of Thrones
  "tt4574334":  [{ name: "Netflix", type: "Subscription", color: "#e50914" }],      // Stranger Things
  "tt5753856":  [{ name: "Netflix", type: "Subscription", color: "#e50914" }],      // Dark
  "tt7366338":  [{ name: "Netflix", type: "Subscription", color: "#e50914" }],      // Squid Game
  "tt0455275":  [{ name: "Prime Video", type: "Subscription", color: "#00a8e0" }],  // Prison Break
  "tt2861424":  [{ name: "Netflix", type: "Subscription", color: "#e50914" }],      // Rick and Morty
  "tt8111088":  [{ name: "Hotstar", type: "Subscription", color: "#1f80e0" }],      // Loki
  "tt13616990": [{ name: "Netflix", type: "Subscription", color: "#e50914" }],      // Wednesday
  "tt2442560":  [{ name: "Netflix", type: "Subscription", color: "#e50914" }],      // Peaky Blinders
  "tt7569592":  [{ name: "Netflix", type: "Subscription", color: "#e50914" }],      // Ozark
  "tt5180504":  [{ name: "Netflix", type: "Subscription", color: "#e50914" }],      // The Witcher
  "tt0386676":  [{ name: "Prime Video", type: "Subscription", color: "#00a8e0" }],  // The Office
  "tt0108778":  [{ name: "Prime Video", type: "Subscription", color: "#00a8e0" }],  // Friends
  "tt0773262":  [{ name: "Netflix", type: "Subscription", color: "#e50914" }],      // Dexter
  "tt1475582":  [{ name: "Netflix", type: "Subscription", color: "#e50914" }],      // Sherlock
};

// Trending list
const TRENDING = [
  "Stree 2", "Pathaan", "Jawan", "RRR",
  "Animal", "12th Fail", "KGF", "Pushpa 2"
];

// DOM Elements
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const resultsContainer = document.getElementById("resultsContainer");
const movieModal = document.getElementById("movieModal");
const modalClose = document.getElementById("modalClose");

let currentMovie = null;

// =============================================
// INIT
// =============================================
window.addEventListener("load", () => {
  loadTrending();
  updateWatchlistCount();
});

// =============================================
// SEARCH
// =============================================
searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (query === "") return;
  showHome();
  hideTrending();
  showResultsHeader(query);
  searchMovies(query);
});

searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") searchBtn.click();
});

// =============================================
// LOAD TRENDING
// =============================================
async function loadTrending() {
  const container = document.getElementById("trendingContainer");
  container.innerHTML = `<div class="status-msg"><div class="spinner"></div></div>`;
  const results = [];

  for (const title of TRENDING) {
    try {
      const res = await fetch(`${BASE_URL}?s=${encodeURIComponent(title)}&apikey=${API_KEY}`);
      const data = await res.json();
      if (data.Response === "True") results.push(data.Search[0]);
    } catch (e) { console.error(e); }
  }

  container.innerHTML = "";
  results.forEach((item, i) => {
    const card = createCard(item);
    card.style.animationDelay = `${i * 0.06}s`;
    container.appendChild(card);
  });
}

// =============================================
// SEARCH MOVIES
// =============================================
async function searchMovies(query) {
  showLoading();
  try {
    const res = await fetch(`${BASE_URL}?s=${encodeURIComponent(query)}&apikey=${API_KEY}`);
    const data = await res.json();
    if (data.Response === "False") { showEmpty(); return; }
    displayResults(data.Search);
  } catch (err) {
    showError();
  }
}

// =============================================
// CREATE CARD
// =============================================
function createCard(item) {
  const poster = item.Poster !== "N/A"
    ? item.Poster
    : "https://via.placeholder.com/500x750/141414/444?text=No+Image";

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
  return card;
}

// =============================================
// DISPLAY RESULTS
// =============================================
function displayResults(results) {
  resultsContainer.innerHTML = "";
  results.forEach((item, i) => {
    const card = createCard(item);
    card.style.animationDelay = `${i * 0.05}s`;
    resultsContainer.appendChild(card);
  });
}

// =============================================
// OPEN MODAL
// =============================================
async function openModal(imdbID) {
  movieModal.classList.remove("hidden");
  document.body.style.overflow = "hidden";

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
    `<span style="color:#555;font-size:0.85rem">Checking platforms...</span>`;

  try {
    const res = await fetch(`${BASE_URL}?i=${imdbID}&plot=full&apikey=${API_KEY}`);
    const movie = await res.json();

    currentMovie = {
      imdbID: movie.imdbID,
      Title: movie.Title,
      Year: movie.Year,
      Poster: movie.Poster,
      Type: movie.Type,
    };

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
      : "https://via.placeholder.com/500x750/141414/444?text=No+Image";

    updateWatchlistBtn(movie.imdbID);
    fetchOTT(imdbID);
  } catch (err) {
    console.error("Modal error:", err);
  }
}

// =============================================
// CLOSE MODAL
// =============================================
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

// =============================================
// OTT AVAILABILITY
// =============================================
async function fetchOTT(imdbID) {
  const ottContainer = document.getElementById("modalOTT");
  await new Promise((r) => setTimeout(r, 500));
  const platforms = OTT_DATA[imdbID];

  if (!platforms) {
    ottContainer.innerHTML = `
      <div class="ott-not-available">
        <span>📺</span>
        <p>Not found on major Indian OTT platforms</p>
        <a href="https://www.justwatch.com/in" target="_blank" class="justwatch-link">
          Check on JustWatch India →
        </a>
      </div>
    `;
    return;
  }

  renderOTTBadges(platforms, ottContainer);
}

function renderOTTBadges(platforms, container) {
  container.innerHTML = "";
  platforms.forEach((p) => {
    const badge = document.createElement("div");
    badge.classList.add("ott-badge");
    badge.style.borderColor = p.color;
    badge.innerHTML = `
      <span class="ott-name" style="color:${p.color}">${p.name}</span>
      <span class="ott-type">${p.type}</span>
    `;
    container.appendChild(badge);
  });
}

// =============================================
// WATCHLIST
// =============================================
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
    list = list.filter((m) => m.imdbID !== currentMovie.imdbID);
  } else {
    list.push(currentMovie);
  }
  saveWatchlist(list);
  updateWatchlistBtn(currentMovie.imdbID);
  updateWatchlistCount();
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

function updateWatchlistCount() {
  const count = getWatchlist().length;
  const badge = document.getElementById("watchlistCount");
  if (badge) badge.textContent = count;
}

function renderWatchlist() {
  const container = document.getElementById("watchlistContainer");
  const list = getWatchlist();

  if (list.length === 0) {
    container.innerHTML = `
      <div class="empty-watchlist">
        <p>🎬</p>
        <p>Your watchlist is empty!</p>
        <p style="font-size:0.82rem;margin-top:8px;color:#333">
          Search movies and click ❤️ to save them
        </p>
      </div>
    `;
    return;
  }

  container.innerHTML = "";
  list.forEach((item, i) => {
    const card = createCard(item);
    card.style.animationDelay = `${i * 0.05}s`;
    container.appendChild(card);
  });
}

// =============================================
// NAVIGATION
// =============================================
function showHome() {
  document.getElementById("watchlistSection").classList.add("hidden");
  document.getElementById("resultsSection").classList.remove("hidden");
  document.getElementById("trendingSection").classList.remove("hidden");
  document.getElementById("heroSection").classList.remove("hidden");
}

function showWatchlist() {
  document.getElementById("heroSection").classList.add("hidden");
  document.getElementById("trendingSection").classList.add("hidden");
  document.getElementById("resultsSection").classList.add("hidden");
  document.getElementById("watchlistSection").classList.remove("hidden");
  renderWatchlist();
}

function hideTrending() {
  document.getElementById("trendingSection").classList.add("hidden");
}

function showResultsHeader(query) {
  document.getElementById("resultsHeader").classList.remove("hidden");
  document.getElementById("resultsTitle").textContent = `Results for "${query}"`;
}

// =============================================
// STATUS MESSAGES
// =============================================
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
      <p style="font-size:2.5rem">🎬</p>
      <p>No results found. Try a different title.</p>
    </div>
  `;
}

function showError() {
  resultsContainer.innerHTML = `
    <div class="status-msg">
      <p style="font-size:2.5rem">⚠️</p>
      <p>Something went wrong. Please try again.</p>
    </div>
  `;
}