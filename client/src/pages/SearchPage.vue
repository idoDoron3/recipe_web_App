<template>
  <div class="container">
    <b-jumbotron class="jumbotron-custom">
      <template v-slot:header>
        Search Recipes
      </template>
      <template v-slot:lead>
        Search recipes by name of the recipe or the name of the food.
      </template>
      <search-nav-bar
        v-on:search-recipes="updateResults"
        :Cuisines="this.Cuisines"
        :Diet="this.Diet"
        :Intolerances="this.Intolerances"
        :results="results"
      ></search-nav-bar>
      <hr class="my-4" />
      <b-row>
        <div>
          <b-dropdown text="Sort By" class="m-2">
            <b-dropdown-item v-on:click="sortByTime">Preparation time (low to high)</b-dropdown-item>
            <b-dropdown-item v-on:click="sortByTime1">Preparation time (high to low)</b-dropdown-item>
            <b-dropdown-item v-on:click="sortByRating">Rating</b-dropdown-item>
          </b-dropdown>
        </div>
      </b-row>
    </b-jumbotron>

    <div id="result_main_div" v-if="this.showLastSearch">
      <h3 id="titles"><u>Last Search:</u></h3>

      <div v-for="r in results" :key="r.id" id="results1">
        <!-- <div v-for="r in (JSON.parse(this.$root.store.lastSearch))" :key="r.id" id="results1"> -->
          
        <RecipePreview class="recipePreview" :recipe="r" />
      </div>
    </div>
    <div id="result_main_div" v-else>
      <h3 id="titles"><u>Results:</u></h3>
      <div v-if="!(Array.isArray(this.results) && this.results.length)" id="titles">No Results &#128534; </div>
      <div v-else v-for="r in this.results" :key="r.id" id="results1">
        <RecipePreview class="recipePreview" :recipe="r" />
      </div>
    </div>
    <br>
  </div>
</template>

<script>
import RecipePreview from "../components/RecipePreview";
import searchNavBar from "../components/SearchNavBar.vue";
import Cuisines from "../assets/Cuisines";
import Diet from "../assets/Diet";
import Intolerances from "../assets/Intolerances";

export default {
  components: {
    searchNavBar,
    RecipePreview
  },
  data() {
    return {
      Cuisines: [],
      Diet: [],
      Intolerances: [],
      search_params: "",
      results: [],
      showLastSearch: false
    };
  },
  mounted() {
    this.Cuisines.push(...Cuisines);
    this.Diet.push(...Diet);
    this.Intolerances.push(...Intolerances);

    if (this.$root.store.username && sessionStorage.getItem('lastSearch')) {
    this.showLastSearch = true;
    try {
      this.results = JSON.parse(sessionStorage.getItem('lastSearch')); // Parse and store the last search results
    } catch (error) {
      console.error("Failed to parse last search results:", error);
      this.showLastSearch = false; // Hide last search if parsing fails
    }
  }
  },
  methods: {
    async updateResults(info) {
      try {
        const response = await this.axios.get(`${this.$root.store.server_domain}/recipes/search`, {
        params: {
            number: info[0],
            recipeName: info[1],
            intolerance: info[2],
            diet: info[3],
            cuisine: info[4]
        }
      });
        const recipes = response.data;
        this.results = recipes;
        if(this.$root.store.username) {
          // this.$root.store.search(this.results);
          sessionStorage.setItem('lastSearch', JSON.stringify(this.results));

        }
        this.showLastSearch = false;
      } catch (error) {
        console.log(error);
      }
    },

    sortByRating() {
      this.results.sort((a, b) => b.aggregateLikes - a.aggregateLikes);
    },
    sortByTime() {
      this.results.sort((a, b) => a.readyInMinutes - b.readyInMinutes);
    },
    sortByTime1() {
      this.results.sort((a, b) => b.readyInMinutes - a.readyInMinutes);
    }

  }
};
</script>
<style scoped>
/* Container styles */
.container {
  font-family: "Comic Sans MS", cursive, sans-serif;
  text-align: center;
  padding: 20px; /* Padding for the container */
  border-radius: 8px; /* Rounded corners */
}

/* Jumbotron styles */
.b-jumbotron, .jumbotron-custom {
  background: linear-gradient(to bottom right, #57a6b0, #92bb62) !important; /* Light blue gradient background */
  padding: 20px; /* Padding for the jumbotron */
  border-radius: 8px; /* Rounded corners */
  border: none !important; /* Remove border */
  color: #fff !important; /* Ensure the text color is white */
}

/* Search Navbar styles */
.search-navbar {
  background: linear-gradient(to bottom right, #57a6b0, #92bb62); /* Light blue gradient background */
  padding: 20px; /* Padding for the search navbar */
  border-radius: 8px; /* Rounded corners */
  border: none; /* Remove border */
  color: #fff; /* Ensure the text color is white */
}

/* Text styles */
.b-jumbotron .lead, .b-jumbotron h1, #result_main_div #titles, .b-form-input::placeholder, .b-form-select::placeholder, .b-dropdown-item, .b-button, .b-button:hover {
  color: #fff !important; /* Ensure the text color is white */
}

/* Input and select styles */
.b-form-input, .b-form-select, .b-button {
  background: transparent; /* Transparent background */
  border: 1px solid #fff !important; /* White border for visibility */
}

/* Button styles */
.b-button:hover {
  background-color: rgba(255, 255, 255, 0.2) !important; /* Button hover background color */
}

/* Dropdown styles */
.b-dropdown, .b-dropdown-menu, .b-dropdown-toggle, .b-dropdown-item {
  background: transparent !important; /* Transparent background for dropdown elements */
  border: 1px solid #fff !important; /* White border for visibility */
}

/* Results container styles */
#result_main_div {
  margin: auto;
  width: 50%;
  padding: 10px;
  height: 500px;
  overflow: auto;
  border-radius: 8px; /* Rounded corners */
}

/* Title color */
#result_main_div #titles {
  color: #fff; /* Ensure title color is white */
}

/* S_pos margin */
.s_pos {
  margin-top: 20px;
}

/* Result item margin */
#results1 {
  margin-block-end: 10px;
}
</style>
