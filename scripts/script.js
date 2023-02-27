import { recipes } from "/scripts/utils/recipes.js";
// console.log(...recipes);
const recipeCardTemplate = document.querySelector("[data-recipe-template]");
const recipeCardContainer = document.querySelector(
  "[data-recipe-cards-container]"
);
const searchInput = document.querySelector("[data-search]");

let myRecipes = [];

searchInput.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();
  if (e.target.value.length < 3) {
    return;
  }
  myRecipes.forEach((recipe) => {
    const isVisible =
      recipe.name.toLowerCase().includes(value) ||
      recipe.description.toLowerCase().includes(value);
    recipe.element.classList.toggle("hide", !isVisible);
  });
});

function init() {
  myRecipes = recipes.map((recipe) => {
    const card = recipeCardTemplate.content.cloneNode(true).children[0];
    const title = card.querySelector("[data-title]");
    const time = card.querySelector("[data-time]");
    const ingredient = card.querySelector("[data-ingredient]");
    const quantity = card.querySelector("[data-quantity]");
    const unit = card.querySelector("[data-unit]");
    const description = card.querySelector("[data-description]");

    title.textContent = recipe.name;
    time.textContent = recipe.time + " min";
    ingredient.textContent = recipe.ingredients[0].ingredient + ":";
    quantity.textContent = recipe.ingredients[0].quantity;
    unit.textContent = recipe.ingredients[0].unit;
    description.textContent = recipe.description;

    recipeCardContainer.append(card);
    return {
      name: recipe.name,
      ingredient: recipe.ingredients[0].ingredient,
      description: recipe.description,
      element: card,
    };
  });
}
init();
