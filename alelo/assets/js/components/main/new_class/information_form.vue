<template>
  <div class="information-form">
    <form>
      <div class="form-group">
        <div class="row">
          <div class="col-md-16 mb-3">
            <label class="f-m-14 blue-light">{{
              $t("informationForm.selectInstitution")
            }}</label>
            <div class="dropdown">
              <button
                class="btn dropdown-toggle button-gray-100"
                type="button"
                id="institutions-dropdown"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {{ $t("informationForm.institution") }}
                <i class="fa fa-chevron-down"></i>
              </button>
              <div
                class="dropdown-menu"
                aria-labelledby="institutions-dropdown"
              >
                <a
                  class="dropdown-item"
                  href="javascript:void(0)"
                  v-for="i in userSetting.institutions"
                  :key="i.id"
                  :class="{ hovered: i.id == formData.institution }"
                  @click="changeInstitution(i.id)"
                  >{{ i.name }}</a
                >
              </div>
            </div>
          </div>

          <div class="col-md-16 mb-3">
            <label class="f-m-14 blue-light">
              {{ $t("informationForm.addTitle") }}
            </label>
            <input
              :placeholder="$t('classDetail.addNewTitle')"
              type="text"
              class="form-control information-form__name"
              v-model="formData.name"
              v-validate="'required'"
              data-vv-name="title"
            />
            <div>
              <small v-show="errors.has('title')" class="text-danger">{{
                errors.first("title")
              }}</small>
            </div>
          </div>

          <div class="col-md-16 mb-3 clearfix">
            <div class="wrap-date">
              <div class="input-group start-date">
                <label class="f-m-14 blue-light">{{
                  $t("classDetail.start")
                }}</label>
                <KlDatepicker
                  v-model="formData.startDate"
                  v-validate="'required|date_format:MM/dd/yyyy'"
                  data-vv-name="start date"
                  ref="start date"
                />
              </div>

              <div class="input-group end-date">
                <label class="f-m-14 blue-light">{{
                  $t("classDetail.end")
                }}</label>
                <KlDatepicker
                  v-model="formData.endDate"
                  v-validate="
                    'required|date_format:MM/dd/yyyy|after:start date,inclusion:true'
                  "
                  data-vv-name="end date"
                  ref="end date"
                />
              </div>

              <div class="clearfix"></div>
              <div class="text-danger error-message">
                <div>
                  <small
                    v-show="errors.has('start date')"
                    class="text-danger"
                    >{{ errors.first("start date") }}</small
                  >
                </div>
                <div>
                  <small v-show="errors.has('end date')" class="text-danger">{{
                    errors.first("end date")
                  }}</small>
                </div>
              </div>
            </div>

            <div class="f-m-14 ml-3">
              <label>
                {{ $t("informationForm.note") }}
              </label>
            </div>
          </div>
        </div>

        <div>
          <small v-show="errors.has('summary')" class="text-danger">{{
            errors.first("summary")
          }}</small>
        </div>
      </div>
    </form>

    <WizardButtons nextStep="Add Courses" @nextStepClick="submit" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import WizardButtons from "./wizard_buttons.vue";

export default {
  name: "InformationForm",
  props: {
    value: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      formData: this.value,
    };
  },
  computed: {
    ...mapGetters(["userSetting"]),
  },
  components: {
    WizardButtons,
  },
  methods: {
    submit() {
      this.$validator.validateAll().then((valid) => {
        if (valid) {
          this.$emit("input", this.formData);
          this.$emit("nextStepClick", this.formData);
        }
      });
    },
    changeInstitution(id) {
      this.formData.institution = id;
      this.$forceUpdate();
    },
  },
};
</script>

<style>
</style>
