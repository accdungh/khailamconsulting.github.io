<template>
  <div class="form-group">
    <h2 class="class-title">
      <a href="javascript:void(0)" v-text="classData.name"
      @click="select(classData.id)"></a>
    </h2>
    <div class="row">
      <div class="col-md-12 mb-2 mt-2 f-m-20">{{ $t('classList.summary') }}</div>
      <div class="col-md-12 mb-2 mt-2 f-n-16 text-right">
        {{ classData.startDate | toMMDDYYYY }} - {{ classData.endDate | toMMDDYYYY }}
      </div>
      <div class="txt-description col-md-24">
        {{ classData.summary }}
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "ClassListItem",
  props: {
    classData: {},
  },
  methods: {
    select(id) {
      this.$router.push({ name: "ClassView", params: { id } });
    },
  },
  filters: {
    toMMDDYYYY(value) {
      if (value) {
        return moment(String(value)).format("MMMM DD, YYYY");
      }
    },
  },
};
</script>

<style>
</style>
