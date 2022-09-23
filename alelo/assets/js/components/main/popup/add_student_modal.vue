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
          <p class="f-m-14 gray-blur mb-4">
            {{ $t("addStudents.instructionsText") }}
          </p>
          <div v-if="!sent">
            <div class="pb-5">
              <textarea
                v-model="studentEmails"
                class="form-control auto-size student-list"
              />
              <div v-if="invalidEmails.length">
                <small class="text-danger" v-html="invalidEmailMessage"></small>
              </div>
            </div>
            <a
              href="javascript:void(0)"
              class="btn-created float-right"
              v-on:click.stop="invite()"
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
import { mapGetters, mapActions } from "vuex";
import StudentEmailMixin from "../../../mixins/student_email";

export default {
  name: "AddStudentModal",
  mixins: [StudentEmailMixin],
  data() {
    return {
      sent: false,
    };
  },
  computed: {
    ...mapGetters(["noticeMessage"]),
  },
  methods: {
    ...mapActions(["addStudent"]),
    invite() {
      if (!this.students.length) return $("#add_student_modal").modal("hide");
      if (this.invalidEmails.length) return;

      this.addStudent({ students: this.students }).then(() => {
        if (!noticeMessage)
          this.sent = true;
      });
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
    resetForm() {
      this.clearStudentEmails();
    },
  },
  created() {
    const t = this;
    $(document).on("shown.bs.modal", "#add_student_modal", t.autosizeEvent);
    $(document).on("hidden.bs.modal", "#add_student_modal", t.resetForm);
  },
};
</script>

<style>
.student-list {
  font-size: 18px;
  color: #707070;
}
</style>
