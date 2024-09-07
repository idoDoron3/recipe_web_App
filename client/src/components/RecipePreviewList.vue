<template>
  <div class="recipe-preview-list">
    <div class="recipe-item" v-for="recipe in recipes" :key="recipe.id">
      <RecipePreview :recipe="recipe" :source="source" />
    </div>
  </div>
</template>

<script>
import RecipePreview from "./RecipePreview.vue";
export default {
  name: "RecipePreviewList",
  components: {
    RecipePreview
  },
  props: {
    title: {
      type: String,
      required: true
    },
    source: {
      type: String, // "random", "favorites", or "personal"
      required: true
    },
  },
  
  data() {
    return {
      recipes: []
    };
  },
  mounted() {
    this.refreshRecipes();  

  },
  methods: {
    async updateRecipes() {
      try {
        let endpoint;
        switch (this.source) {
          case "random":
            endpoint = `${this.$root.store.server_domain}/recipes/random`;
            break;
          case "favorites":
            endpoint = `${this.$root.store.server_domain}/users/favorites`;
            break;
          case "personal":
            endpoint = `${this.$root.store.server_domain}/users/my_recepies`;
            break;
          default:
            throw new Error("Invalid source type");
        }

        const response = await this.axios.get(endpoint, {
          withCredentials: true, // This ensures that cookies are sent with the request
        });

        this.recipes = response.data;
        
        console.log("Fetched recipes:", this.recipes);

      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    },
    refreshRecipes() {
      this.updateRecipes();  // Added this to trigger a refresh
    }
  }
};

</script>

<style scoped>
  .recipe-preview-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
  
  .recipe-item {
    width: 100%;
    margin-bottom: 20px;
  }
  </style>