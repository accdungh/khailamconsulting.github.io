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
      <div v-bind:class="{'scrollbar-list-wrapper': activeClasses.length > 5}">
      <div class="scrollbar-list"> 
        <ClassListItem
          v-for="(item, index) in activeClasses"
          :key="'class-list-item' + index"
          :classData="item"
          @selected="select"
        />
      </div>
      </div>
      
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
    ...mapGetters(["activeClasses"]),
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
    if (!this.activeClasses || !this.activeClasses.length) {
      this.fetchClassList();
    }
  },

  watch: {
    activeClasses() {

       if (this.activeClasses.length > 5) 
        {
          this.$commonJs.initListScrollbar();
        }
    },
  },
};
</script>

<style>
</style>
