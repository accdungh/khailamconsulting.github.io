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
              >{{ $t("classDetail.hoverText") }}</span
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
                    >{{ $t("classStudent.masteryScore") }}</a
                  >
                </th>
                <th scope="col">
                  <a
                    href="javascript:void(0)"
                    data-toggle="tooltip"
                    data-container="body"
                    data-placement="top"
                    title="Objectives completed/objectives available."
                    >{{ $t("classStudent.objectivesMet") }}</a
                  >
                </th>
                <th scope="col">
                  <a
                    href="javascript:void(0)"
                    data-toggle="tooltip"
                    data-container="body"
                    data-placement="top"
                    title="Number of speaking turns each minute."
                    >{{ $t("classStudent.turnsPerMinute") }}</a
                  >
                </th>
                <th scope="col">
                  <a
                    href="javascript:void(0)"
                    data-toggle="tooltip"
                    data-container="body"
                    data-placement="top"
                    title="Number of time the transcript or utterances were accessed."
                    >{{ $t("classStudent.hintsUsed") }}</a
                  >
                </th>
                <th scope="col">
                  <a
                    href="javascript:void(0)"
                    data-toggle="tooltip"
                    data-container="body"
                    data-placement="top"
                    title="Total time spent on this sim."
                    >{{ $t("classStudent.timeSpent") }}</a
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
            ><i class="fa fa-download"></i> {{ $t("classDetail.download") }}</span
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
