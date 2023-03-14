import { recipes } from "/scripts/utils/recipes.js";
import { displayRecipe, init } from "/scripts/script.js";

// Dropdown
const ingredientsDropdown = document.querySelector(".ingredients-options");
const applianceDropdown = document.querySelector(".appliance-options");
const ustensilsDropdown = document.querySelector(".ustensils-options");
const choiceContainer = document.querySelector(".choice-container");
const choice = document.querySelector(".choice-content");
const removeBtn = document.querySelector(".btn-remove");
const choiceCard = document.querySelector(".choice-card");

function removeFilter() {
  removeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    choiceContainer.classList.remove("show-options");
    document.querySelectorAll(".card").forEach((card) => card.remove());
    init();
  });
}
removeFilter();

// Affichage ingrédients
function ingredientsFilters() {
  const allIngredients = [].concat(
    ...recipes.map((recipe) => recipe.ingredients)
  );
  const ingredientNames = allIngredients.map((ingr) => ingr.ingredient);
  let uniqueIngredients = [...new Set(ingredientNames)];

  uniqueIngredients = uniqueIngredients.sort();

  uniqueIngredients.forEach((ingredientsName) => {
    const button = document.createElement("button");
    button.classList.add("dropdown-item");
    button.innerHTML = ingredientsName;
    ingredientsDropdown.appendChild(button);
    button.addEventListener("click", (e) => {
      e.preventDefault();
      displayRecipe(ingredientsName.toLowerCase());
      choice.textContent = e.target.firstChild.nodeValue;
      choiceContainer.classList.add("show-options");
      choiceCard.classList.remove("appliance-options", "ustensils-options");
      choiceCard.classList.add("ingredients-options");
    });
  });
}

// Affichage appareils
function applianceFilters() {
  const allAppliance = [].concat(...recipes.map((recipe) => recipe.appliance));
  let uniqueAppliance = [...new Set(allAppliance)];

  uniqueAppliance = uniqueAppliance.sort();

  uniqueAppliance.forEach((ApplianceName) => {
    const button = document.createElement("button");
    button.classList.add("dropdown-item");
    button.innerHTML = ApplianceName;
    applianceDropdown.appendChild(button);
    button.addEventListener("click", (e) => {
      e.preventDefault();
      displayRecipe(ApplianceName.toLowerCase());
      choice.textContent = e.target.firstChild.nodeValue;
      choiceContainer.classList.add("show-options");
      choiceCard.classList.remove("ingredients-options", "ustensils-options");
      choiceCard.classList.add("appliance-options");
    });
  });
}

// Affichage ustensiles
function ustensilsFilters() {
  const allUstensils = [].concat(...recipes.map((recipe) => recipe.ustensils));
  let uniqueUstentil = [...new Set(allUstensils)];

  uniqueUstentil = uniqueUstentil.sort();

  uniqueUstentil.forEach((ustensilName) => {
    const button = document.createElement("button");
    button.classList.add("dropdown-item");
    button.innerHTML = ustensilName;
    ustensilsDropdown.appendChild(button);
    button.addEventListener("click", (e) => {
      e.preventDefault();
      displayRecipe(ustensilName.toLowerCase());
      choice.textContent = e.target.firstChild.nodeValue;
      choiceContainer.classList.add("show-options");
      choiceCard.classList.remove("ingredients-options", "appliance-options");
      choiceCard.classList.add("ustensils-options");
    });
  });
}

function showFilters() {
  ingredientsFilters();
  applianceFilters();
  ustensilsFilters();
}

export { showFilters, removeFilter };
