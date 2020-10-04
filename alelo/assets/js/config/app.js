import Vue from "vue";
import Store from "./store";
import VueRouter from "vue-router";

import AppHeader from "../components/header.vue";
import AppMain from "../components/main.vue";
import AppFooter from "../components/footer.vue";

Vue.use(VueRouter);

const app = new Vue({
  store: Store,
  components: {
    AppHeader,
    AppMain,
    AppFooter
  },
  created() { }
}).$mount('#app')
