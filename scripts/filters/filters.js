import { recipes } from "/scripts/utils/recipes.js";
import { displayRecipe } from "/scripts/script.js";
// Dropdown
const ingredientsDropdown = document.querySelector(".ingredients-options");
const applianceDropdown = document.querySelector(".appliance-options");
const ustensilsDropdown = document.querySelector(".ustensils-options");

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
    });
  });
}

function showFilters() {
  ingredientsFilters();
  applianceFilters();
  ustensilsFilters();
}

export { showFilters };
