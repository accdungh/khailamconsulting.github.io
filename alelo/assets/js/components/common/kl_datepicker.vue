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
  methods: {
    getDateValue() {
      if (this.value) this.dateValue = moment(this.value).format(this.format);
    },
  },
  watch: {
    value(val) {
      this.getDateValue();
    },
    dateValue(val) {
      let datePickerValue = $(this.$refs[this.refKey]).datepicker("getUTCDate");
      if (val && !datePickerValue) {
        $(this.$refs[this.refKey]).datepicker("setDate", val);
        this.$emit("input", moment(val, this.format));
        return;
      }
      let datePickerValueFormat = moment(datePickerValue).format(this.format);
      if (datePickerValueFormat !== this.dateValue) {
        $(this.$refs[this.refKey]).datepicker("setUTCDate", datePickerValue);
      } else {
        this.$emit("input", datePickerValue);
      }
    },
  },
  mounted() {
    this.getDateValue();
    let self = this;
    $(self.$refs[self.refKey]).datepicker();
    $(self.$refs[self.refKey])
      .off("change")
      .on("change", function () {
        let date = $(self.$refs[self.refKey]).datepicker("getUTCDate");
        if (!date) return;

        self.dateValue = moment(date).format(self.format);
      });
  },
};
</script>

<style>
</style>
