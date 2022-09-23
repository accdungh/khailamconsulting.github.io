<template>
  <div class='scrollbar-list-wrapper'>
    <div class="scrollbar-list">
      <ClassListItem
        v-for="(item, index) in classList"
        :key="'class-list-item' + index"
        :classData="item"
      />
    </div>

    <div class='external-scroll_x'>
      <div class='scroll-element_outer'>
        <div class='scroll-element_size'></div>
        <div class='scroll-element_track'></div>
        <div class='scroll-bar'></div>
      </div>
    </div>

    <div class='external-scroll_y'>
      <div class='scroll-element_outer'>
        <div class='scroll-element_size'></div>
        <div class='scroll-element_track'></div>
        <div class='scroll-bar'></div>
      </div>
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
