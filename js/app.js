const API_KEY = "382f4805";
const BASE_URL = "https://www.omdbapi.com/";

const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const resultsContainer = document.getElementById("resultsContainer");

searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (query === "") return;
  searchMovies(query);
});

searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") searchBtn.click();
});

async function searchMovies(query) {
  showLoading();
  console.log("Searching:", query);

  try {
    const res = await fetch(
      `${BASE_URL}?s=${encodeURIComponent(query)}&apikey=${API_KEY}`
    );
    const data = await res.json();
    console.log("Data:", data);

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
    resultsContainer.appendChild(card);
  });
}

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