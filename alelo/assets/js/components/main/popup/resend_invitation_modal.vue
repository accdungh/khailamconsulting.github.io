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
          <h2 class="modal-title">Resend Invitation</h2>

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
            You are about to resend an invitation to the following student(s):
          </p>
          <p class="f-m-20 gray-blur mb-5">
            Invitations will be sent to selected students. If a student has
            already accepted an invitation, a new invitation will not be sent.
          </p>

          <div class="wrap-item text-center pb-5">
            <h3 class="mt-5 mb-5">Resend Invitation?</h3>
            <a
              href="javascript:void(0)"
              class="btn-created"
              data-dismiss="modal"
              @click="$emit('confirmed')"
              >Yes, Resend</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RemoveInvitationModal",
};
</script>

<style>
</style>
