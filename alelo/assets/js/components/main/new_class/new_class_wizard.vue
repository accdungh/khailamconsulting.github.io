<template>
  <div>
    <ProgressBar :step="currentStep" />
    <InformationForm
      v-show="currentStep == 'information'"
      v-model="formData"
      @nextStepClick="stepChange('courses')"
    />
    <CoursesForm
      v-show="currentStep == 'courses'"
      v-model="formData"
      @backStepClick="stepChange('information')"
      @nextStepClick="stepChange('students')"
    />
    <StudentsForm
      v-show="currentStep == 'students'"
      v-model="formData"
      @backStepClick="stepChange('courses')"
      @nextStepClick="stepChange('review')"
    />
    <ReviewForm
      v-show="currentStep == 'review'"
      v-model="formData"
      @backStepClick="stepChange('students')"
      @nextStepClick="saveForm()"
    />
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
  props: {
    value: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  components: {
    ProgressBar,
    InformationForm,
    CoursesForm,
    StudentsForm,
    ReviewForm,
  },
  data() {
    return {
      currentStep: "information",
      formData: this.value,
    };
  },
  methods: {
    stepChange(step) {
      this.currentStep = step;
    },
    saveForm() {
      this.$emit("input", this.formData);
    },
  },
};
</script>

<style>
</style>
