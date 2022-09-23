<template>
  <div class="information-form">
    <form>
      <div class="form-group">
        <div class="row">
          <div class="col-md-16 mb-3" v-if="isNew">
            <label class="f-m-14 blue-bold">{{
              $t("informationForm.selectInstitution")
            }}</label>
            <DropdownButton
              v-model="formData.institution"
              :options="userSetting.institutions"
              :label="$t('informationForm.institution')"
              v-validate="'required'"
              data-vv-name="Institution"
            />
            <div>
              <small v-show="errors.has('Institution')" class="text-danger">{{
                errors.first("Institution")
              }}</small>
            </div>
          </div>

          <div class="col-md-16 mb-3" v-else>
            <label class="f-m-14 blue-bold">{{
              $t("informationForm.yourInstitution")
            }}</label>
            <div class="information-form_your-institution">
              {{ institutionName }}
            </div>
          </div>

          <div class="col-md-16 mb-3">
            <label class="f-m-14 blue-bold">
              {{ $t("informationForm.addTitle") }}
            </label>
            <input
              :placeholder="$t('classDetail.addNewTitle')"
              type="text"
              class="form-control information-form__name"
              v-model="formData.name"
              v-validate="'required|max:128'"
              data-vv-name="Title"
            />
            <div>
              <small v-show="errors.has('Title')" class="text-danger">{{
                errors.first("Title")
              }}</small>
            </div>
          </div>

          <div class="col-md-16 mb-3">
            <label class="f-m-14 blue-bold">
              {{ $t("informationForm.addClassDes") }}
            </label>
            <textarea
              :placeholder="$t('informationForm.addNewDes')"
              rows="1"
              v-model="formData.description"
              v-validate="'required'"
              data-vv-name="Description"
              class="form-control auto-size"
            />
            <div>
              <small v-show="errors.has('Description')" class="text-danger">{{
                errors.first("Description")
              }}</small>
            </div>
          </div>

          <div class="col-md-16 mb-3 clearfix">
            <div class="wrap-date">
              <div class="input-group start-date">
                <label class="f-m-14 blue-bold">
                  {{ $t("informationForm.addStartDate") }}
                </label>
                <KlDatepicker
                  v-model="formData.startDate"
                  v-validate="startDateValidateRule"
                  data-vv-name="Start Date"
                  ref="Start Date"
                />
              </div>

              <div class="input-group end-date">
                <label class="f-m-14 blue-bold">
                  {{ $t("informationForm.addEndDate") }}
                </label>
                <KlDatepicker
                  v-model="formData.endDate"
                  v-validate="'required|afterDate:Start Date'"
                  data-vv-name="End Date"
                  ref="End Date"
                />
              </div>

              <div class="clearfix"></div>
              <div class="text-danger error-message">
                <div>
                  <small
                    v-show="isDatesDirty && errors.has('Start Date')"
                    class="text-danger"
                    >{{ errors.first("Start Date") }}</small
                  >
                </div>
                <div>
                  <small
                    v-show="isDatesDirty && errors.has('End Date')"
                    class="text-danger"
                    >{{ errors.first("End Date") }}</small
                  >
                </div>
              </div>
            </div>

            <div class="class-dates__note f-m-14 mt-1 ml-3">
              <label>
                {{ $t("informationForm.note") }}
              </label>
            </div>
          </div>
        </div>
      </div>
    </form>

    <slot
      name="buttons"
      v-bind:validator="$validator"
      v-bind:changeDirtyState="changeDirtyState"
    ></slot>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import WizardButtons from "./wizard_buttons.vue";
import moment from "moment";

export default {
  name: "InformationForm",
  props: {
    value: {
      type: Object,
      default() {
        return {};
      },
    },
    isNew: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      formData: {},
      isDirty: false,
    };
  },
  computed: {
    ...mapGetters(["userSetting"]),
    isDatesDirty() {
      return (
        this.isDirty ||
        ["Start Date", "End Date"].some(
          (key) => this.fields[key] && this.fields[key].dirty
        )
      );
    },
    startDateValidateRule() {
      let rule = "required";
      if (this.isNew) {
        rule += "|afterToday";
      }

      return rule;
    },
    institutionName() {
      if (this.userSetting.institutions) {
        const institution = this.userSetting.institutions.find(
          (i) => i.id == this.formData.institution
        )
        return institution && institution.name;
      }
    },
  },
  components: {
    WizardButtons,
  },
  methods: {
    changeDirtyState(state) {
      this.isDirty = state;
    },
    resetForm() {
      this.formData = {};
      this.$validator.reset();
    },
  },
  created() {
    this.resetForm();
    this.$validator.extend("afterToday", (value) => {
      let date = moment(value);
      let today = moment().startOf("days");

      return date >= today;
    });
    this.$validator.extend("afterDate", (value, [otherValue]) => {
      if (!value || !otherValue) return true;

      let date1 = moment(value);
      let date2 = moment(otherValue);

      return date1 >= date2;
    }, { hasTarget: true, });
  },
  mounted() {
    const t = this;
    $(document).on("hidden.bs.modal", "#create-new-class", t.resetForm);
  },
  watch: {
    formData: {
      deep: true,
      handler() {
        if (this.formData.startDate) {
          setTimeout(() => {
            this.$validator.validate("Start Date");
          });
        }
        if (this.formData.endDate) {
          setTimeout(() => {
            this.$validator.validate("End Date");
          });
        }
        this.$emit("input", this.formData);
      },
    },
  },
};
</script>

<style>
</style>
