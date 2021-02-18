<template>
  <div>
    <ProgressBar :step="currentStep" @stepChanged="progressBarChangeStep" />
    <InformationForm
      v-if="currentStep == 'information'"
      v-model="formData"
      ref="informationForm"
      :isNew="true"
    >
      <template v-slot:buttons="props">
        <WizardButtons
          ref="wizardButtons"
          :nextStep="$t('wizardButtons.addCourses')"
          @nextStepClick="gotoCourse(props)"
        />
      </template>
    </InformationForm>
    <CoursesForm
      v-if="currentStep == 'courses'"
      v-model="formData"
      @backStepClick="stepChange('information')"
      @nextStepClick="stepChange('students')"
      ref="coursesForm"
    />
    <StudentsForm
      v-if="currentStep == 'students'"
      v-model="formData"
      @backStepClick="stepChange('courses')"
      @nextStepClick="stepChange('review')"
      ref="studentsForm"
    />
    <ReviewForm
      v-if="currentStep == 'review'"
      v-model="formData"
      @backStepClick="stepChange('students')"
      @nextStepClick="saveForm()"
      ref="reviewForm"
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
    WizardButtons,
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
    progressBarChangeStep(step) {
      let allSteps = ["information", "courses", "students", "review"];
      let currentIndex = allSteps.indexOf(this.currentStep);
      let stepIndex = allSteps.indexOf(step);

      if (stepIndex > currentIndex) {
        (
          this.$refs[`${this.currentStep}Form`].$refs.wizardButtons ||
          this.$refs.wizardButtons
        ).emit("nextStepClick");
      } else if (stepIndex < currentIndex) {
        (
          this.$refs[`${this.currentStep}Form`].$refs.wizardButtons ||
          this.$refs.wizardButtons
        ).emit("backStepClick");
      }

      if (this.currentStep == "review") {
        this.stepChange(step);
      }
    },
    saveForm() {
      this.$emit("input", this.formData);
      this.$emit("submit");
    },
    gotoCourse(props) {
      props.changeDirtyState(true);
      props.validator.validateAll().then((valid) => {
        if (!valid) return;
        this.stepChange("courses");
      });
    },
  },
};
</script>

<style>
</style>
