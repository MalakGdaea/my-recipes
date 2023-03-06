const axios = require("axios");
const { json } = require("express");
const express = require("express");
const router = express.Router();
const Filter = require("./utlitiy/filter");

filter = new Filter();

router.get("/recipes/:ingredient", function (req, res) {
  let glutenFree = JSON.parse(req.query.glutenFree);
  let dairyFree = JSON.parse(req.query.dairyFree);
  let page = Number(req.query.page);
  let pageSize = Number(req.query.page_size);
  let ingredient = req.params.ingredient;
  let url = `https://recipes-goodness-elevation.herokuapp.com/recipes/ingredient/${ingredient}`;
  axios
    .get(url)
    .then((response) => {
      let filteredRecipes = filterData(response, dairyFree, glutenFree);
      if (filteredRecipes.length == 0) {
        res.send({ pageRecipes: filteredRecipes, page }).status(202);
      } else {
        let { startIndex, endIndex, currectPage } = validatePageIndexes(
          page,
          pageSize,
          filteredRecipes
        );
        const pageRecipes = filteredRecipes.slice(startIndex, endIndex);
        res.send({ pageRecipes: pageRecipes, page: currectPage });
      }
    })
    .catch(function (error) {
      res.send({
        status: "500",
        message: error,
      });
    });
});

const validatePageIndexes = function (page, pageSize, recipes) {
  let startIndex = (page - 1) * pageSize;
  let currectPage = page;
  while (startIndex >= recipes.length) {
    currectPage--;
    startIndex = (currectPage - 1) * pageSize;
  }
  let endIndex;
  if (currectPage * pageSize < recipes.length) {
    endIndex = currectPage * pageSize;
  } else {
    endIndex = recipes.length;
  }
  return { startIndex, endIndex, currectPage };
};

const filterData = function (response, dairyFree, glutenFree) {
  let recipes = response.data.results.map((element) => {
    return {
      idMeal: element.idMeal,
      ingredients: element.ingredients,
      title: element.title,
      thumbnail: element.thumbnail,
      href: element.href,
    };
  });
  let filteredRecipes = filter.filter(recipes, dairyFree, glutenFree);
  return filteredRecipes;
};

module.exports = router;
