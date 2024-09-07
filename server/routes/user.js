var express = require("express");
var router = express.Router();
const DButils = require("./utils/DButils");
const user_utils = require("./utils/user_utils");
const recipe_utils = require("./utils/recipes_utils");

/**
 * Authenticate all incoming requests by middleware
 */
router.use(async function (req, res, next) {
  if (req.session && req.session.user_id) {
    DButils.execQuery("SELECT user_id FROM users").then((users) => {
      if (users.find((x) => x.user_id === req.session.user_id)) {
        req.user_id = req.session.user_id;
        next();
      }
    }).catch(err => next(err));
  } else {
    res.sendStatus(401);
  }
});


/**
 * This path gets body with recipeId and save this recipe in the favorites list of the logged-in user
 */
router.post('/favorites', async (req,res,next) => {
  try{
    const user_id = req.session.user_id;
    const recipe_id = req.body.recipeId;
    await user_utils.markAsFavorite(user_id,recipe_id);
    res.status(200).send("The Recipe successfully saved as favorite");
    } catch(error){
    next(error);
  }
})

/**
 * This path gets body with recipeId and removes this recipe from the favorites list of the logged-in user
 */
router.delete('/favorites', async (req, res, next) => {
  try {
    const user_id = req.session.user_id;
    const recipe_id = req.body.recipeId;
    await user_utils.removeFavorite(user_id, recipe_id);
    res.status(200).send("The Recipe successfully removed from favorites");
  } catch (error) {
    next(error);
  }
});

/**
 * This path returns the favorites recipes that were saved by the logged-in user
 */
router.get('/favorites', async (req,res,next) => {
  try{
    const user_id = req.session.user_id;
    const recipes_id = await user_utils.getFavoriteRecipes(user_id);
    let recipes_id_array = [];
    recipes_id.map((element) => recipes_id_array.push(element.recipe_id)); //extracting the recipe ids into array
    const results = await recipe_utils.getRecipesPreview(recipes_id_array);
    res.status(200).send(results);
  } catch(error){
    if (error.status === 402) {
      // Spoonacular API limit error, forward it to the client
      return res.status(402).send({ message: error.message });
    }
    next(error); 
  }
});


router.get('/my_recepies/:recipeId', async (req, res, next) => {
  try {
    const user_id = req.session.user_id;
    const recipe_id = req.params.recipeId;

    // Fetch the specific recipe from the database
    const recipe = await user_utils.getMyRecipeById(user_id, recipe_id);
    
    if (recipe) {
      res.status(200).send(recipe);
    } else {
      res.status(404).send("Recipe not found");
    }
  } catch (error) {
    next(error);
  }
});


router.post('/my_recepies', async (req, res, next) => {
  try {
    const user_id = req.session.user_id;
    console.log("User ID from session:", user_id);

    
    const { image, title, readyInMinutes, glutenFree, vegan, vegetarian, ingredients, instructions, numberOfDishes } = req.body;
    if (!image || !title || !readyInMinutes || glutenFree === undefined || vegan === undefined || vegetarian === undefined || !ingredients || !instructions || !numberOfDishes) {
      return res.status(401).send("Not all fields for recipe are full.");
    }
    await user_utils.createRecipe(user_id, image, title, readyInMinutes, glutenFree, vegan, vegetarian, ingredients, instructions, numberOfDishes);
    res.status(201).send("Recipe added successfully to user");
  } catch (error) {
    next(error);
  }
});

router.get('/my_recepies', async (req, res, next) => {
  try {
    const user_id = req.session.user_id;
    const recipes = await user_utils.getMyRecipes(user_id);
    res.status(200).send(recipes);
  } catch (error) {
    next(error);
  }
});



// router.get('/last_search', async (req, res, next) => {
//   try {
//     // const user_id = req.session.user_id;
//     const last_search = req.session.last_search;
//     if (last_search) {
//       res.status(200).send(last_search);
//     } else {
//       res.status(204).send("No last search found");
//     }
//     // res.status(200).send(last_search);
//   } catch (error) {
//     next(error);
//   }
// });





module.exports = router;
