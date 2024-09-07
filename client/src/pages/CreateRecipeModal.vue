<template>
  <div>
    <b-toast
      id="recipe-toast"
      :title="toastTitle"
      :visible="toastVisible"
      @hidden="toastVisible = false"
      :variant="toastVariant"
      auto-hide-delay="3000"
      solid
      toaster="b-toaster-top-center"

    >
      {{ toastMessage }}
    </b-toast>
    <b-form @submit.prevent="createRecipe" @reset.prevent="onReset">
      <!-- Image -->
      <b-form-group 
        id="input-group-image"
        label="Image:"
        label-for="image"
      >
        <b-form-input
          id="image"
          v-model="form.image"
          type="text"
          :state="validateState('image')"
          placeholder="Image URL"
        ></b-form-input>
        <b-form-invalid-feedback :state="validateState('image')">
          Image is required.
        </b-form-invalid-feedback>
      </b-form-group>

      <!-- Title -->
      <b-form-group 
        id="input-group-title"
        label="Recipe Name:"
        label-for="title"
      >
        <b-form-input
          id="title"
          v-model="$v.form.title.$model"
          type="text"
          :state="validateState('title')"
          placeholder="Enter recipe name"
        ></b-form-input>
      </b-form-group>

      <!-- Ready Minutes -->
      <b-form-group 
        id="input-group-readyInMinutes"
        label="Preparation Time:"
        label-for="readyInMinutes"
      >
        <b-form-input
          id="readyInMinutes"
          v-model="$v.form.readyInMinutes.$model"
          type="text"
          :state="validateState('readyInMinutes')"
          placeholder="Enter preparation time in minutes"
        ></b-form-input>
      </b-form-group>

      <!-- Checkboxes -->
      <b-form-checkbox v-model="$v.form.glutenFree.$model" switch>
        Gluten free?
      </b-form-checkbox>
      <b-form-checkbox v-model="$v.form.vegan.$model" switch>
        Vegan?
      </b-form-checkbox>
      <b-form-checkbox v-model="$v.form.vegetarian.$model" switch>
        Vegetarian?
      </b-form-checkbox>

      <!-- Ingredients -->
      <b-form-group 
        id="input-group-ingredients"
        label="Ingredients:"
        label-for="ingredients"
      >
        <b-form-textarea
          id="ingredients"
          v-model="$v.form.ingredients.$model"
          :state="validateState('ingredients')"
          placeholder="Enter ingredients seperate by ','. For example: Flour - 2 cups, Sugar - 1 cup, Cocoa Powder - 0.5 cup"
          rows="4"
        ></b-form-textarea>
      </b-form-group>

      <!-- Instructions -->
      <b-form-group 
        id="input-group-prepInstructions"
        label="Preparation Instructions:"
        label-for="prepInstructions"
      >
        <b-form-textarea
          id="prepInstructions"
          v-model="$v.form.prepInstructions.$model"
          :state="validateState('prepInstructions')"
          placeholder="Enter instructions seperate by ','. For example: Preheat oven to 350°F, Mix dry ingredients, Add wet ingredients and stir until combined"
          rows="4"
        ></b-form-textarea>
      </b-form-group>

      <!-- Number of Dishes -->
      <b-form-group 
        id="input-group-numberOfDishes"
        label="Number of Dishes:"
        label-for="numberOfDishes"
      >
        <b-form-input
          id="numberOfDishes"
          v-model="$v.form.numberOfDishes.$model"
          type="text"
          :state="validateState('numberOfDishes')"
          placeholder="Enter number of servings"
        ></b-form-input>
      </b-form-group>

      <b-button class="btn-primary" type="reset" pill>Reset</b-button>
      <b-button pill type="submit" class="btn-info">Create Recipe</b-button>
    </b-form>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      form: {
        image: "",
        title: "",
        readyInMinutes: "",
        glutenFree: false,
        vegan: false,
        vegetarian: false,
        ingredients: "",
        prepInstructions: "",
        numberOfDishes: "",
      },
      toastTitle: "",
      toastMessage: "",
      toastVariant: "success",
      toastVisible: false,
      validated: false,
    };
  },
  validations: {
    form: {
      image: { required },
      title: { required },
      readyInMinutes: { required, digit: (p) => p && /\d/.test(p) },
      glutenFree: { required },
      vegan: { required },
      vegetarian: { required },
      ingredients: { required },
      prepInstructions: { required },
      numberOfDishes: { required, digit: (p) => p && /\d/.test(p) },
    },
  },
  methods: {

    async createRecipe() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      try {
        // Call the server-side endpoint to create the recipe
        const response = await this.axios.post(`${this.$root.store.server_domain}/users/my_recepies`, {
          image: this.form.image,
          title: this.form.title,
          readyInMinutes: this.form.readyInMinutes,
          glutenFree: this.form.glutenFree,
          vegan: this.form.vegan,
          vegetarian: this.form.vegetarian,
          ingredients: this.form.ingredients,
          instructions: this.form.prepInstructions,
          numberOfDishes: this.form.numberOfDishes,
        },
        { withCredentials: true }
      );
      this.toastTitle = "Success";
      this.toastMessage = `Recipe "${this.form.title}" created successfully!`;
      this.toastVariant = "success";
      this.toastVisible = true;
      this.onReset();
      this.$emit("close");
      } catch (err) {
        console.log(err.response);
        this.toastTitle = "Error";
        this.toastMessage = err.response ? err.response.data : "Failed to create recipe";
        this.toastVariant = "danger";
        this.toastVisible = true;
      }
    },
    onReset() {
      this.form = {
        user_id: "",
        image: "",
        title: "",
        readyInMinutes: "",
        glutenFree: false,
        vegan: false, 
        vegetarian: false,
        ingredients: "",
        prepInstructions: "",
        numberOfDishes: "",
      };
      this.$nextTick(() => {
        this.$v.$reset();
      });
    },
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
  },
};
</script>

<style scoped>
.container {
  font-family: "Comic Sans MS", cursive, sans-serif;
  text-align: center;
}
</style>
