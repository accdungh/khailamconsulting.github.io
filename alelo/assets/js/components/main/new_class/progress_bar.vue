<template>
  <ul class="progressbar" v-if="step == 'information'">
    <li class="active linked" @click="changeStep('information')">
      <span>{{ $t("progressBarForm.information") }}</span>
    </li>
    <li class="linked" @click="changeStep('courses')">
      <span>{{ $t("progressBarForm.courses") }}</span>
    </li>
    <li>
      <span>{{ $t("progressBarForm.students") }}</span>
    </li>
  </ul>
  <ul class="progressbar" v-else-if="step == 'courses'">
    <li class="active linked" @click="changeStep('information')">
      <span>{{ $t("progressBarForm.information") }}</span>
    </li>
    <li class="active linked" @click="changeStep('courses')">
      <span>{{ $t("progressBarForm.courses") }}</span>
    </li>
    <li class="linked" @click="changeStep('students')">
      <span>{{ $t("progressBarForm.students") }}</span>
    </li>
  </ul>
  <ul class="progressbar" v-else>
    <li class="active linked" @click="changeStep('information')">
      <span>{{ $t("progressBarForm.information") }}</span>
    </li>
    <li class="active linked" @click="changeStep('courses')">
      <span>{{ $t("progressBarForm.courses") }}</span>
    </li>
    <li class="active linked" @click="changeStep('students')">
      <span>{{ $t("progressBarForm.students") }}</span>
    </li>
  </ul>
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
  methods: {
    changeStep(step) {
      this.$emit("stepChanged", step);
    },
  },
};
</script>
<style>
</style>
