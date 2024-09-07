<template>
  <div class="family-recipe-preview">
    <b-card
      :title="recipe.title"
      :img-src="getImagePath(recipe.image)"
      img-alt="Recipe Image"
      img-top
      tag="article"
      class="mb-2 recipe-card"
    >
      <b-card-text>
        <div>Made by: {{ recipe.maker }}</div>
        <div>Usually made during: {{ recipe.madeWhen }}</div>
        <div>Ready in {{ recipe.readyInMinutes }} minutes</div>
        <div>Likes: {{ recipe.aggregateLikes }} likes</div>
      </b-card-text>
      <div class="button-container">
        <b-button @click="$router.push({ name: 'familyRecipeView', params: { id: recipe.id } })" variant="info">View Recipe</b-button>
      </div>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "FamilyRecipePreview",
  props: {
    recipe: {
      type: Object,
      required: true,
    },
  },
  methods: {
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
.family-recipe-preview {
  width: 100%;
  max-width: 300px; /* Set this to your desired card width */
  margin: 0 auto; /* Center the card */
  color: #333;

}

.recipe-card {
  width: 100%;
  height: 480px; /* Ensure the card takes the full height of its container */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.family-recipe-preview img {
  width: 100%;
  height: 220px; /* Set to the desired height */
  object-fit: cover; /* Ensures the image covers the area without stretching */
}

.b-card-text {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.button-container {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  text-align: center;
}
</style>








