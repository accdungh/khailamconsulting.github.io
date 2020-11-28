import Vue from "vue";
import Store from "./store";
import VueRouter from "vue-router";
import VeeValidate from "vee-validate";

import AppHeader from "../components/header.vue";
import AppMain from "../components/main.vue";
import AppFooter from "../components/footer.vue";
import KlDatepicker from "../components/common/kl_datepicker.vue";
import SortArrow from "../components/common/sort_arrow.vue";

import VueI18n from 'vue-i18n';
import enMessage from '../lang/en.json';
import esMessage from '../lang/es.json';
import ptMessage from '../lang/pt.json';
import cnMessage from '../lang/cn.json';

import enValidationMessages from 'vee-validate/dist/locale/en';
import esValidationMessages from 'vee-validate/dist/locale/es';
import ptValidationMessages from 'vee-validate/dist/locale/pt_BR';
import cnValidationMessages from 'vee-validate/dist/locale/zh_CN';

Vue.use(VueI18n);

const messages = {
  en: enMessage,
  es: esMessage,
  pt: ptMessage,
  cn: cnMessage,
};

const i18n = new VueI18n({
  locale: "en",
  fallbackLocale: 'en',
  messages,
});

Vue.use(VueRouter);
Vue.use(VeeValidate, {
  i18nRootKey: 'validations',
  i18n,
  dictionary: {
    en: enValidationMessages,
    es: esValidationMessages,
    pt: ptValidationMessages,
    cn: cnValidationMessages,
  }
});

Vue.component('KlDatepicker', KlDatepicker);
Vue.component('SortArrow', SortArrow);

const app = new Vue({
  i18n,
  store: Store,
  components: {
    AppHeader,
    AppMain,
    AppFooter
  },
  created() { },
  methods: {
    changeLang(lang) {
      this.$i18n.locale = lang;
    }
  }
}).$mount('#app')

export default app;
