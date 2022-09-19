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
              data-vv-name="institution"
            />
            <div>
              <small v-show="errors.has('institution')" class="text-danger">{{
                errors.first("institution")
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
              data-vv-name="title"
            />
            <div>
              <small v-show="errors.has('title')" class="text-danger">{{
                errors.first("title")
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
              data-vv-name="description"
              class="form-control auto-size"
            />
            <div>
              <small v-show="errors.has('description')" class="text-danger">{{
                errors.first("description")
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
                  data-vv-name="start date"
                  ref="start date"
                />
              </div>

              <div class="input-group end-date">
                <label class="f-m-14 blue-bold">
                  {{ $t("informationForm.addEndDate") }}
                </label>
                <KlDatepicker
                  v-model="formData.endDate"
                  v-validate="'required|afterDate:start date'"
                  data-vv-name="end date"
                  ref="end date"
                />
              </div>

              <div class="clearfix"></div>
              <div class="text-danger error-message">
                <div>
                  <small
                    v-show="isDatesDirty && errors.has('start date')"
                    class="text-danger"
                    >{{ errors.first("start date") }}</small
                  >
                </div>
                <div>
                  <small
                    v-show="isDatesDirty && errors.has('end date')"
                    class="text-danger"
                    >{{ errors.first("end date") }}</small
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
      format: "MM/dd/yyyy",
      isDirty: false,
    };
  },
  computed: {
    ...mapGetters(["userSetting"]),
    isDatesDirty() {
      return (
        this.isDirty ||
        ["start date", "end date"].some(
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
      return this.userSetting.institutions.find(
        (i) => i.id == this.formData.institution
      ).name;
    },
  },
  components: {
    WizardButtons,
  },
  methods: {
    changeDirtyState(state) {
      this.isDirty = state;
    },
  },
  created() {
    this.formData = Object.assign({}, this.value);
    this.$validator.extend("afterToday", (value) => {
      let date = moment(value);
      let today = moment().startOf("days");

      return date >= today;
    });
    this.$validator.extend(
      "afterDate",
      (value, [otherValue]) => {
        if (!value || !otherValue) return true;

        let date1 = moment(value);
        let date2 = moment(otherValue);

        return date1 >= date2;
      },
      {
        hasTarget: true,
      }
    );
  },
  watch: {
    formData: {
      deep: true,
      handler() {
        if (this.formData.startDate) {
          setTimeout(() => {
            this.$validator.validate("start date");
          });
        }
        if (this.formData.endDate) {
          setTimeout(() => {
            this.$validator.validate("end date");
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
