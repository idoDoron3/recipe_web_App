<template>
  <div id="app">
    <MainNavBar />
      <br>
    <router-view />
  </div>
</template>

<script>
import MainNavBar from './components/MainNavBar.vue';
export default {
  name: "App",
  components: {
    MainNavBar
  },
  methods: {
    
    Logout() {
  // Send a request to the server to log out
  this.axios.post(`${this.$root.store.server_domain}/auth/logout`)
    .then(() => {
      // Clear user data in the client
      this.$root.store.logout();


      // Redirect to the home page
      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
    })

}
  }
};
</script>

<style lang="scss">
@import "@/scss/form-style.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #ebe4dc;
  // min-height: 100vh;
  background-image: url('~@/assets/background.jpg');
  background-size: cover; /* Ensures the image covers the entire viewport */
  background-position: center; /* Centers the background image */
  background-repeat: no-repeat; /* Prevents the image from repeating */
  background-attachment: fixed; /* Keeps the background fixed while scrolling */
  min-height: 100vh; /* Ensures the app covers the entire viewport height */

}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #dccfc3;
}

#nav a.router-link-exact-active {
  color: #d45955;
}
</style>
