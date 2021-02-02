<template>
  <div v-if="showLoader" class="loader-overlay">
    <div class="lds-dual-ring"></div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Loader",
  computed: {
    ...mapGetters(["ajaxCount"]),
    showLoader() {
      return this.ajaxCount > 0;
    },
  },
};
</script>

<style>
</style>
