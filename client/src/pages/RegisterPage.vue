<template>
  <div class="container">
    <h1 class="title">Register</h1>
    <b-form @submit.prevent="onRegister" @reset.prevent="onReset">
      <b-form-group
        id="input-group-username"
        label-cols-sm="3"
        label="Username:"
        label-for="username"
      >
        <b-form-input
          id="username"
          v-model="$v.form.username.$model"
          type="text"
          :state="validateState('username')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.username.required">
          Username is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-else-if="!$v.form.username.length">
          Username length should be between 3-8 characters long
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.username.alpha">
          Username alpha
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group
          id="input-group-firstName"
          label-cols-sm="3"
          label="First Name:"
          label-for="firstName"
        >
          <b-form-input
            id="firstName"
            v-model="$v.form.firstName.$model"
            type="text"
            :state="validateState('firstName')"
          ></b-form-input>
          <b-form-invalid-feedback v-if="!$v.form.firstName.required">
            First name is required
          </b-form-invalid-feedback>
        </b-form-group>
  
        <b-form-group
          id="input-group-lastName"
          label-cols-sm="3"
          label="Last Name:"
          label-for="lastName"
        >
          <b-form-input
            id="lastName"
            v-model="$v.form.lastName.$model"
            type="text"
            :state="validateState('lastName')"
          ></b-form-input>
          <b-form-invalid-feedback v-if="!$v.form.lastName.required">
            Last name is required
          </b-form-invalid-feedback>
        </b-form-group> 
      
      
      <b-form-group
        id="input-group-country"
        label-cols-sm="3"
        label="Country:"
        label-for="country"
      >
        <b-form-select
          id="country"
          v-model="$v.form.country.$model"
          :options="countries"
          :state="validateState('country')"
        ></b-form-select>
        <b-form-invalid-feedback>
          Country is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-Password"
        label-cols-sm="3"
        label="Password:"
        label-for="password"
      >
        <b-form-input
          id="password"
          type="password"
          v-model="$v.form.password.$model"
          :state="validateState('password')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.password.required">
          Password is required
        </b-form-invalid-feedback>
        <b-form-text v-else-if="$v.form.password.$error" text-variant="info">
          Your password should be <strong>strong</strong>. <br />
          For that, your password should be also:
        </b-form-text>
        <b-form-invalid-feedback
          v-if="$v.form.password.required && !$v.form.password.length"
        >
        Password must be between 5-10 characters long
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-confirmedPassword"
        label-cols-sm="3"
        label="Confirm Password:"
        label-for="confirmedPassword"
      >
        <b-form-input
          id="confirmedPassword"
          type="password"
          v-model="$v.form.confirmedPassword.$model"
          :state="validateState('confirmedPassword')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.confirmedPassword.required">
          Password confirmation is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback
          v-else-if="!$v.form.confirmedPassword.sameAsPassword"
        >
          The confirmed password is not equal to the original password
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
          id="input-group-email"
          label-cols-sm="3"
          label="Email:"
          label-for="email"
        >
          <b-form-input
            id="email"
            type="email"
            v-model="$v.form.email.$model"
            :state="validateState('email')"
          ></b-form-input>
          <b-form-invalid-feedback v-if="!$v.form.email.required">
            Email is required
          </b-form-invalid-feedback>
          <b-form-invalid-feedback v-else-if="!$v.form.email.email">
            Email must be valid
          </b-form-invalid-feedback>
        </b-form-group>

      <b-button type="reset" variant="danger">Reset</b-button>
      <b-button
        type="submit"
        variant="primary"
        style="width:250px;"
        class="ml-5 w-75"
        >Register</b-button
      >
      <div class="mt-2">
        You have an account already?
        <router-link to="login"> Log in here</router-link>
      </div>
    </b-form>

    <!-- Success Alert -->
    <b-alert
      v-if="form.submitSuccess"
      variant="success"
      show
      class="text-center success-alert"
    >
      {{ form.submitSuccess }}
    </b-alert>

    <b-alert
      class="mt-2"
      v-if="form.submitError"
      variant="warning"
      dismissible
      show
    >
      Register failed: {{ form.submitError }}
    </b-alert>
 
  </div>
</template>

<script>
import countries from "../assets/countries";
import { required, minLength, maxLength, alpha, sameAs, email } from "vuelidate/lib/validators";

export default {
  name: "Register",
  data() {
    return {
      form: {
        username: "",
        firstName: "",
        lastName: "",
        country: null,
        password: "",
        confirmedPassword: "",
        email: "",
        submitError: undefined
      },
      countries: [{ value: null, text: "", disabled: true }],
      errors: [],
      validated: false
    };
  },
  validations: {
    form: {
      username: {
        required,
        length: (u) => minLength(3)(u) && maxLength(8)(u),
        alpha
      },
      firstName: { required },
      lastName: { required },
      country: {
        required
      },
      password: {
        required,
        length: (p) => minLength(5)(p) && maxLength(10)(p),
        hasNumberAndSpecialChar: (value) => /\d/.test(value) && /[!@#$%^&*]/.test(value)
      },
      confirmedPassword: {
        required,
        sameAsPassword: sameAs("password")
      },
      email: {
          required,
          email
        }
    }
  },
  mounted() {
    // console.log("mounted");
    this.countries.push(...countries);
    // console.log($v);
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async Register() {
      try {

      // Send a POST request to the server for registration
      const response = await this.axios.post(
          `${this.$root.store.server_domain}/auth/register`,
          {
            username: this.form.username,
            first_name: this.form.firstName,
            last_name: this.form.lastName,
            country: this.form.country,
            password: this.form.password,
            email: this.form.email
          }
        );

      // Show a success message
      this.$bvToast.toast('Registration successful! Redirecting to login page...', {
        title: 'Success',
        variant: 'success',
        solid: true,
        autoHideDelay: 3000
      });

      // Redirect to login page after showing the message
      setTimeout(() => {
        this.$router.push("/login");
      }, 2000);
      } catch (err) {
        console.log(err.response);
        this.form.submitError = err.response?.data?.message || "Registration failed. Please try again.";
      }
    },

    onRegister() {
      // console.log("register method called");
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      // console.log("register method go");
      this.Register();
    },
    onReset() {
      this.form = {
        username: "",
        firstName: "",
        lastName: "",
        country: null,
        password: "",
        confirmedPassword: "",
        email: ""
      };
      this.$nextTick(() => {
        this.$v.$reset();
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  max-width: 500px;
}

.success-alert {
  position: top-center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1050; /* Ensures the alert is on top */
  width: 100%;
  padding: 1.5rem;
  font-size: 1.25rem;
}
</style>
