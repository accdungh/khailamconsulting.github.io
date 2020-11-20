import Vue from "vue";
import Store from "./store";
import VueRouter from "vue-router";
import VeeValidate from "vee-validate";

import AppHeader from "../components/header.vue";
import AppMain from "../components/main.vue";
import AppFooter from "../components/footer.vue";
import KlDatepicker from "../components/main/kl_datepicker.vue";

import VueI18n from 'vue-i18n';
import enMessage from '../lang/en.json';
import esMessage from '../lang/es.json';
import poMessage from '../lang/po.json';
import cnMessage from '../lang/cn.json';

Vue.use(VueRouter);
Vue.use(VeeValidate);
Vue.use(VueI18n);

Vue.component('KlDatepicker', KlDatepicker);

const messages = {
  en: enMessage,
  es: esMessage,
  po: poMessage,
  cn: cnMessage,
}
const i18n = new VueI18n({
  locale: 'en',
  messages,
  fallbackLocale: 'en',
})

const app = new Vue({
  i18n,
  store: Store,
  components: {
    AppHeader,
    AppMain,
    AppFooter
  },
  created() { }
}).$mount('#app')

export default app;
