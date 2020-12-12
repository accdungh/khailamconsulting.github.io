<template>
  <div>
    <a
      href="#add-courses-modal"
      data-toggle="modal"
      data-target="#add-courses-modal"
      class="btn-created float-right"
      >Add Courses</a
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
            <h2 class="modal-title">Edit Courses</h2>

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
            <label class="f-m-14 blue-light">
              Check courses to include in your class.
            </label>

            <AvailableCoursesTable
              v-model="classDetail.selectedCourse"
              :availableCourses="classDetail.activeCourse"
            />

            <a
              href="javascript:void(0)"
              class="btn-created float-right"
              @click="save()"
              >Confirm</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import AvailableCoursesTable from "../new_class/available_courses_table.vue";

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
  components: { AvailableCoursesTable },
  methods: {
    ...mapActions(["updateClass"]),
    save() {
      this.updateClass(this.classDetail).then(() => {
        $("#add-courses-modal").modal("hide");
      });
    },
  },
  watch: {
    classObject() {
      this.classDetail = Object.assign({}, this.classObject);
    },
  },
};
</script>

<style>
</style>
