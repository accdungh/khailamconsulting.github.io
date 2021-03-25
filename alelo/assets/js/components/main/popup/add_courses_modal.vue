<template>
  <div>
    <a
      href="#add-courses-modal"
      data-toggle="modal"
      data-target="#add-courses-modal"
      class="btn-created float-right"
      >{{ $t("wizardButtons.addCourses") }}</a
    >

    <div class="clearfix"></div>

    <div
      class="modal fade courses-form"
      id="add-courses-modal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="NewClassLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h2 class="modal-title">{{ $t("classDetail.editCourses") }}</h2>

            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <label class="f-m-14 blue-bold">
              {{ $t("classDetail.infoText") }}
            </label>

            <AvailableCoursesTable
              v-model="classDetail.selectedCourses"
              :availableCourses="availableCourses"
            />

            <a
              href="javascript:void(0)"
              class="btn-created float-right"
              @click="save()"
              >{{ $t("wizardButtons.confirm") }}</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import AvailableCoursesTable from "../new_class/available_courses_table.vue";
import { pick, concat, compact } from "lodash";

export default {
  name: "EditClassModal",
  props: {
    classObject: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      classDetail: {},
    };
  },
  computed: {
    availableCourses() {
      return compact(
        concat(
          this.classDetail.activeCourse || [],
          this.classDetail.availableCourse || []
        )
      );
    },
  },
  components: { AvailableCoursesTable },
  methods: {
    ...mapActions(["addCourse"]),
    save() {
      let params = pick(this.classDetail, ["selectedCourses"]);
      if (!params.selectedCourses || !params.selectedCourses.length)
        return $("#add-courses-modal").modal("hide");

      this.addCourse(params).then(() => {
        $("#add-courses-modal").modal("hide");
      });
    },
  },
  watch: {
    classObject: {
      deep: true,
      handler() {
        this.classDetail = Object.assign({}, this.classObject, {
          selectedCourses: (this.classObject.activeCourse || []).map(
            (i) => i.id
          ),
        });
      },
    },
  },
};
</script>

<style>
</style>
