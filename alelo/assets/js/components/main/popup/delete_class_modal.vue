<template>
  <!-- Modal-delele-Class -->
  <div
    class="modal fade"
    id="delete-class"
    tabindex="-1"
    role="dialog"
    aria-labelledby="delete-classLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title" id="delete-classLabel">Delete Class</h2>

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
          <p class="f-m-20 blue-bold">
            This class and all of its data will be deleted forever.
          </p>
          <div class="wrap-item text-center pb-5">
            <h3 class="mt-5 mb-5">
              Are you sure you want to delete this class?
            </h3>
            <a
              href="javascript:void(0)"
              class="btn-created"
              data-dismiss="modal"
              @click="confirmDelete()"
              >Yes, Delete</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "DeleteClassModal",
  methods: {
    ...mapActions(["deleteClass"]),
    confirmDelete() {
      this.deleteClass().then(() => {
        this.$router.push({ name: "ClassList" });
      });
    },
  },
};
</script>

<style>
</style>
