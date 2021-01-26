<template>
  <div class="dropdown">
    <button
      class="btn dropdown-toggle button-gray-100"
      type="button"
      id="institutions-dropdown"
      data-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false"
    >
      {{ label }}
      <i class="fa fa-chevron-down"></i>
    </button>
    <div class="dropdown-menu" aria-labelledby="institutions-dropdown">
      <a
        class="dropdown-item"
        href="javascript:void(0)"
        v-for="i in options"
        :key="i.id"
        :class="{ hovered: i.id == selectedValue }"
        @click="changeSelectedValue(i.id)"
        >{{ i.name }}</a
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "DropdownButton",
  props: {
    value: {
      type: String,
    },
    options: {
      type: Array,
      default: () => [],
    },
    label: {
      type: String,
    },
  },
  data() {
    return {
      selectedValue: null,
    };
  },
  created() {
    this.selectedValue = this.value;
  },
  methods: {
    changeSelectedValue(id) {
      this.selectedValue = id;
      this.$emit("input", this.selectedValue);
    },
  },
};
</script>

<style>
</style>
