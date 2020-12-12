<template>
  <div class="students-form">
    <label class="f-m-14 blue-light">
      {{ $t("studentsForm.infoText") }}
    </label>

    <div class="mb-4">
      <textarea
        v-model="formData.students"
        class="form-control auto-size student-list"
        rows="15"
      />
    </div>

    <WizardButtons
      ref="wizardButtons"
      :backStep="$t('wizardButtons.back')"
      @backStepClick="emit('backStepClick')"
      :nextStep="$t('wizardButtons.review')"
      @nextStepClick="submit()"
    />
  </div>
</template>

<script>
import WizardButtons from "./wizard_buttons.vue";

export default {
  name: "StudentsForm",
  props: {
    value: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  components: { WizardButtons },
  created() {
    this.formData = this.value;
  },
  methods: {
    emit(name) {
      this.$emit(name);
    },
    submit() {
      this.$validator.validateAll().then((valid) => {
        if (valid) {
          this.$emit("input", this.formData);
          this.$emit("nextStepClick");
        }
      });
    },
  },
};
</script>

<style>
</style>
