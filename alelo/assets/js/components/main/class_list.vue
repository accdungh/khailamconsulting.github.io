<template>
  <!-- Class List-->
  <div
    class="tab-pane class-list mt-4 active"
    id="classlist"
    role="tabpanel"
    aria-labelledby="classlist-tab"
  >
    <form>
      <ClassListItem
        v-for="(item, index) in classList"
        :key="'class-list-item' + index"
        :classData="item"
        @selected="select"
      />

      <a
        href="#create-new-class"
        data-toggle="modal"
        data-target="#create-new-class"
        class="btn btn-created mt-5 mb-5"
        >{{ $t("classList.createClass") }}</a
      >
    </form>

    <CreateClassModal />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ClassListItem from "./class_list_item.vue";
import CreateClassModal from "./popup/create_class_modal.vue";

export default {
  name: "ClassList",
  computed: {
    ...mapGetters(["classList"]),
  },
  components: {
    ClassListItem,
    CreateClassModal,
  },
  methods: {
    ...mapActions(["fetchClassList", "selectClass"]),
    select(id) {
      this.selectClass(id);
      this.$router.push({ name: "ClassView", params: { id } });
    },
  },
  created() {
    this.fetchClassList();
  },
};
</script>

<style>
</style>
