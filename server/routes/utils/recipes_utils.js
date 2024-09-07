const axios = require("axios");
const api_domain = "https://api.spoonacular.com/recipes";



/**
 * Get recipes list from spooncular response and extract the relevant recipe data for preview
 * @param {*} recipes_info 
 */



async function getRecipeInformation(recipe_id) {
  try {
      console.log(`Fetching information for recipe ID: ${recipe_id}`);
      const response = await axios.get(`${api_domain}/${recipe_id}/information`, {
          params: {
              includeNutrition: false,
              apiKey: process.env.spooncular_apiKey
          }
      });

      // Return only the data part of the response
      return response.data;

  } catch (error) {
    if (error.response && error.response.status === 402) {
      // Spoonacular API limit error
      throw { status: 402, message: "API limit exceeded. Please try again tomorrow." };
    }
      console.error(`Error fetching recipe information for ID ${recipe_id}:`, error);
      throw error; // Let the calling function handle the error
  }
}



async function getRecipeDetails(recipe_id) {
    let recipe_info = await getRecipeInformation(recipe_id);
    let { id, title, readyInMinutes, image, aggregateLikes, vegan, vegetarian, glutenFree } = recipe_info.data;

    return {
        id: id,
        title: title,
        readyInMinutes: readyInMinutes,
        image: image,
        popularity: aggregateLikes,
        vegan: vegan,
        vegetarian: vegetarian,
        glutenFree: glutenFree,
        
    }
}


async function getRecipesPreview(recipes_id_array) {
    try {
      let promises = recipes_id_array.map((id) =>
        axios.get(`${api_domain}/${id}/information`, {
            params: {
                apiKey: process.env.spooncular_apiKey,
     
            },
          })
        // )
      );
  
      let info_res = await Promise.all(promises);
      return info_res.map((recipe_info) => {
        return {
          id: recipe_info.data.id,
          title: recipe_info.data.title,
          readyInMinutes: recipe_info.data.readyInMinutes,
          aggregateLikes: recipe_info.data.aggregateLikes,
          vegetarian: recipe_info.data.vegetarian,
          vegan: recipe_info.data.vegan,
          glutenFree: recipe_info.data.glutenFree,
          image: recipe_info.data.image,
        };
      });
    } catch (error) {
      console.error("Error fetching recipe previews:", error.message);

      throw error;
    }
  }

async function searchRecipe(recipeName, cuisine, diet, intolerance, number, username) {
  try{
    const response = await axios.get(`${api_domain}/complexSearch`, {
        params: {
            query: recipeName,
            cuisine: cuisine,
            diet: diet,
            intolerances: intolerance,
            number: number,
            apiKey: process.env.spooncular_apiKey
        }
    });
    return getRecipesPreview(response.data.results.map((element) => element.id), username);
  }catch (error) {
    if (error.response && error.response.status === 402) {
      // Spoonacular API limit error
      throw { status: 402, message: "API limit exceeded. Please try again tomorrow." };
    }
    throw error;
  }

}



async function getRandomThreeRecipes() {

  try{
    let response = await axios.get(`${api_domain}/random`, {
      params: {
            number: 3, // Fetch more than 3 in case some don't meet criteria
            apiKey: process.env.spooncular_apiKey,
          },
        });
        // console.log(response.data);
        let recipes = response.data.recipes; // Extract the recipes array

        // Return all the recipe IDs from the array
        const recipeIDs = recipes.map((recipe) => recipe.id);
        return getRecipesPreview(recipeIDs);
      }catch (error) {
        if (error.response && error.response.status === 402) {
          // Spoonacular API limit error
          throw { status: 402, message: "API limit exceeded. Please try again tomorrow." };
        }
        throw error;
      }
}



exports.getRecipeInformation = getRecipeInformation
exports.getRandomThreeRecipes = getRandomThreeRecipes;
exports.getRecipeDetails = getRecipeDetails;
exports.searchRecipe=searchRecipe; 
exports.getRecipesPreview = getRecipesPreview;