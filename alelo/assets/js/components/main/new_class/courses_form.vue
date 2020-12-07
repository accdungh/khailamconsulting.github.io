<template>
  <div>
    <label class="f-m-14 blue-light">
      Check courses to include in your class (you can edit your selections
      later)
    </label>
    <div class="wrap-item">
      <div class="scrollbar scrollbar-inner">
        <table class="table table-striped table-custom header-fixed">
          <thead>
            <tr>
              <th class="text-center"></th>
              <th>
                <a href="javascript:void(0)">{{
                  $t("classDetail.courseName")
                }}</a>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(course, index) in availableCourses"
              :key="'available-course' + index"
            >
              <td align="center">
                <div class="form-check">
                  <input
                    class="form-check-input position-static"
                    type="checkbox"
                    :value="course.id"
                    v-model="formData.activeCourse"
                    @change="$forceUpdate()"
                  />
                </div>
              </td>
              <td class="f-m-18 blue-bold">
                {{ course.name }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <WizardButtons
      backStep="Back"
      @backStepClick="emit('backStepClick')"
      nextStep="Invite Students"
      @nextStepClick="submit"
    />
  </div>
</template>

<script>
import WizardButtons from "./wizard_buttons.vue";
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
  components: { WizardButtons },
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
  mounted() {
    $(".scrollbar-inner").scrollbar();
  },
};
</script>

<style>
</style>
