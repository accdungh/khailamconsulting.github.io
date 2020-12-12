<template>
  <div class="review-form">
    <div class="info-text mb-4">
      {{ $t("reviewForm.infoText") }}
    </div>

    <div class="row">
      <div class="col-sm-12">
        <label class="f-m-14 blue-light">
          {{ $t("informationForm.institution") }}:
        </label>
        <div>
          {{ institutionName }}
        </div>
      </div>

      <div class="col-sm-12">
        <label class="f-m-14 blue-light">
          {{ $t("reviewForm.classTitle") }}:
        </label>
        <div>
          {{ formData.name }}
        </div>
      </div>

      <div class="col-sm-24">
        <label class="f-m-14 blue-light">
          {{ $t("reviewForm.classDates") }}:
        </label>
        <div>
          {{ formData.startDate | timeParser("MM/DD/YYYY") }} -
          {{ formData.endDate | timeParser("MM/DD/YYYY") }}
        </div>
      </div>

      <div class="col-sm-24 mt-4">
        <label class="f-m-14 blue-light">
          {{ $t("reviewForm.includedCourses") }}:
        </label>
        <span
          v-for="(course, index) in includedCourses"
          :key="'course' + index"
          class="badge badge-primary included-course"
        >
          {{ course }}
        </span>
      </div>
    </div>

    <div class="row mt-4">
      <div class="col-sm-6">
        <label class="f-m-14 blue-light">
          {{ $t("reviewForm.studentInvited") }}:
        </label>
      </div>
      <div class="col-sm-12">
        <div class="invited-students scrollbar scrollbar-inner">
          <div class="invited-students__content" v-html="invitedStudents"></div>
        </div>
      </div>
    </div>

    <WizardButtons
      ref="wizardButtons"
      class="mt-4"
      :backStep="$t('wizardButtons.back')"
      @backStepClick="emit('backStepClick')"
      :confirmStep="$t('wizardButtons.confirm')"
      @confirmStepClick="submit()"
    />
  </div>
</template>

<script>
import WizardButtons from "./wizard_buttons.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "ReviewForm",
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
  mounted() {
    $(".scrollbar").scrollbar();
  },
  computed: {
    ...mapGetters(["userSetting"]),
    institutionName() {
      if (
        this.userSetting &&
        this.userSetting.institutions &&
        this.userSetting.institutions
      ) {
        let record = this.userSetting.institutions.find(
          (i) => i.id == this.formData.institution
        );

        return record && record.name;
      }

      return;
    },
    includedCourses() {
      return this.formData.activeCourse.map((i) => i.name);
    },
    invitedStudents() {
      return (
        this.formData.students &&
        this.formData.students.replace(/\n/gi, "<br/>")
      );
    },
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
