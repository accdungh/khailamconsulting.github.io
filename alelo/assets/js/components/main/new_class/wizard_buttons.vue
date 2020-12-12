<template>
  <div class="row create-class__buttons f-m-20">
    <div class="col-sm-12">
      <a
        v-if="backStep"
        class="create-class__buttons__back"
        href="javascript:void(0)"
        @click="emit('backStepClick')"
        ref="backButton"
      >
        <i class="fa fa-chevron-left"></i>
        {{ backStep }}
      </a>
    </div>
    <div class="col-sm-12 text-right">
      <a
        v-if="nextStep"
        class="create-class__buttons__next"
        href="javascript:void(0)"
        @click="emit('nextStepClick')"
        ref="nextButton"
      >
        {{ nextStep }}
        <i class="fa fa-chevron-right"></i>
      </a>
      <a
        v-if="confirmStep"
        class="create-class__buttons__confirm"
        href="javascript:void(0)"
        @click="emit('confirmStepClick')"
        ref="confirmButton"
      >
        {{ confirmStep }}
        <i class="fa fa-check"></i>
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
