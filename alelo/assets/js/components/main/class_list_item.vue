<template>
  <div class="form-group">
    <h2
      class="class-title"
      v-text="classData.name"
      @click="select(classData.id)"
    ></h2>
    <div class="row">
      <div class="col-md-12 mb-2 mt-2 f-m-20">Summary</div>
      <div class="col-md-12 mb-2 mt-2 f-n-16 text-right">
        {{ classData.startDate }} - {{ classData.endDate }}
      </div>
      <div class="txt-description col-md-24">
        {{ classData.description }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ClassListItem",
  props: {
    classData: {},
  },
  methods: {
    select(id) {
      this.$emit("selected", id);
    },
  },
};
</script>

<style>
</style>
