import { recipes } from "/scripts/utils/recipes.js";
import { showFilters } from "/scripts/filters/filters.js";

const recipeCardTemplate = document.querySelector("[data-recipe-template]");
const recipeCardContainer = document.querySelector(
  "[data-recipe-cards-container]"
);
const searchInput = document.querySelector("[data-search]");

let myRecipes = [];

function init() {
  myRecipes = recipes.map((recipe) => {
    const card = recipeCardTemplate.content.cloneNode(true).children[0];
    const title = card.querySelector("[data-title]");
    const time = card.querySelector("[data-time]");
    const ingredient = card.querySelector("[data-ingredient]");
    const description = card.querySelector("[data-description]");

    title.textContent = recipe.name;
    time.textContent = recipe.time + " min";
    const { ingredients } = recipe;
    ingredients.forEach((ingr) => {
      const p = document.createElement("p");
      const ingredientElem = document.createElement("span");
      const quantityElem = document.createElement("span");
      const unitElem = document.createElement("span");
      ingredientElem.innerHTML = ingr.ingredient + ": ";
      p.appendChild(ingredientElem);
      if (ingr.quantity) {
        quantityElem.innerHTML = ingr.quantity;
        p.appendChild(quantityElem);
      }
      if (ingr.unit) {
        unitElem.innerHTML = " " + ingr.unit;
        p.appendChild(unitElem);
      }
      ingredient.appendChild(p);
    });
    description.textContent = recipe.description;

    recipeCardContainer.append(card);
    return {
      name: recipe.name,
      ingredients: ingredients,
      description: recipe.description,
      element: card,
    };
  });
}

function displayRecipe(value) {
  myRecipes.forEach((recipe) => {
    const isVisible =
      recipe.name.toLowerCase().includes(value) ||
      recipe.description.toLowerCase().includes(value) ||
      recipe.ingredients.find((ingr) =>
        ingr.ingredient.toLowerCase().includes(value)
      );
    recipe.element.classList.toggle("hide", !isVisible);
  });
}

searchInput.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();
  if (e.target.value.length >= 3) {
    displayRecipe(value);
  }
});

init();
showFilters();

export { displayRecipe };
