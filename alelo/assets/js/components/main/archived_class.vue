<template>
  <!-- Archived Class-->
  <div
    class="tab-pane class-archived mt-4"
    id="archived"
    role="tabpanel"
    aria-labelledby="archived-tab"
  >
    <form>
      <ClassListItem
        v-for="(item, index) in archivedClasses"
        :key="'class-list-item' + index"
        :classData="item"
      />
    </form>
  </div>
</template>

<script>
import AjaxCaller from "../../config/ajax_caller";
import ClassListItem from "./class_list_item.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "ArchivedClass",
  components: { ClassListItem },
  computed: {
    ...mapGetters(["archivedClasses"]),
  },
  methods: {
    ...mapActions(["setNoticeMessage", "fetchClassList"]),
  },
  created() {
    if (!this.archivedClasses || !this.archivedClasses.length) {
      this.fetchClassList();
    }
  },
};
</script>

<style>
</style>
