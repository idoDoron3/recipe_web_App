<template>
  <div class="container">
    <h1 class="page-title">Family Recipes</h1>
    <div class="family-recipes">
      <div v-for="recipe in recipes" :key="recipe.id" class="recipe-item">
        <FamilyRecipePreview :recipe="recipe" />
      </div>
    </div>
  </div>
</template>

<script>
import FamilyRecipePreview from "@/components/FamilyRecipePreview.vue";
import { mockGetFamilyRecipesPreview } from "@/services/recipes.js";

export default {
  name: "FamilyRecipesPage",
  components: {
    FamilyRecipePreview
  },
  data() {
    return {
      recipes: []
    };
  },
  created() {
    this.fetchRecipes();
  },
  methods: {
    fetchRecipes() {
      const response = mockGetFamilyRecipesPreview();
      this.recipes = response.data.recipes;
    }
  }
};
</script>

<style scoped>
.container {
  padding: 20px;
  border-radius: 8px;
  font-family: "Comic Sans MS", cursive, sans-serif;
}
.page-title {
  text-align: center;
  font-size: 2.5em;
  color: #f8efef;
  margin-bottom: 20px;
}

.family-recipes {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.recipe-item {
  flex: 1 1 calc(33.333% - 20px);
  margin: 10px;
  
}
</style>
