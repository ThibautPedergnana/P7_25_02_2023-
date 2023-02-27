import { recipes } from "/scripts/utils/recipes.js";
const recipeSection = document.querySelector(".recipe-section");
const searchInput = document.getElementById("search");

let users = [];

searchInput.addEventListener("input", (e) => {
  const value = e.target.value;
  console.log(users);
});

function init() {
  users = recipes.map((recipe) => {
    const Template = new RecipeCard(recipe);
    recipeSection.appendChild(Template.createRecipeCard());
    return { name: recipe.name, time: recipe.time };
  });
}
init();
