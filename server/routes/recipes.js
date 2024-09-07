var express = require("express");
var router = express.Router();
const recipes_utils = require("./utils/recipes_utils");

router.get("/", (req, res) => res.send("im here"));


router.get("/random", async (req, res, next) => {
  try {
    const recipes = await recipes_utils.getRandomThreeRecipes();
    console.log("Recipes fetched successfully:", recipes);

    res.send(recipes);
  } catch (error) {
    if (error.status === 402) {
      // Send the custom API limit error to the client
      return res.status(402).send({ message: error.message });
    }
    console.error("Error in get_3_random_recipes route:", error.message);

    next(error);
  }
});

router.get("/search", async (req, res, next) => {
  try {
    const recipeName = req.query.recipeName;
    const cuisine = req.query.cuisine;
    const diet = req.query.diet;
    const intolerance = req.query.intolerance;
    const number = req.query.number || 5;
    const sortBy = req.query.sortBy; 
     
    //save last search in curr sesion
    req.session.last_search = { recipeName, cuisine, diet, intolerance, number, sortBy };

    const results = await recipes_utils.searchRecipe(recipeName, cuisine, diet, intolerance, number);

    // sort result by time or popularity
    if (sortBy === 'preparationTime') {
      results.sort((a, b) => a.readyInMinutes - b.readyInMinutes);
    } else if (sortBy === 'popularity') {
      results.sort((a, b) => b.aggregateLikes - a.aggregateLikes);
    }

    res.send(results);
  } catch (error) {
    if (error.status === 402) {
      // Send the custom API limit error to the client
      return res.status(402).send({ message: error.message });
    }
    next(error);
  }

});



router.get('/information/Id/:recipeID', async (req, res, next) => {
  try {
    const { recipeID } = req.params;
    const recipe_info = await recipes_utils.getRecipeInformation(recipeID);
    res.status(200).send(recipe_info);
  } catch (error) {
    if (error.status === 402) {
      // Send the custom API limit error to the client
      return res.status(402).send({ message: error.message });
    }
    next(error);
  }
});



/**
 * This path returns a full details of a recipe by its id
 */
router.get("/:recipeId", async (req, res, next) => {
  try {
    const recipe = await recipes_utils.getRecipeDetails(req.params.recipeId);
    res.send(recipe);
  } catch (error) {
    if (error.status === 402) {
      // Send the custom API limit error to the client
      return res.status(402).send({ message: error.message });
    }
    next(error);
  }
});



module.exports = router;
