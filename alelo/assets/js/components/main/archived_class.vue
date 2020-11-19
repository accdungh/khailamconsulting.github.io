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

export default {
  name: "ArchivedClass",
  components: { ClassListItem },
  data() {
    return { archivedClassList: [] };
  },
  created() {
    AjaxCaller.archivedClassList().then((resp) => {
      let json = resp.data;
      if (json && json.success) this.archivedClassList = json.data;
    });
  },
};
</script>

<style>
</style>
