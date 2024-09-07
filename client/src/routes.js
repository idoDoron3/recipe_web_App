import Vue from 'vue';
import VueRouter from 'vue-router';
import Main from "./pages/MainPage";
import NotFound from "./pages/NotFoundPage";
import RecipeViewPage from "@/pages/RecipeViewPage.vue";
import FamilyRecipesPage from '@/pages/FamilyRecipesPage.vue';
import FamilyRecipeViewPage from '@/pages/FamilyRecipeViewPage.vue';
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "main",
    component: Main,
  },
  {
    path: "/about",
    name: "about",
    component: () => import("./pages/AboutPage.vue"),
  },
  {
    path: "/createRecipe",
    name: "create",
    component: () => import("./pages/CreateRecipeModal"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("./pages/RegisterPage"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./pages/LoginPage"),
  },
  {
    path: '/favorites',
    name: 'favorites',
    component: () => import("./pages/FavoritesRecipesPage"),
  },
  {
    path: '/privateRecipes',
    name: 'privateRecipes',
    component: () => import("./pages/PersonalRecipesPage"),
  },
  {
    path: "/search",
    name: "search",
    component: () => import("./pages/SearchPage"),
  },
  {
    path: "/recipe/:recipeId",
    name: 'recipe',
    component: RecipeViewPage,
  },
  {
    path: "/personalRecipe/:recipeId",  // Add this route for personal recipes
    name: 'personalRecipe',
    component: RecipeViewPage,
  },
  {
    path: "*",
    name: "notFound",
    component: NotFound,
  },
  {
    path: '/family-recipes',
    name: 'familyRecipe',
    component: FamilyRecipesPage
  },
  {
    path: '/family-recipe/:id',
    name: 'familyRecipeView',
    component: FamilyRecipeViewPage,
  },
  // {
  //   path: '*',
  //   redirect: '/family-recipes'
  // }
];

export default routes;
