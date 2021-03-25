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
                v-for="(attempt, index) in currentPageAttempts"
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
          <paginate
            v-if="totalAttempts"
            :page-count="pageCount"
            :container-class="'pagination pagination-sm justify-content-end'"
            :page-class="'page-item'"
            page-link-class="page-link"
            prev-class="page-item"
            prev-link-class="page-link"
            next-class="page-item"
            next-link-class="page-link"
            break-view-class="page-item"
            break-view-link-class="page-link"
            prev-text="&laquo;"
            next-text="&raquo;"
            v-model="page"
            :page-range="9"
          >
          </paginate>
          <a href="javascript:void(0)" @click="$emit('download')">
            <span class="d-inline float-right f-n-14 mt-1 mr-4 blue-bold">
              <i class="fa fa-download"></i>
              {{ $t("classDetail.download") }}
            </span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sorter from "../../../services/sorter.js";

export default {
  name: "StudentSimulationDetail",
  props: {
    simulationDetail: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      page: 1,
      perPage: 10,
    };
  },
  computed: {
    sortedAttempts() {
      return new Sorter({ date: { type: "date" } }).perform(
        this.simulationDetail.attempts || [],
        "date"
      );
    },
    currentPageAttempts() {
      let start = this.perPage * (this.page - 1);
      return this.sortedAttempts.slice(start, start + this.perPage);
    },
    totalAttempts() {
      return (this.simulationDetail.attempts || []).length;
    },
    pageCount() {
      return Math.ceil(this.totalAttempts / this.perPage);
    },
  },
  watch: {
    simulationDetail() {
      this.page = 1;
    },
  },
};
</script>

<style>
</style>
