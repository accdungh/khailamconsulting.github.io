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
          <h2 class="modal-title" id="delete-classLabel">
            {{ $t("deleteClass.headerText") }}
          </h2>

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
            {{ $t("deleteClass.introText") }}
          </p>
          <div class="wrap-item text-center pb-5">
            <h3 class="mt-5 mb-5">
              {{ $t("deleteClass.confirmText") }}
            </h3>
            <a
              href="javascript:void(0)"
              class="btn-created"
              data-dismiss="modal"
              @click="confirmDelete()"
              >{{ $t("deleteClass.buttonText") }}</a
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
