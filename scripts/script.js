import { recipes } from "/scripts/utils/recipes.js";
import { showFilters } from "/scripts/filters/filters.js";
import {
  ingredientsFilters,
  applianceFilters,
  ustensilsFilters,
} from "./filters/filters.js";

const recipeCardTemplate = document.querySelector("[data-recipe-template]");
const recipeCardContainer = document.querySelector(
  "[data-recipe-cards-container]"
);
const searchInput = document.querySelector("[data-search]");
const messageEmptyCards = document.querySelector(".message-empty-cards");
const containerIngredients = document.querySelector(".ingredients-options");
const inputDropdownIngredients = document.querySelector(".input-ingredients");
const containerAppareils = document.querySelector(".appliance-options");
const inputDropdownAppareils = document.querySelector(".input-appareils");
const containerUstensiles = document.querySelector(".ustensils-options");
const inputDropdownUstensiles = document.querySelector(".input-ustensils");

let myRecipes = [];

// Affichage des recettes
function initCards() {
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
      appliance: recipe.appliance,
      ustensils: recipe.ustensils,
      element: card,
    });
  }
}

const removeCards = () => {
  const cards = document.querySelectorAll(".card");
  for (let index = 0; index < cards.length; index++) {
    cards[0].remove();
  }
};

// Algorithme de recherche des filtres
function filterTags() {
  let nbElemsHidden = 0;
  let filteredRecipe = new Set(recipes);

  let tags = document.querySelector(".choice-container");
  const messageIsHidden = document.querySelector(".message-empty-cards.hide");

  tags = [...tags.children];
  if (tags.length === 0) {
    removeCards();
    initCards();
  } else {
    for (let index = 0; index < myRecipes.length; index++) {
      const recipe = myRecipes[index];
      let matchWithTags = true;
      for (let i = 0; i < tags.length; i++) {
        const tag = tags[i];
        const value = tag.firstChild.textContent;
        const tagClasslist = [...tag.classList];
        if (tagClasslist.includes("ingredients-options")) {
          if (!recipe.ingredients.find((ingr) => ingr.ingredient === value))
            matchWithTags = false;
        } else if (tagClasslist.includes("appliance-options")) {
          if (recipe.appliance !== value) matchWithTags = false;
        } else if (!recipe.ustensils.find((ustensil) => ustensil === value))
          matchWithTags = false;
      }
      if (nbElemsHidden === recipes.length) {
        nbElemsHidden = 0;
      }
      if (!matchWithTags) {
        filteredRecipe.delete(recipe);
        nbElemsHidden++;
      }
      recipe.element.classList.toggle("hide", !matchWithTags);
    }
    if (messageIsHidden && nbElemsHidden === recipes.length) {
      messageEmptyCards.classList.toggle("hide", false);
    } else if (!messageIsHidden && nbElemsHidden !== recipes.length)
      messageEmptyCards.classList.toggle("hide", true);
  }
}

// Algorithme de recherche global
function globalSearch(value) {
  let nbElemsHidden = 0;
  let filteredRecipe = new Set(recipes);
  const messageIsHidden = document.querySelector(".message-empty-cards.hide");

  for (let index = 0; index < myRecipes.length; index++) {
    const recipe = myRecipes[index];
    const isVisible =
      recipe.name.toLowerCase().includes(value) ||
      recipe.description.toLowerCase().includes(value) ||
      recipe.appliance.toLowerCase().includes(value) ||
      recipe.ustensils.find((usten) => usten.toLowerCase().includes(value)) ||
      recipe.ingredients.find((ingr) =>
        ingr.ingredient.toLowerCase().includes(value)
      ) ||
      recipe.ustensils.some((ustensil) =>
        ustensil.toLowerCase().includes(value)
      );
    if (nbElemsHidden === recipes.length) {
      nbElemsHidden = 0;
    }
    if (!isVisible) {
      filteredRecipe.delete(recipe);
      nbElemsHidden++;
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
  if (e.target.value.length > 2) globalSearch(value);
  else if (
    (e.keyCode === 8 && e.target.value.length === 2) ||
    e.target.value.length === 0
  ) {
    removeCards();
    initCards();
  }
});

inputDropdownIngredients.addEventListener("keyup", (e) => {
  const value = e.target.value.toLowerCase();

  const allIngredients = [].concat(
    ...recipes.map((recipe) => recipe.ingredients)
  );
  const ingredientsFiltered = allIngredients.filter((ingr) =>
    ingr.ingredient.toLowerCase().includes(value)
  );
  containerIngredients.replaceChildren();
  ingredientsFilters(ingredientsFiltered);
});

inputDropdownAppareils.addEventListener("keyup", (e) => {
  const value = e.target.value.toLowerCase();

  const allAppliances = [].concat(...recipes.map((recipe) => recipe.appliance));

  const appliancesFiltered = allAppliances.filter((appliance) =>
    appliance.toLowerCase().includes(value)
  );
  containerAppareils.replaceChildren();
  applianceFilters(appliancesFiltered);
});

inputDropdownUstensiles.addEventListener("keyup", (e) => {
  const value = e.target.value.toLowerCase();

  const allUstensils = [].concat(...recipes.map((recipe) => recipe.ustensils));
  const ustensilsFiltered = allUstensils.filter((ustensil) =>
    ustensil.toLowerCase().includes(value)
  );
  containerUstensiles.replaceChildren();
  ustensilsFilters(ustensilsFiltered);
});

initCards();
showFilters();

export { globalSearch, initCards, filterTags };
