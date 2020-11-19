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
        v-for="(item, index) in archivedClassList"
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
  data() {
    return { archivedClassList: [] };
  },
  methods: {
    ...mapActions(["setNoticeMessage"]),
  },
  created() {
    AjaxCaller.archivedClassList().then((resp) => {
      let json = resp.data;
      if (json && json.success) this.archivedClassList = json.data;
      else this.setNoticeMessage(json.message);
    });
  },
};
</script>

<style>
</style>
