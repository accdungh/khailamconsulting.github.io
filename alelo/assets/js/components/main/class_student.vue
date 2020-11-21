<template>
  <section>
    <div class="container">
      <div class="mt-4 mb-4">
        <a
          href="javascript:void(0)"
          @click="
            $router.push({
              name: 'ClassView',
              params: { id: $route.params.classId },
            })
          "
          class="f-m-20 d-line border-bottom border-secondary pb-2"
          ><i class="fa fa-arrow-left"></i>
          {{ $t("classStudent.backToClassViewer") }}</a
        >
      </div>
      <h2 class="f-m-20 mb-3 blue-bold">{{ $t("classList.summary") }}</h2>
      <div class="wrap-item col-md-14 p-4 f-n-16 line-height-40">
        <h3 class="f-m-36">{{ studentDetail.name }}</h3>
        <div>
          <b>{{ $t("classStudent.studentID") }}</b> {{ studentDetail.id }}
        </div>
        <div>
          <b>{{ $t("classStudent.email") }}</b> {{ studentDetail.email }}
        </div>
        <div>
          <b>{{ $t("classStudent.otherInformation") }}</b>
          {{ studentDetail.otherInformation }}
        </div>
      </div>

      <h3 class="f-m-20 blue-bold mb-3">{{ $t("classStudent.course(s)") }}</h3>
      <ul class="nav nav-tabs nav-tab-course" id="coursetab" role="tablist">
        <li
          class="nav-item"
          v-for="(course, index) in studentDetail.courses"
          :key="'student-course-' + index"
        >
          <a
            class="nav-link"
            href="javascript:void(0);"
            :class="{ active: index == activeCourseIndex }"
            @click="selectActiveCourse(index)"
            >{{ course.name }}</a
          >
        </li>
      </ul>

      <div class="wrap-item wrap-item-custom">
        <div class="scrollbar scrollbar-inner">
          <table
            class="table table-striped table-custom table-lst-student table-lst-student-custom"
            v-if="activeCourse"
          >
            <thead>
              <tr>
                <th scope="col">
                  <a
                    href="javascript:void(0)"
                    @click="sortSimulation('title')"
                    class="student-sorter"
                  >
                    {{ $t("classStudent.simulation") }}
                    <SortArrow :flag="sorter.orderKeys.title.value" />
                  </a>
                </th>
                <th scope="col">
                  <a
                    href="javascript:void(0)"
                    data-toggle="tooltip"
                    data-container="body"
                    data-placement="top"
                    @click="sortSimulation('lastTried')"
                    >{{ $t("classStudent.lastAttempt") }}
                    <SortArrow :flag="sorter.orderKeys.lastTried.value" />
                  </a>
                </th>
                <th scope="col">
                  <a
                    href="javascript:void(0)"
                    data-toggle="tooltip"
                    data-container="body"
                    data-placement="top"
                    :title="$t('classStudent.lastScoreHoverText')"
                    @click="sortSimulation('lastScore')"
                    >{{ $t("classStudent.lastScore") }}
                    <SortArrow :flag="sorter.orderKeys.lastScore.value" />
                  </a>
                </th>
                <th scope="col">
                  <a
                    href="javascript:void(0)"
                    data-toggle="tooltip"
                    data-container="body"
                    data-placement="top"
                    :title="$t('classStudent.completedStartedHoverText')"
                    @click="sortSimulation('completed')"
                    >{{ $t("classStudent.completedStarted") }}
                    <SortArrow :flag="sorter.orderKeys.completed.value" />
                  </a>
                </th>
                <th scope="col">
                  <a
                    href="javascript:void(0)"
                    data-toggle="tooltip"
                    data-container="body"
                    data-placement="top"
                    @click="sortSimulation('totalTimeSpent')"
                    >{{ $t("classStudent.totalTime") }}
                    <SortArrow :flag="sorter.orderKeys.totalTimeSpent.value" />
                  </a>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(simulation, aIndex) in activeCourse.simulations"
                :key="`active-course-${aIndex}`"
              >
                <td>
                  <a
                    href="#active-detail"
                    data-toggle="modal"
                    data-target="#active-detail"
                    @click="simulationDetail = simulation"
                    >{{ simulation.title }}</a
                  >
                </td>
                <td>{{ simulation.lastTried | timeParser }}</td>
                <td>{{ simulation.lastScore }}</td>
                <td>{{ simulation.completed }}/{{ simulation.tried }}</td>
                <td>{{ simulation.totalTimeSpent | toHHMMSS }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="clearfix">
        <span class="d-inline float-left f-n-14 blue-light mr-4">{{
          $t("classDetail.hoverText")
        }}</span>
        <span class="d-inline float-right f-n-14 mt-1 mr-4 blue-bold"
          ><i class="fa fa-download"></i> {{ $t("classDetail.download") }}</span
        >
      </div>
    </div>

    <StudentSimulationDetail :simulationDetail="simulationDetail" />
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import moment from "moment";
import StudentSimulationDetail from "./popup/student_simulation_detail.vue";
import Sorter from "../../services/sorter.js";

export default {
  name: "ClassStudent",
  data() {
    return {
      simulationDetail: {},
      activeCourseIndex: 0,
      sorter: new Sorter(
        {
          title: {},
          lastTried: { type: "date" },
          lastScore: {},
          completed: {},
          totalTimeSpent: {},
        },
        {
          by: "title",
          value: true,
        }
      ),
    };
  },
  computed: {
    ...mapGetters(["studentDetail"]),
    activeCourse() {
      return (
        this.studentDetail &&
        this.studentDetail.courses &&
        this.studentDetail.courses[this.activeCourseIndex]
      );
    },
  },
  methods: {
    ...mapActions(["fetchStudentDetail"]),
    selectActiveCourse(index) {
      this.activeCourseIndex = index;
      this.sortSimulation();
    },
    sortSimulation(orderBy = null, flag = undefined) {
      this.studentDetail.courses[
        this.activeCourseIndex
      ].simulations = this.sorter.perform(
        this.studentDetail.courses[this.activeCourseIndex].simulations,
        orderBy,
        flag
      );
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
      var hours = Math.floor(sec_num / 3600);
      var minutes = Math.floor((sec_num - hours * 3600) / 60);
      var seconds = sec_num - hours * 3600 - minutes * 60;

      if (hours < 10) {
        hours = "0" + hours;
      }
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
      return hours + ":" + minutes + ":" + seconds;
    },
  },
  components: { StudentSimulationDetail },
  created() {
    this.fetchStudentDetail({
      id: this.$route.params.id,
      classId: this.$route.params.classId,
    }).finally(() => {
      $(".scrollbar-inner").scrollbar();
      window.CommonJs.initJs();
      this.sortSimulation();
    });
  },
};
</script>

<style>
</style>
