const searchForm = document.querySelector("form");
const searchResults = document.querySelector(".search-result");
const container = document.querySelector(".container");
let searchQuery = "";
const APP_ID = "7de24181";
const APP_KEY = "67eeffe56eb3753c5f436c8fd41b3af7";

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  searchQuery = e.target.querySelector("input").value;
  fetchAPI();
});

async function fetchAPI() {
  const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_KEY}&to=50`;
  const response = await fetch(baseURL);
  const data = await response.json();
  console.log(data);
  generateHTML(data.hits);
}

function generateHTML(results) {
  let generateHTML = "";
  results.map((result) => {
    generateHTML += `
     <div class="item">
        <img src=${result.recipe.image} alt="" />
        <div class="flex-container">
          <h1 class="title">${result.recipe.label}</h1>
          <a href=${result.recipe.url} target="_blank" class="view-button">View</a>
        </div>
        <p class="item-data">Calories: ${result.recipe.calories.toFixed(2)}</p>
        <p class="item-data">Diet Labels: ${result.recipe.dietLabels.length > 0 ? result.recipe.dietLabels : 'No Data'}</p>
        <p class="item-data">Cuisine Type: ${result.recipe.cuisineType}</p>
        <p class="item-data">Meal Type: ${result.recipe.mealType}</p>
      </div>`
  });
    searchResults.innerHTML = generateHTML;
}
