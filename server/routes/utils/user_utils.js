const DButils = require("./DButils");

async function markAsFavorite(user_id, recipe_id){
  if (!recipe_id) {
      throw new Error("Recipe ID is undefined or null.");
  }
  await DButils.execQuery(`INSERT INTO favorites_recipes (user_id, recipe_id) VALUES ('${user_id}', ${recipe_id})`);
}

async function removeFavorite(user_id, recipe_id) {
  if (!recipe_id) {
      throw new Error("Recipe ID is undefined or null.");
  }
  await DButils.execQuery(`DELETE FROM favorites_recipes WHERE user_id='${user_id}' AND recipe_id=${recipe_id}`);
}


async function getFavoriteRecipes(user_id){
    const recipes_id = await DButils.execQuery(`select recipe_id from favorites_recipes where user_id='${user_id}'`);
    return recipes_id;
}

const createRecipe = async (user_id, image, title, readyInMinutes, glutenFree, vegan, vegetarian, ingredients, instructions, numberOfDishes) => {
    const query = `
      INSERT INTO personal_recipes (user_id, image, title, readyInMinutes, glutenFree, vegan, vegetarian, ingredients, instructions, numberOfDishes)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [user_id, image, title, readyInMinutes, glutenFree, vegan, vegetarian, ingredients, instructions, numberOfDishes];
    await DButils.execQuery({
      sql: query,
      values: values
    });
  };
  

  async function getMyRecipes(user_id) {
    const recipes_details = await DButils.execQuery(`
      SELECT 
        id AS id, 
        title, 
        image, 
        readyInMinutes AS readyInMinutes, 
        NULL AS popularity, 
        vegan, 
        vegetarian, 
        glutenFree,
        ingredients, 
        instructions 
      FROM personal_recipes 
      WHERE user_id='${user_id}'
    `);
  
    return recipes_details.map(recipe => {
      // Convert ingredients and instructions into arrays
      recipe.extendedIngredients = recipe.ingredients.split(',').map(ingredient => ({ original: ingredient.trim() }));
      recipe.analyzedInstructions = [
        {
          name: '',
          steps: recipe.instructions.split(',').map((instruction, index) => ({
            number: index + 1,
            step: instruction.trim()
          }))
        }
      ];
  
      // Return the modified recipe object
      return recipe;
    });
  }


  const getMyRecipeById = async (user_id, recipe_id) => {
    const query = `
      SELECT *
      FROM personal_recipes
      WHERE user_id = ? AND id = ?
    `;
    const values = [user_id, recipe_id];
    const recipe = await DButils.execQuery({
      sql: query,
      values: values
    });
  
    if (recipe.length === 0) {
      return null; // Handle case where recipe is not found
    }
  
    // Convert ingredients and instructions into arrays
    recipe[0].extendedIngredients = recipe[0].ingredients.split(',').map(ingredient => ({ original: ingredient.trim() }));
    recipe[0].analyzedInstructions = [
      {
        name: '',
        steps: recipe[0].instructions.split(',').map((instruction, index) => ({
          number: index + 1,
          step: instruction.trim()
        }))
      }
    ];
  
    return recipe[0];
  };
  
  




exports.markAsFavorite = markAsFavorite;
exports.removeFavorite = removeFavorite;
exports.getFavoriteRecipes = getFavoriteRecipes;
exports.createRecipe=createRecipe;
exports.getMyRecipes=getMyRecipes;
exports.getMyRecipeById = getMyRecipeById;
