import Vue from "vue";
import Store from "./store";
import VueRouter from "vue-router";
import VeeValidate from "vee-validate";

import AppHeader from "../components/header.vue";
import AppMain from "../components/main.vue";
import AppFooter from "../components/footer.vue";
import KlDatepicker from "../components/main/kl_datepicker.vue";

Vue.use(VueRouter);
Vue.use(VeeValidate);

Vue.component('KlDatepicker', KlDatepicker);

const app = new Vue({
  store: Store,
  components: {
    AppHeader,
    AppMain,
    AppFooter
  },
  created() { }
}).$mount('#app')
