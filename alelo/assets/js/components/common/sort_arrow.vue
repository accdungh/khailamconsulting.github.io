<template>
  <i
    class="fa"
    :class="{
      'fa-chevron-down': flag,
      'fa-chevron-up': !flag,
    }"
  ></i>
</template>

<script>
export default {
  name: "SortArrow",
  props: {
    flag: { type: Boolean },
  },
};
</script>

<style>
</style>
