<template>
  <!-- Archived Class-->
  <div
    class="tab-pane class-archived mt-4"
    id="archived"
    role="tabpanel"
    aria-labelledby="archived-tab"
  >
    <form>
      <ClassListScroller :classList="archivedClasses" />
    </form>
  </div>
</template>

<script>
import ClassListScroller from "./class_list_scroller.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "ArchivedClass",
  components: { ClassListScroller },
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
