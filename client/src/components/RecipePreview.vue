<template>
  <div class="recipe-preview">
    <div class="recipe-body">
      <router-link :to="generateRecipeLink()" @click.native="logRecipeId">
  <img :src="recipe.image" class="recipe-image" alt="Recipe Image" />
</router-link>

    </div>
    <div class="recipe-footer">
      <div :title="recipe.title" class="recipe-title">
        {{ recipe.title }}
      </div>
      <ul class="recipe-overview">
        <li>
          <img src="../assets/PreviewIcons/time_24px.png" alt="ReadyTime" />
          <br />
          {{ recipe.readyInMinutes }} minutes
        </li>
        <li>
          <img src="../assets/PreviewIcons/quality_like_24px.png" alt="Likes" />
          <br />
          {{ recipe.aggregateLikes }} likes
        </li>
        <li v-if="recipe.vegetarian">
          <img src="../assets/PreviewIcons/vegetarian_24.png" alt="Vegetarian" />
        </li>
        <li v-if="recipe.vegan">
          <img src="../assets/PreviewIcons/vegan_24.png" alt="Vegan" />
        </li>
        <li v-if="recipe.glutenFree">
          <img src="../assets/PreviewIcons/gluten_24.png" alt="GlutenFree" />
        </li>
        

        <li v-if="$root.store.username"> <!-- Show favorite button only if user is logged in -->
          <img
            :src="favoriteIcon"
            :alt="isFavorite ? 'Favorite_full' : 'Favorite_empty'"
            @click.stop="toggleFavorite"
            class="favorite-icon"
          />
        </li>
        <li v-else>
          <img
            :src="favoriteIcon"
            :alt="'Favorite_empty'"
            class="favorite-icon disabled" 
          />
        </li>
        <!-- Apply disabled class for unauthenticated users -->
        <!-- <li>
          <img
            :src="favoriteIcon"
            :alt="isFavorite ? 'Favorite_full' : 'Favorite_empty'"
            @click.stop="toggleFavorite"
            class="favorite-icon"
          />
        </li> -->
      </ul>
    </div>


     <!-- Alert for users when they add/remove a recipe from favorites -->
     <b-alert
      class="mt-2"
      v-if="alertMessage"
      variant="info"
      dismissible
      fade
      show
    >
      {{ alertMessage }}
    </b-alert>


  </div>
</template>

<script>
export default {
  props: {
    recipe: {
      type: Object,
      required: true
    },
    source: {
      type: String,
      required: true // "personal" or "spoonacular"
    },
  },
  data() {
    return {
      isFavorite: false
    };
  },
  mounted() {
    this.checkIfFavorite();
  },
  methods: {
    generateRecipeLink() {
      if (this.source === "personal") {
        return { name: "personalRecipe", params: { recipeId: this.recipe.id } };
      } else {
        return { name: "recipe", params: { recipeId: this.recipe.id } };
      }
    },

    logRecipeId() {
    console.log("Navigating to recipe with ID:", this.recipe.id);
  },
    async checkIfFavorite() {
      try {
        // Fetch the user's favorite recipes from the backend
        const endpoint = `${this.$root.store.server_domain}/users/favorites`;
        const response = await this.axios.get(endpoint, {
          withCredentials: true, // Ensure that cookies are sent with the request
        });
        const favoriteRecipes = response.data.map(recipe => recipe.id);

        // Check if the current recipe is in the user's favorites
        this.isFavorite = favoriteRecipes.includes(this.recipe.id);
      } catch (error) {
        console.error('Failed to check favorite status:', error);
      }
    },
    async toggleFavorite() {
      try {
        let message = '';
        const endpoint = `${this.$root.store.server_domain}/users/favorites`;  // Define endpoint here
        if (this.isFavorite) {
          // // Remove from favorites
          await this.axios.delete(endpoint, { 
            data: { recipeId: this.recipe.id },
            withCredentials: true 
          });
          message = 'Recipe removed from favorites.';

        } else {
          // Add to favorites
          await this.axios.post(endpoint, { recipeId: this.recipe.id }, { withCredentials: true });          
          message = 'Recipe added to favorites.';
        }

        // Toggle the favorite state and show a success message
        this.isFavorite = !this.isFavorite;
        alert(message);
      } catch (error) {
        console.error('Failed to toggle favorite status:', error);
        alert('An error occurred while updating favorites.');
      }
    }
  },
  computed: {
    favoriteIcon() {
      return this.isFavorite
      ? require('../assets/PreviewIcons/favorite_full.png')
      : require('../assets/PreviewIcons/favorite_empty.png');
    }
  }
};
</script>
<style scoped>
.recipe-preview {
  display: inline-block;
  width: 80%;
  height: 300px; /* Set a fixed height for all cards */
  position: relative;
  margin: 10px 0;
  overflow: hidden;
  transition: box-shadow 0.3s ease-in-out;
  border: 1px solid #ccc; /* Add border */
  border-radius: 8px; /* Optional: Rounded corners */
  box-sizing: border-box;
  background-color: #fff; /* Set background color */
}

.recipe-preview:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.recipe-body {
  width: 100%;
  height: 60%; /* Adjust as needed */
  position: relative;
}

.recipe-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
}

.recipe-footer {
  width: 100%;
  height: 40%; /* Adjust as needed */
  padding: 10px;
  background-color: #f8f9fa;
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* Ensure content is spaced evenly */
}

.recipe-title {
  font-size: 1.2em;
  font-weight: bold;
  text-align: center;
  margin-bottom: 10px;
  color: #333;
  flex-grow: 1; /* Ensures it takes the necessary space */
}

.recipe-overview {
  display: flex;
  justify-content: space-around;
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 0.9em;
  color: #555;
}

.recipe-overview li {
  text-align: center;
}

.favorite-icon {
  cursor: pointer;
  width: 24px;
  height: 24px;
}

.favorite-icon.disabled {
  opacity: 0.5; /* Make it semi-transparent */
  pointer-events: none; /* Prevent click events */
  cursor: not-allowed; /* Show "not allowed" cursor */
}
</style>