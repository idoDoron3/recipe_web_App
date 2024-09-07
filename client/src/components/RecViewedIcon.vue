<template>
    <div>
      <img
        v-if="!$root.store.username"
        src="../assets/PreviewIcons/view_empty.png"
        alt="Viewed_empty"
        id="Viewed_empty"
      />
      <img
        v-else-if="$root.store.username && !ifViewedStart"
        src="../assets/PreviewIcons/view_empty.png"
        alt="Viewed_empty"
        id="Viewed_empty"
      />
      <img
        v-else
        src="../assets/PreviewIcons/view_full.png"
        alt="Viewed_full"
        id="Viewed_full"
      /> Viewed
    </div>
  </template>
  
  <script>
  
  export default {
    props: {
      recipe_id: {
        type: Number,
        required: true
      }
    },
    data() {
      return {
        viewed_recipes: []
      };
    },
    mounted() {
      if (this.$root.store.username) {
        // this.getViewedRecipes();
      }
    },
    methods: {

      changeViewedStart() {
        return this.viewed_recipes.includes(this.recipe_id.toString());
      }
    },
    computed: {
      ifViewedStart() {
        return this.changeViewedStart();
      }
    }
  };
  </script>
  
  <style>
  #Viewed_empty {
    padding-bottom: 5px;
  }
  </style>
  