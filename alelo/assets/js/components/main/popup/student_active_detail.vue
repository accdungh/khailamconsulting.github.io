<template>
  <!-- Modal-Course Detail -->
  <div
    class="modal fade"
    id="active-detail"
    tabindex="-1"
    role="dialog"
    aria-labelledby="myModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title">
            {{ activeDetail.simulation }}
            <span class="f-n-14 d-inline ml-5"
              >Hover on any title for more information</span
            >
          </h2>

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
          <table class="table-modal table-modal-custom style-col">
            <thead>
              <tr>
                <th scope="col">&nbsp;</th>
                <th scope="col">
                  <a
                    href="javascript:void(0)"
                    data-toggle="tooltip"
                    data-container="body"
                    data-placement="top"
                    title="Measure of accuracy and fluency."
                    >Mastery Score</a
                  >
                </th>
                <th scope="col">
                  <a
                    href="javascript:void(0)"
                    data-toggle="tooltip"
                    data-container="body"
                    data-placement="top"
                    title="Objectives completed/objectives available."
                    >Objectives Met</a
                  >
                </th>
                <th scope="col">
                  <a
                    href="javascript:void(0)"
                    data-toggle="tooltip"
                    data-container="body"
                    data-placement="top"
                    title="Number of speaking turns each minute."
                    >Turns per Minute</a
                  >
                </th>
                <th scope="col">
                  <a
                    href="javascript:void(0)"
                    data-toggle="tooltip"
                    data-container="body"
                    data-placement="top"
                    title="Number of time the transcript or utterances were accessed."
                    >Hints Used</a
                  >
                </th>
                <th scope="col">
                  <a
                    href="javascript:void(0)"
                    data-toggle="tooltip"
                    data-container="body"
                    data-placement="top"
                    title="Total time spent on this sim."
                    >Time Spent</a
                  >
                </th>
              </tr>
            </thead>
          </table>
          <table class="table table-striped table-custom style-col">
            <tbody>
              <tr
                v-for="(log, index) in activeDetail.logs"
                :key="'active-log-' + index"
              >
                <td>{{ log.time }}</td>
                <td>{{ log.masteryScore }}%</td>
                <td>{{ log.objectivesMet }}/{{ log.objectives }}</td>
                <td>{{ log.turnsPerMinute }}</td>
                <td>{{ log.hintsUsed }}</td>
                <td>{{ log.timeSpent }}</td>
              </tr>
            </tbody>
          </table>
          <span class="d-inline float-right f-n-14 mt-1 mr-4 blue-bold"
            ><i class="fa fa-download"></i> Download</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "StudentActiveDetail",
  props: {
    activeDetail: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style>
</style>
