<template>
  <!-- Class List-->
  <div
    class="tab-pane class-list mt-4 active"
    id="classlist"
    role="tabpanel"
    aria-labelledby="classlist-tab"
  >
    <form>
      <div
        class="form-group"
        v-for="(item, index) in classList"
        :key="'class-list-item' + index"
      >
        <h2
          class="class-title"
          v-text="item.name"
          @click="select(item.id)"
        ></h2>
        <div class="row">
          <div class="col-md-12 mb-2 mt-2 f-m-20">Summary</div>
          <div class="col-md-12 mb-2 mt-2 f-n-16 text-right">
            {{ item.startDate }} - {{ item.endDate }}
          </div>
        </div>
        <input
          type="text"
          id=""
          class="form-control"
          :value="item.description"
        />
      </div>

      <!-- <div class="form-group">
        <h2 class="class-title">Inglés intermedio nivel 2</h2>
        <div class="row">
          <div class="col-md-12 mb-2 mt-2 f-m-20">Summary</div>
          <div class="col-md-12 mb-2 mt-2 f-n-16 text-right">
            9/1/2020 - 12/31/2020
          </div>
        </div>
        <input
          type="text"
          id=""
          class="form-control"
          value="6 out of 7 students have enrolled in the Enskill Simulations."
        />
      </div>

      <div class="form-group">
        <h2 class="class-title">Academic English</h2>
        <div class="row">
          <div class="col-md-12 mb-2 mt-2 f-m-20">Summary</div>
          <div class="col-md-12 mb-2 mt-2 f-n-16 text-right">
            9/1/2020 - 12/31/2020
          </div>
        </div>
        <input
          type="text"
          id=""
          class="form-control"
          value="6 out of 7 students have enrolled in the Enskill Simulations."
        />
      </div>

      <div class="form-group">
        <h2 class="class-title">Business English 1</h2>
        <div class="row">
          <div class="col-md-12 mb-2 mt-2 f-m-20">Summary</div>
          <div class="col-md-12 mb-2 mt-2 f-n-16 text-right">
            9/1/2020 - 12/31/2020
          </div>
        </div>
        <input
          type="text"
          id=""
          class="form-control"
          value="6 out of 7 students have enrolled in the Enskill Simulations."
        />
      </div> -->

      <a href="javascript:void(0)" @click="$router.push({ name: 'ClassView' })" class="btn btn-created mt-5 mb-5">Create A New Class</a>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "ClassList",
  computed: {
    ...mapGetters(["classList"]),
  },
  methods: {
    ...mapActions(["fetchClassList", "selectClass"]),
    select(id) {
      this.selectClass(id);
      this.$router.push({ name: "ClassView" });
    },
  },
  created() {
    this.fetchClassList();
  },
};
</script>

<style>
</style>
