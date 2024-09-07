import Vue from "vue";
import App from "./App.vue";
import routes from "./routes";
import VueAxios from "vue-axios";
import axios from "axios";
import VueRouter from "vue-router";
import Vuelidate from "vuelidate";
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import VueCookies from 'vue-cookies';
import { Carousel3d } from 'vue-carousel-3d';

import { PopoverPlugin } from 'bootstrap-vue';

Vue.use(PopoverPlugin);

// Initialize the router
const router = new VueRouter({
  mode: 'history', // Use history mode to remove the hash from URLs

  routes,
});

// Import and use the necessary BootstrapVue plugins
import {
  FormGroupPlugin,
  FormPlugin,
  FormInputPlugin,
  ButtonPlugin,
  CardPlugin,
  NavbarPlugin,
  FormSelectPlugin,
  AlertPlugin,
  ToastPlugin,
  LayoutPlugin,
  JumbotronPlugin,
  CarouselPlugin,
  VBHoverPlugin,
} from "bootstrap-vue";

Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(Vuelidate);
Vue.use(VueCookies);
Vue.use(VueAxios, axios);
Vue.use(Carousel3d);



[
  FormGroupPlugin,
  FormPlugin,
  FormInputPlugin,
  ButtonPlugin,
  CardPlugin,
  NavbarPlugin,
  FormSelectPlugin,
  AlertPlugin,
  ToastPlugin,
  LayoutPlugin,
  JumbotronPlugin,
  CarouselPlugin,
  VBHoverPlugin,
].forEach((x) => Vue.use(x));


Vue.config.productionTip = false;

axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response;
  },
  function(error) {
    if (error.response.status === 402) {
      Vue.prototype.$bvToast.toast("You have exceeded the daily API request limit. Please try again tomorrow.", {
        title: "API Limit Exceeded",
        variant: "warning",
        solid: true,
        autoHideDelay: 5000,
      });
    }
    return Promise.reject(error);
  }
);


const shared_data = {
  server_domain: "http://localhost:3000",
  username: localStorage.username,
  login(username) {
    localStorage.setItem("username", username);
    this.username = username;
    console.log("login", this.username);
  },
  logout() {
    console.log("logout");
    localStorage.removeItem("username");
    this.username = undefined;
  },
};
console.log(shared_data);
// Vue.prototype.$root.store = shared_data;

new Vue({
  router,
  data() {
    return {
      store: shared_data,
    };
  },
  methods: {
    toast(title, content, variant = null, append = false) {
      this.$bvToast.toast(`${content}`, {
        title: `${title}`,
        toaster: "b-toaster-top-center",
        variant: variant,
        solid: true,
        appendToast: append,
        autoHideDelay: 3000,
      });
    },
  },
  render: (h) => h(App),
}).$mount("#app");
