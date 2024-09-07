<template>
  <div class="login-container">
    <Login />
  </div>
</template>

<script>
import Login from "@/components/Login.vue"; // Adjust the path to the correct Login component

export default {
  name: "LoginPage",
  components: {
    Login,
  },
};
</script>

<style scoped>
/* Full screen for background */
html, body {
  height: 100%;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Arial', sans-serif;
}

.login-container {
  background: url('@/assets/background.jpg') no-repeat center center fixed;
  background-size: cover;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

#b-card {
  background: rgba(255, 255, 255, 0.95); /* Slight transparency */
  padding: 60px; /* More padding */
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4); /* Stronger shadow */
  max-width: 700px; /* Set larger card width */
  max-height: 700px;
  height: 100%;
  width: 100%;
  font-size: 1.3rem;
}

/* Buttons */
.b-button {
  background: linear-gradient(45deg, #57a6b0, #92bb62); /* Gradient color */
  border: none;
  color: white;
  padding: 15px;
  font-weight: bold;
  font-size: 1.2rem;
  width: 100%;
}

.b-button:hover {
  background-color: #4f979e; /* Hover color */
}

/* Inputs */
.b-form-group label {
  font-size: 1.2rem;
}

.b-form-input {
  font-size: 1.1rem;
  padding: 10px;
}

/* Register link */
.mt-2 a {
  font-size: 1.1rem;
  color: #57a6b0;
  font-weight: bold;
}
</style>
