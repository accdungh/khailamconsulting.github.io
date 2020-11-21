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
            {{ simulationDetail.title }}
            <span class="f-n-14 d-inline ml-5">{{
              $t("classDetail.hoverText")
            }}</span>
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
                    :title="$t('classStudent.masteryScoreHoverText')"
                    >{{ $t("classStudent.masteryScore") }}</a
                  >
                </th>
                <th scope="col">
                  <a
                    href="javascript:void(0)"
                    data-toggle="tooltip"
                    data-container="body"
                    data-placement="top"
                    :title="$t('classStudent.objectivesMetHoverText')"
                    >{{ $t("classStudent.objectivesMet") }}</a
                  >
                </th>
                <th scope="col">
                  <a
                    href="javascript:void(0)"
                    data-toggle="tooltip"
                    data-container="body"
                    data-placement="top"
                    :title="$t('classStudent.turnsPerMinuteHoverText')"
                    >{{ $t("classStudent.turnsPerMinute") }}</a
                  >
                </th>
                <th scope="col">
                  <a
                    href="javascript:void(0)"
                    data-toggle="tooltip"
                    data-container="body"
                    data-placement="top"
                    :title="$t('classStudent.hintsUsedHoverText')"
                    >{{ $t("classStudent.hintsUsed") }}</a
                  >
                </th>
                <th scope="col">
                  <a
                    href="javascript:void(0)"
                    data-toggle="tooltip"
                    data-container="body"
                    data-placement="top"
                    :title="$t('classStudent.timeSpentHoverText')"
                    >{{ $t("classStudent.timeSpent") }}</a
                  >
                </th>
              </tr>
            </thead>
          </table>
          <table class="table table-striped table-custom style-col">
            <tbody>
              <tr
                v-for="(attempt, index) in simulationDetail.attempts"
                :key="'active-log-' + index"
              >
                <td>{{ attempt.date | timeParser }}</td>
                <td>{{ attempt.score }}</td>
                <td>
                  {{ attempt.objectivesCompleted }}/{{
                    attempt.objectivesCount
                  }}
                </td>
                <td>{{ attempt.emp }}</td>
                <td>{{ attempt.hintsUsed ? attempt.hintsUsed : 0 }}</td>
                <td>{{ attempt.timeSpent | toHHMMSS }}</td>
              </tr>
            </tbody>
          </table>
          <span class="d-inline float-right f-n-14 mt-1 mr-4 blue-bold"
            ><i class="fa fa-download"></i>
            {{ $t("classDetail.download") }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "StudentSimulationDetail",
  props: {
    simulationDetail: {
      type: Object,
      default: () => {},
    },
  },
  filters: {
    timeParser(value) {
      if (value) {
        return moment(String(value)).format("MM/DD/YYYY HH:mm");
      }
    },
    toHHMMSS(sec) {
      var sec_num = parseInt(sec, 10); // don't forget the second param
      var hours   = Math.floor(sec_num / 3600);
      var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
      var seconds = sec_num - (hours * 3600) - (minutes * 60);

      if (hours   < 10) {hours   = "0"+hours;}
      if (minutes < 10) {minutes = "0"+minutes;}
      if (seconds < 10) {seconds = "0"+seconds;}
      return hours+':'+minutes+':'+seconds;
    }
  },
};
</script>

<style>
</style>
