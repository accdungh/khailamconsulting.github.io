<template>
  <div
    class="modal fade"
    id="notice-modal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="notice-modalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title" id="notice-modalLabel">Notice</h2>

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
            {{ noticeMessage }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "NoticeModal",
  computed: {
    ...mapGetters(["noticeMessage"]),
  },
  methods: {
    ...mapActions(["setNoticeMessage"]),
  },
  watch: {
    noticeMessage(val) {
      if (val) {
        $("#notice-modal").modal("show");
        $("#notice-modal")
          .off("hidden.bs.modal")
          .on("hidden.bs.modal", () => {
            this.setNoticeMessage("");
          });
      }
    },
  },
};
</script>

<style>
</style>
