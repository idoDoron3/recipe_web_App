<template>
    <div class="search-navbar">
      <b-form @submit.prevent="onSearch">
        <b-input-group class="mb-3">
          <b-form-input
            v-model="searchQuery"
            placeholder="Search for recipes..."
          ></b-form-input>
          <b-input-group-append>
            <b-button type="submit" variant="primary">Search</b-button>
          </b-input-group-append>
        </b-input-group>
  
        <b-row class="mb-3">
          <b-col>
            <b-form-group label="Number of Results:">
              <b-form-select v-model="numberOfResults" :options="numberOptions"></b-form-select>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group label="Cuisine:">
              <b-form-select v-model="selectedCuisine" :options="cuisineOptions"></b-form-select>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group label="Diet:">
              <b-form-select v-model="selectedDiet" :options="dietOptions"></b-form-select>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group label="Intolerances:">
              <b-form-select v-model="selectedIntolerances" multiple :options="intoleranceOptions"></b-form-select>
            </b-form-group>
          </b-col>
        </b-row>
      </b-form>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      Cuisines: {
        type: Array,
        required: true
      },
      Diet: {
        type: Array,
        required: true
      },
      Intolerances: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        searchQuery: '',
        numberOfResults: 5,
        selectedCuisine: null,
        selectedDiet: null,
        selectedIntolerances: [],
        numberOptions: [5, 10, 15]
      };
    },
    computed: {
      cuisineOptions() {
        return [{ value: null, text: 'All Cuisines' }, ...this.Cuisines.map(c => ({ value: c, text: c }))];
      },
      dietOptions() {
        return [{ value: null, text: 'All Diets' }, ...this.Diet.map(d => ({ value: d, text: d }))];
      },
      intoleranceOptions() {
        return this.Intolerances.map(i => ({ value: i, text: i }));
      }
    },
    methods: {
      onSearch() {
        const searchParams = [
          this.numberOfResults,
          this.searchQuery,
          this.selectedIntolerances.join(','),
          this.selectedDiet,
          this.selectedCuisine
        ];
        this.$emit('search-recipes', searchParams);
      }
    }
  };
  </script>
  

  <style scoped>
  .search-navbar {
    margin-bottom: 20px;
    background: linear-gradient(to bottom right, #57a6b0, #92bb62); /* Gradient background */
    padding: 20px; /* Add some padding */
    border-radius: 8px; /* Add some rounding */
    border: none; /* Remove border */
  }
  
  .b-form-group {
    margin-bottom: 10px;
  }
  
  .b-form-input, .b-form-select, .b-button {
    background: transparent; /* Make the input, select, and button background transparent */
    color: #fff !important; /* Change the text color to white */
    border: 1px solid #fff !important; /* Add a white border for better visibility */
  }
  
  .b-form-input::placeholder, .b-form-select::placeholder {
    color: #fff !important; /* Change placeholder color to white */
  }
  
  .b-button {
    background-color: transparent !important; /* Change button background color to transparent */
    color: #fff !important; /* Change button text color to white */
  }
  
  .b-button:hover {
    background-color: rgba(255, 255, 255, 0.2) !important; /* Change button hover background color */
    color: #fff !important; /* Change button hover text color */
  }
  
  .b-jumbotron {
    background: linear-gradient(to bottom right, #57a6b0, #92bb62); /* Gradient background */
    padding: 20px; /* Add some padding */
    border-radius: 8px; /* Add some rounding */
    border: none; /* Remove border */
    color: #fff !important; /* Ensure text color is white */
  }
  
  .b-jumbotron .lead, .b-jumbotron h1 {
    color: #fff !important; /* Ensure the text color in jumbotron is white */
  }
  
  .b-dropdown, .b-dropdown-menu, .b-dropdown-toggle, .b-dropdown-item {
    background: linear-gradient(to bottom right, #57a6b0, #92bb62) !important; /* Gradient background for dropdown elements */
    color: #fff !important; /* Change text color to white */
    border: 1px solid #fff !important; /* Add a white border for better visibility */
  }
  
  .b-dropdown-item:hover {
    background-color: rgba(255, 255, 255, 0.2) !important; /* Change dropdown item hover background color */
    color: #fff !important; /* Change dropdown item hover text color */
  }
  
  .b-dropdown-item {
    color: #fff !important; /* Set dropdown item text color to white */
  }
  
  .b-dropdown-item:hover {
    background-color: rgba(255, 255, 255, 0.2) !important; /* Change dropdown item hover background color */
    color: #fff !important; /* Change dropdown item hover text color */
  }
  </style>
  
  
  
  

  