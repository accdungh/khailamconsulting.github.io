<template>
  <div>
    <ProgressBar :step="currentStep" />
    <InformationForm v-model="formData" />
    <CoursesForm v-model="formData" />
    <StudentsForm v-model="formData" />
    <ReviewForm v-model="formData" />
    <WizardButtons
      :step="currentStep"
      @stepChange="stepChange"
      @formSubmit="formSubmit"
    />
    Current step: {{ currentStep }}
  </div>
</template>

<script>
import ProgressBar from "./progress_bar.vue";
import WizardButtons from "./wizard_buttons.vue";
import InformationForm from "./information_form.vue";
import CoursesForm from "./courses_form.vue";
import StudentsForm from "./students_form.vue";
import ReviewForm from "./review_form.vue";

export default {
  name: "NewClassWizard",
  components: {
    ProgressBar,
    WizardButtons,
    InformationForm,
    CoursesForm,
    StudentsForm,
    ReviewForm,
  },
  data() {
    return {
      currentStep: "information",
      formData: {},
    };
  },
  methods: {
    stepChange(step) {
      this.currentStep = step;
    },
    formSubmit() {
      // TODO: do the submit
    },
  },
};
</script>

<style>
</style>
