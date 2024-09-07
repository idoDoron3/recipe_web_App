<template>
  <div id="MainNavBar">
    <b-navbar toggleable="lg" type="dark" variant="info">
      <!-- title name - master chef -->
      <b-navbar-brand>Master Chef</b-navbar-brand>

      <b-collapse id="nav-collapse" is-nav>
        <!-- area for all the elements in the navbar -->
        <b-navbar-nav id="mainPage">
          <b-nav-item>
            <router-link :to="{ name: 'main' }">Main Page</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link :to="{ name: 'search' }">Search</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link :to="{ name: 'about' }">About</router-link>
          </b-nav-item>
          <!-- show this element only if the user is connected -->
          <b-nav-item-dropdown id="personal" v-if="$root.store.username">
            <template v-slot:button-content>
              <span>Personal</span>
            </template>
            <b-dropdown-item>
              <router-link :to="{ name: 'favorites' }">Favorites</router-link>
            </b-dropdown-item>
            <b-dropdown-item>
              <router-link :to="{ name: 'privateRecipes' }">Private Recipes</router-link>
            </b-dropdown-item>
            <b-dropdown-item>
              <router-link :to="{ name: 'familyRecipe' }">Family Recipes</router-link>
            </b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item v-if="$root.store.username">
            <!-- <b-button v-b-modal.create-recipe-modal variant="info"> Create Recipe </b-button> -->
            <router-link to="#" class="nav-link" v-b-modal.create-recipe-modal>Create Recipe</router-link>
            <!-- <a v-b-modal.create-recipe-modal class="nav-link">Create Recipe</a> -->
          </b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot - if connected show username, else guest -->
            <template v-slot:button-content>
              <span v-if="!$root.store.username">Guest</span>
              <span v-else>{{ $root.store.username }}</span>
            </template>
            <b-dropdown-item v-if="!$root.store.username">
              <router-link :to="{ name: 'login' }">Login</router-link>
            </b-dropdown-item>
            <b-dropdown-item v-else>
              <span>Profile</span>
            </b-dropdown-item>
            <b-dropdown-item v-if="!$root.store.username">
              <router-link :to="{ name: 'register' }">Register</router-link>
            </b-dropdown-item>
            <b-dropdown-item v-else>
              <span @click="Logout">Log Out</span>
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <!-- Modal for creating recipe -->
    <b-modal id="create-recipe-modal" title="Create New Recipe" hide-footer>
      <create-recipe-modal @close="closeCreateRecipeModal"></create-recipe-modal>
    </b-modal>
  </div>
</template>

<script>
import CreateRecipeModal from "@/pages/CreateRecipeModal.vue";

export default {
  name: "MainNavBar",
  components: {
    CreateRecipeModal,
  },
  methods: {
    Logout() {
      this.$root.store.logout();
      this.$root.toast("Logout", "User logged out successfully", "success");

      if (this.$route.path !== "/") {
        this.$router.push("/").catch((err) => {
          if (err.name !== "NavigationDuplicated") {
            console.error(err);
          }
        });
      }
      // this.$router.push("/").catch(() => {
      //   this.$forceUpdate();
      // });

      // Simulate logout using mock data
      // console.log("User logged out (mock).");
    },
    closeCreateRecipeModal() {
        this.$refs["create-recipe-modal"].hide();
      },
      resetCreateRecipeModal() {
        this.$refs["create-recipe-modal"].hide();
      }
  },
};
</script>

<style scoped>
#MainNavBar {
  .navbar {
    background: linear-gradient(to bottom right, #57a6b0, #b5bdac); /* Set the background color to a nice gradient */
    border: none; /* Ensure no border */
  }

  .navbar-brand,
  .nav-link {
    color: #ffffff; /* Set the text color to white */
    line-height: 1.5; /* Adjust line height for proper alignment */
  }

  .nav-link:hover {
    color: #f3f3f3; /* Set the hover color to a solid lighter green */
    text-decoration: underline;
  }

  .dropdown-item {
    color: #000000; /* Set the dropdown item text color to black */
  }

  .dropdown-item:hover {
    color: #92bb62; /* Set the dropdown item hover color to a solid lighter green */
  }

  .navbar-collapse {
    background: linear-gradient(to bottom right, #57a6b0, #b5bdac); /* Gradient background */
    border: none; /* Ensure no border */
  }

  a:visited {
    color: black;
  }

  a:active {
    color: rgb(153, 47, 65);
  }

  #mainPage a:visited {
    color: rgb(255, 255, 255);
  }

  #personal a:visited {
    color: black;
  }
  .b-nav-item {
    display: flex;
    align-items: center;
  }
  .b-nav-item .nav-link {
    display: flex;
    align-items: center;
    padding: 0.5rem 1rem;
  }
}
</style>
