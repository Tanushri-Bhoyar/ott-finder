// ===== OTT Finder India — app.js =====

const API_KEY = "382f4805";
const BASE_URL = "https://www.omdbapi.com/";
const RAPID_API_KEY = "6f8fad62b9msh0824ee8ad26f863p1e2db8jsn6681e172bc46";

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
    fetchOTT(imdbID);

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
// ===== FETCH OTT AVAILABILITY =====
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

    // Get India streaming options
    const indiaStreaming = data?.streamingOptions?.in;

    if (!indiaStreaming || indiaStreaming.length === 0) {
      ottContainer.innerHTML = `<span class="ott-coming">Not available on Indian OTT platforms</span>`;
      return;
    }

    // Build OTT badges
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
    ottContainer.innerHTML = `<span class="ott-coming">Could not fetch OTT data</span>`;
  }
}