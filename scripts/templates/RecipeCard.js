class RecipeCard {
  constructor(recipe) {
    this._recipe = recipe;
  }

  createRecipeCard() {
    const article = document.createElement("article");
    article.classList.add("recipe-card");

    const recipeCard = `
              <div class="card">
                <div class="img-container">
                    <img class="img" src="assets/temp_image.png" alt="image plats temporaire" />
                </div>
                <div class="content">
                    <div class="top-description">
                        <h2 class="title">${this._recipe.name}</h2>
                        <span class="time">${this._recipe.time} min</span>
                    </div>
                    <div class="bottom-description">
                        <ul class="ingredients-list">
                            <li class="ingredient">${this._recipe.ingredients[0].ingredient}:
                              <span class="quantity">${this._recipe.ingredients[0].quantity}</span>
                              <span class="unit">${this._recipe.ingredients[0].unit}</span>
                            </li>
                            <li class="ingredient">${this._recipe.ingredients[1].ingredient}:
                              <span class="quantity">${this._recipe.ingredients[1].quantity}</span>
                              <span class="unit">${this._recipe.ingredients[1].unit}</span>
                            </li>
                            <li class="ingredient">${this._recipe.ingredients[2].ingredient}:
                              <span class="quantity">${this._recipe.ingredients[2].quantity}</span>
                              <span class="unit">${this._recipe.ingredients[2].unit}</span>
                            </li>
                            <li class="ingredient">${this._recipe.ingredients[3].ingredient}:
                              <span class="quantity">${this._recipe.ingredients[3].quantity}</span>
                              <span class="unit">${this._recipe.ingredients[3].unit}</span>
                            </li>
                        </ul>
                        <p class="description">${this._recipe.description}</p>
                    </div>
                </div>
              </div>
              `;
    article.innerHTML = recipeCard;
    return article;
  }
}
