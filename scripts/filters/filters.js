import { recipes } from "/scripts/utils/recipes.js";
import { initCards, globalSearch, filterTags } from "/scripts/script.js";

// Dropdown
const ingredientsDropdown = document.querySelector(".ingredients-options");
const applianceDropdown = document.querySelector(".appliance-options");
const ustensilsDropdown = document.querySelector(".ustensils-options");
const choiceContainer = document.querySelector(".choice-container");

const createButtonElementFilter = (value, className) => {
  const choiceTag = document.createElement("div");
  const choiceSpan = document.createElement("span");
  const choiceBtn = document.createElement("button");
  const choiceClose = document.createElement("i");
  choiceTag.classList.add("choice-card", className);
  choiceTag.setAttribute("id", value);
  choiceSpan.classList.add("choice", "choice-content");
  choiceBtn.classList.add("btn-remove");
  choiceClose.classList.add(
    "fa-sharp",
    "fa-regular",
    "fa-circle-xmark",
    "choice-content"
  );
  choiceBtn.appendChild(choiceClose);
  choiceTag.addEventListener("click", (e) => {
    e.preventDefault();
    choiceTag.remove();
    filterTags();
  });
  choiceSpan.textContent = value;
  choiceTag.appendChild(choiceSpan);
  choiceTag.appendChild(choiceBtn);
  choiceContainer.appendChild(choiceTag);
};

// Affichage ingrédients
function ingredientsFilters(ingredientsFiltered) {
  const allIngredients = ingredientsFiltered
    ? ingredientsFiltered
    : [].concat(...recipes.map((recipe) => recipe.ingredients));
  let ingredientNames = [];
  for (let index = 0; index < allIngredients.length; index++) {
    ingredientNames.push(allIngredients[index].ingredient);
  }
  let uniqueIngredients = [...new Set(ingredientNames)];

  uniqueIngredients = uniqueIngredients.sort();
  for (let index = 0; index < uniqueIngredients.length; index++) {
    const ingredientsName = uniqueIngredients[index];
    const button = document.createElement("button");
    button.classList.add("dropdown-item");
    button.innerHTML = ingredientsName;
    ingredientsDropdown.appendChild(button);
    button.addEventListener("click", (e) => {
      e.preventDefault();
      const value = e.target.firstChild.nodeValue;
      createButtonElementFilter(value, "ingredients-options");
      filterTags();
    });
  }
}

// Affichage appareils
function applianceFilters(appliancesFiltered) {
  const allAppliance = appliancesFiltered
    ? appliancesFiltered
    : [].concat(...recipes.map((recipe) => recipe.appliance));
  let uniqueAppliance = [...new Set(allAppliance)];

  uniqueAppliance = uniqueAppliance.sort();

  for (let index = 0; index < uniqueAppliance.length; index++) {
    const applianceName = uniqueAppliance[index];
    const button = document.createElement("button");
    button.classList.add("dropdown-item");
    button.innerHTML = applianceName;
    applianceDropdown.appendChild(button);
    button.addEventListener("click", (e) => {
      e.preventDefault();
      const value = e.target.firstChild.nodeValue;
      createButtonElementFilter(value, "appliance-options");
      filterTags();
    });
  }
}

// Affichage ustensiles
function ustensilsFilters(ustensilsFiltered) {
  const allUstensils = ustensilsFiltered
    ? ustensilsFiltered
    : [].concat(...recipes.map((recipe) => recipe.ustensils));
  let uniqueUstentil = [...new Set(allUstensils)];

  uniqueUstentil = uniqueUstentil.sort();

  for (let index = 0; index < uniqueUstentil.length; index++) {
    const ustensilName = uniqueUstentil[index];
    const button = document.createElement("button");
    button.classList.add("dropdown-item");
    button.innerHTML = ustensilName;
    ustensilsDropdown.appendChild(button);
    button.addEventListener("click", (e) => {
      e.preventDefault();
      const value = e.target.firstChild.nodeValue;
      createButtonElementFilter(value, "ustensils-options");
      filterTags();
    });
  }
}

function showFilters() {
  ingredientsFilters();
  applianceFilters();
  ustensilsFilters();
}

export { showFilters, ingredientsFilters, ustensilsFilters, applianceFilters };
