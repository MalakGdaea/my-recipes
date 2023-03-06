renderer = new Renderer();

let glutenFree = false;
let dairyFree = false;
let page = 1;
const PAGE_SIZE = 4;
let ingredient;
let recipes;

$(".navigate").hide();

$("#search").on("click", function () {
  ingredient = $("input").val();
  page = 1;
  getRecipes();
});

const getRecipes = function () {
  $.get(
    `/recipes/${ingredient}/?glutenFree=${glutenFree}&dairyFree=${dairyFree}&page=${page}&page_size=${PAGE_SIZE}`
  ).then((recipesData) => {
    page = recipesData.page;
    recipes = recipesData.pageRecipes;
    displayRecipes(recipesData);
  });
};

const displayRecipes = function () {
  $("#container").empty();
  if ((page == 1) & (recipes.length == 0)) {
    $(".navigate").hide();
    $("#container").empty();
    $("#notFound").empty();
    $("#notFound").append("There are no match!");
  }
  if (recipes.length != 0) {
    $(".navigate").show();
    prepareIngredients(recipes);
    renderer.render(recipes);
  }
};

const prepareIngredients = function (recipe) {
  recipe.forEach((element) => {
    element.ingredients = element.ingredients.map((elem) => {
      return { ingredient: elem };
    });
  });
};

$("#container").on("click", "img", function () {
  let firstIngredients = $(this).siblings("ul")[0].children[0];
  alert(firstIngredients.textContent);
});

$("#glutenFree").on("change", function () {
  if ($(this).is(":checked")) {
    glutenFree = true;
  } else {
    glutenFree = false;
  }
});

$("#milkFree").on("change", function () {
  if ($(this).is(":checked")) {
    dairyFree = true;
  } else {
    dairyFree = false;
  }
});

$("#previous").on("click", function () {
  if (page > 1) {
    page--;
  }
  getRecipes();
});

$("#next").on("click", function () {
  page++;
  getRecipes();
});
