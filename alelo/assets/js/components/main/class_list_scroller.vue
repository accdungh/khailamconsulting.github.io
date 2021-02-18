<template>
  <div :class="{ 'scrollbar-list-wrapper': classList.length > 5 }">
    <div class="scrollbar-list">
      <ClassListItem
        v-for="(item, index) in classList"
        :key="'class-list-item' + index"
        :classData="item"
      />
    </div>
  </div>
</template>

<script>
import ClassListItem from "./class_list_item.vue";

export default {
  name: "ClassListScroller",
  props: {
    classList: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    ClassListItem,
  },
  methods: {
    checkAndInitScrollBar() {
      if (this.classList.length > 5) {
        this.$commonJs.initListScrollbar();
      }
    },
  },
  watch: {
    classList() {
      this.checkAndInitScrollBar();
    },
  },
  mounted() {
    this.checkAndInitScrollBar();
  },
};
</script>

<style>
</style>
