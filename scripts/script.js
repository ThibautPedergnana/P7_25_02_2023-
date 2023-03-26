import { recipes } from "/scripts/utils/recipes.js";
import { showFilters } from "/scripts/filters/filters.js";

const recipeCardTemplate = document.querySelector("[data-recipe-template]");
const recipeCardContainer = document.querySelector(
  "[data-recipe-cards-container]"
);
const searchInput = document.querySelector("[data-search]");
const messageEmptyCards = document.querySelector(".message-empty-cards");

let myRecipes = [];

function init() {
  for (let index = 0; index < recipes.length; index++) {
    const recipe = recipes[index];
    const card = recipeCardTemplate.content.cloneNode(true).children[0];
    const title = card.querySelector("[data-title]");
    const time = card.querySelector("[data-time]");
    const ingredient = card.querySelector("[data-ingredient]");
    const description = card.querySelector("[data-description]");

    title.textContent = recipe.name;
    time.textContent = recipe.time + " min";
    const { ingredients } = recipe;

    for (let index = 0; index < ingredients.length; index++) {
      const ingr = ingredients[index];
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
    }
    description.textContent = recipe.description;

    recipeCardContainer.append(card);
    myRecipes.push({
      name: recipe.name,
      ingredients: ingredients,
      description: recipe.description,
      element: card,
    });
  }
}

function displayRecipe(value) {
  let nbElemsHidden = 0;
  let filteredRecipe = new Set(recipes);
  const messageIsHidden = document.querySelector(".message-empty-cards.hide");

  for (let index = 0; index < myRecipes.length; index++) {
    const recipe = myRecipes[index];
    const isVisible =
      recipe.name.toLowerCase().includes(value) ||
      recipe.description.toLowerCase().includes(value) ||
      recipe.ingredients.some((ingr) =>
        ingr.ingredient.toLowerCase().includes(value)
      );
    if (nbElemsHidden === recipes.length) {
      nbElemsHidden = 0;
    }
    !isVisible && nbElemsHidden++;
    if (!isVisible) {
      filteredRecipe.delete(recipe);
    }
    recipe.element.classList.toggle("hide", !isVisible);
  }
  if (messageIsHidden && nbElemsHidden === recipes.length) {
    messageEmptyCards.classList.toggle("hide", false);
  } else if (!messageIsHidden && nbElemsHidden !== recipes.length)
    messageEmptyCards.classList.toggle("hide", true);
}

searchInput.addEventListener("keyup", (e) => {
  const value = e.target.value.toLowerCase();
  if (e.target.value.length > 2) displayRecipe(value);
  else if (
    (e.keyCode === 8 && e.target.value.length === 2) ||
    e.target.value.length === 0
  ) {
    const cards = document.querySelectorAll(".card");
    for (let i = 0; i < cards.length; i += 1) {
      const card = cards[i];
      card.remove();
    }
    init();
  }
});

init();
showFilters();

export { displayRecipe, init };
