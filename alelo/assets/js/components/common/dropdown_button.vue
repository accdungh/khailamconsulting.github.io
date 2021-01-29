<template>
  <div class="dropdown">
    <button
      ref="dropdown-button"
      class="btn dropdown-toggle button-gray-100"
      type="button"
      id="institutions-dropdown"
      data-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false"
    >
      {{ dropDownLabel }}
      <i class="fa fa-chevron-down"></i>
    </button>
    <div
      ref="dropdown-menu"
      class="dropdown-menu dddddd"
      aria-labelledby="institutions-dropdown"
    >
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
      dropDropMenuVisible: false,
    };
  },
  computed: {
    dropDownLabel() {
      if (this.selectedValue) {
        return this.options.find((i) => i.id == this.selectedValue).name;
      }

      return this.label;
    },
    dropDownMenuWidth() {
      return $(this.$refs["dropdown-menu"]).width();
    },
  },
  created() {
    this.selectedValue = this.value;
  },
  methods: {
    changeSelectedValue(id) {
      this.selectedValue = id;
      this.$emit("input", this.selectedValue);
    },
    setDropdownWidth() {
      if (!$(this.$refs["dropdown-button"]).is(":visible")) {
        return setTimeout(() => {
          this.setDropdownWidth();
        }, 500);
      }

      $(this.$refs["dropdown-button"]).css(
        "width",
        $(this.$refs["dropdown-menu"]).width() + 8
      );
    },
  },
  mounted() {
    this.setDropdownWidth();
  },
};
</script>

<style>
</style>
