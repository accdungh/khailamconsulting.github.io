<template>
  <input
    :placeholder="placeholder || format"
    :ref="refKey"
    v-model="dateValue"
    :class="inputClass"
    :data-date-format="format.toLowerCase()"
  />
</template>

<script>
import _ from "lodash";
import moment from "moment";
import { mapGetters, mapActions } from "vuex";
import "../../../scripts/bootstrap-datepicker.es.min.js";
import "../../../scripts/bootstrap-datepicker.pt.min.js";
import "../../../scripts/bootstrap-datepicker.zh-CN.min.js";

export default {
  name: "KlDatepicker",
  props: {
    value: {},
    refKey: {
      type: String,
      default: () => `kl-datepicker-${_.random(10000)}`,
    },
    placeholder: {
      type: String,
    },
    inputClass: {
      type: String,
    },
    format: {
      type: String,
      default: "MM/DD/YYYY",
    },
  },
  data() {
    return {
      dateValue: "",
      endWatch: false,
    };
  },
  computed: {
    ...mapGetters(["lang"]),
  },
  methods: {
    getDateValue() {
      if (this.value) this.dateValue = moment(this.value).format(this.format);
    },
    initDatepicker() {
      let self = this;
      $(this.$refs[this.refKey]).datepicker("destroy");
      $(this.$refs[this.refKey]).datepicker({
        language: { cn: "zh-CN" }[this.lang] || this.lang,
      });
      $(this.$refs[this.refKey])
        .off("blur")
        .on("blur", function () {
          let date = $(self.$refs[self.refKey]).datepicker("getDate");
          if (!date) return;
          self.dateValue = moment(date).format(self.format);
        });
    },
  },
  watch: {
    value(val) {
      this.getDateValue();
    },
    dateValue(val) {
      if (!moment(val, this.format, true).isValid()) return;

      let datePickerValue = $(this.$refs[this.refKey]).datepicker("getDate");
      if (val && !datePickerValue) {
        $(this.$refs[this.refKey]).datepicker("setDate", val);
        this.$emit("input", moment(val, this.format));
        return;
      }
      let datePickerValueFormat = moment(datePickerValue).format(this.format);
      if (datePickerValueFormat !== this.dateValue) {
        $(this.$refs[this.refKey]).datepicker("setDate", datePickerValue);
      } else {
        this.$emit("input", datePickerValue);
      }
    },
    lang() {
      this.initDatepicker();
    },
  },
  mounted() {
    this.getDateValue();
    this.initDatepicker();
  },
};
</script>

<style>
</style>
