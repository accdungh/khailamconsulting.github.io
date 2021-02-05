<template>
  <div>
    <a
      href="#edit-class-modal"
      data-toggle="modal"
      data-target="#edit-class-modal"
      class="edit-link d-inline f-n-20 ml-2"
      >Edit</a
    >

    <div
      class="modal fade"
      id="edit-class-modal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="NewClassLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h2 class="modal-title">Edit Class Details</h2>

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
            <InformationForm
              v-model="formData"
              v-if="formData && formData.name"
            >
              <template v-slot:buttons="props">
                <a
                  href="javascript:void(0)"
                  class="btn-created float-right"
                  @click="save(props)"
                  >Confirm</a
                >
              </template>
            </InformationForm>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import InformationForm from "../new_class/information_form.vue";
import { pick } from "lodash";

export default {
  name: "EditClassModal",
  props: {
    value: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      formData: {},
    };
  },
  components: { InformationForm },
  methods: {
    ...mapActions(["updateClass"]),
    save(props) {
      props.validator.validateAll().then((valid) => {
        if (!valid) return;

        this.updateClass(
          pick(this.formData, ["name", "institution", "description", "startDate", "endDate"])
        ).then(() => {
          $("#edit-class-modal").modal("hide");
        });
      });
    },
  },
  watch: {
    value() {
      this.formData = Object.assign({}, this.value);
    },
  },
  mounted() {
    $("#edit-class-modal").on("shown.bs.modal", () => {
      if (this.formData) {
        setTimeout(() => {
          autosize($(".auto-size"));
          autosize.update($(".auto-size"));
        });
      }
    });
  }
};
</script>

<style>
</style>
