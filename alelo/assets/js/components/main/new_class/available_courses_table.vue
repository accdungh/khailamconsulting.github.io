<template>
  <div class="wrap-item">
    <div class="scrollbar scrollbar-inner">
      <table class="table table-striped table-custom header-fixed">
        <thead>
          <tr>
            <th class="text-center">
              <span class="first-heading-text">Include</span>
            </th>
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
                  :value="course"
                  v-model="selectedCourses"
                  @change="changeSelectedCourses()"
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
</template>

<script>
export default {
  props: {
    availableCourses: {
      type: Array,
      default: () => [],
    },
    value: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      selectedCourses: [],
    };
  },
  created() {
    this.selectedCourses = this.value;
  },
  methods: {
    changeSelectedCourses() {
      this.$forceUpdate();
      this.$emit("input", this.selectedCourses);
    },
  },
  mounted() {
    $(".scrollbar-inner").scrollbar();
  },
};
</script>

<style>
</style>
