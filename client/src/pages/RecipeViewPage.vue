<template>
  <div class="container">
    <b-card class="recipe-card" header-class="recipe-header" header-tag="header">
      <template v-slot:header>
        <h1 class="recipe-title">{{ recipe.title }}</h1>
      </template>
      <div v-if="recipe">
        <div class="recipe-header mt-3 mb-4">
          <img :src="recipe.image" class="center recipe-image" />
        </div>
        <div class="recipe-body">
          <div class="info-wrapper mb-3">
            <div>Ready in {{ recipe.readyInMinutes }} minutes</div>
            <div>Likes: {{ recipe.aggregateLikes }} likes</div>
            <div>Serves: {{ recipe.servings }} dishes</div>
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
                <li v-for="s in recipe._instructions" :key="s.number">
                  {{ s.step }}
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
export default {
  data() {
    return {
      recipe: null,
    };
  },
  beforeMount() {
    // this.created();
    this.fetchRecipeDetails();

  },
  mounted() {
  console.log('RecipeViewPage mounted with ID:', this.$route.params.recipeId);
},

  methods: {
    async fetchRecipeDetails() {
      try {
        const recipeId = this.$route.params.recipeId;
        console.log("Fetching details for recipe ID:", recipeId); // Debugging line

        let endpoint;

        if (this.$route.name === 'personalRecipe') {
          // Fetch personal recipe details from your server
          endpoint = `${this.$root.store.server_domain}/users/my_recepies/${recipeId}`;
        } else {
          // Fetch Spoonacular recipe details
          endpoint = `${this.$root.store.server_domain}/recipes/information/Id/${recipeId}`;
        }

        // const endpoint = `${this.$root.store.server_domain}/recipes/information/Id/${recipeId}`;
        const response = await this.axios.get(endpoint, {
  withCredentials: true, // This ensures that cookies are sent with the request
});
        if (response.data) {
        console.log("Recipe details fetched successfully:", response.data); // Debugging line

          const {
            analyzedInstructions = [], // Default to an empty array if undefined
            instructions,
            extendedIngredients,
            aggregateLikes = 0, // Default to 0 for personal recipes if not provided
            readyInMinutes,
            servings = response.data.numberOfDishes || 1,
            image,
            title,
            glutenFree,
            vegan,
            vegetarian,
          } = response.data;

          const _instructions = analyzedInstructions
            .map((fstep) => {
              fstep.steps[0].step = fstep.name + fstep.steps[0].step;
              return fstep.steps;
            })
            .reduce((a, b) => [...a, ...b], []);

          this.recipe = {
            instructions,
            _instructions,
            analyzedInstructions,
            extendedIngredients,
            aggregateLikes,
            readyInMinutes,
            servings,
            image,
            title,
            glutenFree,
            vegan,
            vegetarian,
          };
        } else {
          this.$router.replace("/NotFound");
        }
      } catch (error) {
        console.log(error);
        this.$router.replace("/NotFound");
      }
    },
  }
};

</script>

<style scoped>
.container {
  background: linear-gradient(to bottom right,#a4e8f1, #f5f8f2); /* Very light blue gradient */
  padding: 20px;
  border-radius: 8px;
  font-family: "Comic Sans MS", cursive, sans-serif;
}

.recipe-card {
  border: 1px solid #ddd;
  background: linear-gradient(to bottom right, #a4e8f1, #f5f8f2); /* Apply gradient to entire card */
  padding: 20px;
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
  width: 40%; /* Adjusted size */
  height: auto;
  border: 1px solid #b26767;
  border-radius: 8px;
  margin-top: 10px;
}

.recipe-body {
  margin-top: 20px;
  color: #333
}

.info-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  border-radius: 8px;
  font-size: 1.3em;
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
  width: 45px; /* Bigger icon size */
  height: 45px; /* Bigger icon size */
  margin: 0 5px;
}
</style>