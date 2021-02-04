<template>
  <div class="information-form">
    <form>
      <div class="form-group">
        <div class="row">
          <div class="col-md-16 mb-3">
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

          <div class="col-md-16 mb-3">
            <label class="f-m-14 blue-bold">
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

          <div class="d-none">
            <KlDatepicker v-model="today" ref="today" />
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
                  v-validate="
                    'required|date_format:' +
                    format +
                    '|after:start date,inclusion:true'
                  "
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

        <div>
          <small v-show="errors.has('summary')" class="text-danger">{{
            errors.first("summary")
          }}</small>
        </div>
      </div>
    </form>

    <slot name="buttons" v-bind:validator="$validator"></slot>
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
      today: moment().startOf("days").toDate(),
    };
  },
  computed: {
    ...mapGetters(["userSetting"]),
    isDatesDirty() {
      return ["start date", "end date"].some(
        (key) => this.fields[key] && this.fields[key].dirty
      );
    },
    startDateValidateRule() {
      let rule = "required|date_format:" + this.format;
      if (this.isNew) {
        rule += "|after:today,inclusion:true";
      }

      return rule;
    },
  },
  components: {
    WizardButtons,
  },
  methods: {},
  created() {
    this.formData = Object.assign({}, this.value);
  },
  watch: {
    formData: {
      deep: true,
      handler() {
        this.$emit("input", this.formData);
      },
    },
  },
};
</script>

<style>
</style>
