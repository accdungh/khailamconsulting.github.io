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
      <div class="scrollbar-nav">
        <div class="scroller scroller-left float-left">
          <i class="fa fa-chevron-left"></i>
        </div>
        <div class="scroller scroller-right float-right">
          <i class="fa fa-chevron-right"></i>
        </div>
        <div class="wrap-scrollbar-nav">
          <nav
            class="nav nav-tabs list-nav nav-tab-course"
            id="coursetab"
            role="tablist"
          >
            <a
              class="nav-item nav-link"
              v-for="(course, index) in sortedCourses"
              :key="'student-course-' + index"
              href="javascript:void(0);"
              :class="{ active: index == activeCourseIndex }"
              @click="selectActiveCourse(index)"
              >{{ course.name }}</a
            >
          </nav>
        </div>
      </div>

      <div class="wrap-item wrap-item-custom">
        <div class="scrollbar">
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
    sortedCourses() {
      if (!this.studentDetail || !this.studentDetail.courses) return [];
      return new Sorter(
        { name: {} },
        {
          by: "name",
          value: true,
        }
      ).perform(this.studentDetail.courses);
    },
  },
  methods: {
    ...mapActions(["fetchStudentDetail"]),
    selectActiveCourse(index) {
      this.activeCourseIndex = index;
      this.sortSimulation("title", true);
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
  components: { StudentSimulationDetail },
  created() {
    this.fetchStudentDetail({
      id: this.$route.params.id,
      classId: this.$route.params.classId,
    }).finally(() => {
      this.sortSimulation("title", true);
      this.$commonJs.initJs();
      this.$commonJs.initHorizontalScrollBar();
    });
  },
};
</script>

<style>
</style>
