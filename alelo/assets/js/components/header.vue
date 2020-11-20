<template>
  <header id="header" class="header">
    <div class="header-main">
      <div class="container">
        <div class="row">
          <div class="col-12 col-lg-20">
            <a href="#"><img src="assets/images/logo.jpg" alt="" /></a>
          </div>
          <div class="col-12 col-lg-4 text-right mt-md-4">
            <div class="dropdown">
              <button
                class="btn dropdown-toggle button-gray-100"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {{ $t('common.selectLang') }} <i class="fa fa-chevron-down"></i>
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a
                  class="dropdown-item"
                  href="javascript:void(0)"
                  v-for="l in langs"
                  :key="l[0]"
                  :class="{ hovered: l[0] == lang }"
                  @click="setLang(l[0])"
                  >{{ l[1] }}</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Header",
  data() {
    return {
      allLang: {
        en: "English",
        es: "Español",
        po: "Português",
        cn: "中文",
      },
    };
  },
  computed: {
    ...mapGetters(["lang"]),
    langs() {
      return Object.entries(this.allLang);
    },
  },
  methods: {
    ...mapActions(["setLang"]),
  },
};
</script>

<style>
</style>
