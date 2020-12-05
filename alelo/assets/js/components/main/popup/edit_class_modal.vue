<template>
  <div>
    <a
      href="#edit-class-modal"
      data-toggle="modal"
      data-target="#edit-class-modal"
      class="edit-link d-inline f-n-20 ml-2"
      >Edit</a
    >

    <div
      class="modal fade"
      id="edit-class-modal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="NewClassLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h2 class="modal-title">Edit Class Details</h2>

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
            <div>Check courses to include in your class</div>
            <InformationForm v-model="classDetail" />
            <button type="button" @click="save()">Confirm</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import InformationForm from "../new_class/information_form.vue";

export default {
  name: "EditClassModal",
  data() {
    return {
      classDetail: {},
    };
  },
  components: { InformationForm },
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
