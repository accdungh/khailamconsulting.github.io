<template>
  <!-- Modal-Create-New-Class -->
  <div
    class="modal fade"
    id="create-new-class"
    tabindex="-1"
    role="dialog"
    aria-labelledby="NewClassLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title">Create A New Class</h2>

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
          <form>
            <div class="form-group">
              <div class="row">
                <div class="col-md-24 mb-3" v-if="!editMode">
                  <h2 class="class-title d-inline">{{ classDetail.name }}</h2>
                  <a
                    class="edit-link d-inline f-n-20 ml-2"
                    href="javascript:void(0)"
                    @click="editMode = true"
                    >Edit</a
                  >
                </div>
                <div class="col-md-24 mb-3" v-else>
                  <h2 class="class-title d-inline form-inline">
                    <input
                      placeholder="Add new title"
                      type="text"
                      id=""
                      class="form-control"
                      v-model="classDetail.name"
                    />
                  </h2>
                  <a
                    class="edit-link d-inline f-n-20 ml-2"
                    href="javascript:void(0)"
                    @click="editMode = false"
                    >Save</a
                  >
                </div>
                <div class="col-md-16 mb-3 clearfix">
                  <div class="wrap-date">
                    <div class="input-group start-date">
                      <label class="f-m-14 blue-light ml-3">Start</label>
                      <input
                        class="datepicker-startdate"
                        :value="classDetail.startDate"
                        data-date-format="mm/dd/yyyy"
                      />
                    </div>

                    <div class="input-group end-date">
                      <label class="f-m-14 blue-light ml-3">End</label>
                      <input
                        class="datepicker-enddate"
                        :value="classDetail.endDate"
                        data-date-format="mm/dd/yyyy"
                      />
                    </div>

                    <div class="text-danger">
                      <small class="date-error-message"></small>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-12 mb-2 mt-2 f-m-20">Summary</div>
              </div>

              <textarea
                placeholder="Add new summary"
                rows="1"
                class="form-control auto-size"
                v-model="classDetail.description"
              ></textarea>
            </div>
          </form>
          <a
            href="javascript:void(0)"
            class="btn-created float-right btn-invite"
            @click="saveClass()"
            >Save</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "CreateClassModal",
  data() {
    return {
      editMode: true,
      classDetail: {},
    };
  },
  methods: {
    ...mapActions(["createClass"]),
    saveClass() {
      let invalid = $('[class*="error-message"]').text();
      if (invalid) return;

      this.createClass(this.classDetail).finally(() => {
        $("#create-new-class").modal("hide");
        this.$router.push({ name: "ClassView" });
      });
    },
  },
};
</script>

<style>
</style>
