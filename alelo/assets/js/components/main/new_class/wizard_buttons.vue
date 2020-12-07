<template>
  <div class="row">
    <div class="col-sm-12">
      <a
        v-if="backStep"
        href="javascript:void(0)"
        @click="emit('backStepClick')"
      >
        {{ backStep }}
      </a>
    </div>
    <div class="col-sm-12 text-right">
      <a
        v-if="nextStep"
        href="javascript:void(0)"
        @click="emit('nextStepClick')"
      >
        {{ nextStep }}
      </a>
      <a
        v-if="confirmStep"
        href="javascript:void(0)"
        @click="emit('confirmStepClick')"
      >
        {{ confirmStep }}
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "WizardButtons",
  props: {
    nextStep: {
      type: String,
    },
    backStep: {
      type: String,
    },
    confirmStep: {
      type: String,
    },
  },
  methods: {
    emit(step) {
      this.$emit(step);
    },
  },
};
</script>

<style>
</style>
