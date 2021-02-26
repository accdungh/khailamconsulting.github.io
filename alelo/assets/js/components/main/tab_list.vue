<template>
  <ul class="nav nav-tabs-list" id="myTab" role="tablist">
    <li
      class="nav-item"
      v-for="(r, index) in routes"
      :key="'route-link-' + index"
    >
      <router-link
        :to="{
          name: r.name,
          params: { id: r.name == 'ClassView' && classDetailId },
        }"
        class="nav-link"
        :class="{
          active: r.name == $route.name,
          'disabled-link': r.name == 'ClassView' && !classDetailId,
        }"
        :event="r.name == 'ClassView' && !classDetailId ? '' : 'click'"
        >{{ $t(r.meta.text) }}
      </router-link>
    </li>
  </ul>
</template>

<script>
import routes from "../../config/routes.js";
import { mapGetters } from "vuex";

export default {
  name: "TabList",
  data() {
    return {
      routes: routes.filter((r) => !r.meta.hide),
    };
  },
  computed: {
    ...mapGetters(["classDetailId"]),
  },
};
</script>

<style>
</style>
