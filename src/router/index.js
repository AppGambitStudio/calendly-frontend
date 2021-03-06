import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Public from '../views/Public.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "public/:userLink/:eventName",
    name: "Public",
    component: Public,
  }
];

const router = new VueRouter({
  mode: "history",
  routes,  
});

export default router;