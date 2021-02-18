<template>
  <!-- Class List-->
  <div
    class="tab-pane class-list mt-4 active"
    id="classlist"
    role="tabpanel"
    aria-labelledby="classlist-tab"
  >
    <form>
      <a
        href="#create-new-class"
        data-toggle="modal"
        data-target="#create-new-class"
        class="btn btn-created btn-orange mt-2 mb-5"
        >{{ $t("classList.createClass") }}</a
      >
      <ClassListScroller :classList="activeClasses" />
    </form>

    <CreateClassModal />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ClassListScroller from "./class_list_scroller.vue";
import CreateClassModal from "./popup/create_class_modal.vue";

export default {
  name: "ClassList",
  computed: {
    ...mapGetters(["activeClasses"]),
  },
  components: {
    CreateClassModal,
    ClassListScroller,
  },
  methods: {
    ...mapActions(["fetchClassList", "selectClass"]),
    select(id) {
      this.selectClass(id);
      this.$router.push({ name: "ClassView", params: { id } });
    },
  },
  created() {
    if (!this.activeClasses || !this.activeClasses.length) {
      this.fetchClassList();
    }
  },
};
</script>

<style>
</style>
