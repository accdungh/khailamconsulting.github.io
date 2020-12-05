<template>
  <div>
    ProgressBar
    <!-- Base on the step variable to show the active step -->
  </div>
</template>

<script>
export default {
  name: "ProgressBar",
  props: {
    step: {
      type: String,
      default: "information", // [information, courses, students, review]
    },
  },
};
</script>

<style>
</style>
