<template>
    <div class="container">
    <br />
    <b-card bg-variant="light" header="Login" class="text-center" id="b-card">
      
      <b-form @submit.prevent="onLogin">
        <b-form-group
          id="input-group-Username"
          label-cols-sm="3"
          label="Username:"
          label-for="Username"
        >
          <b-form-input
            id="Username"
            v-model="$v.form.username.$model"
            type="text"
            :state="validateState('username')"
          ></b-form-input>
          <b-form-invalid-feedback>
            Username is required
          </b-form-invalid-feedback>
        </b-form-group>
  
        <b-form-group
          id="input-group-Password"
          label-cols-sm="3"
          label="Password:"
          label-for="Password"
        >
          <b-form-input
            id="Password"
            type="password"
            v-model="$v.form.password.$model"
            :state="validateState('password')"
          ></b-form-input>
          <b-form-invalid-feedback>
            Password is required
          </b-form-invalid-feedback>
        </b-form-group>
  
        <b-button
          type="submit"
          variant="primary"
          class="mx-auto w-100"
        >Login</b-button>
        <div class="mt-2">
          Do not have an account yet?
          <router-link to="/register"> Register here</router-link>
        </div>
      </b-form>
      <b-alert
        class="mt-2"
        v-if="form.submitError"
        variant="warning"
        dismissible
        show
      >
        Login failed: {{ form.submitError }}
      </b-alert>
    </b-card>
    </div>
  </template>
  
  <script>
  import { required } from "vuelidate/lib/validators";

  
  export default {
    name: "Login",
    data() {
      return {
        form: {
          username: "",
          password: "",
          submitError: undefined
        }
      };
    },
    validations: {
      form: {
        username: { required },
        password: { required }
      }
    },
    methods: {
      validateState(param) {
        const { $dirty, $error } = this.$v.form[param];
        return $dirty ? !$error : null;
      },
      async Login() {
        try {
          const response = await this.axios.post(
        `${this.$root.store.server_domain}/auth/login`,
        {
          username: this.form.username,
          password: this.form.password,
        },
        { withCredentials: true }// ensures cookies are sent with the request
      // );) // מאפשר שליחת עוגיות עם הבקשה
      );
      
      // Handle successful login
      this.$root.store.login(this.form.username);
      this.$router.push("/").catch(err => {
  if (err.name !== "NavigationDuplicated") {
    console.error(err);
  }
});
      
    } catch (error) {
      // Handle error during login attempt
      this.form.submitError = "Invalid username or password";
    }
  },

      //     this.$root.store.login(this.form.username);
      //     if (this.$route.path !== "/") {
      //     this.$router.push("/").catch((err) => {
      //       if (err.name !== "NavigationDuplicated") {
      //         console.error(err);
      //       }
      //     });
      //   }
      //   } catch (err) {
      //     console.log(err);
      //     this.form.submitError = "Invalid username or password"; // Handle the error message appropriately
      //   }
      // },
      onLogin() {
        this.form.submitError = undefined;
        this.$v.form.$touch();
        if (this.$v.form.$anyError) {
          return;
        }
        this.Login();
      }
    }
  };
  </script>
  
  <style lang="scss" scoped>
  .container {
    max-width: 500px;
    font-family: "Comic Sans MS", cursive, sans-serif;
    color: #333;
    margin: auto;
  }
  
  #b-card {
    width: 100%;
  }
  
  .title {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .b-button {
    display: block;
    width: 100%;
  }
  </style>
  