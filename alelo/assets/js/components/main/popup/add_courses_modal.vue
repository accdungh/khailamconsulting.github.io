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
      class="modal fade"
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
            <CoursesForm v-model="classDetail" />
            <button type="button" @click="save()">Confirm</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import CoursesForm from "../new_class/courses_form.vue";

export default {
  name: "EditClassModal",
  data() {
    return {
      classDetail: {},
    };
  },
  components: { CoursesForm },
  methods: {
    save() {
      // TODO: Do the save function
    },
  },
  created() {},
};
</script>

<style>
</style>
