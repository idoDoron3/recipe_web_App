<template>
  <div class="container">
    <b-card class="recipe-card" header-class="recipe-header" header-tag="header">
      <template v-slot:header>
        <h1 class="recipe-title">{{ recipe.title }}</h1>
      </template>
      <div v-if="recipe">
        <div class="recipe-header mt-3 mb-4">
          <img :src="getImagePath(recipe.image)" class="center recipe-image" alt="Recipe Image" />
        </div>
        <div class="recipe-body">
          <div class="info-wrapper mb-3">
            <div>Made by: {{ recipe.maker }}</div>
            <div>Usually made during: {{ recipe.madeWhen }}</div>
            <div>Ready in {{ recipe.readyInMinutes }} minutes</div>
            <div>Likes: {{ recipe.aggregateLikes }} likes</div>
            <div class="d-flex justify-content-center mb-3">
              <img v-if="recipe.glutenFree" src="../assets/RecipeIcons/glutenFree.png" alt="Gluten Free" class="icon" />
              <img v-if="recipe.vegan" src="../assets/RecipeIcons/vegan.jpg" alt="Vegan" class="icon" />
              <img v-if="recipe.vegetarian" src="../assets/RecipeIcons/vegetarian.png" alt="Vegetarian" class="icon" />
            </div>
          </div>
          <div class="wrapper">
            <div class="wrapped">
              <h3>Ingredients:</h3>
              <ul>
                <li v-for="(r, index) in recipe.extendedIngredients" :key="index + '_' + r.id">
                  {{ r.original }}
                </li>
              </ul>
            </div>
            <div class="wrapped">
              <h3>Instructions:</h3>
              <ol>
                <li v-for="(instruction, index) in recipe.instructions" :key="index">
                  {{ instruction }}
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </b-card>
  </div>
</template>

<script>
import { mockGetFamilyRecipeFullDetails } from "@/services/recipes.js";

export default {
  data() {
    return {
      recipe: null,
    };
  },
  created() {
    this.fetchRecipeDetails();
  },
  methods: {
    fetchRecipeDetails() {
      const recipeId = this.$route.params.id;
      const response = mockGetFamilyRecipeFullDetails(recipeId);
      if (response.data.recipe) {
        this.recipe = response.data.recipe;
      } else {
        this.$router.replace("/NotFound");
      }
    },
    getImagePath(image) {
      try {
        return require(`@/${image}`);
      } catch (error) {
        console.error(`Failed to load image: ${image}`);
        return '';
      }
    }
  }
};
</script>

<style scoped>
.container {
  background: linear-gradient(to bottom right, #a4e8f1, #f5f8f2);

  padding: 20px;
  border-radius: 8px;
  font-family: "Comic Sans MS", cursive, sans-serif;
}

.recipe-card {
  border: 1px solid #ddd;
  background: linear-gradient(to bottom right, #a4e8f1, #f5f8f2);
  border-radius: 8px;
  margin-top: 20px;
}

.recipe-header {
  text-align: center;
}

.recipe-title {
  font-size: 2em;
  color: #333;
}

.recipe-image {
  width: 60%;
  height: 330px;
  /* max-height: 300px; Ensures the image has a max height */
  object-fit: cover; /* Ensures the image covers the area without stretching */
  border: 1px solid #b26767;
  border-radius: 8px;
  margin-top: 10px;
}

.recipe-body {
  margin-top: 20px;
  color: #333;
}

.info-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  border-radius: 8px;
  font-size: 1.5em;
}

.wrapper {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.wrapped {
  width: 45%;
}

h3 {
  font-size: 1.5em;
  color: #555;
}

ul, ol {
  padding-left: 20px;
  text-align: left;
}

li {
  font-size: 1.2em;
  color: #666;
  margin-bottom: 10px;
}

.icon {
  width: 50px;
  height: 50px;
  margin: 0 5px;
}
</style>

