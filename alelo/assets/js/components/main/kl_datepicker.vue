<template>
  <input
    :placeholder="placeholder"
    :ref="refKey"
    v-model="dateValue"
    :class="inputClass"
    data-date-format="mm/dd/yyyy"
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
      let datePickerValue = $(this.$refs[this.refKey]).datepicker("getDate");
      let datePickerValueFormat = moment(datePickerValue).format(this.format);
      if (datePickerValueFormat !== this.dateValue) {
        $(this.$refs[this.refKey]).datepicker("setDate", datePickerValue);
      } else {
        this.$emit("input", datePickerValue);
      }
    },
  },
  mounted() {
    let self = this;
    $(self.$refs[self.refKey]).datepicker();
    $(document).on("change", $(self.$refs[self.refKey]), function () {
      let date = $(self.$refs[self.refKey]).datepicker("getDate");
      if (!date) return;

      self.dateValue = moment(date).format(self.format);
    });
  },
};
</script>

<style>
</style>
