<template>
  <input
    :placeholder="placeholder || momentFormat"
    :ref="refKey"
    v-model="dateValue"
    :class="inputClass"
    :data-date-format="format"
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
      default: "mm/dd/yyyy",
    },
  },
  data() {
    return {
      dateValue: "",
      endWatch: false,
      debouncer: null,
    };
  },
  computed: {
    ...mapGetters(["lang"]),
    momentFormat() { return this.format.toUpperCase(); }
  },
  methods: {
    getDateValue() {
      if (this.value)
        this.dateValue = moment(this.value).format(this.momentFormat);
      else
        this.dateValue = null;
    },
    initDatepicker() {
      let self = this;
      $(self.$refs[self.refKey]).datepicker("destroy");
      $(self.$refs[self.refKey]).datepicker({
        language: { cn: "zh-CN" }[self.lang] || self.lang,
      });
      $(self.$refs[self.refKey])
        .off("changeDate")
        .on("changeDate", function (e) {
          let date = e.date;
          if (!date) return;
          clearTimeout(self.debouncer);
          self.dateValue = moment(date).format(self.momentFormat);
        });
      $(self.$refs[self.refKey])
        .off("blur")
        .on("blur", function () {
          let date = $(self.$refs[self.refKey]).datepicker("getDate");
          if (!date) {
            self.debouncer = setTimeout(() => {
              self.dateValue = null;
              self.$emit("input", null);
            }, 200);
            return;
          }
          self.dateValue = moment(date).format(self.momentFormat);
        });
    },
  },
  watch: {
    value(val) {
      this.getDateValue();
    },
    dateValue(val, oldVal) {
      if (!moment(val, this.momentFormat, true).isValid()) return;

      let datePickerValueFormat = moment(val, this.momentFormat).format(this.momentFormat);
      if (datePickerValueFormat !== oldVal) 
        $(this.$refs[this.refKey]).datepicker("setDate", val);

      this.$emit("input", val);
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
