<template>
  <div class="wrap-item">
    <div class="scrollbar scrollbar-inner">
      <table class="table table-striped table-custom header-fixed">
        <thead>
          <tr>
            <!--<th class="text-center">
              <a
                href="javascript:void(0)"
                data-toggle="tooltip"
                data-container="body"
                data-placement="top"
                :title="$t('classDetail.accessibleHover')"
                >{{ $t("classDetail.accessible") }}</a
              >
            </th>-->
            <th class="pl-5">
              <a
                href="javascript:void(0)"
                data-toggle="tooltip"
                data-container="body"
                data-placement="top"
                :title="$t('classDetail.courseNameHover')"
                >{{ $t("classDetail.courseName") }}</a
              >
            </th>
            <th>
              <a
                href="javascript:void(0)"
                data-toggle="tooltip"
                data-container="body"
                data-placement="top"
                :title="$t('classDetail.playSimulationsHover')"
                >{{ $t("classDetail.playSimulations") }}</a
              >
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(course, index) in sortedCourses"
            :key="'active-course' + index"
          >
            <!--<td align="center">
              <div class="form-check">
                <input
                  class="form-check-input position-static"
                  type="checkbox"
                  id="blankCheckbox"
                  value="option1"
                  aria-label="..."
                />
              </div>
            </td>-->
            <td class="f-m-18 blue-bold pl-5">
              <a
                href="#course-info"
                data-toggle="modal"
                data-target="#course-info"
                @click="select(course)"
                >{{ course.name }}</a
              >
            </td>
            <td><a class="launch_ap"
                   :href="course.link"
                   target="_blank" 
                   ></a></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Sorter from "../../../services/sorter";

export default {
  name: "ActiveCourseList",
  props: {
    courses: {
      type: Array,
      default: () => [],
    },
    value: {},
  },
  data() {
    return {};
  },
  computed: {
    sortedCourses() {
      return new Sorter({ name: {} }).perform(this.courses, "name", true);
    },
  },
  methods: {
    select(course) {
      this.$emit("input", course);
    },
  },
};
</script>

<style>
</style>
