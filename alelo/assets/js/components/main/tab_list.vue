<template>
  <ul class="nav nav-tabs-list" id="myTab" role="tablist">
    <li
      class="nav-item"
      v-for="(r, index) in routes"
      :key="'route-link-' + index"
    >
      <router-link
        :to="{ name: r.name }"
        class="nav-link"
        :class="{ active: r.name == $route.name }"
        >{{ $t(r.meta.text) }}
      </router-link>
    </li>
    <!-- <li class="nav-item">
      <a
        class="nav-link"
        id="classviewer-tab"
        data-toggle="tab"
        href="#classviewer"
        role="tab"
        aria-controls="classviewer"
        aria-selected="false"
        >Class Viewer</a
      >
    </li>
    <li class="nav-item">
      <a
        class="nav-link"
        id="archived-tab"
        data-toggle="tab"
        href="#archived"
        role="tab"
        aria-controls="archived"
        aria-selected="false"
        >Archived Classes</a
      >
    </li>
    <li class="nav-item">
      <a
        class="nav-link"
        id="settings-tab"
        data-toggle="tab"
        href="#settings"
        role="tab"
        aria-controls="settings"
        aria-selected="false"
        >Settings</a
      >
    </li> -->
  </ul>
</template>

<script>
import routes from "../../config/routes.js";

export default {
  name: "TabList",
  data() {
    return {
      routes: routes.filter((r) => !r.meta.hide),
    };
  },
};
</script>

<style>
</style>
