<template>
  <div class="container">
    <h1 class="title">Main Page</h1>
    <div v-if="$root.store.username" class="narrow-card">
      <!-- Show only random recipes centered if the user is connected -->
      <section class="centered-recipes">
        <h2>Random Recipes:</h2>
        <RecipePreviewList
          ref="recipeList"  
          class="random-recipes center"
          :isLastSeen="false"
          source="random"
          title="Random Recipes"
        />
        <b-button variant="info" @click="NewRandomRecipes" class="mt-3">
          Random new recipes
        </b-button>
      </section>
    </div>
    <div v-else>
      <!-- Original layout if the user is not connected -->
      <b-row>
        <b-col md="6">
          <section>
            <h2>Random Recipes:</h2>
            <RecipePreviewList
              ref="recipeList"
              class="random-recipes"
              :isLastSeen="false"
              source="random"
              title="Random Recipes"
            />
            <b-button variant="info" @click="NewRandomRecipes" class="mt-3">
              Random new recipes
            </b-button>
          </section>
        </b-col>
        <b-col md="6">
          <section class="login-container">
            <div align="center" class="login-section">
              <Login></Login>
            </div>
          </section>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import Login from "../components/Login";
import RecipePreviewList from "../components/RecipePreviewList";

export default {
  components: {
    Login,
    RecipePreviewList
  },
  methods: {
    NewRandomRecipes() {
      // this.$emit("updateRecipes");
      this.$refs.recipeList.refreshRecipes();  // Trigger the refresh

    }
  }
};
</script>

<style lang="scss" scoped>
html,
body {
  height: 100%;
  margin: 0;
  background: linear-gradient(45deg, #3ff9f9, #5172f8);
  background-attachment: fixed;
  font-family: "Raleway", sans-serif;
}

.container {
  max-width: 1200px;
  padding: 20px;
  margin: 0 auto;
}

.centered-recipes {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 230px;
  width: 70%;
}

.random-recipes {
  margin: 10px 0;
  width: 100%;
}
.narrow-card .recipe-preview {
  width: 80%; /* Adjust this value to make the card narrower */
  align-items: center;
  margin-left: 210px;
}
.login-section {
  margin-top: 50px; /* Adjust this value as needed */
}

.blur {
  -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
  filter: blur(2px);
}

::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}

h1,
h2 {
  color: #ffffff;
  font-weight: 800;
  text-align: center;
}

h1 {
  font-size: 62px;
  line-height: 72px;
  margin: 0 0 24px;
  text-transform: uppercase;
}

h2 {
  font-size: 30px;
  line-height: 36px;
  margin: 0 0 24px;
}
</style>
