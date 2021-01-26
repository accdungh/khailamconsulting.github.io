<template>
  <!-- Modal-Create-New-Class -->
  <div
    class="modal fade"
    id="create-new-class"
    tabindex="-1"
    role="dialog"
    aria-labelledby="NewClassLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title">{{ $t("classList.createClass") }}</h2>

          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <NewClassWizard v-model="classDetail" @submit="saveClass()" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import NewClassWizard from "../new_class/new_class_wizard.vue";

export default {
  name: "CreateClassModal",
  data() {
    return {
      editMode: true,
      classDetail: {},
    };
  },
  components: { NewClassWizard },
  methods: {
    ...mapActions(["createClass"]),
    saveClass() {
      this.$validator.validateAll().then((valid) => {
        if (valid) {
          this.createClass(this.classDetail).then(({ data }) => {
            $("#create-new-class").modal("hide");
            this.$router.push({
              name: "ClassView",
              params: { id: data.id },
            });
          });
        }
      });
    },
  },
  created() {},
};
</script>

<style>
</style>
