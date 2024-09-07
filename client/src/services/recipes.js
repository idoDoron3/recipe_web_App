// import recipe_full_view from "../assets/mocks/recipe_full_view.json";
// import recipe_preview from "../assets/mocks/recipe_preview.json";
const family_recipe_previews = require('@/assets/mocks/family_recipe_preview.json');
const family_recipe_full_views = require('@/assets/mocks/family_recipe_full_view.json');

// let userRecipes = [];

// export function mockCreateRecipe(recipe) {
//   const newRecipe = {
//     ...recipe,
//     id: userRecipes.length + 1 // Assign a new id
//   };
//   userRecipes.push(newRecipe);
//   return { data: { message: "Recipe created successfully", recipe: newRecipe } };
// }

// export function mockGetRecipesPreview(amount = 1) {
//   let recipes = [];
//   for(let i = 0; i < amount; i++){
//     recipes.push(recipe_preview);
//   }

//   return { data: { recipes: recipes } };
// }

// export function mockGetRecipeFullDetails(recipeId) {
//     return { data: { recipe: recipe_full_view } } ;
//   }

//   export function mockSearchRecipes(query, amount, cuisine, diet, intolerance) {
//     // Always return the same mock recipe
//     let recipes = [];
//     for (let i = 0; i < amount; i++) {
//       recipes.push(recipe_preview);
//     }
//     return { data: recipes };
//   }

  
//   export function mockGetUserRecipes(userId) {
//     return { data: { recipes: userRecipes.filter(r => r.userId === userId) } };
//   }
  
 
  export function mockGetFamilyRecipesPreview() {
    return { data: { recipes: family_recipe_previews } };
  }
  
  export function mockGetFamilyRecipeFullDetails(recipeId) {
    const recipe = family_recipe_full_views.find((r) => r.id === parseInt(recipeId));
    return { data: { recipe } };
  }
  
  export {
    family_recipe_previews,
    family_recipe_full_views,
  };
