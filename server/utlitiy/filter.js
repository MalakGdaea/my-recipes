class Filter {
  constructor() {
    this.dairyIngredients = [
      "Cream",
      "Cheese",
      "Milk",
      "Butter",
      "Creme",
      "Ricotta",
      "Mozzarella",
      "Custard",
      "Cream Cheese",
    ];
    this.glutenIngredients = [
      "Flour",
      "Bread",
      "spaghetti",
      "Biscuits",
      "Beer",
    ];
  }

  filter(recipes, dairyFree, glotenFree) {
    let filteredRecipes = recipes;
    if (dairyFree) {
      filteredRecipes = this.removeRecipeContainIngriediant(
        recipes,
        this.dairyIngredients
      );
    }
    if (glotenFree) {
      filteredRecipes = this.removeRecipeContainIngriediant(
        filteredRecipes,
        this.glutenIngredients
      );
    }
    return filteredRecipes;
  }

  removeRecipeContainIngriediant(recipes, ingredientArray) {
    return recipes.filter((recipe) => {
      return !this.isMealContainIngriediant(
        recipe.ingredients,
        ingredientArray
      );
    });
  }

  isMealContainIngriediant(recipeIngredients, ingredients) {
    recipeIngredients = recipeIngredients.map((e) => e.toLowerCase());
    ingredients = ingredients.map((e) => e.toLowerCase());
    return recipeIngredients.some((item) => {
      return ingredients.some((g) => item.includes(g));
    });
  }
}

module.exports = Filter;
