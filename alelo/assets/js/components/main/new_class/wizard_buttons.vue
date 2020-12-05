<template>
  <div>
    WizardButtons
    <button type="button" @click="changeStep('information')">
      information
    </button>
    <button type="button" @click="changeStep('courses')">courses</button>
    <!-- Base on the step variable to show the active step -->
  </div>
</template>

<script>
export default {
  name: "WizardButtons",
  props: {
    step: {
      type: String,
      default: "information", // [information, courses, students, review]
    },
  },
  methods: {
    changeStep(step) {
      this.$emit("stepChange", step);
    },
  },
};
</script>

<style>
</style>
