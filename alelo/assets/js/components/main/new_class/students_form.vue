<template>
  <div class="students-form">
    <label class="f-m-14 blue-bold">
      {{ $t("studentsForm.infoText") }}
    </label>

    <div class="mb-4">
      <textarea
        v-model="studentEmails"
        class="form-control auto-size student-list"
        rows="10"
      />

      <div v-if="invalidEmails.length">
        <small class="text-danger" v-html="invalidEmailMessage"></small>
      </div>
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
import StudentEmailMixin from "../../../mixins/student_email";

export default {
  name: "StudentsForm",
  mixins: [StudentEmailMixin],
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
      formData: null,
    };
  },
  components: { WizardButtons },
  created() {
    this.formData = this.value;
    this.studentEmails =
      (this.value.students && this.value.students.join("\n")) || "";
  },
  methods: {
    emit(name) {
      this.$emit(name);
    },
    submit() {
      this.$emit(
        "input",
        Object.assign(this.formData, {
          students: this.students,
        })
      );

      this.$validator.validateAll().then((valid) => {
        if (valid && !this.invalidEmails.length) {
          this.$emit("nextStepClick");
        }
      });
    },
  },
};
</script>

<style>
</style>
