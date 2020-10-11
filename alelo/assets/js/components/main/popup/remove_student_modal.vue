<template>
  <!-- Modal-Remove Student -->
  <div
    class="modal fade"
    id="removestudent"
    tabindex="-1"
    role="dialog"
    aria-labelledby="myModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title">Remove Student(s)</h2>

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
          <p class="f-m-20 blue-bold mb-5">
            This will permanently remove student(s) from your class!
          </p>

          <div class="wrap-item text-center pb-5">
            <h3 class="mt-5 mb-5">
              Are you sure you want to remove the selected student(s)?
            </h3>
            <a
              href="javascript:void(0)"
              class="btn-created"
              data-dismiss="modal"
              @click="$emit('confirmed')"
              >Yes, Remove</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RemoveStudentModal",
};
</script>

<style>
</style>
