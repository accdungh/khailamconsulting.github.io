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
          <h2 class="modal-title">{{ $t("classList.createClass") }}</h2>

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
                    >{{ $t("classDetail.edit") }}</a
                  >
                </div>
                <div class="col-md-24 mb-3" v-else>
                  <h2 class="class-title d-inline form-inline">
                    <input
                      :placeholder="$t('classDetail.addNewTitle')"
                      type="text"
                      class="form-control"
                      v-model="classDetail.name"
                      v-validate="'required'"
                      data-vv-name="title"
                    />
                  </h2>
                  <a
                    class="edit-link d-inline f-n-20 ml-2"
                    href="javascript:void(0)"
                    @click="editMode = false"
                    >{{ $t("classDetail.save") }}</a
                  >
                  <div>
                    <small v-show="errors.has('title')" class="text-danger">{{
                      errors.first("title")
                    }}</small>
                  </div>
                </div>
                <div class="col-md-16 mb-3 clearfix">
                  <div class="wrap-date">
                    <div class="input-group start-date">
                      <label class="f-m-14 blue-light ml-3">{{
                        $t("classDetail.start")
                      }}</label>
                      <KlDatepicker
                        v-model="classDetail.startDate"
                        v-validate="'required|date_format:MM/dd/yyyy'"
                        data-vv-name="start date"
                        ref="start date"
                      />
                    </div>

                    <div class="input-group end-date">
                      <label class="f-m-14 blue-light ml-3">{{
                        $t("classDetail.end")
                      }}</label>
                      <KlDatepicker
                        v-model="classDetail.endDate"
                        v-validate="
                          'required|date_format:MM/dd/yyyy|after:start date,inclusion:true'
                        "
                        data-vv-name="end date"
                        ref="end date"
                      />
                    </div>

                    <div class="text-danger">
                      <div>
                        <small
                          v-show="errors.has('start date')"
                          class="text-danger"
                          >{{ errors.first("start date") }}</small
                        >
                      </div>
                      <div>
                        <small
                          v-show="errors.has('end date')"
                          class="text-danger"
                          >{{ errors.first("end date") }}</small
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-12 mb-2 mt-2 f-m-20">
                  {{ $t("classList.summary") }}
                </div>
              </div>

              <textarea
                :placeholder="$t('classDetail.addNewSummary')"
                rows="1"
                class="form-control auto-size"
                v-model="classDetail.description"
                v-validate="'required'"
                data-vv-name="summary"
              ></textarea>

              <div>
                <small v-show="errors.has('summary')" class="text-danger">{{
                  errors.first("summary")
                }}</small>
              </div>
            </div>
          </form>
          <a
            href="javascript:void(0)"
            class="btn-created float-right btn-invite"
            @click="saveClass()"
            >{{ $t("classDetail.save") }}</a
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
      this.$validator.validateAll().then((valid) => {
        if (valid) {
          this.createClass(this.classDetail).then(({ data }) => {
            $("#create-new-class").modal("hide");
            this.$router.push({
              name: "ClassView",
              params: { id: data.id },
            });
          });
        }
      });
    },
  },
  created() {},
};
</script>

<style>
</style>
