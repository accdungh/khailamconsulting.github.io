<template>
  <div class="courses-form">
    <label class="f-m-14 blue-bold">
      {{ $t("coursesForm.infoText") }}
    </label>

    <AvailableCoursesTable
      v-model="formData.activeCourse"
      :availableCourses="availableCourses"
    />

    <WizardButtons
      ref="wizardButtons"
      :backStep="$t('wizardButtons.back')"
      @backStepClick="emit('backStepClick')"
      :nextStep="$t('wizardButtons.inviteStudents')"
      @nextStepClick="submit"
    />
  </div>
</template>

<script>
import WizardButtons from "./wizard_buttons.vue";
import AvailableCoursesTable from "./available_courses_table.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "CoursesForm",
  props: {
    value: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      formData: this.value,
    };
  },
  computed: {
    ...mapGetters(["userSetting"]),
    availableCourses() {
      if (
        this.userSetting &&
        this.userSetting.institutions &&
        this.userSetting.institutions
      ) {
        let record = this.userSetting.institutions.find(
          (i) => i.id == this.formData.institution
        );

        return (record && record.courses) || [];
      }

      return [];
    },
  },
  components: { WizardButtons, AvailableCoursesTable },
  methods: {
    submit() {
      this.$validator.validateAll().then((valid) => {
        if (valid) {
          this.$emit("input", this.formData);
          this.$emit("nextStepClick");
        }
      });
    },
    emit(name) {
      this.$emit(name);
    },
  },
  created() {
    this.formData = this.value;
    if (!this.formData.activeCourse) this.formData.activeCourse = [];
  },
};
</script>

<style>
</style>
