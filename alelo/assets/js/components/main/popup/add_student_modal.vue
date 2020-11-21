<template>
  <!-- Modal-Add-Class -->
  <div
    class="modal fade"
    id="add_student_modal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="myModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title">{{ $t("classDetail.addStudents") }}</h2>

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
            {{ $t("addStudents.instructions") }}
          </p>
          <p class="f-m-20 gray-blur mb-5">
            {{ $t("addStudents.instructionsText") }}
          </p>
          <div v-if="!sent">
            <div class="pb-5">
              <textarea
                v-model="students"
                class="form-control auto-size student-list"
              />
            </div>
            <a
              href="javascript:void(0)"
              class="btn-created float-right"
              @click="invite()"
              >{{ $t("addStudents.invite") }}</a
            >
          </div>
          <div v-else>
            <div class="wrap-item text-center pb-5">
              <h3 class="mt-5 mb-5">{{ $t("addStudents.invitationsSent") }}</h3>
              <a
                href="javascript:void(0)"
                class="btn-created"
                @click="addMore()"
                >{{ $t("addStudents.addMore") }}</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddStudentModal",
  data() {
    return {
      sent: false,
      students: `ninenine@yahoo.ca
oracle@hotmail.com
tellis@icloud.com
pakaste@me.com
banarse@comcast.net
animats@att.net
helger@comcast.net
rmcfarla@comcast.net
microfab@mac.com
jfmulder@yahoo.com
mgreen@aol.com
stevelim@live.com`,
    };
  },
  methods: {
    invite() {
      // TODO: do the invite action
      this.sent = true;
    },
    addMore() {
      this.sent = false;
      setTimeout(() => {
        this.autosizeEvent();
      });
    },
    autosizeEvent() {
      autosize($(".student-list"));
      autosize.update($(".student-list"));
    },
  },
  created() {
    $(document).on("shown.bs.modal", "#add_student_modal", this.autosizeEvent);
  },
};
</script>

<style>
.student-list {
  font-size: 18px;
  color: #707070;
}
</style>
