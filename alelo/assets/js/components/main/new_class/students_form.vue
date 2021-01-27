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
import { compact } from "lodash";

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
  data() {
    return {
      studentEmails: "",
      formData: null,
    };
  },
  components: { WizardButtons },
  computed: {
    students() {
      return compact(this.studentEmails.split("\n") || []);
    },
    invalidEmails() {
      const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      let invalidEmails = [];

      for (let email of this.students) {
        if (email && !re.test(email)) {
          invalidEmails.push(email);
        }
      }

      return invalidEmails;
    },
    invalidEmailMessage() {
      if (!this.invalidEmails || !this.invalidEmails.length) return;

      return this.$t("studentsForm.invalidEmail", {
        emails: this.invalidEmails.map((email) => `“${email}”`).join(", "),
        beVerb:
          this.invalidEmails.length > 1
            ? this.$t("studentsForm.are")
            : this.$t("studentsForm.is"),
      });
    },
  },
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
