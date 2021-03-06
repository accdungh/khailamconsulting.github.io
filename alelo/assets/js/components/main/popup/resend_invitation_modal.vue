<template>
  <!-- Modal-Remove Student -->
  <div
    class="modal fade"
    id="resent-invitation"
    tabindex="-1"
    role="dialog"
    aria-labelledby="myModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title">{{ $t("resendInvitation.headerText") }}</h2>

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
          <p class="f-m-20 blue-bold mb-1">
            {{ $t("resendInvitation.introText") }}
          </p>
          <p class="f-m-20 gray-blur mb-1">
            {{ $t("resendInvitation.infoText") }}
          </p>

          <ResendStudentList :students="students" />

          <div class="wrap-item text-center pb-3 pt-3">
            <h3 class="mb-3">{{ $t("resendInvitation.confirmText") }}</h3>
            <a
              href="javascript:void(0)"
              class="btn-created"
              data-dismiss="modal"
              @click="$emit('confirmed')"
              >{{ $t("resendInvitation.buttonText") }}</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ResendStudentList from "../class_view/resend_student_list.vue";

export default {
  name: "RemoveInvitationModal",
  props: {
    students: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    ResendStudentList,
  },
};
</script>

<style>
</style>
