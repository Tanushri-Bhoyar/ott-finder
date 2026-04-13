// Day 2 — Search interaction (no API yet)
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");

// Search on button click
searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (query === "") return;
  console.log("Searching for:", query);
  // API call coming Day 3!
});

// Search on pressing Enter
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") searchBtn.click();
});